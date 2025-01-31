// get some elements to use later
const callsignTable = document.getElementById("callsign-table-body");
const server_url = window.location.origin;
const qso_form = document.getElementById("qso_form");

// fetch server data on load
syncWithServer();

// sync with the server every 5 seconds
setInterval(syncWithServer, 5000);

qso_form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission

  // register the data
  const values = getDataFromForm();
  const result = await registerQSO(values);

  // sync with server on registration
  // need to consider the flow: sync -> register -> reflect
  syncWithServer();
  resetForm();
});

function resetForm() {
  const victims = [1, 4, 5, 6];

  for (const victim of victims) {
    document.querySelector(`div.control:nth-child(${victim}) > input`).value = "";
  }

  qso_form.querySelector("input[name=call]").focus();
}

// connection error indicator
function showConnectionError(status) {
  const display = status ? "inline" : "none";
  document.querySelector("#connection-error").style.display = display;
}

function getDataFromForm() {
  const values = {};
  const inputs = qso_form.querySelectorAll(
    "input[name], select[name], textarea[name]",
  );
  inputs.forEach((input) => {
    values[input.name] = input.value;
  });

  return values;
}

function appendQSO(QSO) {
  const row = createRowFrom(QSO);
  callsignTable.appendChild(row);
}

//function _post_data(url, data) {
//  return new Promise(async (resolve, reject) => {
//    try {
//      const response = await fetch(url, {
//        body: JSON.stringify(data),
//        method: "POST",
//      });
//
//      if (!response.ok) {
//        reject(response.status);
//      }
//
//      const json = response.json();
//      resolve(json);
//    } catch (error) {
//      reject(error);
//    }
//  });
//}

async function _post_data(url, data) {
    try {
        const response = await fetch(url, {
          body: JSON.stringify(data),
          method: "POST",
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Fetch error:', error.message);
        // TODO: add error process
    }
}

async function fetchServerData(since = NaN) {
  const url = `${server_url}/get`;

  let data = {};

  // with no id specified, the server will return 20 latest QSOs.
  if (since) {
    data = { id: since };
  }

  return await _post_data(url, data);
}

function appendEachQSO(data) {
  data.forEach((QSO) => {
    appendQSO(QSO);
  });
}

async function registerQSO(QSO) {
  /*
  {
	"band": 3.5,
	"mode": "FM",
	"call": "JA1YXP",
	"rrst": "59",
	"srst": "59",
	"memo": "memo"
  }
  */
  const url = `${server_url}/register`;
  return await _post_data(url, QSO);
}

function syncWithServer() {
  console.log("syncing with server...");
  // TODO: come up with a better way to get the latest synced id

  const latest_id = callsignTable.lastChild ? callsignTable.lastChild.id : NaN;

  fetchServerData(latest_id)
    .then((data) => {
      appendEachQSO(data);

      showConnectionError(false);
    })
    .catch((error) => {
      showConnectionError(true);
      console.log(error);
    });
}

function onRowClick(event) {
  qso_form.querySelector("input:nth-child(1)").value =
    event.target.childNodes.length;
}

function idToLocalTime(id) {
  const date = new Date(id);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time;
}

function createRowFrom(QSO) {
  const { id, call, band, mode, rrst, srst, memo } = QSO;
  //id considerd as a time grant by server

  const row = document.createElement("tr");
  const time = idToLocalTime(id);

  row.id = id;

  row.addEventListener("click", onRowClick);

  row.innerHTML = `
    <td>${time}</td>
    <td>${call}</td>
    <td>${band}</td>
    <td>${mode}</td>
    <td>${rrst}</td>
    <td>${srst}</td>
    <td>${memo}</td>
  `;

  return row;
}
