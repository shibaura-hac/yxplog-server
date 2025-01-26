const _keys_required = [
  "band",
  "mode",
  "call",
  "rrst",
  "srst",
  "pw",
  "memo"
]

export function validate(qso: Record<string, unknown>): Array<string> {
  return _keys_required.filter((key) => !(key in qso));
}

export function generateID(): number {
  const today = new Date();
  return today.getTime();
}
