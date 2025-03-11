export const connectionErrorIndicator =
  document.querySelector("#connection-error");

function _connectionError(status) {
  const display = status ? "inline" : "none";
  connectionErrorIndicator.style.display = display;
}

export function show() {
  _connectionError(true);
}

export function hide() {
  _connectionError(false);
}
