import { useState, useEffect } from "preact/hooks";
import { QSO } from "./LogApp.tsx";

interface StationModalProps {
  callsign: string;
  onClose: () => void;
}

interface StationInfo {
  name: string;
  code: string;
  flag: string;
}

export default function StationModal({ callsign, onClose }: StationModalProps) {
  const [info, setInfo] = useState<StationInfo | null>(null);
  const [history, setHistory] = useState<QSO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch country info
        const countryRes = await fetch(`/api/country?callsign=${callsign}`);
        const countryData = await countryRes.json();
        if (countryData.status) {
          setInfo({
            name: countryData.name,
            code: countryData.code,
            flag: countryData.flag,
          });
        }

        // Fetch contact history
        const historyRes = await fetch("/api/search", {
          method: "POST",
          body: JSON.stringify({ call: callsign }),
        });
        const historyData = await historyRes.json();
        if (historyData.status) {
          setHistory(historyData.logs);
        }
      } catch (err) {
        console.error("Failed to fetch station info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [callsign]);

  return (
    <div className="modal modal-open z-[100]">
      <div className="modal-box max-w-2xl border border-base-300 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{info?.flag ?? "🏳️"}</div>
            <div>
              <h3 className="font-black text-3xl tracking-tighter text-primary">{callsign}</h3>
              <p className="text-sm font-bold opacity-60 uppercase">{info?.name ?? "Unknown Country"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a 
              href={`https://www.qrz.com/db/${callsign}`} 
              target="_blank" 
              className="btn btn-sm btn-outline gap-1"
            >
              <span>QRZ.com</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-base-200 p-4 rounded-xl">
              <h4 className="text-xs font-black uppercase opacity-40 mb-3">Contact History</h4>
              <div className="overflow-x-auto">
                <table className="table table-xs table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Band</th>
                      <th>Mode</th>
                      <th>RST (R/S)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((log) => (
                      <tr key={log.id}>
                        <td className="whitespace-nowrap">{new Date(log.id).toLocaleDateString()}</td>
                        <td><span className="badge badge-outline badge-xs">{log.band}</span></td>
                        <td><span className="badge badge-ghost badge-xs">{log.mode}</span></td>
                        <td className="font-mono">{log.rrst}/{log.srst}</td>
                      </tr>
                    ))}
                    {history.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-4 opacity-50 italic">No previous contacts found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-action">
              <button className="btn btn-primary" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
      <div className="modal-backdrop bg-black/60" onClick={onClose}></div>
    </div>
  );
}
