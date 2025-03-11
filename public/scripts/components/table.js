import * as utils from "../utils.js";

const callsignTable = document.getElementById("callsign-table-body");

export function isScrolling() {
  return (
    window.innerHeight + window.scrollY < document.documentElement.scrollHeight
  );
}

function appendQSO(QSO) {
  const row = utils.createRowFrom(QSO);
  callsignTable.appendChild(row);
}

export function appendEachQSO(data) {
  data.forEach((QSO) => {
    appendQSO(QSO);
  });
}

export const getLatestId = () =>
  callsignTable.lastChild ? callsignTable.lastChild.id : NaN;
