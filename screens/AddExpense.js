import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import CancelButton from '../components/CancelButton'
import ManageExpensesForm from '../components/ExpenseForm/ManageExpensesForm'
const AddExpense = () => {

    return (
        <View style={styles.container}>
            <ManageExpensesForm />
            <View style={styles.buttonContainer}>
                <PrimaryButton>Submit</PrimaryButton>
                <CancelButton>Cancel</CancelButton>
            </View>
        </View>
    )
}

export default AddExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 75,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    }
})