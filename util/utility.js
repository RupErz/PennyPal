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

// ✅ CORRECTED: Convert Date object to YYYY-MM-DD string (timezone-safe)
export function getFormattedDate(date) {
    if (!date) return "";

    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) return "";

    // ✅ Uses local time (avoids timezone issues)
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// ✅ CORRECTED: Format date for display (Display as Month Day : June 14)
export const formatDate = (date) => {
    if (!date) return "";
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) return "Invalid Date";
    
    return dateObj.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric' 
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