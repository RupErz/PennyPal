import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const ExpenseRow = ({label, expense}) => {
    return (
         <View style={styles.expenseRow}>
            <View style={styles.categoryTitle}>
                <Image source={require('../../assets/pink-circle.png')} style={styles.pinkCircle} />
                <Text style={styles.categoryText}>{label} :</Text>
            </View>
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
    categoryTitle : {
        flexDirection: 'row',
        alignItems: 'center'
        
    },
    pinkCircle: {
       width: 10,
       height: 10,
       marginRight: 10
    }
})