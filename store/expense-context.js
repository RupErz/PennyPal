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
    clearAllExpenses: () => {}
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
                clearAllExpenses
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