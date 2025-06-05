export const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '0.00'
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

// Get user current date
export const getCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) // "June 2, 2025"
}

// Convert date object into a proper format
export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}