export function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

export function formatTaskDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en', options)
}

export function getWeekDates() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index - 2)
    return date
  })
}
