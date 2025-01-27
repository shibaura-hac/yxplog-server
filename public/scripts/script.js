let callsignTable = document.getElementById("callsign-table-body");

const server_url = window.location.origin;
const qso_form = document.getElementById("qso_form");

async function _get(id = NaN) {
  const url = `${server_url}/get`;

  let data = {};
  if (id) {
    data = { id: id };
  }

  try {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      method: "POST",
    });
    if (!response.ok) {
      new Error(`Response status: ${response.status}`);
    }

    const json = response.json();

    return json;
  } catch (error) {
    new Error(error);
  }
}

async function fetchLatestData() {
  return _get();
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
  try {
    const response = await fetch(url, {
      body: JSON.stringify(QSO),
      method: "POST",
    });
    if (!response.ok) {
      new Error(`Response status: ${response.status}`);
    }

    const json = response.json();

    return json;
  } catch (error) {
    new Error(error);
  }
}

qso_form.addEventListener("submit", (event) => {
  // weird little hack ChatGPT told me

  event.preventDefault(); // Prevent form submission
  const inputs = qso_form.querySelectorAll(
    "input[name], select[name], textarea[name]",
  );
  const values = {};

  inputs.forEach((input) => {
    values[input.name] = input.value;
  });

  let result = registerQSO(values);

  result.then((data) => {
    appendQSO(data["qso"]);
  });
});

function syncWithServer() {
  console.log("syncing with server...");
  let latest_id = callsignTable.lastElementChild.id;

  _get(latest_id).then((data) => {
    data.forEach((QSO) => {
      appendQSO(QSO);
    });
  });
}

setInterval(syncWithServer, 5000);

function onRowClick(event) {
  qso_form.querySelector("input:nth-child(1)").value =
    event.target.childNodes.length;
}

function createRowFrom(QSO) {
  const { id, call, band, mode, rrst, srst, memo } = QSO;
  //id considerd as a time grant by server

  const row = document.createElement("tr");

  let date = new Date(id);

  //let time = date.toLocaleTimeString([], {
  //  hour: "2-digit",
  //  minute: "2-digit",
  //  hour12: false,
  //});

  row.id = id;

  row.addEventListener("click", onRowClick);

  row.innerHTML = `
    <td>${id}</td>
    <td>${call}</td>
    <td>${band}</td>
    <td>${mode}</td>
    <td>${rrst}</td>
    <td>${srst}</td>
    <td>${memo}</td>
  `;

  return row;
}

function appendQSO(QSO) {
  const row = createRowFrom(QSO);
  callsignTable.appendChild(row);
}

const fetchedData = fetchLatestData();

fetchedData.then((data) => {
  data.forEach((QSO) => {
    appendQSO(QSO);
  });
});
