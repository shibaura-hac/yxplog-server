let callsignTable = document.getElementById("callsign-table-body");

const server_url = "http://localhost:8090";

async function fetchLatestData() {
  const url = `${server_url}/get`;
  try {
    const response = await fetch(url, {
      body: JSON.stringify({ username: "example" }),
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

function createRowFrom(QSL) {
  const { band, mod, call, rrst, srst, pw, memo, id } = QSL;

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${id}</td>
    <td>${call}</td>
    <td>${band}</td>
    <td>${mod}</td>
    <td>${rrst}</td>
    <td>${srst}</td>
    <td>1</td>
    <td>${memo}</td>
  `;

  return row;
}

const fetchedData = fetchLatestData();

fetchedData.then((data) => {
  data.forEach((QSL) => {
    const row = createRowFrom(QSL);
    callsignTable.appendChild(row);
  });
});
