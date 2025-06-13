import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { formatCurrency2Digits, formatDate } from '../../util/utility'
import { useNavigation } from '@react-navigation/native'

const ExpenseItem = ({expense}) => {
    const navigation = useNavigation()
    const navigateToEditForm = () => {
        navigation.navigate('EditExpense', {
            expenseId: expense.id
        })
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={({pressed}) => [styles.innerPressable, pressed && styles.pressed]}
                android_ripple={{ color: Colors.lightBorder , borderless: true }}
                onPress={navigateToEditForm}
                
            >
                <View style={styles.expenseMainInfo}>
                    <Text style={styles.title}>{expense.title}</Text>
                    <View style={[styles.categoryWrapper,
                        expense.category === "must" && {backgroundColor: Colors.must},
                        expense.category === "nice" && {backgroundColor: Colors.nice},
                        expense.category === "wasted" && {backgroundColor: Colors.wasted},
                    ]}>
                        <Text style={styles.category}>{expense.category}</Text>
                    </View>
                </View>
                <View style={styles.expenseAmountContainer}>
                    <Text style={styles.date}>{formatDate(expense.date)}</Text>
                    <Text style={styles.amount}>{formatCurrency2Digits(expense.amount)}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default ExpenseItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBackground,
        borderColor: Colors.lightBorder,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        minHeight: 50,
        marginHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    innerPressable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',   
        padding: 10 // use Padding no margin to avoid clipping text 
    },
    pressed: {
        opacity: 0.75
    },
    // Inner data
    expenseMainInfo: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.textDarkGray,
        marginBottom: 2,
    },
    amount: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textDarkGray,
        marginBottom: 2,
    },
    category: {
        fontSize: 13,
        color: "white",
        textTransform: 'capitalize',
    },
    date: {
        fontSize: 15,
        color: Colors.textGray,
    },
    categoryWrapper: {
        borderRadius: 30,
        backgroundColor: "pink",
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start", // So it wraps tightly around content
        margin: 5 // optional spacing between items
    },
    expenseAmountContainer: {
        alignItems: 'flex-end',
        gap: 14
    },
    
})