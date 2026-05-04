import fs from "node:fs";
import path from "node:path";

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart());
  console.log("wrote " + filePath);
}

write("low-risk-product-audit/src/catalog.mjs", String.raw`
export const products = [
  {
    phase: 22,
    repo: "smartcart-chef-planner",
    title: "SmartCart Chef Planner",
    risk: "low",
    revenuePath: "consumer subscription, meal planning, pantry planning, shopping assistant",
    recommendedVisibility: "private-first",
    deployPriority: 1,
    recommendedDeployTarget: "web-app-first",
    reason: "Best first product deployment candidate: clear consumer utility, low legal risk, obvious free-to-paid path, easy demo."
  },
  {
    phase: 23,
    repo: "fishcast-ai",
    title: "FishCast AI",
    risk: "low",
    revenuePath: "consumer outdoor app, local SEO, ads, premium fishing forecasts",
    recommendedVisibility: "private-first",
    deployPriority: 2,
    recommendedDeployTarget: "web-app-or-api",
    reason: "Good consumer product with simple demo path. Needs real weather/location API before serious production use."
  },
  {
    phase: 24,
    repo: "microsaas-factory-kit",
    title: "MicroSaaS Factory Kit",
    risk: "medium",
    revenuePath: "template/productized dev kit, implementation services, open-source lead magnet",
    recommendedVisibility: "public-core-private-services",
    deployPriority: 3,
    recommendedDeployTarget: "docs-plus-cli",
    reason: "Good public-core/private-services play. Better as a lead magnet than first consumer SaaS."
  },
  {
    phase: 25,
    repo: "behavioral-memory-bank",
    title: "Behavioral Memory Bank",
    risk: "medium",
    revenuePath: "personal AI memory layer, privacy-first assistant storage",
    recommendedVisibility: "private-first",
    deployPriority: 5,
    recommendedDeployTarget: "private-api-only",
    reason: "Useful but needs consent, privacy controls, export/delete flow, data retention policy, and security review before public release."
  },
  {
    phase: 26,
    repo: "token-weighted-image-queue",
    title: "Token-Weighted Image Queue",
    risk: "medium",
    revenuePath: "creator workflow queue, agency image ops, internal production pipeline",
    recommendedVisibility: "private-first",
    deployPriority: 4,
    recommendedDeployTarget: "internal-tool-first",
    reason: "Useful internal tool. Must keep safety policy and provider keys controlled. No live image generation until provider rules are configured."
  },
  {
    phase: 3,
    repo: "notion-codepack-deploy-harness",
    title: "Notion Codepack Deploy Harness",
    risk: "low",
    revenuePath: "open-source utility, lead magnet, consulting wedge",
    recommendedVisibility: "public-ok",
    deployPriority: 6,
    recommendedDeployTarget: "public-cli-after-cleanup",
    reason: "Generic tooling. Good open-source candidate after README cleanup."
  }
];
`);

write("deployment-packager/src/manifest.mjs", String.raw`
export const repos = [
  { name: "notion-codepack-deploy-harness", type: "tooling", visibility: "public-ok", deploy: "library-cli" },
  { name: "neuruh-repo-bootstrapper", type: "tooling", visibility: "public-ok", deploy: "library-cli" },

  { name: "semantic-fuse-api", type: "infrastructure", visibility: "public-core-ok", deploy: "api" },
  { name: "drift-detector-api", type: "infrastructure", visibility: "public-core-ok", deploy: "api" },
  { name: "ipp-intent-preservation-api", type: "infrastructure", visibility: "private-first", deploy: "api" },
  { name: "constraint-engineering-core", type: "infrastructure", visibility: "public-core-ok", deploy: "api" },
  { name: "contextual-inception-framework", type: "infrastructure", visibility: "private-first", deploy: "api" },
  { name: "autonomous-governance-core", type: "infrastructure", visibility: "public-core-ok", deploy: "api" },
  { name: "ip-timestamp-bundler", type: "registry", visibility: "private-first", deploy: "api" },
  { name: "ether-layer-event-bus", type: "infrastructure", visibility: "public-core-ok", deploy: "api" },
  { name: "atomic-node-registry", type: "registry", visibility: "private-first", deploy: "api" },
  { name: "neuruh-factory-router", type: "factory", visibility: "private-first", deploy: "api" },
  { name: "ocn-hybrid-inference-router", type: "infrastructure", visibility: "public-core-ok", deploy: "api" },
  { name: "inference-mesh-router", type: "infrastructure", visibility: "public-core-ok", deploy: "api" },

  { name: "semantic-platform-audit", type: "tooling", visibility: "public-ok", deploy: "library-cli" },
  { name: "low-risk-product-audit", type: "tooling", visibility: "public-ok", deploy: "library-cli" },
  { name: "revenue-launch-router", type: "revenue", visibility: "private-first", deploy: "api" },
  { name: "deployment-packager", type: "tooling", visibility: "public-ok", deploy: "library-cli" },

  { name: "smartcart-chef-planner", type: "product", visibility: "private-first", deploy: "web-app-first" },
  { name: "fishcast-ai", type: "product", visibility: "private-first", deploy: "web-app-or-api" },
  { name: "microsaas-factory-kit", type: "product-tooling", visibility: "public-core-private-services", deploy: "docs-plus-cli" },
  { name: "behavioral-memory-bank", type: "privacy-product", visibility: "private-first", deploy: "private-api-only" },
  { name: "token-weighted-image-queue", type: "internal-ops", visibility: "private-first", deploy: "internal-tool-first" }
];
`);

write("deployment-packager/out/PHASE_29_PRODUCT_DEPLOYMENT_PICK.md", String.raw`
# Phase 29 Product Deployment Pick

## Pick

SmartCart Chef Planner.

## Why

SmartCart is the best first product to turn into a real web app or deploy target.

Reasons:

- Lowest risk among current product builds.
- Clear consumer utility.
- Easy demo: pantry input, meal plan output, shopping list output.
- Obvious free-to-paid path.
- Does not require regulated data.
- Does not require image generation.
- Does not require behavioral memory privacy review.
- Can launch as private beta quickly.

## Do not pick first

FishCast AI:

- Good product, but needs real weather/location integration before serious release.

MicroSaaS Factory Kit:

- Better as tooling/lead magnet than first product UI.

Behavioral Memory Bank:

- Needs privacy, consent, export/delete, retention, and security review before public use.

Token-Weighted Image Queue:

- Useful internal tool, but image provider policy and safety controls must be reviewed before release.

## Recommended deploy direction

Build SmartCart as:

- Web frontend
- Node API
- Private GitHub repo
- Free tier
- Paid upgrade later
- No live grocery partner integration yet
- No external paid APIs until pricing covers cost

## Phase 30 should be

SmartCart Web App Shell.

Target repo:

smartcart-chef-planner-web

Or upgrade existing:

smartcart-chef-planner

Recommended first production target:

- Vercel for frontend
- Render/Railway/Fly for API

If keeping it simpler:

- Single Node app with static HTML frontend and API routes
- Deploy to Render first
`);
console.log("Phase 27 audit and deployment manifests updated.");
