import { describe } from '../utils/wmo'

export default function CityCard({ city, weather, onSelect }) {
  const info = describe(weather.weather_code)
  return (
    <button
      onClick={() => onSelect(city)}
      className="flex w-full flex-col gap-2 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">{city.name}</h3>
          <p className="text-xs text-slate-500">{city.country}</p>
        </div>
        <span className="text-3xl" aria-hidden>{info.icon}</span>
      </div>
      <p className="text-3xl font-bold text-sky-700">{Math.round(weather.temperature_2m)}°C</p>
      <p className="text-sm text-slate-600">{info.label}</p>
      <p className="text-xs text-slate-500">💧 {weather.relative_humidity_2m}% · 💨 {weather.wind_speed_10m} km/h</p>
    </button>
  )
}
