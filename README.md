# autonomous-builder

Two layers live in **this repo**:

1. **Scaffold** — Docs + `/site` static landing MVP (historic content from GitHub history).
2. **Workspace catalogue** — The workstation directory bundles many sibling git repositories maintained under `NeuruhAI/*` plus personal forks (`poag-pathways`). Each child folder retains its **own `.git`**; clone individually or run `git clone` recursively with submodules if you replicate that layout.

---

## Scaffold (original repo)

Execution templates and static MVP live under **`docs/`** and **`site/`**.

- **`docs/execution-plays.md`**, **`docs/landing-mvp-spec.md`**
- **Templates**: `docs/templates/playbook-one-pager.md`, `docs/templates/outreach-log.csv`, `docs/templates/revenue-experiment.csv`
- **Landing config**: tweak `site/config.js` (`headline`, `subhead`, `ctaText`, `formEmbedHtml`, …)

---

## Indexed child repositories (workspace)

| Folder | Origin |
|--------|--------|
| `atomic-node-registry` | https://github.com/NeuruhAI/atomic-node-registry.git |
| `autonomous-governance-core` | https://github.com/NeuruhAI/autonomous-governance-core.git |
| `behavioral-memory-bank` | https://github.com/NeuruhAI/behavioral-memory-bank.git |
| `constraint-engineering-core` | https://github.com/NeuruhAI/constraint-engineering-core.git |
| `contextual-inception-framework` | https://github.com/NeuruhAI/contextual-inception-framework.git |
| `deployment-packager` | https://github.com/NeuruhAI/deployment-packager.git |
| `drift-detector-api` | https://github.com/NeuruhAI/drift-detector-api.git |
| `ether-layer-event-bus` | https://github.com/NeuruhAI/ether-layer-event-bus.git |
| `fishcast-ai` | https://github.com/NeuruhAI/fishcast-ai.git |
| `inference-mesh-router` | https://github.com/NeuruhAI/inference-mesh-router.git |
| `ip-timestamp-bundler` | https://github.com/NeuruhAI/ip-timestamp-bundler.git |
| `ipp-intent-preservation-api` | https://github.com/NeuruhAI/ipp-intent-preservation-api.git |
| `low-risk-product-audit` | https://github.com/NeuruhAI/low-risk-product-audit.git |
| `microsaas-factory-kit` | https://github.com/NeuruhAI/microsaas-factory-kit.git |
| `neuruh-factory-router` | https://github.com/NeuruhAI/neuruh-factory-router.git |
| `neuruh-repo-bootstrapper` | https://github.com/NeuruhAI/neuruh-repo-bootstrapper.git |
| `notion-codepack-deploy-harness` | https://github.com/NeuruhAI/notion-codepack-deploy-harness.git |
| `ocn-hybrid-inference-router` | https://github.com/NeuruhAI/ocn-hybrid-inference-router.git |
| `poag-ai-training-portal` | https://github.com/NeuruhAI/poag-ai-training-portal.git |
| `poag-pathways` | https://github.com/yousernamehere/poag-pathways.git |
| `revenue-launch-router` | https://github.com/NeuruhAI/revenue-launch-router.git |
| `semantic-fuse-api` | https://github.com/NeuruhAI/semantic-fuse-api.git |
| `semantic-platform-audit` | https://github.com/NeuruhAI/semantic-platform-audit.git |
| `smartcart-chef-planner` | https://github.com/NeuruhAI/smartcart-chef-planner.git |
| `token-weighted-image-queue` | https://github.com/NeuruhAI/token-weighted-image-queue.git |

Root-level **`*.mjs`** utilities (`build-phases-24-26`, `phase27-update-audits`, `repair-phase21a`) plus `PRODUCT_DEPLOYMENT_DECISION_PHASE_29.md` batch automation/playbooks tied to POAG rollout phases—run from this directory with Node 18+.

### Contributing inside the workspace tree

Bump child repos independently (`git -C ./child pull && git push`) so NeuruhAI org permissions stay authoritative. Refresh the table whenever ownership or repository names drift.
