import { useEffect } from "preact/hooks";
import { ClientSession } from "../src/server_status.ts";

interface SessionModalProps {
  session: ClientSession;
  onClose: () => void;
}

export default function SessionModal({ session, onClose }: SessionModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const browser = session.agent.includes("Firefox") ? "Firefox" : 
                  session.agent.includes("Chrome") ? "Chrome" : 
                  session.agent.includes("Safari") ? "Safari" : "Browser";

  return (
    <div className="modal modal-open z-[110]">
      <div className="modal-box max-w-xl border border-base-300 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-black text-2xl tracking-tighter text-secondary uppercase">{session.operator}</h3>
            <p className="text-xs font-bold opacity-50 uppercase tracking-widest mt-1">Active Session Details</p>
          </div>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-base-200 p-4 rounded-xl">
            <h4 className="text-[10px] font-black uppercase opacity-40 mb-2">Browser Identification</h4>
            <div className="flex items-center gap-3">
                <div className="badge badge-secondary badge-lg font-bold">{browser}</div>
                <div className="text-xs font-mono opacity-70 break-all bg-base-300 p-2 rounded-lg flex-1">
                    {session.agent}
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-200 p-4 rounded-xl">
                <h4 className="text-[10px] font-black uppercase opacity-40 mb-1">Last Activity</h4>
                <p className="font-bold text-sm">{new Date(session.lastSeen).toLocaleTimeString()}</p>
            </div>
            <div className="bg-base-200 p-4 rounded-xl">
                <h4 className="text-[10px] font-black uppercase opacity-40 mb-1">Target Path</h4>
                <p className="font-bold text-sm truncate">{session.path || "/"}</p>
            </div>
          </div>

          <div className="modal-action">
            <button className="btn btn-secondary w-full" onClick={onClose}>Close Details</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60" onClick={onClose}></div>
    </div>
  );
}
