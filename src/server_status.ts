export const startTime = Date.now();

export interface ClientSession {
  id: string;
  operator: string;
  agent: string;
  lastSeen: number;
  path?: string;
}

const activeClients = new Map<string, ClientSession>();

export function recordActivity(id: string, metadata: Omit<ClientSession, "id" | "lastSeen">) {
  activeClients.set(id, {
    id,
    ...metadata,
    lastSeen: Date.now(),
  });
}

export function getActiveClients(): ClientSession[] {
  const now = Date.now();
  const threshold = 30 * 1000; // 30 seconds
  const sessions: ClientSession[] = [];
  for (const session of activeClients.values()) {
    if (now - session.lastSeen < threshold) {
      sessions.push(session);
    }
  }
  return sessions;
}

export function getActiveClientCount() {
  return getActiveClients().length;
}
