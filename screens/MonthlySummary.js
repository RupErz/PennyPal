import React, { useContext, useLayoutEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ExpenseContext } from '../store/expense-context'
import { UserContext } from '../store/user-context'

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
  const [selectedYear] = useState(route?.param?.year || currentDate.getFullYear())
  const [selectedMonth] = useState(route?.param?.month || currentDate.getMonth())

  const monthName = new Date(selectedYear, selectedMonth).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  })

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

  // Calculated category totals

  // Calculated smart expenses 

  // Handle edit Expense ( if user press on the expense)

  // Handle delete Expense
  return (
    <View>
        <Text>This is Monthly Summary Screen</Text>
    </View>
  )
}

export default MonthlySummary