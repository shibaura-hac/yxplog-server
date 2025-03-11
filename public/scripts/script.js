import * as api from "./api.js";
import * as form from "./form.js";
import * as table from "./table.js";
import * as utils from "./utils.js";
import { scroll_to_latest_button } from "./const.js";

// get some elements to use later

// fetch server data on load
syncWithServer();

// sync with the server every 5 seconds
setInterval(syncWithServer, 5000);

form.qso_form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission

  // register the data
  const values = form.getData();

  console.log(values);

  if (values != "error") {
    api.registerQSO(values);
    form.reset();
  }

  // sync with server on registration
  // need to consider the flow: sync -> register -> reflect
  syncWithServer();
});

scroll_to_latest_button.addEventListener("click", () => {
  utils.scrollToBottom();
});

// connection error indicator
function showConnectionError(status) {
  const display = status ? "inline" : "none";
  document.querySelector("#connection-error").style.display = display;
}

function syncWithServer() {
  console.log("syncing with server...");
  // TODO: come up with a better way to get the latest synced id

  const scrolling = table.isLastQsoShown();

  const latest_id = table.getLatestId();

  api
    .fetchServerData(latest_id)
    .then((data) => {
      table.appendEachQSO(data);
      if (scrolling) {
        scroll_to_latest_button.style.display = "none";
        utils.scrollToBottom();
      } else {
        scroll_to_latest_button.style.display = "inline-block";
      }

      showConnectionError(false);
    })
    .catch((error) => {
      showConnectionError(true);
      console.log(error);
    });
}
