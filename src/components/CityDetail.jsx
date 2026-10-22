import { useEffect, useState } from 'react'
import { fetchForecast } from '../api/weather'
import { describe } from '../utils/wmo'
import { ErrorMessage, Loading } from './StatusMessage'

function DayRow({ date, code, max, min, rain, wind }) {
  const info = describe(code)
  const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
  return (
    <li className="grid grid-cols-[5.5rem_2rem_1fr] items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200 sm:grid-cols-[7rem_2rem_1fr_6rem_6rem]">
      <span className="text-sm font-medium text-slate-700">{day}</span>
      <span className="text-2xl">{info.icon}</span>
      <span className="text-sm text-slate-600">{info.label}</span>
      <span className="text-sm font-semibold text-sky-700">{Math.round(max)}° / {Math.round(min)}°</span>
      <span className="hidden text-xs text-slate-500 sm:block">💧 {rain} mm · 💨 {Math.round(wind)}</span>
    </li>
  )
}

export default function CityDetail({ city, onBack }) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', data: null, error: null })
    fetchForecast(city, controller.signal)
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ status: 'error', data: null, error: err.message })
      })
    return () => controller.abort()
  }, [city, attempt])

  const { status, data, error } = state
  const now = data?.current
  const info = now && describe(now.weather_code)

  return (
    <section className="space-y-4">
      <button onClick={onBack} className="text-sm text-sky-700 hover:underline">← Back to list</button>
      <h2 className="text-2xl font-bold text-slate-800">{city.name}, {city.country}</h2>

      {status === 'loading' && <Loading text="Loading forecast…" />}
      {status === 'error' && <ErrorMessage message={error} onRetry={() => setAttempt((a) => a + 1)} />}
      {status === 'success' && (
        <>
          <div className="flex flex-wrap items-center gap-6 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-6 text-white">
            <span className="text-6xl">{info.icon}</span>
            <div>
              <p className="text-5xl font-bold">{Math.round(now.temperature_2m)}°C</p>
              <p>{info.label} · feels like {Math.round(now.apparent_temperature)}°</p>
            </div>
            <p className="text-sm opacity-90">💧 {now.relative_humidity_2m}% · 💨 {now.wind_speed_10m} km/h</p>
          </div>
          <ul className="space-y-2">
            {data.daily.time.map((date, i) => (
              <DayRow
                key={date}
                date={date}
                code={data.daily.weather_code[i]}
                max={data.daily.temperature_2m_max[i]}
                min={data.daily.temperature_2m_min[i]}
                rain={data.daily.precipitation_sum[i]}
                wind={data.daily.wind_speed_10m_max[i]}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
