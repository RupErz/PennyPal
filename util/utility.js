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
    if (date && date instanceof Date) {
        return date.toISOString().slice(0, 10);
    }
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

// Format currency
export const formatCurrency2Digits = (amount) => {
    return `$${amount.toFixed(2)}`;
};

// Format percentage
export const formatPercentage = (percentage) => {
    return `${percentage.toFixed(1)}%`;
};

// Format date
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: 'short' 
    });
};

// Get category emoji
export const getCategoryEmoji = (category) => {
    switch(category) {
        case 'must': return '🏠' // or '⚡' or '🔑'
        case 'nice': return '🛍️' // or '🎉' or '✨'
        case 'wasted': return '💸' // or '⚠️' or '🗑️'
        default: return '💰'
    }
}