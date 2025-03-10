export function formatDate(isoString: string) : string {
    const date = new Date (isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month:'long',
        day: 'numeric'
    })
    return formatter.format(date)
}

export function formatDateTime(isoString: string) : string {
    const data = new Date (isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month:'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    return formatter.format(data)
} 