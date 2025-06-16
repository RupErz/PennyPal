import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'

const EditExpense = ({route}) => {
    const expenseId = route?.params.expenseId
    console.log(`Got the id ${expenseId}`)
    return (
        <View style={styles.container}>
            <Text>This is Edit Expense screen</Text>
        </View>
    )
}

export default EditExpense

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 150
    },
    formContainer: {
        width: 0.8 * width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        padding: 10,
        borderRadius: 15,
        borderColor: Colors.buttonBackground,
        borderWidth: 2,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    }
})