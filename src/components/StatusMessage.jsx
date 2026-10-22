export function Loading({ text = 'Loading weather…' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-16 text-sky-700">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
      <p>{text}</p>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto my-8 max-w-md rounded-xl border border-red-200 bg-red-50 p-5 text-center">
      <p className="font-semibold text-red-700">Something went wrong</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ onReset }) {
  return (
    <div className="py-16 text-center text-slate-500">
      <p className="text-4xl">🔍</p>
      <p className="mt-2 font-medium">No cities match your filters</p>
      <button onClick={onReset} className="mt-3 rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700">
        Reset filters
      </button>
    </div>
  )
}
