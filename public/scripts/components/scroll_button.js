import * as utils from "../utils.js";

export const scroll_to_latest_button = document.getElementById(
  "scroll-to-latest-button",
);

scroll_to_latest_button.addEventListener("click", () => {
  utils.scrollToBottom();
  hide();
});

export function show() {
  scroll_to_latest_button.style.display = "inline-block";
}
export function hide() {
  scroll_to_latest_button.style.display = "none";
}
