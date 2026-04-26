# Playwright Debugger Skill

Automate browser interactions, test web pages, and debug frontends using `playwright-cli`.

## Usage

Use this skill when you need to verify UI behavior, check navigation links, or debug frontend rendering issues.

### Core Commands

```bash
# Open a page (Use port 8091 for debugging)
playwright-cli open http://localhost:8091

# Take a snapshot to get element references (e1, e2, etc.)
playwright-cli snapshot

# Click an element by reference
playwright-cli click e5

# Fill a form field
playwright-cli fill e3 "content"

# Check the current URL
playwright-cli eval "window.location.pathname"

# Close the browser
playwright-cli close
```

### Verification Flow

1.  **Check Port 8091**: Before starting the server, check if port 8091 is already in use (e.g., `lsof -i :8091`).
2.  **Start the server (if needed)**: If the port is NOT in use, start the application on port 8091 (e.g., `deno task dev --port 8091` in background). If the port IS in use, assume the server is already running and skip this step.
3.  **Open browser**: `playwright-cli open http://localhost:8091/<path>`.
4.  **Inspect state**: Use `playwright-cli snapshot` to identify elements.
5.  **Interact**: Perform clicks, typing, or navigation.
6.  **Assert**: Evaluate expressions or check the snapshot to verify results.
7.  **Cleanup**: `playwright-cli close`. If you started the server in step 2, stop it.
