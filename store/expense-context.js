import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext({
    expenses: [],
    isLoading: false,
    addExpense: () => {},
    updateExpense: () => {},
    deleteExpense: () => {},
    getExpensesByMonth: () => {},
    getExpensesByYear: () => {},
    getTotalExpensesByMonth: () => {},
    getTotalExpensesByYear: () => {},
    getAvailableYears: () => {},
    getAvailableMonthsForYear: () => {},
    getExpensesGroupedByMonth: () => {},
    getExpensesByCategory: () => {},
    searchExpenses: () => {},
    clearAllExpenses: () => {},
    // Analytics support function
    getExpensesByPeriod: () => {},
    getSpendingDistribution: () => {},
    getTrendData: () => {},
    getHealthScore: () => {},
    getTopCategories: () => {},
    getSmartInsights: () => {},
    getAnalyticsData: () => {}
})

export const ExpenseContextProvider = ({children}) => {
    const [expenses, setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Load expenses from AsyncStorage on app start 
    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const storedExpenses = await AsyncStorage.getItem("expenses")
                console.log("Load Expenses", storedExpenses)
            
                if (storedExpenses) {
                    const parsedExpenses = JSON.parse(storedExpenses)
                    setExpenses(parsedExpenses)
                }
            } catch (error) {
                console.log("Failed to load expenses: ", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadExpenses()
    }, [])

    // Save expenses to AsyncStorage whenever expenses change
    useEffect(() => {
        // Only save after initial load is complete
        if (!isLoading) {
            const saveExpenses = async () => {
                try {
                    await AsyncStorage.setItem("expenses", JSON.stringify(expenses))
                    // console.log("Expenses saved successfully") //Debug log
                } catch (error) {
                    console.log("Failed to save expenses, ", error)
                }
            }
            saveExpenses()
        }
    }, [expenses, isLoading])

    // Add new expense 
    const addExpense = (expenseData) => {
        const newExpense = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            ...expenseData,
            // Might not need cause we already have date
            // createdAt: new Date().toISOString() // Mark the time created
        }
        setExpenses(prevExpenses => [...prevExpenses, newExpense])
        return newExpense.id
    }

    // Update existing expense 
    const updateExpense = (expenseId, updatedData) => {
        setExpenses((prevExpenses) => (
            prevExpenses.map((expense) => (
                expense.id === expenseId 
                ? {...expense, ...updatedData}
                : expense
            ))
        ))
    }

    // Delete Expense 
    const deleteExpense = (expenseId) => {
        setExpenses((prevExpense) => (
            prevExpense.filter(expense => expense.id !== expenseId)
        ))
    }

    // Utility function helo for Summary table later !!!
    // --------------------------------------------------------
    // Get Expenses for a specific month/year
    const getExpensesByMonth = (year, month) => {
        return expenses
            .filter(expense => {
                const expenseDate = new Date(expense.date)
                return expenseDate.getFullYear() === year && expenseDate.getMonth() === month
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // Get expense for entire year 
    const getExpensesByYear = (year) => {
        return expenses.filter((expense) => {
            const expenseDate = new Date(expense.date)
            return expenseDate.getFullYear() === year
        })
    }

    // Get all available years that have expenses 
    const getAvailableYears = () => {
        const years = expenses.map(expense => new Date(expense.date).getFullYear())
        return [...new Set(years)].sort((a, b) => b - a) // Latest first
    }

    // Get all available months for a specific year
    const getAvailableMonthsForYear = (year) => {
        const months = expenses
            .filter(expense => new Date(expense.date).getFullYear() === year)
            .map(expense => new Date(expense.date).getMonth())
        return [...new Set(months)].sort((a, b) => b - a) // Latest first
    }

    // Get expenses grouped by month for a year
    const getExpensesGroupedByMonth = (year) => {
        const yearExpenses = getExpensesByYear(year)
        const grouped = {}

        yearExpenses.forEach(expense => {
            const month = new Date(expense.date).getMonth()
            const monthName = new Date(expense.date).toLocaleString('default', {month: 'long'})

            if (!grouped[month]) {
                grouped[month] = {
                    monthName,
                    monthIndex: month,
                    expenses: [],
                    total: 0
                }
            }

            grouped[month].expenses.push(expense)
            grouped[month].total += expense.amount
        })

        return Object.values(grouped).sort((a, b) => b.monthIndex - a.monthIndex)
    }

    // Get total expenses for a specific month/year
    const getTotalExpensesByMonth = (year, month) => {
        const monthExpenses = getExpensesByMonth(year, month)
        return monthExpenses.reduce((total, expense) => total + expense.amount, 0 )
    }

    // Get total expenses for entire year
    const getTotalExpensesByYear = (year) => {
        const yearExpenses = getExpensesByYear(year)
        return yearExpenses.reduce((total, expense) => total + expense.amount, 0)
    }

    // Get expenses by category for a specific period
    const getExpensesByCategory = (year, month = null) => {
        const numericYear = parseInt(year)
        const numericMonth = month !== null ? parseInt(month) : null

        const periodExpenses = month !== null
            ? getExpensesByMonth(numericYear, numericMonth)
            : getExpensesByYear(numericYear)

            const categorized = {}

            periodExpenses.forEach(expense => {
                if (!categorized[expense.category]) {
                    categorized[expense.category] = {
                        category: expense.category,
                        expenses: [],
                        total: 0,
                        count: 0
                    }
                }

                categorized[expense.category].expenses.push(expense)
                categorized[expense.category].total += expense.amount
                categorized[expense.category].count += 1
            })
      
            return Object.values(categorized).sort((a, b) => b.total - a.total)
    }

    // Search expenses by title 
    const searchExpenses = (searchItem, year = null, month = null) => {
        let searchPool = expenses;

        if (year && month != null) {
            searchPool = getExpensesByMonth(year, month)
        } else if (year) {
            searchPool = getExpensesByYear(year)
        }

        return searchPool.filter(expense =>
            expense.title.toLowerCase().includes(searchItem.toLowerCase())
        )
    }

    // Clear all expenses (useful for testing / reset functionality)
    const clearAllExpenses = async () => {
        try {
            await AsyncStorage.removeItem("expenses")
            setExpenses([])
        } catch (error) {
            console.log("Failed to clear expenses: ", error)
        }
    }

    // ========== NEW ANALYTICS FUNCTIONS ==========

    // Get expenses for a specific period (current, 3months, 6months)
    const getExpensesByPeriod = (period) => {
        const now = new Date()
        let startDate

        switch (period) {
            case 'current':
                // From first day of current month to today
                startDate = new Date(now.getFullYear(), now.getMonth(), 1)
                break
            case '3months':
                // Last 90 days
                startDate = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000))
                break
            case '6months':
                // Last 180 days
                startDate = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000))
                break
            default:
                startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
        }

        return expenses.filter(expense => {
            const expenseDate = new Date(expense.date)
            return expenseDate >= startDate && expenseDate <= now
        }).sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // Get spending distribution by category type (must, nice, wasted)
    const getSpendingDistribution = (period) => {
        const periodExpenses = getExpensesByPeriod(period)
        const totalAmount = periodExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        
        if (totalAmount === 0) {
            return { mustHave: 0, niceToHave: 0, wasted: 0 }
        }

        const distribution = {
            mustHave: 0,
            niceToHave: 0,
            wasted: 0
        }

        periodExpenses.forEach(expense => {
            switch (expense.category) {
                case 'must':
                    distribution.mustHave += expense.amount
                    break
                case 'nice':
                    distribution.niceToHave += expense.amount
                    break
                case 'wasted':
                    distribution.wasted += expense.amount
                    break
            }
        })

        // Convert to percentages
        return {
            mustHave: Math.round((distribution.mustHave / totalAmount) * 100 * 10) / 10,
            niceToHave: Math.round((distribution.niceToHave / totalAmount) * 100 * 10) / 10,
            wasted: Math.round((distribution.wasted / totalAmount) * 100 * 10) / 10
        }
    }

    // Get trend data for charts
    const getTrendData = (period) => {
        const periodExpenses = getExpensesByPeriod(period)
        
        if (periodExpenses.length === 0) {
            return {
                labels: [],
                datasets: [
                    { data: [], color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, strokeWidth: 2 },
                    { data: [], color: (opacity = 1) => `rgba(251, 191, 36, ${opacity})`, strokeWidth: 2 },
                    { data: [], color: (opacity = 1) => `rgba(248, 113, 113, ${opacity})`, strokeWidth: 2 }
                ]
            }
        }

        let labels = []
        let intervals = []

        if (period === 'current') {
            // Group by weeks in current month
            const now = new Date()
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
            const currentWeek = Math.ceil((now.getDate() + firstDay.getDay()) / 7)
            
            for (let i = 1; i <= currentWeek; i++) {
                labels.push(`Week ${i}`)
                const weekStart = new Date(firstDay.getTime() + ((i - 1) * 7 - firstDay.getDay()) * 24 * 60 * 60 * 1000)
                const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
                intervals.push({ start: weekStart, end: weekEnd })
            }
        } else if (period === '3months') {
            // Group by months for last 3 months
            const now = new Date()
            for (let i = 2; i >= 0; i--) {
                const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
                labels.push(date.toLocaleDateString('default', { month: 'short' }))
                const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
                const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
                intervals.push({ start: monthStart, end: monthEnd })
            }
        } else if (period === '6months') {
            // Group by months for last 6 months
            const now = new Date()
            for (let i = 5; i >= 0; i--) {
                const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
                labels.push(date.toLocaleDateString('default', { month: 'short' }))
                const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
                const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
                intervals.push({ start: monthStart, end: monthEnd })
            }
        }

        const mustHaveData = []
        const niceToHaveData = []
        const wastedData = []

        intervals.forEach(interval => {
            const intervalExpenses = periodExpenses.filter(expense => {
                const expenseDate = new Date(expense.date)
                return expenseDate >= interval.start && expenseDate <= interval.end
            })

            const totals = { must: 0, nice: 0, wasted: 0 }
            intervalExpenses.forEach(expense => {
                totals[expense.category] = (totals[expense.category] || 0) + expense.amount
            })

            mustHaveData.push(totals.must)
            niceToHaveData.push(totals.nice)
            wastedData.push(totals.wasted)
        })

        return {
            labels,
            datasets: [
                {
                    data: mustHaveData,
                    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                    strokeWidth: 2
                },
                {
                    data: niceToHaveData,
                    color: (opacity = 1) => `rgba(251, 191, 36, ${opacity})`,
                    strokeWidth: 2
                },
                {
                    data: wastedData,
                    color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                    strokeWidth: 2
                }
            ]
        }
    }

    // Calculate health score
    const getHealthScore = (period) => {
        const distribution = getSpendingDistribution(period)
        const score = Math.round(100 - (distribution.wasted * 2) - (distribution.niceToHave * 0.5))
        return Math.max(0, Math.min(100, score))
    }

    // Smart function to group top categories by spending
    const getSmartCategory = (title) => {
        const titleLower = title.toLowerCase().trim()
        
        // Food & Dining
        if (titleLower.includes('walmart') || titleLower.includes('target') || 
            titleLower.includes('costco') || titleLower.includes('grocery') ||
            titleLower.includes('supermarket') || titleLower.includes('food mart')) {
            return 'Groceries & Shopping'
        }
        
        if (titleLower.includes('restaurant') || titleLower.includes('mcdonald') || 
            titleLower.includes('burger') || titleLower.includes('pizza') ||
            titleLower.includes('starbucks') || titleLower.includes('cafe') ||
            titleLower.includes('dining') || titleLower.includes('food')) {
            return 'Food & Dining'
        }
        
        // Entertainment & Gaming
        if (titleLower.includes('game') || titleLower.includes('steam') || 
            titleLower.includes('xbox') || titleLower.includes('playstation') ||
            titleLower.includes('netflix') || titleLower.includes('spotify') ||
            titleLower.includes('movie') || titleLower.includes('cinema')) {
            return 'Entertainment'
        }
        
        // Transportation
        if (titleLower.includes('gas') || titleLower.includes('fuel') || 
            titleLower.includes('uber') || titleLower.includes('lyft') ||
            titleLower.includes('taxi') || titleLower.includes('parking')) {
            return 'Transportation'
        }
        
        // Utilities & Bills
        if (titleLower.includes('electric') || titleLower.includes('water') || 
            titleLower.includes('internet') || titleLower.includes('phone') ||
            titleLower.includes('bill') || titleLower.includes('utility')) {
            return 'Bills & Utilities'
        }
        
        // If no match found, return the original title
        // This ensures nothing gets lost
        return title
    }

    // Get top categories by total spending
    const getTopCategories = (period) => {
        const periodExpenses = getExpensesByPeriod(period)
        const totalAmount = periodExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        
        const categoryTotals = {}
        periodExpenses.forEach(expense => {
            const categoryName = getSmartCategory(expense.title)
            categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + expense.amount
        })

        // Array destructuring ([variable A, variale B])
        const categoriesArray = Object.entries(categoryTotals)
            .map(([name, amount]) => ({
                name,
                amount: `$${amount.toFixed(0)}`,
                percentage: Math.round((amount / totalAmount) * 100),
                color: getCategoryColor(name),
                rawAmount: amount
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 4)

        return categoriesArray
    }

    // Helper function to assign colors to categories
    const getCategoryColor = (categoryName) => {
        const colors = ['#F87171', '#3B82F6', '#22C55E', '#FBBF24', '#8B5CF6', '#F59E0B']
        const hash = categoryName.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0)
            return a & a
        }, 0)
        return colors[Math.abs(hash) % colors.length]
    }

    // Generate smart insights
    const getSmartInsights = (period) => {
        const distribution = getSpendingDistribution(period)
        const healthScore = getHealthScore(period)
        const insights = []

        // Health score insights
        if (healthScore >= 80) {
            insights.push({
                type: 'success',
                title: 'Excellent!',
                message: 'You\'re maintaining healthy spending habits',
                color: '#22C55E',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
            })
        } else if (healthScore >= 60) {
            insights.push({
                type: 'warning',
                title: 'Good Progress',
                message: 'Your spending is on track, but could be optimized',
                color: '#FBBF24',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
            })
        } else {
            insights.push({
                type: 'warning',
                title: 'Needs Attention',
                message: 'Consider reducing unnecessary expenses',
                color: '#F87171',
                backgroundColor: 'rgba(248, 113, 113, 0.1)',
            })
        }

        // Wasted spending insights
        if (distribution.wasted > 15) {
            insights.push({
                type: 'warning',
                title: 'High Waste',
                message: `${distribution.wasted}% of spending is wasted - try to reduce`,
                color: '#F87171',
                backgroundColor: 'rgba(248, 113, 113, 0.1)',
            })
        } else if (distribution.wasted < 5) {
            insights.push({
                type: 'success',
                title: 'Low Waste!',
                message: 'You\'re doing great at avoiding wasteful spending',
                color: '#22C55E',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
            })
        }

        // Nice-to-have insights
        if (distribution.niceToHave > 40) {
            insights.push({
                type: 'info',
                title: 'Discretionary Spending',
                message: 'Consider setting a limit for nice-to-have expenses',
                color: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
            })
        }

        return insights
    }

    // Main analytics function that returns all data for a period
    const getAnalyticsData = (period) => {
        return {
            overallSpending: getSpendingDistribution(period),
            trendData: getTrendData(period),
            healthScore: getHealthScore(period),
            insights: getSmartInsights(period),
            topCategories: getTopCategories(period)
        }
    }

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                isLoading,
                addExpense,
                updateExpense,
                deleteExpense,
                getExpensesByMonth,
                getExpensesByYear,
                getTotalExpensesByMonth,
                getTotalExpensesByYear,
                getAvailableYears,
                getAvailableMonthsForYear,
                getExpensesGroupedByMonth,
                getExpensesByCategory,
                searchExpenses,
                clearAllExpenses,
                // Analytics support
                getExpensesByPeriod,
                getSpendingDistribution,
                getTrendData,
                getHealthScore,
                getTopCategories,
                getSmartInsights,
                getAnalyticsData
            }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}

// Custom hook for using ExpenseContext
// export const useExpenseContext = () => {
//     const context = useContext(ExpenseContext);
//     if (!context) {
//         throw new Error('useExpenseContext must be used within an ExpenseContextProvider');
//     }
//     return context;
// };

// Example expense data structure:
/*
{
    id: "1704567890123_abc123def",
    title: "Groceries",
    amount: 75.50,
    category: "Food",
    date: "2024-01-06",
    description: "Weekly grocery shopping",
    createdAt: "2024-01-06T10:30:00.000Z",
    updatedAt: "2024-01-06T10:30:00.000Z" // Optional, only if updated
}
*/