export default function MilestoneList({ milestones }) {
  if (milestones.length === 0) {
    return <p className="text-gray-400">No milestones yet. Add your first milestone above.</p>;
  }

  const categoryColor = (cat) => {
    switch (cat) {
      case "Work": return "bg-indigo-600";
      case "Personal": return "bg-emerald-500";
      case "Health": return "bg-pink-500";
      default: return "bg-gray-600";
    }
  };

  return (
    <ol className="relative border-l border-gray-700 ml-3 md:ml-6">
      {milestones.map((m, idx) => (
        <li key={m.id} className="mb-6 md:mb-8 ml-6 md:ml-8 group animate-fadeIn">
          <span className="absolute -left-3 md:-left-4 flex items-center justify-center w-5 md:w-6 h-5 md:h-6 rounded-full bg-transparent border border-gray-700 text-gray-300 text-xs md:text-xs font-medium">{idx + 1}</span>
          <div className="p-3 md:p-4 bg-gray-900/40 border border-gray-800 rounded-md md:rounded-lg transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-100 text-sm md:text-base">{m.title}</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-1">{m.category}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`inline-flex items-center px-2 md:px-3 py-0.5 rounded-full text-xs font-medium ${categoryColor(m.category)} text-white`}>{m.category}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
