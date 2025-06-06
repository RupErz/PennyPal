import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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

    
}