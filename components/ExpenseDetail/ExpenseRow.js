import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const ExpenseRow = ({label, expense}) => {
    return (
         <View style={styles.expenseRow}>
            <Text style={styles.categoryText}>{label}</Text>
            <View style={styles.expenseDiplayContainer}>
                <Text style={styles.expenseText}>$ {expense}</Text>
            </View>
        </View>
    )
}

export default ExpenseRow

const styles = StyleSheet.create({
    expenseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8
    },
    categoryText: {
        color: Colors.subTitle,
        fontSize: 15,
        fontWeight: '500'
    },
    expenseDiplayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkHeavy,
        borderRadius: 20,
        borderColor: Colors.greenShine,
        borderWidth: 2,
        paddingHorizontal: 12,
        paddingVertical: 8,
        minWidth: '45%'
    },
    expenseText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})