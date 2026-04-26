export interface DXCCEntity {
  name: string;
  countryCode: string;
  flag: string;
  prefixRegex: string;
  deleted: boolean;
}

let dxccData: DXCCEntity[] = [];

async function loadDXCC() {
  if (dxccData.length > 0) return;
  try {
    const text = await Deno.readTextFile("./settings/dxcc.json");
    const json = JSON.parse(text);
    dxccData = json.dxcc.filter((e: any) => !e.deleted);
  } catch (err) {
    console.error("Failed to load DXCC data:", err);
  }
}

export async function lookupCountry(callsign: string): Promise<DXCCEntity | null> {
  await loadDXCC();
  const upperCall = callsign.toUpperCase();
  
  // Sort by regex length descending to match most specific patterns first if possible
  // Though dxcc-json regexes are usually precise enough.
  
  for (const entity of dxccData) {
    if (entity.prefixRegex) {
      try {
        const regex = new RegExp(entity.prefixRegex);
        if (regex.test(upperCall)) {
          return entity;
        }
      } catch {
        // Ignore invalid regexes
      }
    }
  }
  return null;
}
