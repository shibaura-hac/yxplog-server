import { useState } from "preact/hooks";

export default function ImportCSV() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImport = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    setLoading(true);
    setMessage("Importing...");

    const file = input.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.status) {
        setMessage(data.message);
        setTimeout(() => location.reload(), 2000);
      } else {
        setMessage("Import failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error during import");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="btn btn-outline btn-primary w-full md:w-auto">
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Import CSV Log"
        )}
        <input 
          type="file" 
          className="hidden" 
          accept=".csv" 
          onChange={handleImport} 
          disabled={loading}
        />
      </label>
      {message && <p className="text-xs font-bold opacity-70 animate-pulse">{message}</p>}
    </div>
  );
}
