# Product Deployment Decision — Phase 29

## Selected first deploy target

SmartCart Chef Planner.

## Target repo

smartcart-chef-planner

## Why SmartCart

SmartCart is the best first product to turn into a real web app because:

- Low risk.
- Clear consumer utility.
- Simple demo.
- Pantry input to meal plan output is easy to understand.
- Shopping list output is useful immediately.
- No regulated decisioning.
- No image-generation risk.
- No behavioral-memory privacy risk.
- Can support free tier and paid upgrade later.

## Recommended next phase

Phase 30: SmartCart Web App Shell.

## Phase 30 build target

Either:

1. Upgrade existing repo:
   smartcart-chef-planner

Or:

2. Create separate frontend repo:
   smartcart-chef-planner-web

Recommended for speed:

Use existing repo and add a static frontend served by the same Node API.

## Phase 30 requirements

- Add public/index.html.
- Add public/app.js.
- Add public/styles.css.
- Serve static frontend from src/server.mjs.
- Keep API routes:
  - GET /health
  - GET /v1/sample
  - POST /v1/plan
  - POST /v1/score
  - POST /v1/shopping-list
- Add browser UI:
  - pantry editor
  - preference form
  - generate meal plan button
  - meal cards
  - shopping list
- Keep npm run check passing.
- Add API smoke test.
- Push private.
- Deploy only after local UI test passes.

## Deployment target

First deploy target should be Render because the current MVP is a Node server.

Alternative later:
- Vercel frontend
- Render/Railway/Fly API

## Current limitation

No production deployment is confirmed.
This is a local product deployment decision only.
