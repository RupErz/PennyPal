import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ManageExpensesForm from '../components/ExpenseForm/ManageExpensesForm'
import { ExpenseContext } from '../store/expense-context'
import ErrorOverlay from '../components/ExpenseForm/ErrorOverlay'
const ManageExpense = ({navigation, route}) => {
    const {addExpense, updateExpense, deleteExpense, expenses} = useContext(ExpenseContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    // Checking whether we got id from item clicked
    const id = route?.params?.expenseId
    // Convert this id into boolean value - Edit or Add
    const isEditting = !!id

    // Getting default month and year for user in History
    const {defaultMonth, defaultYear, context} = route?.params || {}

    // Fetch the current expense we at with the id provided
    const selectedExpense = expenses.find((expense) => expense.id === id)
    console.log(selectedExpense)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditting ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditting])

    // Update : Handle both Update and Add expense
    const handleOnSubmit = (expenseData) => {
        setIsSubmitting(true)
        try {
            if (isEditting) {
                console.log("Updating")
                updateExpense(id, expenseData)
            } else {
                console.log("Submitting :", expenseData)
                addExpense(expenseData)
            }
            navigation.goBack()
        } catch (error) {
            setError("Could not save the expense!")
            setIsSubmitting(false)
        }
    }

    // Handle loading state while updating / managing expense
    if (isSubmitting) {
        return <View style={{ flex: 1, backgroundColor: "#000" }} />;
    }

    // Handle Error State
    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    // Delete expense handler
    const deleteExpenseHandler = () => {
        setIsSubmitting(true)
        try {
            deleteExpense(id)
            navigation.goBack()
        } catch (error) {
            setError("Cannot delete expense cause: ", error)
            setIsSubmitting(false)
        }
        console.log("Delete time yas")
    }

    return (
        <View style={[styles.container, isEditting && {paddingTop: 20}]}>
            <ManageExpensesForm 
                onSubmit={handleOnSubmit}
                defaultValue={selectedExpense}
                submitButtonLabel={isEditting ? "Update" : "Add"}    
                // Passing these two to enable delete button once it is edtting mode
                onDelete={deleteExpenseHandler}
                isEdit={isEditting}
                defaultMonth={defaultMonth}
                defaultYear={defaultYear}
                context={context} // Whether we from History or Home tab ( History or undefined: Hometab )
            />
        </View>
    )
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50, // Being modified based on the mode isEdit
        alignItems: 'center'
    },
})