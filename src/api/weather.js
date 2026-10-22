// Single data source: Open-Meteo public API (no API key, CORS enabled).
const BASE = 'https://api.open-meteo.com/v1/forecast'
const CHUNK = 50

async function getJson(params, signal) {
  const res = await fetch(`${BASE}?${new URLSearchParams(params)}`, { signal })
  if (!res.ok) throw new Error(`Weather API error (${res.status})`)
  return res.json()
}

// Current weather for many cities: { [cityId]: { temperature_2m, ... } }
export async function fetchCurrent(cities, signal) {
  const chunks = []
  for (let i = 0; i < cities.length; i += CHUNK) chunks.push(cities.slice(i, i + CHUNK))

  const responses = await Promise.all(
    chunks.map(async (ch) => {
      const data = await getJson(
        {
          latitude: ch.map((c) => c.lat).join(','),
          longitude: ch.map((c) => c.lon).join(','),
          current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
          timezone: 'auto',
        },
        signal
      )
      return Array.isArray(data) ? data : [data]
    })
  )
  const flat = responses.flat()
  return Object.fromEntries(cities.map((c, i) => [c.id, flat[i].current]))
}

// 7-day forecast for one city
export function fetchForecast(city, signal) {
  return getJson(
    {
      latitude: city.lat,
      longitude: city.lon,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
      forecast_days: 7,
      timezone: 'auto',
    },
    signal
  )
}
