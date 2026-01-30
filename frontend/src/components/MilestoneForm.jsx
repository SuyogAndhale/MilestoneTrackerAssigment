import { useState } from "react";

export default function MilestoneForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    setError("");

    try {
      const res = await onSubmit({ title, category });
      setSuccess('Milestone saved');
      setTitle("");
      setCategory("Work");
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err && err.status === 400 && err.details) {
        const msgs = Object.values(err.details).flat().join(' ');
        setError(msgs || err.message || 'Validation failed');
      } else {
        setError(err.message || 'Failed to save milestone');
      }
    }
  }

  return (
    <form className="glass p-4 sm:p-6 rounded-lg shadow-sm border border-white/5 w-full mx-auto" onSubmit={handleSubmit} aria-labelledby="add-milestone-heading">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 id="add-milestone-heading" className="text-base sm:text-lg md:text-xl font-semibold text-white">Add Milestone</h2>
     </div>

      {error && (
        <p role="alert" className="text-red-200 bg-red-900/60 px-3 py-2 rounded mb-3 border-l-2 border-red-500/40">
          {error}
        </p>
      )}

      <label className="sr-only" htmlFor="milestone-title">Milestone title</label>
      <input
        id="milestone-title"
        aria-invalid={!!error}
        disabled={loading}
        className="bg-gray-900/40 text-gray-100 border border-gray-700 rounded px-3 py-2 w-full mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-400 focus:shadow-[0_8px_30px_rgba(99,102,241,0.12)] disabled:opacity-60 disabled:cursor-not-allowed"
        placeholder="add title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setSuccess(''); }}
      />

      <label className="sr-only" htmlFor="milestone-category">Category</label>
      <div className="relative mb-4">
        <select
          id="milestone-category"
          disabled={loading}
          className="appearance-none bg-gray-900/40 text-gray-100 border border-gray-700 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setSuccess(''); }}
        >
          <option>Work</option>
          <option>Personal</option>
          <option>Health</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full py-2 sm:py-3 rounded-lg text-white font-medium disabled:opacity-60 transition flex items-center justify-center gap-2 button-primary"
      >
        {loading && (
          <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        <span>{loading ? "Saving..." : "Add Milestone"}</span>
      </button>
    </form>
  );
}
