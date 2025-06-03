import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'
import ExpenseRow from './ExpenseDetail/ExpenseRow'

const ExpenseCard = ({title, expenseData = []}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {expenseData.map((item, index) => (
                <ExpenseRow 
                    key={index}
                    label={item.label}
                    expense={item.expense}
                />
            ))}
        </View>
    )
}

export default ExpenseCard

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        width: width * 0.9, // Increased width for better use of space
        borderRadius: 16,
        padding: 16, // More consistent padding
        backgroundColor: Colors.cardBackground,
        alignSelf: 'center', // Centers the card
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        color: Colors.redSmooth,
        borderBottomColor: Colors.redAlert,
        borderBottomWidth: 2,
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 8,
        marginBottom: 12,
        fontWeight: 'bold'
    },
})