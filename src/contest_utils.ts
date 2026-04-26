import { crypto } from "jsr:@std/crypto";

export interface Contest {
  id?: string;
  name: string;
  contest_type: string;
  year: number;
  start: number;
  end: number;
}

export interface ContestTemplate {
  name: string;
  id: string;
}

const CONTESTS_DIR = "./contests_data";
const TEMPLATES_FILE = "./settings/templates.json";

export async function listContests(): Promise<Contest[]> {
  const contests: Contest[] = [];
  for await (const entry of Deno.readDir(CONTESTS_DIR)) {
    if (entry.isFile && entry.name.endsWith(".json")) {
      const content = await Deno.readTextFile(`${CONTESTS_DIR}/${entry.name}`);
      const contest = JSON.parse(content);
      contest.id = entry.name.replace(".json", "");
      contests.push(contest);
    }
  }
  return contests;
}

export async function createContest(contest: Omit<Contest, "id">): Promise<Contest> {
  const id = crypto.randomUUID();
  const filePath = `${CONTESTS_DIR}/${id}.json`;
  await Deno.writeTextFile(filePath, JSON.stringify(contest, null, 2));
  return { ...contest, id };
}

export async function deleteContest(id: string): Promise<void> {
  await Deno.remove(`${CONTESTS_DIR}/${id}.json`);
}

export async function listTemplates(): Promise<ContestTemplate[]> {
  try {
    const content = await Deno.readTextFile(TEMPLATES_FILE);
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading templates:", err);
    return [];
  }
}
