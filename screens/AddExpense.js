import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ManageExpensesForm from '../components/ExpenseForm/ManageExpensesForm'
import { ExpenseContext } from '../store/expense-context'
const AddExpense = ({navigation}) => {
    const {addExpense} = useContext(ExpenseContext)
    
    const handleOnSubmit = (expenseData) => {
        console.log("Submitting :", expenseData)
        addExpense(expenseData)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ManageExpensesForm onSubmit={handleOnSubmit}/>
        </View>
    )
}

export default AddExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 45,
        alignItems: 'center'
    },
    
})