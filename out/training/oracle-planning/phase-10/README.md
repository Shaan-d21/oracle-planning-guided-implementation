# Phase 10 · Production Planning Build practice pack

This pack supports the ApexPlan production-planning exercise in the `Plan1` BSO input/calculation cube.

The approved production grain is `Product × Entity plant × Month × Scenario × Version`. Sales demand is approved at Product × Market × Channel × Month in Phase 09, then aggregated by Product and Month before production allocation. Pune and Noida are Entity members, not a separate Plant dimension.

The target ending-inventory values in this phase are provisional controlled inputs. Phase 11 owns the detailed inventory-policy design and must trigger a scoped Phase 10 rerun when approved targets change.

1. Reconcile `demand-production-handoff.csv` to the Phase 09 consensus-demand version.
2. Verify Product-to-plant capability, available productive hours, production rates and gross capacity using `plant-capacity-baseline.csv`.
3. Calculate net good-unit requirement, pre-yield starts, lot-rounded planned production, expected good output and projected ending inventory.
4. Allocate planned starts to Pune and Noida in valid lots and reconcile the plant total to the Product total.
5. Calculate required hours and utilization; record and resolve every overload using the exception log.
6. Compare the result to `expected-production-results.csv`, execute positive and negative tests, and retain the runbook and reconciliation evidence.

Use only the authorized ApexPlan training tenant. Confirm Plan1, Forecast/Working, the Product, Month, Entity, Scenario, Version and Currency-neutral unit intersections, security and calculation scope before entering or calculating data.

## Screenshot files

Add sanitized PNG captures to this folder with these exact names. The lesson automatically replaces its reserved slot when the corresponding file exists.

1. `01-production-workspace.png`
2. `02-demand-inventory-handoff-form.png`
3. `03-production-requirement-form.png`
4. `04-plant-capacity-form.png`
5. `05-production-allocation-form.png`
6. `06-capacity-overload-exception.png`
7. `07-production-calculation-job.png`
8. `08-production-reconciliation-form.png`
9. `09-production-summary-dashboard.png`

Hide tenant URLs, user names, client data, notifications and identifiers. Preserve enough navigation, POV, values and status context for a learner to reproduce and validate the step.
