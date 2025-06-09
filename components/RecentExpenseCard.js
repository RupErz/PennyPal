import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../constants/colors'
import { formatCurrency } from '../util/utility'
import { useNavigation } from '@react-navigation/native'

const RecentExpenseCard = ({title, recentExpenses}) => {
    const navigation = useNavigation()
    const navigateToMonthlySummary = () => {
        navigation.navigate("MonthlySummary")
    }

    const getCategoryIcon = (type) => {
        switch(type) {
            case 'must': return '🏠'
            case 'nice': return '☕'
            case 'wasted': return '💸'
            default: return '💰'
        }
    }
    return (
        <View style={styles.recentExpensesCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
                <TouchableOpacity 
                    style={styles.viewAllButton}
                    onPress={navigateToMonthlySummary}
                >
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>
            
            {recentExpenses.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                    <View style={styles.expenseLeft}>
                        <Text style={styles.expenseIcon}>{getCategoryIcon(expense.category)}</Text>
                        <View>
                            <Text style={styles.expenseTitle}>{expense.title}</Text>
                            <Text style={styles.expenseDate}>{expense.date}</Text>
                        </View>
                    </View>
                    <Text style={styles.expenseAmount}>$ {formatCurrency(expense.amount)}</Text>
                </View>
            ))}
        </View>
    )
}

export default RecentExpenseCard

const styles = StyleSheet.create({
    recentExpensesCard: {
        backgroundColor: Colors.cardBackground,
        marginHorizontal: 16,
        marginVertical: 15,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text
    },
    viewAllButton: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    viewAllText: {
        color: Colors.buttonBackground,
        fontSize: 14,
        fontWeight: '500'
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border || '#F0F0F0'
    },
    expenseLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    expenseIcon: {
        fontSize: 20,
        marginRight: 12
    },
    expenseTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text
    },
    expenseDate: {
        fontSize: 12,
        color: Colors.subTitle,
        marginTop: 2
    },
    expenseAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text
    },
})