export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const btn = 'rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-slate-300 hover:bg-sky-50 disabled:opacity-40'
  return (
    <nav className="mt-6 flex items-center justify-center gap-3" aria-label="Pagination">
      <button className={btn} disabled={page === 1} onClick={() => onChange(1)}>«</button>
      <button className={btn} disabled={page === 1} onClick={() => onChange(page - 1)}>Prev</button>
      <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
      <button className={btn} disabled={page === totalPages} onClick={() => onChange(page + 1)}>Next</button>
      <button className={btn} disabled={page === totalPages} onClick={() => onChange(totalPages)}>»</button>
    </nav>
  )
}
