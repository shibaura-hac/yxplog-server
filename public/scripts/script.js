import * as api from "./api.js";
import * as form from "./components/form.js";
import * as table from "./components/table.js";
import * as utils from "./utils.js";
import * as connectionIndicator from "./components/connectionIndicator.js";
import * as scrollButton from "./components/scroll_button.js";

// fetch server data on load
syncWithServer();

// sync with the server every 5 seconds
setInterval(syncWithServer, 5000);

form.qso_form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission

  // register the data
  const values = form.getData();

  if (values != "error") {
    api.registerQSO(values);
    form.reset();
  }

  // sync with server on registration
  // need to consider the flow: sync -> register -> reflect
  syncWithServer();
});

function syncWithServer() {
  console.log("syncing with server...");
  const scrolling = table.isScrolling();
  const latest_id = table.getLatestId();

  api
    .fetchServerData(latest_id)
    .then((data) => {
      table.appendEachQSO(data);
      if (scrolling) {
        if (data.length > 0) {
          scrollButton.show();
        }
      } else {
        scrollButton.hide();
        utils.scrollToBottom();
      }
      connectionIndicator.hide();
    })
    .catch((error) => {
      connectionIndicator.show();
    });
}
