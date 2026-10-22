import { useState } from 'react'
import { CONTINENTS } from '../data/cities'

const EMPTY = { name: '', country: '', continent: CONTINENTS[0], lat: '', lon: '' }
const input = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none'

export default function AddCityForm({ onAdd, onCancel }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const lat = Number(form.lat)
    const lon = Number(form.lon)
    if (!form.name.trim() || !form.country.trim()) return setError('Name and country are required.')
    if (form.lat === '' || form.lon === '' || Number.isNaN(lat) || Number.isNaN(lon)) return setError('Coordinates must be numbers.')
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return setError('Latitude: −90…90, longitude: −180…180.')
    onAdd({
      id: `custom-${Date.now()}`,
      name: form.name.trim(),
      country: form.country.trim(),
      continent: form.continent,
      lat,
      lon,
    })
    setForm(EMPTY)
    setError('')
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-sky-200 sm:grid-cols-2 lg:grid-cols-5">
      <input name="name" value={form.name} onChange={handle} placeholder="City" className={input} />
      <input name="country" value={form.country} onChange={handle} placeholder="Country" className={input} />
      <select name="continent" value={form.continent} onChange={handle} className={input}>
        {CONTINENTS.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input name="lat" value={form.lat} onChange={handle} placeholder="Latitude (e.g. 43.24)" className={input} />
      <input name="lon" value={form.lon} onChange={handle} placeholder="Longitude (e.g. 76.89)" className={input} />
      {error && <p role="alert" className="text-sm text-red-600 sm:col-span-2 lg:col-span-5">{error}</p>}
      <div className="flex gap-2 sm:col-span-2 lg:col-span-5">
        <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700">Add city</button>
        <button type="button" onClick={() => { setForm(EMPTY); setError('') }} className="rounded-lg px-4 py-2 text-sm ring-1 ring-slate-300">Clear</button>
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-slate-500">Close</button>
      </div>
    </form>
  )
}
