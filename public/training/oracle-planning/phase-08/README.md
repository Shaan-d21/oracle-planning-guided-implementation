# Phase 08 data integration practice pack

This pack supports a controlled file-based historical-sales integration exercise.

The CSV files are training source/staging assets. They are not proof that the target tenant contains the listed members. Before loading:

1. Confirm the approved target cube, grain, periods, category, Version, Currency, and writable POV.
2. Verify all target members against the Phase 07 metadata baseline.
3. Record the clean source controls: 8 records and Amount total 800.
4. Configure and preview the file; map dimensions, periods, category, constants, and members.
5. Run Import Source with No Export first. Inspect staged and validated records.
6. Resolve all defects, then export only to the isolated training POV using the approved mode.
7. Reconcile source, staging, validation, export, rejected cells, and Planning retrieval.

Never run the exercise against production or use Replace mode without explicit target-POV approval, rollback evidence, and a controlled change window.

