import { useEffect, useState } from 'react'
import { fetchCurrent } from '../api/weather'

export function useCurrentWeather(cities) {
  const [state, setState] = useState({ status: 'loading', data: {}, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState((s) => ({ ...s, status: 'loading', error: null }))

    fetchCurrent(cities, controller.signal)
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return // stale request – ignore
        setState((s) => ({ ...s, status: 'error', error: err.message }))
      })

    return () => controller.abort() // cleanup: cancel outdated request
  }, [cities, attempt])

  return { ...state, retry: () => setAttempt((a) => a + 1) }
}
