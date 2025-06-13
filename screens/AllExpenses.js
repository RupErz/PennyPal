import React, { useLayoutEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'
import ExpenseItem from '../components/MonthlySum/ExpenseItem'

const AllExpenses = ({route, navigation}) => {
    const {monthName, monthExpenses} = route?.params
    const renderExpenseItem = ({item}) => {
        return (
            <ExpenseItem 
                expense={item}
            />
        )
    }

    const ItemSeparator = () => <View style={styles.separator} />
    
    const EmptyExpensesList = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No expenses found for this month</Text>
                <Text style={styles.emptySubText}>Start tracking your expenses!</Text>
            </View>
        )
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
          title: `Expenses Summary of ${monthName}`
        })
      }, [navigation])

    return (
        <View style={styles.container}>
            {/* Expenses List Header */}
            <View style={styles.customAllExpenseContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.sectionTitle}>All Expenses ({monthExpenses.length})</Text>
                </View>
                <FlatList
                    data={monthExpenses}
                    renderItem={renderExpenseItem}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    ListEmptyComponent={monthExpenses.length === 0 ? EmptyExpensesList : null}
                    ItemSeparatorComponent={ItemSeparator}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    style={styles.flatList}
                    // Performance Optimization
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    removeClippedSubviews={true}
                />
            </View>
        </View>
    )
}

export default AllExpenses

const styles = StyleSheet.create({
     // Container List
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray
    },
    customAllExpenseContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 15,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textDarkGray,
    },
    // Title Container 
    titleContainer: {
        paddingHorizontal: 15
    },
    flatList: {
        flex: 1
    },
    flatListContent: {
        paddingBottom: 20
    },
    // Separator 
    separator: {
        backgroundColor: Colors.lightBorder,
        marginHorizontal: 15
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 40,
        marginHorizontal: 15
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textGray,
        marginBottom: 4
    },
    emptySubText: {
        fontSize: 14,
        color: Colors.textLightGray
    },
})