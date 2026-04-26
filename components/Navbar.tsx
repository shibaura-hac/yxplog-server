interface NavbarProps {
  operator: string;
  onOperatorChange: (val: string) => void;
  isError: boolean;
  isContestMode: boolean;
  onContestModeChange: (val: boolean) => void;
}

export function Navbar({ 
  operator, 
  onOperatorChange, 
  isError, 
  isContestMode, 
  onContestModeChange 
}: NavbarProps) {
  return (
    <div className="fixed top-0 z-50 w-full">
      {isError && (
        <progress
          className="progress progress-error w-full h-1 rounded-none"
          value="100"
          max="100"
        ></progress>
      )}
      <div className="navbar bg-base-100 shadow-lg px-4 border-b border-base-300">
        <div className="flex-1 gap-4">
          <a href="/" className="btn btn-ghost text-xl normal-case">yxplog</a>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold opacity-50 hidden sm:inline">Normal</span>
            <input 
              type="checkbox" 
              className="toggle toggle-primary toggle-sm" 
              checked={isContestMode}
              onChange={(e) => onContestModeChange((e.target as HTMLInputElement).checked)}
            />
            <span className="text-[10px] uppercase font-bold opacity-50 hidden sm:inline">Contest</span>
          </div>

          <div className="hidden lg:flex ml-4 gap-2 border-l border-base-300 pl-4">
            <a href="/settings" className="btn btn-ghost btn-sm uppercase text-xs">settings</a>
            <a href="/contests" className="btn btn-ghost btn-sm uppercase text-xs">contests</a>
            <a href="/status" className="btn btn-ghost btn-sm uppercase text-xs">status</a>
          </div>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="オペレーター名"
              className="input input-bordered input-sm w-32 md:w-48"
              value={operator}
              onInput={(e) => onOperatorChange((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
