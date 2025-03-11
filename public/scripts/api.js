const server_url = window.location.origin;

export async function fetchServerData(since = NaN) {
  const url = `${server_url}/get`;

  let data = {};

  // with no id specified, the server will return 20 latest QSOs.
  if (since) {
    data = { id: since };
  }

  return await _post_data(url, data);
}

export async function callLookup(call) {
  let response = await _post_data(`${server_url}/call-lookup`, [call]);

  return response;
}

export async function _post_data(url, data) {
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
    console.error("Fetch error:", error.message);
    // TODO: add error process
  }
}

export async function registerQSO(QSO) {
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
