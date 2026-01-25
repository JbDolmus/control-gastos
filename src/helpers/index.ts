
const localeMap: Record<string, string> = {
    CRC: 'es-CR',
    USD: 'en-US',
    EUR: 'es-ES',
    MXN: 'es-MX'
}

export function formatCurrency(amount: number, currency: string) {
    const locale = localeMap[currency] || 'en-US'

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(amount)
}


export function formatDate(dateStr: string): string {
    const dateObj = new Date(dateStr)

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-Es', options).format(dateObj)
}