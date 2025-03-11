function idToLocalTime(id) {
  const date = new Date(id);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time;
}

export function scrollToBottom() {
  // document.querySelector(".table-container").scrollIntoView({
  //     behavior: "smooth",
  //     block: "end", //it sticks out a little...
  //     inline: "nearest"
  //   }
  // );
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function onRowClick(event) {
  // form.qso_form.querySelector("input:nth-child(1)").value =
  //   event.target.childNodes.length;
}

export function createRowFrom(QSO) {
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

export function onScrollToBottom(callback) {
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      callback();
    }
  });
}
