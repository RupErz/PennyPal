import React, { useContext, useMemo } from 'react'
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native'
import MonthCard from '../components/History/MonthCard';
import { ExpenseContext } from '../store/expense-context';
import { UserContext } from '../store/user-context';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const History = () => {
    const {getAvailableYears, getExpensesGroupedByMonth, getExpensesByCategory} = useContext(ExpenseContext)
    const {monthlyIncome} = useContext(UserContext)

    const navigation = useNavigation()

    // OPTION 1: Use SectionList (RECOMMENDED for year grouping)
    const sectionedData = useMemo(() => {
        const yearsAvail = getAvailableYears()
        
        return yearsAvail.map(year => ({
            title: year, // Year as section header
            data: getExpensesGroupedByMonth(year).map(month => ({
                ...month,
                year,
                income: monthlyIncome
            }))
        }))
    }, [getAvailableYears, getExpensesGroupedByMonth, monthlyIncome])

    // Data structure for SectionList:
    // [
    //     {
    //         title: "2025",
    //         data: [
    //             { year: "2025", monthName: "June", monthIndex: 5, total: 1101.58, expenses: [...], income: 5000 },
    //             { year: "2025", monthName: "May", monthIndex: 4, total: 950.25, expenses: [...], income: 5000 }
    //         ]
    //     },
    //     {
    //         title: "2024", 
    //         data: [
    //             { year: "2024", monthName: "December", monthIndex: 11, total: 800.00, expenses: [...], income: 5000 }
    //         ]
    //     }
    // ]

    const renderYearHeader = ({section}) => {
        return (
            <View style={styles.yearHeader}>
                <Text style={styles.yearText}>{section.title}</Text>
                <View style={styles.yearLine} />
            </View>
        )
    }

    const renderMonthCard = ({item}) => {
        // Calculated the total of each category
        // JS takes month as index : 0 -> Jan, 1 -> Feb
        const categoryTotals = getExpensesByCategory(item.year, item.monthIndex)
        console.log("Logging categoryTotals: ", categoryTotals)

        const must = categoryTotals.find(c => c.category === 'must')?.total || 0;
        const nice = categoryTotals.find(c => c.category === 'nice')?.total || 0;
        const wasted = categoryTotals.find(c => c.category === 'wasted')?.total || 0;

        const monthCardData = {
            income: item.income,
            totalSpent: item.total,
            must: must,
            nice: nice,
            wasted: wasted,
            monthName: item.monthName
        }

        const navigateToHome = () => {
            // navigation.navigate('HomeTab', {
            //     screen: 'MonthlySummary',
            //     params: {
            //         year: parseInt(item.year),
            //         month: item.monthIndex
            //     }
            // })
            console.log("Tab!")
        }
            
            
        return (
            <MonthCard 
                data={monthCardData}
                totalSpent={monthCardData.totalSpent}  
                income={monthCardData.income} 
                onPress={navigateToHome}    
            />
        )
    }

    return (
        <View style={styles.container}>
            {/* OPTION 1: SectionList (RECOMMENDED) */}
            <SectionList 
                sections={sectionedData}
                keyExtractor={(item, index) => `${item.year}-${item.monthIndex}-${index}`}
                renderItem={renderMonthCard}
                renderSectionHeader={renderYearHeader}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true} // Makes year headers stick to top
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            />
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    yearHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    yearText: {
        fontSize: 23,
        fontWeight: '600',
        color: "white",
        marginRight: 15
    },
    yearLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.grayFaded
    },
    scrollView: {
        flex: 1
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
})