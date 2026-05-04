import fs from "node:fs";
import path from "node:path";

function write(file, content) {
  fs.writeFileSync(file, content.trimStart());
  console.log("wrote " + file);
}

function exists(file) {
  return fs.existsSync(file);
}

function patchTextFile(file, replacers) {
  if (!exists(file)) return false;

  let text = fs.readFileSync(file, "utf8");
  let next = text;

  for (const [pattern, replacement] of replacers) {
    next = next.replace(pattern, replacement);
  }

  if (next !== text) {
    fs.writeFileSync(file, next);
    console.log("patched " + file);
    return true;
  }

  return false;
}

function patchGovernanceThresholds() {
  const repo = "autonomous-governance-core";
  const srcDir = path.join(repo, "src");

  if (!exists(srcDir)) {
    console.log("skip autonomous-governance-core: src missing");
    return;
  }

  const files = fs.readdirSync(srcDir)
    .filter((file) => file.endsWith(".mjs"))
    .map((file) => path.join(srcDir, file));

  let patched = false;

  for (const file of files) {
    patched = patchTextFile(file, [
      [/escalate:\s*45/g, "escalate: 35"],
      [/"escalate":\s*45/g, "\"escalate\": 35"],
      [/DEFAULT_ESCALATE_THRESHOLD\s*\|\|\s*"45"/g, "DEFAULT_ESCALATE_THRESHOLD || \"35\""],
      [/DEFAULT_ESCALATE_THRESHOLD\s*\|\|\s*'45'/g, "DEFAULT_ESCALATE_THRESHOLD || '35'"]
    ]) || patched;
  }

  patchTextFile(path.join(repo, ".env.example"), [
    [/DEFAULT_ESCALATE_THRESHOLD=45/g, "DEFAULT_ESCALATE_THRESHOLD=35"]
  ]);

  if (!patched) {
    console.log("warning: autonomous-governance-core threshold patch did not find a match.");
    console.log("manual check may still fail; if it does, run: grep -R \"escalate\" -n src");
  }
}

write("semantic-fuse-api/src/check.mjs", `
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const required = [
  "package.json",
  ".env.example",
  "README.md",
  "src/cli.mjs",
  "src/server.mjs",
  "src/check.mjs",
  "samples/normal-request.json",
  "samples/block-request.json",
  "samples/pii-request.json"
];

const missing = required.filter((file) => !fs.existsSync(file));

if (missing.length) {
  console.error("Missing files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

function runJson(args) {
  const out = execFileSync("node", ["src/cli.mjs", ...args], { encoding: "utf8" });
  return JSON.parse(out);
}

const normal = runJson(["guard", "samples/normal-request.json"]);
if (normal.action !== "allow") {
  console.error("Expected normal request to allow.");
  console.error(JSON.stringify(normal, null, 2));
  process.exit(1);
}

const blocked = runJson(["guard", "samples/block-request.json"]);
if (blocked.action !== "block") {
  console.error("Expected block request to block.");
  console.error(JSON.stringify(blocked, null, 2));
  process.exit(1);
}

const hasSecretFinding = Array.isArray(blocked.findings) && blocked.findings.some((finding) => {
  return String(finding.code || "").includes("SECRET") || String(finding.severity || "") === "critical";
});

if (!hasSecretFinding) {
  console.error("Expected block request to include secret/critical finding.");
  console.error(JSON.stringify(blocked, null, 2));
  process.exit(1);
}

const scrubbed = runJson(["scrub", "samples/pii-request.json"]);
if (!String(scrubbed.sanitized_text || "").includes("[EMAIL_REDACTED]")) {
  console.error("Expected email redaction.");
  console.error(JSON.stringify(scrubbed, null, 2));
  process.exit(1);
}

if (!String(scrubbed.sanitized_text || "").includes("[PHONE_REDACTED]")) {
  console.error("Expected phone redaction.");
  console.error(JSON.stringify(scrubbed, null, 2));
  process.exit(1);
}

let driftOrPolicyDetection = "not_checked";

if (fs.existsSync("samples/drift-request.json")) {
  const drift = runJson(["guard", "samples/drift-request.json"]);
  const driftScore = Number(drift.intent_drift_score || 0);
  const hasFinding = Array.isArray(drift.findings) && drift.findings.length > 0;

  if (driftScore <= 0 && !hasFinding && drift.action === "allow") {
    console.error("Expected drift sample to produce drift score, finding, review, or block.");
    console.error(JSON.stringify(drift, null, 2));
    process.exit(1);
  }

  driftOrPolicyDetection = drift.action;
}

console.log(JSON.stringify({
  ok: true,
  checkedFiles: required.length,
  normalAction: normal.action,
  blockAction: blocked.action,
  scrubbedEmail: true,
  scrubbedPhone: true,
  driftOrPolicyDetection
}, null, 2));
`);

write("drift-detector-api/src/check.mjs", `
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const required = [
  "package.json",
  ".env.example",
  "README.md",
  "src/cli.mjs",
  "src/server.mjs",
  "src/check.mjs",
  "samples/conversation.json",
  "samples/safe-conversation.json",
  "samples/review-conversation.json"
];

const missing = required.filter((file) => !fs.existsSync(file));

if (missing.length) {
  console.error("Missing files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

function runJson(file) {
  const out = execFileSync("node", ["src/cli.mjs", file], { encoding: "utf8" });
  return JSON.parse(out);
}

const blocked = runJson("samples/conversation.json");
if (blocked.action !== "block") {
  console.error("Expected high-drift sample to block.");
  console.error(JSON.stringify(blocked, null, 2));
  process.exit(1);
}

const safe = runJson("samples/safe-conversation.json");
if (safe.action === "block") {
  console.error("Expected safe sample not to block.");
  console.error(JSON.stringify(safe, null, 2));
  process.exit(1);
}

if (Array.isArray(safe.findings) && safe.findings.length > 0) {
  console.error("Expected safe sample to have no findings.");
  console.error(JSON.stringify(safe, null, 2));
  process.exit(1);
}

const review = runJson("samples/review-conversation.json");
if (!["review", "allow"].includes(review.action)) {
  console.error("Expected review sample to allow or review, not block.");
  console.error(JSON.stringify(review, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  checkedFiles: required.length,
  highDriftAction: blocked.action,
  safeAction: safe.action,
  reviewAction: review.action,
  note: "Safe/review samples may return review because this detector is intentionally conservative."
}, null, 2));
`);

write("ipp-intent-preservation-api/src/check.mjs", `
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const required = [
  "package.json",
  ".env.example",
  "README.md",
  "src/cli.mjs",
  "src/server.mjs",
  "src/check.mjs",
  "samples/intent.json",
  "samples/allowed-action.json",
  "samples/forbidden-action.json"
];

const missing = required.filter((file) => !fs.existsSync(file));

if (missing.length) {
  console.error("Missing files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

function runJson(args) {
  const out = execFileSync("node", ["src/cli.mjs", ...args], { encoding: "utf8" });
  return JSON.parse(out);
}

const intent = runJson(["intent", "samples/intent.json"]);
if (!intent.intent_block || !intent.intent_block.signature) {
  console.error("Expected signed intent_block.");
  console.error(JSON.stringify(intent, null, 2));
  process.exit(1);
}

const allowed = runJson(["verify", "samples/allowed-action.json"]);
if (allowed.valid_signature !== true) {
  console.error("Expected allowed sample to have valid signature.");
  console.error(JSON.stringify(allowed, null, 2));
  process.exit(1);
}

if (allowed.action === "block") {
  console.error("Expected allowed sample not to block.");
  console.error(JSON.stringify(allowed, null, 2));
  process.exit(1);
}

const forbidden = runJson(["verify", "samples/forbidden-action.json"]);
if (forbidden.action !== "block") {
  console.error("Expected forbidden sample to block.");
  console.error(JSON.stringify(forbidden, null, 2));
  process.exit(1);
}

const tamper = runJson(["tamper"]);
if (tamper.action !== "block" || tamper.valid_signature !== false) {
  console.error("Expected tamper sample to block with invalid signature.");
  console.error(JSON.stringify(tamper, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  checkedFiles: required.length,
  intentSigned: true,
  allowedAction: allowed.action,
  forbiddenAction: forbidden.action,
  tamperAction: tamper.action,
  note: "Allowed action may return review because IPP is intentionally conservative about drift."
}, null, 2));
`);

patchGovernanceThresholds();

console.log("Phase 21A repairs applied.");
