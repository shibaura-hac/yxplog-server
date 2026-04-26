# Agent Instructions

## Frontend Verification Mandate

Agents MUST always verify that the frontend works correctly after any changes to UI components, routes, or styling. 

To fulfill this mandate:
- Use the **`playwright-debugger`** skill or the `playwright-cli` tool directly.
- Verify that pages render correctly and that navigation links (e.g., Logo, Settings, Contests) work as expected.
- For interactive features like QSO registration or contest creation, simulate user input and verify state updates via snapshots or console logs.
