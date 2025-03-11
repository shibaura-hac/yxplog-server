import * as utils from "./utils.js";

const callsignTable = document.getElementById("callsign-table-body");

export function isLastQsoShown() {
  const latestQso = callsignTable.lastChild || null;
  const latestQsoOffsetY = latestQso
    ? latestQso.getBoundingClientRect().top
    : 0;
  const clientHeight = document.querySelector("html").clientHeight;
  const footerHeight = Number(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--footer-height")
      .replace("px", ""),
  );
  const tableFrameBottomEdgeOffsetY = clientHeight - footerHeight;
  return latestQso
    ? tableFrameBottomEdgeOffsetY - latestQsoOffsetY > 0
      ? true
      : false
    : true;
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
