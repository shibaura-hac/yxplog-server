import { useState, useEffect } from "preact/hooks";
import { Contest, ContestTemplate } from "../src/contest_utils.ts";

export default function ContestManager() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [templates, setTemplates] = useState<ContestTemplate[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContests();
    fetchTemplates();
  }, []);

  const fetchContests = async () => {
    const res = await fetch("/api/contests");
    const data = await res.json();
    setContests(data);
  };

  const fetchTemplates = async () => {
    const res = await fetch("/api/templates");
    const data = await res.json();
    setTemplates(data);
  };

  const handleAddContest = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newContest = {
      name: formData.get("name") as string,
      contest_type: formData.get("contest_type") as string,
      year: parseInt(formData.get("year") as string),
      start: Math.floor(new Date(formData.get("start") as string).getTime() / 1000),
      end: Math.floor(new Date(formData.get("end") as string).getTime() / 1000),
    };

    const res = await fetch("/api/contests", {
      method: "POST",
      body: JSON.stringify(newContest),
    });

    if (res.ok) {
      setShowModal(false);
      fetchContests();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contest?")) {
      const res = await fetch(`/api/contests?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchContests();
      }
    }
  };

  const handleDownload = (start: number, end: number) => {
    window.location.href = `/api/export?start=${start}&end=${end}`;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contests</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add contest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contests.map((c) => (
          <div key={c.id} className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title">{c.name} ({c.year})</h2>
              <p className="text-sm opacity-70">Type: {c.contest_type}</p>
              <p className="text-xs">Start: {new Date(c.start * 1000).toLocaleString()}</p>
              <p className="text-xs">End: {new Date(c.end * 1000).toLocaleString()}</p>
              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => handleDownload(c.start, c.end)}
                >
                  Download
                </button>
                <button className="btn btn-ghost btn-sm">Details</button>
                <button className="btn btn-error btn-sm" onClick={() => handleDelete(c.id!)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {contests.length === 0 && (
          <div className="col-span-full text-center py-10 opacity-50">
            No contests defined.
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add New Contest</h3>
            <form onSubmit={handleAddContest} className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Contest Name</span></label>
                <input type="text" name="name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Type</span></label>
                <select name="contest_type" className="select select-bordered" required>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Year</span></label>
                <input type="number" name="year" className="input input-bordered" defaultValue={new Date().getFullYear()} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Start Time</span></label>
                <input type="datetime-local" name="start" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">End Time</span></label>
                <input type="datetime-local" name="end" className="input input-bordered" required />
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
