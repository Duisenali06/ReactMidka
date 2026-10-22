# Weather App

React SPA (Vite + Tailwind CSS) showing current weather for 100+ cities and a 7-day forecast.
Data source: [Open-Meteo](https://open-meteo.com/) public API (no key required).

**Live demo:** _add your deployed link here_

## Features
- List of 100+ cities with current temperature, humidity, wind
- Detail view with 7-day forecast
- Controlled form to add a custom city (saved in `localStorage`)
- Search, filter (continent, weather type), sort (name / temperature / wind / humidity), pagination
- Loading, error (with retry), empty and success states
- `useEffect` with `AbortController` cleanup (no stale/race updates)

## Structure
```
src/
  api/weather.js          Open-Meteo requests
  data/cities.js          seed cities (100+)
  hooks/useCurrentWeather custom hook (fetch + cleanup)
  components/             Dashboard, Filters, CityCard, Pagination,
                          CityDetail, AddCityForm, StatusMessage
  utils/wmo.js            weather code -> label/icon/group
```

## Run
```
npm install
npm run dev
npm run build
```

## Deploy (Vercel / Netlify)
Import the GitHub repo, build command `npm run build`, output directory `dist`.
