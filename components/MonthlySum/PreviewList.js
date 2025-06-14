import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { formatCurrency2Digits, getCategoryEmoji } from '../../util/utility'

const PreviewList = ({previewExpenses}) => {
    const navigation = useNavigation()

    const getCategoryColor = (category) => {
        switch(category) {
            case 'must': return Colors.must
            case 'nice': return Colors.nice
            case 'wasted': return Colors.wasted
        }
    }

    const renderExpensePreview = ({item}) => {
         // Carry the item id to Edit Expense screen
        const navigateToEdit = () => {
            navigation.navigate('ManageExpense', {
                expenseId: item.id
            })
        }

        return (
            <Pressable
                style={({pressed}) => [styles.previewExpenseItem, pressed && styles.pressed]}
                onPress={navigateToEdit}
            >
                <View style={styles.expenseItemLeft}>
                    <Text style={styles.expenseEmoji}>{getCategoryEmoji(item.category)}</Text>
                    <View style={styles.expenseDetails}>
                        <Text style={styles.expenseTitle} numberOfLines={1}>
                            {item.title || 'Expense'}
                        </Text>
                        <Text style={styles.expenseDate}>
                            {new Date(item.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                            })}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.expenseAmount, {color: getCategoryColor(item.category)}]}>
                    {formatCurrency2Digits(item.amount)}
                </Text>
            </Pressable>
        )
    }

    return (
        <View style={styles.previewContainer}>
            {previewExpenses.map((expense, index) => (
                <View key={expense.id || index}>
                    {renderExpensePreview({ item: expense })}
                    {index < previewExpenses.length - 1 && <View style={styles.separator} />}
                </View>

            ))}
        </View>
    )
}

export default PreviewList

const styles = StyleSheet.create({
    previewContainer:{
        marginBottom: 15
    },
    separator: {
        height: 1,
        backgroundColor: Colors.lightGray,
        marginVertical: 4,
    },
    previewExpenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12
    },
    expenseItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    expenseEmoji: {
        fontSize: 20,
        marginRight: 20
    },
    expenseDetails: {
        flex: 1,
    },
    expenseTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textDarkGray,
        marginBottom: 2,
    },
    pressed: {
        opacity: 0.5
    }

})