import * as utils from "../utils.js";
import * as api from "../api.js";

const callsignTable = document.getElementById("callsign-table-body");

export function isScrolling() {
  return (
    window.innerHeight + window.scrollY <
    document.documentElement.scrollHeight - 30
  );
}

function appendQSO(QSO) {
  let row = utils.createRowFrom(QSO);
  callsignTable.appendChild(row);
  api
    .callLookup(QSO["call"])
    .then((data) => {
      const emoji_span = document.createElement("span");
      console.log(data);

      let result = utils.country2emoji(data[0]);
      emoji_span.textContent = result;

      row.querySelectorAll("td")[1].prepend(emoji_span);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function appendEachQSO(data) {
  data.forEach((QSO) => {
    appendQSO(QSO);
  });
}

export const getLatestId = () =>
  callsignTable.lastChild ? callsignTable.lastChild.id : NaN;
