import { useEffect, useMemo, useState } from 'react'
import { SEED_CITIES } from './data/cities'
import { useCurrentWeather } from './hooks/useCurrentWeather'
import Dashboard from './components/Dashboard'
import CityDetail from './components/CityDetail'
import AddCityForm from './components/AddCityForm'

const STORAGE_KEY = 'weather-app:custom-cities'

function loadCustom() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export default function App() {
  const [custom, setCustom] = useState(loadCustom)
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const cities = useMemo(() => [...custom, ...SEED_CITIES], [custom])
  const weather = useCurrentWeather(cities)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom))
  }, [custom])

  const addCity = (city) => {
    setCustom((list) => [city, ...list])
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-100">
      <header className="bg-sky-700 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">🌤️ Weather App</h1>
          {!selected && (
            <button onClick={() => setShowForm((v) => !v)} className="rounded-lg bg-white/15 px-3 py-2 text-sm hover:bg-white/25">
              {showForm ? 'Close form' : '+ Add city'}
            </button>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        {selected ? (
          <CityDetail key={selected.id} city={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            {showForm && <AddCityForm onAdd={addCity} onCancel={() => setShowForm(false)} />}
            <Dashboard cities={cities} weather={weather} onSelect={setSelected} />
          </>
        )}
      </main>
      <footer className="py-6 text-center text-xs text-slate-500">
        Data: <a className="underline" href="https://open-meteo.com/">Open-Meteo</a>
      </footer>
    </div>
  )
}
