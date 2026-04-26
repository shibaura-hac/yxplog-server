import { useState, useEffect, useRef } from "preact/hooks";
import { Navbar } from "../components/Navbar.tsx";
import { QsoTable } from "../components/QsoTable.tsx";
import { QsoForm } from "../components/QsoForm.tsx";
import StationModal from "./StationModal.tsx";
import { loadSettings, saveSettings, AppSettings, DEFAULT_SETTINGS } from "../src/settings_store.ts";

export interface QSO {
  id: number;
  call: string;
  band: string;
  mode: string;
  rrst: string;
  srst: string;
  memo: string;
  operator?: string;
}

export default function LogApp() {
  const [logs, setLogs] = useState<QSO[]>([]);
  const [operator, setOperator] = useState("");
  const [isError, setIsError] = useState(false);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedCallsign, setSelectedCallsign] = useState<string | null>(null);

  useEffect(() => {
    const initialSettings = loadSettings();
    setSettings(initialSettings);
    fetchLogs();
  }, []);

  useEffect(() => {
    if (!settings) return;
    const interval = setInterval(() => {
      const latestId = logs.length > 0 ? logs[logs.length - 1].id : undefined;
      fetchLogs(latestId);
    }, settings.pollingInterval);

    const el = document.querySelector(".table-container");
    const handleScroll = () => {
        if (!isScrolling()) {
            setShowScrollButton(false);
        }
    };
    el?.addEventListener("scroll", handleScroll);

    return () => {
        clearInterval(interval);
        el?.removeEventListener("scroll", handleScroll);
    };
  }, [logs.length, settings?.pollingInterval]);

  const fetchLogs = async (since?: number) => {
    try {
      const response = await fetch("/api/get", {
        method: "POST",
        body: JSON.stringify({
            id: since,
            agent: navigator.userAgent,
            operator: operator || "Anonymous"
        }),
      });
      if (!response.ok) throw new Error("Fetch failed");
      const data = await response.json();
      
      if (data.length > 0) {
        setLogs((prev) => {
          const newLogs = [...prev, ...data];
          const uniqueLogs = Array.from(new Map(newLogs.map(item => [item.id, item])).values());
          return uniqueLogs.sort((a, b) => a.id - b.id);
        });
        
        if (isScrolling()) {
          setShowScrollButton(true);
        } else {
          scrollToBottom();
        }
      }
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  const isScrolling = () => {
    const el = document.querySelector(".table-container");
    if (!el) return false;
    return (
      el.scrollTop + el.clientHeight < el.scrollHeight - 30
    );
  };

  const scrollToBottom = () => {
    const el = document.querySelector(".table-container");
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      setShowScrollButton(false);
    }
  };

  const handleContestModeChange = (val: boolean) => {
    if (!settings) return;
    const newSettings = { ...settings, isContestMode: val };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!settings) return;
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const qso = {
      call: (formData.get("call") as string).toUpperCase(),
      band: formData.get("band") as string,
      mode: formData.get("mode") as string,
      rrst: formData.get("rrst") as string,
      srst: formData.get("srst") as string,
      memo: formData.get("memo") as string,
      operator: operator || "Unknown",
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(qso),
      });
      if (response.ok) {
        form.reset();
        (form.querySelector('input[name="call"]') as HTMLInputElement)?.focus();
        fetchLogs(logs.length > 0 ? logs[logs.length - 1].id : undefined);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!settings) return null;

  return (
    <>
      <Navbar 
        operator={operator} 
        onOperatorChange={setOperator} 
        isError={isError} 
        isContestMode={settings.isContestMode}
        onContestModeChange={handleContestModeChange}
      />
      
      <QsoTable 
        logs={logs} 
        isContestMode={settings.isContestMode} 
        onCallsignClick={setSelectedCallsign}
      />
      
      <QsoForm 
        onSubmit={handleSubmit} 
        showScrollButton={showScrollButton} 
        onScrollToBottom={scrollToBottom}
        defaultRst={settings.isContestMode ? settings.defaultRstContest : settings.defaultRstNormal}
      />

      {selectedCallsign && (
        <StationModal 
          callsign={selectedCallsign} 
          onClose={() => setSelectedCallsign(null)} 
        />
      )}
    </>
  );
}
