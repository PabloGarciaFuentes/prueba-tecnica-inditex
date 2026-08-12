export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'
    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are 0-indexed
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  } catch {
    return '-'
  }
}
