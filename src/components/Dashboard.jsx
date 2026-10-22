import { useMemo, useState } from 'react'
import CityCard from './CityCard'
import Filters from './Filters'
import Pagination from './Pagination'
import { EmptyState, ErrorMessage, Loading } from './StatusMessage'
import { describe } from '../utils/wmo'

const PAGE_SIZE = 12
const INITIAL = { query: '', continent: '', group: '', sort: 'name-asc' }

const sorters = {
  'name-asc': (a, b) => a.city.name.localeCompare(b.city.name),
  'temp-desc': (a, b) => b.w.temperature_2m - a.w.temperature_2m,
  'temp-asc': (a, b) => a.w.temperature_2m - b.w.temperature_2m,
  'wind-desc': (a, b) => b.w.wind_speed_10m - a.w.wind_speed_10m,
  'humidity-desc': (a, b) => b.w.relative_humidity_2m - a.w.relative_humidity_2m,
}

export default function Dashboard({ cities, weather, onSelect }) {
  const [filters, setFilters] = useState(INITIAL)
  const [page, setPage] = useState(1)

  const updateFilters = (patch) => {
    setFilters((f) => ({ ...f, ...patch }))
    setPage(1) // new filter -> back to first page
  }
  const reset = () => { setFilters(INITIAL); setPage(1) }

  const visible = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return cities
      .filter((c) => weather.data[c.id])
      .map((city) => ({ city, w: weather.data[city.id] }))
      .filter(({ city, w }) =>
        (!q || city.name.toLowerCase().includes(q) || city.country.toLowerCase().includes(q)) &&
        (!filters.continent || city.continent === filters.continent) &&
        (!filters.group || describe(w.weather_code).group === filters.group)
      )
      .sort(sorters[filters.sort])
  }, [cities, weather.data, filters])

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const pageItems = visible.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <section className="space-y-4">
      <Filters filters={filters} onChange={updateFilters} onReset={reset} total={visible.length} />
      {weather.status === 'loading' && <Loading />}
      {weather.status === 'error' && <ErrorMessage message={weather.error} onRetry={weather.retry} />}
      {weather.status === 'success' && visible.length === 0 && <EmptyState onReset={reset} />}
      {weather.status === 'success' && visible.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map(({ city, w }) => (
              <CityCard key={city.id} city={city} weather={w} onSelect={onSelect} />
            ))}
          </div>
          <Pagination page={current} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </section>
  )
}
