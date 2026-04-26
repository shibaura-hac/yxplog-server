import { QSO } from "../islands/LogApp.tsx";

interface QsoTableProps {
  logs: (QSO & { flag?: string })[];
  isContestMode: boolean;
  onCallsignClick: (call: string) => void;
}

export function QsoTable({ logs, isContestMode, onCallsignClick }: QsoTableProps) {
  function idToLocalTime(id: number) {
    const date = new Date(id);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      day: "2-digit",
      month: "2-digit",
    }).replace(",", " ");
  }

  return (
    <div className="table-container">
      <div className="bg-base-100 h-full">
        <table className="table table-zebra table-pin-rows w-full border-collapse" id="callsign_table">
          <thead>
            <tr className="bg-base-200">
              <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">Time</th>
              <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">Callsign</th>
              <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">Band</th>
              <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">Mode</th>
              <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">RST Received</th>
              {isContestMode ? (
                  <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">Operator</th>
              ) : (
                  <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">RST Sent</th>
              )}
              <th className="text-xs uppercase sticky top-0 bg-base-200 z-20">Memo</th>
            </tr>
          </thead>
          <tbody id="callsign-table-body">
            {logs.map((log) => (
              <tr key={log.id} id={log.id.toString()} className="hover">
                <td className="font-mono text-xs whitespace-nowrap">{idToLocalTime(log.id)}</td>
                <td className="font-bold flex items-center gap-2">
                  <span className="text-lg leading-none">{log.flag ?? "🏳️"}</span>
                  <span 
                    className="cursor-pointer hover:text-primary hover:underline transition-all"
                    onClick={() => onCallsignClick(log.call)}
                  >
                    {log.call}
                  </span>
                </td>
                <td><span className="badge badge-outline badge-sm">{log.band}</span></td>
                <td><span className="badge badge-ghost badge-sm">{log.mode}</span></td>
                <td className="font-mono">{log.rrst}</td>
                {isContestMode ? (
                    <td className="text-sm font-medium">{log.operator || "N/A"}</td>
                ) : (
                    <td className="font-mono">{log.srst}</td>
                )}
                <td className="text-sm opacity-70">{log.memo}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 opacity-50">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
