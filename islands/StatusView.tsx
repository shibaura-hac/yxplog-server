import { useState, useEffect } from "preact/hooks";
import StationModal from "./StationModal.tsx";
import SessionModal from "./SessionModal.tsx";
import { ClientSession } from "../src/server_status.ts";

interface StatusData {
  uptime: number;
  activeClients: number;
  activeSessions: ClientSession[];
  totalQSOs: number;
  uniqueCallsigns: number;
  topCallsigns: { call: string; count: number }[];
  topCountries: { name: string; count: number; flag: string }[];
}

export default function StatusView() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [selectedCallsign, setSelectedCallsign] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<ClientSession | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error("Failed to fetch status:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  function formatUptime(seconds: number) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  }

  if (!status) return <div className="loading loading-dots loading-lg text-primary"></div>;

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="stats shadow-lg bg-base-100 border border-base-300">
          <div className="stat">
            <div className="stat-title text-xs uppercase font-black opacity-50">Uptime</div>
            <div className="stat-value text-primary text-2xl tracking-tighter">{formatUptime(status.uptime)}</div>
            <div className="stat-desc text-[10px] font-bold">Since start</div>
          </div>
        </div>

        <div className="stats shadow-lg bg-base-100 border border-base-300">
          <div className="stat">
            <div className="stat-title text-xs uppercase font-black opacity-50">Active Clients</div>
            <div className="stat-value text-secondary text-2xl tracking-tighter">{status.activeClients}</div>
            <div className="stat-desc text-[10px] font-bold">In last 30s</div>
          </div>
        </div>

        <div className="stats shadow-lg bg-base-100 border border-base-300">
          <div className="stat">
            <div className="stat-title text-xs uppercase font-black opacity-50">Total QSOs</div>
            <div className="stat-value text-accent text-2xl tracking-tighter">{status.totalQSOs}</div>
            <div className="stat-desc text-[10px] font-bold">Entries</div>
          </div>
        </div>

        <div className="stats shadow-lg bg-base-100 border border-base-300">
          <div className="stat">
            <div className="stat-title text-xs uppercase font-black opacity-50">Uniques</div>
            <div className="stat-value text-neutral text-2xl tracking-tighter">{status.uniqueCallsigns}</div>
            <div className="stat-desc text-[10px] font-bold">Distinct Calls</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <h2 className="card-title text-sm uppercase font-black opacity-40 mb-2">Top 5 Callsigns</h2>
            <div className="divide-y divide-base-200">
              {status.topCallsigns.map((c, i) => (
                <div key={c.call} className="flex justify-between py-2 items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black opacity-30 w-4">{i + 1}</span>
                    <span 
                      className="font-black text-lg tracking-tighter cursor-pointer hover:text-primary hover:underline transition-all"
                      onClick={() => setSelectedCallsign(c.call)}
                    >
                      {c.call}
                    </span>
                  </div>
                  <span className="badge badge-primary font-bold">{c.count} QSOs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <h2 className="card-title text-sm uppercase font-black opacity-40 mb-2">Top 5 Countries</h2>
            <div className="divide-y divide-base-200">
              {status.topCountries.map((c, i) => (
                <div key={c.name} className="flex justify-between py-2 items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black opacity-30 w-4">{i + 1}</span>
                    <span className="text-2xl">{c.flag}</span>
                    <span className="font-bold text-sm uppercase opacity-70 truncate max-w-[120px] md:max-w-[150px]">{c.name}</span>
                  </div>
                  <span className="badge badge-secondary font-bold">{c.count} QSOs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="card-title text-sm uppercase font-black opacity-40">Active Sessions</h2>
                <span className="badge badge-sm badge-secondary font-bold">{status.activeSessions.length}</span>
            </div>
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
                {status.activeSessions.length > 0 ? (
                    status.activeSessions.map(session => (
                        <div 
                          key={session.id} 
                          className="badge badge-outline badge-md py-4 h-auto justify-start w-full gap-2 cursor-pointer hover:bg-base-200 transition-colors"
                          onClick={() => setSelectedSession(session)}
                        >
                            <span className="w-2 h-2 rounded-full bg-success flex-shrink-0 animate-pulse"></span>
                            <span className="text-[10px] font-bold truncate">{session.operator}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-xs opacity-50 italic">No active sessions in the last 30s.</p>
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedCallsign && (
        <StationModal 
          callsign={selectedCallsign} 
          onClose={() => setSelectedCallsign(null)} 
        />
      )}

      {selectedSession && (
        <SessionModal 
          session={selectedSession} 
          onClose={() => setSelectedSession(null)} 
        />
      )}
    </div>
  );
}
