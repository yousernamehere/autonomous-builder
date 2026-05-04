# Notion Notification Templates (start / issue / done)

These are short (<100 chars) templates designed for Notion notifications.

## Start
**Header:** Autonomous Builder
**Body:** Starting: {cycle} {work_item}

## Issue
**Header:** Autonomous Builder — Blocked
**Body:** Blocked: {cycle} {error_short}

## Done
**Header:** Autonomous Builder
**Body:** Done: {cycle} {result_short}

## Variables
- `{cycle}` e.g. "Cycle 12"
- `{work_item}` short name of the queue item
- `{error_short}` one-line failure reason
- `{result_short}` one-line outcome
