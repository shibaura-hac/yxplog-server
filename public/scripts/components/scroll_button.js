import * as utils from "../utils.js";

const scroll_to_latest_button = document.getElementById(
  "scroll-to-latest-button",
);

scroll_to_latest_button.addEventListener("click", () => {
  utils.scrollToBottom();
  hide();
});

utils.onScrollToBottom(() => {
  hide();
});

export function show() {
  scroll_to_latest_button.style.display = "inline-block";
}
export function hide() {
  scroll_to_latest_button.style.display = "none";
}
