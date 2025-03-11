import { required_fields } from "../const.js";

export const qso_form = document.getElementById("qso_form");

export function getData() {
  const values = {};
  const inputs = qso_form.querySelectorAll(
    "input[name], select[name], textarea[name]",
  );

  for (const input of inputs) {
    if (input.value == "" && required_fields.includes(input.name)) {
      input.classList.add("is-danger");
      return "error";
    }
    values[input.name] = input.value;
  }

  return values;
}

export function reset() {
  const victim_selectors = [
    'input[name="call"]',
    'input[name="srst"]',
    'input[name="rrst"]',
    'input[name="memo"]',
  ];

  for (const selector of victim_selectors) {
    let victim = document.querySelector(selector);
    victim.value = "";
    victim.classList.remove("is-danger");
  }

  qso_form.querySelector("input[name=call]").focus();
}
