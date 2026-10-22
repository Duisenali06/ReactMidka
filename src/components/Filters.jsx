import { CONTINENTS } from '../data/cities'
import { GROUPS } from '../utils/wmo'

const field = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none'

export const SORTS = {
  'name-asc': 'Name A→Z',
  'temp-desc': 'Hottest first',
  'temp-asc': 'Coldest first',
  'wind-desc': 'Windiest first',
  'humidity-desc': 'Most humid first',
}

export default function Filters({ filters, onChange, onReset, total }) {
  const set = (key) => (e) => onChange({ [key]: e.target.value })
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-5">
      <input
        type="search"
        value={filters.query}
        onChange={set('query')}
        placeholder="Search city or country…"
        className={`${field} lg:col-span-2`}
      />
      <select value={filters.continent} onChange={set('continent')} className={field}>
        <option value="">All continents</option>
        {CONTINENTS.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select value={filters.group} onChange={set('group')} className={field}>
        <option value="">Any weather</option>
        {GROUPS.map((g) => <option key={g}>{g}</option>)}
      </select>
      <select value={filters.sort} onChange={set('sort')} className={field}>
        {Object.entries(SORTS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <div className="flex items-center justify-between text-sm text-slate-500 sm:col-span-2 lg:col-span-5">
        <span>{total} cities found</span>
        <button onClick={onReset} className="text-sky-700 hover:underline">Reset filters</button>
      </div>
    </div>
  )
}
