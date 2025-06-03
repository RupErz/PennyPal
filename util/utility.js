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