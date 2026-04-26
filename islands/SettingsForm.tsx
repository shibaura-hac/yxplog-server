import { useState, useEffect } from "preact/hooks";
import { loadSettings, saveSettings, AppSettings } from "../src/settings_store.ts";
import ImportCSV from "./ImportCSV.tsx";

export default function SettingsForm() {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleChange = (key: keyof AppSettings, value: string | number | boolean) => {
    if (!settings) return;
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  if (!settings) return <div className="loading loading-dots loading-lg"></div>;

  return (
    <div className="flex flex-col gap-8">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">General Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold uppercase opacity-60">Normal Mode Default RST</span>
              </label>
              <input 
                type="text" 
                className="input input-bordered w-full" 
                value={settings.defaultRstNormal}
                onInput={(e) => handleChange("defaultRstNormal", (e.target as HTMLInputElement).value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold uppercase opacity-60">Contest Mode Default RST</span>
              </label>
              <input 
                type="text" 
                className="input input-bordered w-full font-bold text-primary" 
                value={settings.defaultRstContest}
                onInput={(e) => handleChange("defaultRstContest", (e.target as HTMLInputElement).value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold uppercase opacity-60">Polling Interval (ms)</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full" 
                value={settings.pollingInterval}
                onInput={(e) => handleChange("pollingInterval", parseInt((e.target as HTMLInputElement).value) || 5000)}
              />
            </div>
          </div>

          <div className="divider opacity-50">Data Import</div>
          <div className="flex flex-col gap-2">
            <p className="text-sm opacity-70">Import external logs from CSV format (zLog compatible).</p>
            <ImportCSV />
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-error font-bold mb-4">Danger Zone</h2>
          <p className="text-sm opacity-70 mb-4">These actions are permanent and cannot be undone.</p>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-outline btn-error" onClick={() => {
                if(confirm("Clear settings?")) {
                    localStorage.removeItem("yxplog_settings");
                    location.reload();
                }
            }}>Reset All Settings</button>
            <button className="btn btn-outline btn-error">Clear Local QSO Cache</button>
          </div>
        </div>
      </div>
    </div>
  );
}
