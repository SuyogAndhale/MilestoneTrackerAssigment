export default function Loader({ overlay = false, size = "medium", message = "Loading…" }) {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-12 h-12",
  };

  const spinnerSize = sizes[size] || sizes.medium;

  const spinner = (
    <svg className={`${spinnerSize} animate-spin text-gray-300`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none"></circle>
      <path className="opacity-85" fill="#60a5fa" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );

  const content = (
    <div className="flex items-center gap-3 text-gray-300">
      {spinner}
      {size !== "small" && <span className="text-gray-300" aria-live="polite">{message}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div role="status" aria-live="polite" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="p-4 sm:p-6 rounded-lg shadow flex items-center gap-4 glass max-w-xs sm:max-w-sm">
          {content}
        </div>
      </div>
    );
  }

  return <div role="status" aria-live="polite">{content}</div>;
}
 