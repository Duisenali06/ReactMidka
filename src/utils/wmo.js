// WMO weather codes -> label, icon, filter group
export function describe(code) {
  if (code === 0) return { label: 'Clear sky', icon: '☀️', group: 'Clear' }
  if (code <= 2) return { label: 'Partly cloudy', icon: '⛅', group: 'Cloudy' }
  if (code === 3) return { label: 'Overcast', icon: '☁️', group: 'Cloudy' }
  if (code <= 48) return { label: 'Fog', icon: '🌫️', group: 'Cloudy' }
  if (code <= 57) return { label: 'Drizzle', icon: '🌦️', group: 'Rain' }
  if (code <= 67) return { label: 'Rain', icon: '🌧️', group: 'Rain' }
  if (code <= 77) return { label: 'Snow', icon: '❄️', group: 'Snow' }
  if (code <= 82) return { label: 'Rain showers', icon: '🌧️', group: 'Rain' }
  if (code <= 86) return { label: 'Snow showers', icon: '🌨️', group: 'Snow' }
  return { label: 'Thunderstorm', icon: '⛈️', group: 'Storm' }
}

export const GROUPS = ['Clear', 'Cloudy', 'Rain', 'Snow', 'Storm']
