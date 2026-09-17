---
title: DragonCandy Financial Model — Finance Drive Workbook
type: concept
created: 2026-09-17
updated: 2026-09-17
sources: [2026-09-17-financial-model-reference.md]
tags: [finance, financial-model, spreadsheet, google-drive, budget, forecast, internal]
---
# DragonCandy Financial Model — Finance Drive Workbook

[Open the live Financial Model spreadsheet](https://docs.google.com/spreadsheets/d/1jYcmDZtQEX1EJkVY0dggXFowHN4BRcuY/edit).

The workbook is **DragonCandy — Financial Model.xlsm**, in **DragonCandy — Confidential →
11 · Finance** on Google Drive. [Open the Finance folder](https://drive.google.com/drive/folders/1d0yb3VvRPVBF28s1UBHPfrubwkaOsRvM).
It models 2026–2029. Edit assumptions in the live workbook; this page is a reference and
audit record, not a live copy of its values. Google Drive controls access to the spreadsheet.

## Workbook tabs and dependencies

| Tab | Purpose |
| --- | --- |
| Summary | Consolidated forecast; reads revenue, marketing and operating costs from dependent tabs. |
| Assumptions | Customer/volume assumptions and optional subscription and combined paid-fee overrides. Blank overrides use Pricing Architecture; zero is an explicit override. |
| P&L | Revenue and processing-cost calculations, plus paid-plan and rush-delivery mix checks. |
| Marketing | Marketing budgets feeding the consolidated expense totals. |
| Costs and Funding | Salaries, headcount, hiring months and vendor budgets feeding operating expenses; also historical funding references. |
| Pricing Architecture | Annual pricing inputs, paid/trial fees, subscription mix, payment cadence and rush-delivery mix. |
| Sources | Provenance and dated scenario notes. |

## Calculation audit — 2026-09-17

All seven tabs were audited. The final workbook's 1,367 formulas were independently
recalculated with no formula errors or differences from its saved numeric results.
Twelve input-change scenarios passed in an independent copy, checking pricing, campaign
volume, payroll, hiring months, vendor budgets, marketing and mix validation.

The audit corrected fixed processing fees on free subscriptions, invalid mix checks that
previously always balanced, and stale instructions. Pricing and staffing explanations now
follow their inputs. Baseline forecast totals did not change. The original XLSM file was
updated in place and its saved Drive content was verified; its formatting was preserved.

These checks establish calculation consistency under the existing assumptions. They do
not validate the commercial forecast or fill unpriced costs. Subsequent workbook edits
require a fresh check; this page does not automatically recalculate or refresh.

## Assumptions that remain explicit

- Average paying accounts and year-end account counts are separate inputs; the workbook
  does not derive average accounts from a monthly customer ramp.
- CEO pay, employer overhead and some Malta costs remain unpriced or excluded where
  documented in the workbook. A blank employer-overhead rate is not evidence of zero cost.
- The $1,462,568 raise reference is historical, not a recalculated cash/runway requirement.
- Influencer spending is an allocation within core marketing, not another expense to add.

## Relationship to the repo-generated model

[[Bottom-Up Financial Model]] documents the separate Census/metro model in
`src/pitch/model/` and its generated investor workbook. Its horizon, customer ramp,
assumptions and funding figures differ from this Finance Drive workbook. Adding this
reference does not reconcile or replace that model, the investor deck, or the repo's
three-year targets. Identify the model and its date when quoting figures; use the live
Drive workbook for the figures belonging to this reference.

## See Also

- [[Bottom-Up Financial Model]]
- [[Investor Pitch Deck & Capital Raise]]
- [[Finance Drive Financial Model Reference Session]]
