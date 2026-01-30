export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p role="alert" className="text-red-200 bg-red-900/50 p-2 sm:p-3 rounded-lg mb-4 border-l-4 border-red-500/60 text-sm sm:text-base">
      {message}
    </p>
  );
}
