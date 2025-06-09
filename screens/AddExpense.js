import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ManageExpensesForm from '../components/ExpenseForm/ManageExpensesForm'
const AddExpense = () => {

    return (
        <View style={styles.container}>
            <ManageExpensesForm />
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