import React, { useContext, useLayoutEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ExpenseContext } from '../store/expense-context'
import { UserContext } from '../store/user-context'
import { Colors } from '../constants/colors'
import { formatCurrency2Digits, formatPercentage } from '../util/utility'
import SmartSummaryCard from '../components/MonthlySum/SmartSummaryCard'
import CategorySlot from '../components/MonthlySum/CategorySlot'
import PreviewList from '../components/MonthlySum/PreviewList'
import ViewAllButton from '../components/MonthlySum/ViewAllButton'
import AddIonicon from '../components/MonthlySum/AddIonicon'

const MonthlySummary = ({navigation, route}) => {
  const {
    getExpensesByMonth,
    getTotalExpensesByMonth,
    getExpensesByCategory,
    deleteExpense  
  } = useContext(ExpenseContext)

  const {monthlyIncome} = useContext(UserContext)

  // Get current date 
  const currentDate = new Date()
  const [selectedYear] = useState(route?.params?.year || currentDate.getFullYear())
  const [selectedMonth] = useState(route?.params?.month || currentDate.getMonth())

  const monthName = new Date(selectedYear, selectedMonth).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${monthName} Summary`
    })
  }, [navigation, monthName])

  // When user navigate to this screen make sure it carry year and month

  // Set header title
  // useLayoutEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     title: `${monthName} Summary`
  //   })
  // }, [navigation, monthName])

  // Assuming from History Screen : 
  // In your History screen
  // const navigateToMonthlySummary = (year, month) => {
  //   navigation.navigate('Home', {
  //     screen: 'MonthlySummary',
  //     params: { year, month }
  //   });
  // };

  // Get data for that month
  const monthExpenses = getExpensesByMonth(selectedYear, selectedMonth)
  const totalSpent = getTotalExpensesByMonth(selectedYear, selectedMonth)
  const categoryData = getExpensesByCategory(selectedYear, selectedMonth)
  
  // Calculated category totals
  const mustHaveTotal = categoryData.find(cat => cat.category === 'must')?.total || 0
  const niceToHaveTotal = categoryData.find(cat => cat.category === 'nice')?.total || 0
  const wastedTotal = categoryData.find(cat => cat.category === 'wasted')?.total || 0

  // Percentage of each category (Waste and Must already have below)
  const niceToHaveRate = totalSpent > 0 ? (niceToHaveTotal / totalSpent) * 100 : 0 

  // Calculated smart expenses 
  const fixedExpense = mustHaveTotal
  const flexibleExpense = mustHaveTotal + niceToHaveTotal
  const fixedExpenseRate = totalSpent > 0 ? (fixedExpense / totalSpent) * 100 : 0 // Essential expenses
  const flexibleExpensesRate = totalSpent > 0 ? (flexibleExpense / totalSpent) * 100 : 0
  const wastePercentage = totalSpent > 0 ? ((wastedTotal / totalSpent) * 100) : 0
  const savingRate = monthlyIncome > 0 ? (((monthlyIncome - totalSpent) / monthlyIncome) * 100) : 0

  // Get Preview Expenses (top 6-8)
  const getPreviewExpenses = () => {
    if (!monthExpenses || monthExpenses.length === 0) return []

    // Sort by date (most recent one) take top 6
    const sortedByDate = [...monthExpenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
    
    return sortedByDate
  }

  // Getting top 6 items to display
  const previewExpenses = getPreviewExpenses()

  // Navigate to Full List Item Screen
  const toAllItemScreen = () => {
    navigation.navigate('AllExpenses', { 
      monthName: monthName,
      // monthExpenses: monthExpenses,
      year: selectedYear,
      month: selectedMonth
    })
  }
  
  // Handle edit Expense ( if user press on the expense)

  // Handle delete Expense

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'must': return '🏠' // or '⚡' or '🔑'
      case 'nice': return '🛍️' // or '🎉' or '✨'
      case 'wasted': return '💸' // or '⚠️' or '🗑️'
      default: return '💰'
    }
  }
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with date, total spent, saving */}
      <View style={styles.header}>
        {/* Current Date */}
        <Text style={styles.headerDate}>{monthName}</Text>

        {/* Total Spent */}
        <View style={styles.compactTotalSection}>
          <Text style={styles.compactTotalTitle}>Total Spent</Text>
          <Text style={styles.compactTotalAmount}>{formatCurrency2Digits(totalSpent)}</Text>
        </View>

        {/* Saving Rate */}
        <View>

        </View>
      </View>

      {/* Smart Summary Card */}
      <View style={styles.summaryCardsSection}>
        <View style={styles.summaryCardsGrid}>
          <SmartSummaryCard 
            title={"Fixed Expense"}
            amount={formatCurrency2Digits(fixedExpense)}
            percentage={formatPercentage(fixedExpenseRate)}
            type={"fixed"}
          />

          <SmartSummaryCard 
            title={"Flexible Expense"}
            amount={formatCurrency2Digits(flexibleExpense)}
            percentage={formatPercentage(flexibleExpensesRate)}
            type={"flexible"}
          />
        </View>

        {/* Waste Analysis Card */}
        {wastedTotal > 0 && (
          <SmartSummaryCard 
            title={"Waste Analysis"}
            amount={formatCurrency2Digits(wastedTotal)}
            percentage={formatPercentage(wastePercentage)}
            type={"waste"}
          />
        )}
      </View>

      {/* Category Break Down */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        <View style={styles.containerGridSlot}>
          <CategorySlot category={"Must Have"} amount={formatCurrency2Digits(mustHaveTotal)} percentage={formatPercentage(fixedExpenseRate)} catEmoji={getCategoryEmoji("must")}/>
          <CategorySlot category={"Nice to Have"} amount={formatCurrency2Digits(niceToHaveTotal)} percentage={formatPercentage(niceToHaveRate)} catEmoji={getCategoryEmoji("nice")}/>
          <CategorySlot category={"Wasted"} amount={formatCurrency2Digits(wastedTotal)} percentage={formatPercentage(wastePercentage)} catEmoji={getCategoryEmoji("wasted")}/>
        </View>
      </View>

      {/* Preview Section -> Lead to Full List dialog */}
      {previewExpenses.length > 0 && (
        <View style={styles.sectionContainer}>
          <View style={styles.previewHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recent Expenses</Text>
            </View>
            <View>
              <AddIonicon />
            </View>
          </View>
          <View>
             <Text style={styles.previewSubtitle}>
                Showing {previewExpenses.length} of {monthExpenses.length}
              </Text>
          </View>

          {/* Preview List */}
          <PreviewList previewExpenses={previewExpenses} />

          {/* View All Button */}
          <ViewAllButton onPress={toAllItemScreen}>
            View All {monthExpenses.length} Expenses
          </ViewAllButton>
        </View>
      )}

      {/* Fallback: if there is no expenses  */}
      {previewExpenses.length === 0 && (
        <ViewAllButton onPress={toAllItemScreen}>
          All Expenses ({monthExpenses.length})
        </ViewAllButton>
      )}
    </ScrollView>
  )
}

export default MonthlySummary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  // Header
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.purpleWhite,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerDate: {
    color: Colors.background,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10
  },
  compactTotalSection: {
    alignItems: 'center',
    marginBottom: 12
  },
  compactTotalTitle: {
    fontSize: 15,
    color: Colors.cardBackground, // Dark gray,
  },
  compactTotalAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.greenShine
  },
  // Body - Scroll part
  scrollContent: {
    flex: 1,
  },
  // Summary Card 
  summaryCardsSection: {
    padding: 15,
    paddingBottom: 10,
  },
  summaryCardsGrid: { 
    flexDirection: 'row',
    marginBottom: 10
  },
  // Category Breakdown
  sectionContainer: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
  },
  containerGridSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textDarkGray,
    marginBottom: 15,
  },
  // Preview Section
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewSubtitle: {
    fontSize: 13,
    color: Colors.cardBackground,
    fontWeight: '500'
  },
  iconContainer: {
    
  }
})