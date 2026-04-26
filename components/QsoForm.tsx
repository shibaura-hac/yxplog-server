import { useEffect } from "preact/hooks";

interface QsoFormProps {
  onSubmit: (e: Event) => void;
  showScrollButton: boolean;
  onScrollToBottom: () => void;
  defaultRst: string;
}

export function QsoForm({ onSubmit, showScrollButton, onScrollToBottom, defaultRst }: QsoFormProps) {
  useEffect(() => {
    const rrst = document.querySelector('input[name="rrst"]') as HTMLInputElement;
    const srst = document.querySelector('input[name="srst"]') as HTMLInputElement;
    if (rrst && (!rrst.value || rrst.value === "59" || rrst.value === "599")) rrst.value = defaultRst;
    if (srst && (!srst.value || srst.value === "59" || srst.value === "599")) srst.value = defaultRst;
  }, [defaultRst]);

  return (
    <footer className="fixed bottom-0 w-full p-4 bg-base-100 border-t border-base-300 z-40 flex flex-col gap-2 shadow-2xl">
      <div className="relative">
        {showScrollButton && (
          <button
            className="btn btn-primary btn-sm absolute -top-12 left-0 shadow-lg gap-1 animate-bounce"
            onClick={onScrollToBottom}
          >
            <span>↓</span> New QSO!
          </button>
        )}
      </div>

      <form id="qso_form" onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-wrap md:flex-nowrap gap-2 items-end">
          <div className="form-control flex-1 min-w-[120px]">
            <label className="label py-1"><span className="label-text text-[10px] uppercase opacity-60 font-bold">Callsign</span></label>
            <input 
                type="text" 
                name="call" 
                placeholder="JA1YXP" 
                className="input input-bordered input-md uppercase font-bold" 
                required 
            />
          </div>
          
          <div className="form-control w-24">
            <label className="label py-1"><span className="label-text text-[10px] uppercase opacity-60 font-bold">Band</span></label>
            <select name="band" className="select select-bordered select-md">
              {["3.5", "7", "14", "21", "28", "50", "144", "430", "1200", "2400"].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="form-control w-24">
            <label className="label py-1"><span className="label-text text-[10px] uppercase opacity-60 font-bold">Mode</span></label>
            <select name="mode" className="select select-bordered select-md">
              {["SSB", "AM", "FM", "CW", "RTTY"].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="form-control w-20 md:w-24">
            <label className="label py-1"><span className="label-text text-[10px] uppercase opacity-60 font-bold">RST R</span></label>
            <input type="text" name="rrst" placeholder="59" className="input input-bordered input-md font-mono" defaultValue={defaultRst} required />
          </div>

          <div className="form-control w-20 md:w-24">
            <label className="label py-1"><span className="label-text text-[10px] uppercase opacity-60 font-bold">RST S</span></label>
            <input type="text" name="srst" placeholder="59" className="input input-bordered input-md font-mono" defaultValue={defaultRst} required />
          </div>

          <div className="form-control flex-1 min-w-[150px]">
            <label className="label py-1"><span className="label-text text-[10px] uppercase opacity-60 font-bold">Memo</span></label>
            <input name="memo" type="text" placeholder="..." className="input input-bordered input-md" />
          </div>

          <div className="form-control">
            <button type="submit" className="btn btn-primary px-8">
              Submit
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
}
