import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Animated, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import ExpenseCard from '../components/ExpenseCard'
import { UserContext } from '../store/user-context'
import { formatCurrency, formatCurrency2Digits, getCurrentDate } from '../util/utility'
import Title from '../components/Title'
import { Colors } from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'
import RecentExpenseCard from '../components/RecentExpenseCard'
import { ExpenseContext } from '../store/expense-context'
import CustomizedButton from '../components/HomeUpdate/CustomizedButton'
import Icon from 'react-native-vector-icons/Feather'
import Loading from './Loading'

const Home = ({navigation}) => {
    // Monthly Income by default is 0 if empty
    const {userName, monthlyIncome} = useContext(UserContext)
    const {getExpensesByMonth, getTotalExpensesByMonth, getExpensesByCategory} = useContext(ExpenseContext)

    const [welcomeMessage, setWelcomeMessage] = useState("")    

    // Get total expense for the CURRENT month
    const totalSpent = getTotalExpensesByMonth(new Date().getFullYear(), new Date().getMonth())
    const monthExpenses = getExpensesByMonth(new Date().getFullYear(), new Date().getMonth())
    
    useLayoutEffect(() => {
        navigation.getParent()?.setOptions({
            title: "Home"
        })
    })

    // Clear User Expense data (For testing)
    const {clearAllExpenses} = useContext(ExpenseContext)
    const clearData = () => {
        clearAllExpenses()
    }
    
    const {resetUserData} = useContext(UserContext)
    const clearUserData = () => {
        resetUserData()
    }

    // Creating Animations
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(50)).current

    // Balance Calculation: Only if monthlyIncome is available
    const balance = monthlyIncome && monthlyIncome > 0 ? monthlyIncome - totalSpent : "-"

    // Dynamic welcome message based on time of day
    const updateWelcomeMessage = () => {
        const hour = new Date().getHours();
        let timeGreeting = '';
        let icon = '';

        if (hour >= 5 && hour < 12) {
            timeGreeting = 'Good Morning';
            icon = '☀️'; // morning sun
        } else if (hour >= 12 && hour < 17) {
            timeGreeting = 'Good Afternoon';
            icon = '🌤️'; // sun with some clouds
        } else if (hour >= 17 && hour < 21) {
            timeGreeting = 'Good Evening';
            icon = '🌇'; // sunset
        } else {
            timeGreeting = 'Good Night';
            icon = '🌙'; // crescent moon
        }

        const message = `${timeGreeting}${userName ? `, ${userName} ${icon}` : ''}`;
        setWelcomeMessage(message);
    }

    // Get Preview Expenses (top 6-8) : Empty list if no expenses
    const getRecentExpenseItem = () => {
        if (!monthExpenses || monthExpenses.length === 0) return []

        // Sort by date (most recent one) take top 6
        const sortedByDate = [...monthExpenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
        
        return sortedByDate
    }
    const recentExpenses = getRecentExpenseItem()

    // Motivational messages based on spending patterns
    const getMotivationalMessage = () => {
        if (!monthlyIncome || monthlyIncome === 0) return null

        const spentPercentage = (totalSpent / monthlyIncome) * 100

        if (spentPercentage < 30) {
            return { message: "🎉 Great job! You're staying well within budget!", type: "success" }
        } else if (spentPercentage < 70) {
            return { message: "👍 You're on track! Keep monitoring your spending.", type: "warning" }
        } else if (spentPercentage < 90) {
            return { message: "⚠️ Getting close to your limit. Consider reviewing expenses.", type: "danger" }
        } else {
            return { message: "🚨 You've exceeded your budget! Time to cut back.", type: "critical" }
        }
    }
    const motivationalMsg = getMotivationalMessage()

    const createFinanceData = () => {
        const hasIncome = monthlyIncome && monthlyIncome > 0
        return [
            {
                label: "Monthly Income",
                expense: hasIncome ? formatCurrency(monthlyIncome) : "-"
            },
            {
                label: "Spent",
                expense: formatCurrency(totalSpent)
            },
            {
                label: "Balance",
                expense: hasIncome ? formatCurrency(balance) : "-"
            }
        ]
    }
    const userFinance = createFinanceData()

    // Create category breakdown data (mock for now - will be fetched from user data later)
    const totalAmountByCategory = getExpensesByCategory(new Date().getFullYear(), new Date().getMonth())
    const categoryData = totalAmountByCategory.map((category) => ({
        label: 
            category.category === "must"
            ? "Must Have"
            : category.category === "nice"
            ? "Nice to Have"
            : "Wasted", 
        expense: formatCurrency(category.total),
        type: category.category
    }))
    // const categoryData = [
    //     { label: "Must Have", expense: "xxxx", type: "must" },
    //     { label: "Nice to Have", expense: "xxxx", type: "nice" },
    //     { label: "Wasted", expense: "xxxx", type: "wasted" }
    // ]

    const current_date = getCurrentDate()

    useEffect(() => {
        // Update welcome message when first launch
        updateWelcomeMessage()

        // Entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true
            }),
        ]).start()

        // Update welcome message every hour
        const interval = setInterval(updateWelcomeMessage, 3600000) // Update every hour
        return () => clearInterval(interval)
    }, [userName])

    const onPressAddButton = () => {
        const today = new Date()
        navigation.navigate("ManageExpense",{
            defaultMonth: today.getFullYear() ,
            defaultYear: today.getMonth() // Month index
        }) // Change to ManageExpense
    }

    const onPressViewAll = () => {
        navigation.navigate("MonthlySummary") // Navigate to Monthly Summary Screen
    }
    console.log(welcomeMessage)
    const isLoading = true
    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            bounces={true}
        >
            <Animated.View
                style={[styles.container, {opacity: fadeAnim, transform: [{ translateY: slideAnim }]}]}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.dateContainer}>
                        <Icon name="clock" size={18} color={Colors.textLightGray} style={styles.clockIcon}/>
                        <Text style={styles.dateText}>{current_date}</Text>
                        {/* <Title
                            style={styles.dateText}
                        >
                            {current_date}
                        </Title> */}
                    </View>  

                    <Text style={styles.welcomeText}>
                        {welcomeMessage}
                    </Text>
                </View>

                {/* Quick Access Buttons  */}
                <View style={styles.primaryActionsContainer}>
                    <CustomizedButton
                        onPress={onPressAddButton}
                        type={"Add"}
                    >
                        <Text style={styles.primaryActionsButton}>➕</Text>
                        <Text style={styles.primaryActionsContent}>Add Expense</Text>
                    </CustomizedButton>
                    <CustomizedButton
                        onPress={onPressViewAll}
                    >
                        <Text style={styles.primaryActionsButton}>📊</Text>
                        <Text style={styles.primaryActionsContent}>View Summary</Text>
                    </CustomizedButton>
                </View>

                {/* Motivational Message */}
                {motivationalMsg && (
                    <View style={[styles.motivationalCard, styles[`motivational${motivationalMsg.type}`]]}>
                        <Text style={styles.motivationalText}>{motivationalMsg.message}</Text>
                    </View>
                )}

                {/* Personal Finance Card */}
                <ExpenseCard 
                    title="Personal Finance"
                    expenseData={userFinance}
                />

                {/* Recent Expenses Preview */}
                {recentExpenses.length > 0 && (
                    <RecentExpenseCard
                        title={"Recent Expenses"}
                        recentExpenses={recentExpenses}
                    />
                )}

                {/* Spending Category Card */}
                {categoryData.length > 0 && (
                    <ExpenseCard 
                        title="Spending Categories"
                        expenseData={categoryData}
                    />
                )}
                
                {/* Show prompt if no income is set */}
                {(!monthlyIncome || monthlyIncome === 0) && (
                    <View style={styles.incomePrompt}>
                        <Text style={styles.promptText}>
                            💡 Set your monthly income in Settings to see your balance and get better insights!
                        </Text>
                    </View>
                )}

                {/* Button to clear expense data */}
                <Button title='Press me to clear' onPress={clearData} style={{marginTop: 50}}/>
                {/* Button to clear entire progress to go back OnBoarding */}
                <Button title='Press me to go back onBoarding' onPress={clearUserData} />
            </Animated.View>
        </ScrollView>
        
    )
}

export default Home

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: 'flex-start',
        alignContent: 'center',
        gap: 5,
    },
    header : {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#1a1a1a',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomColor: Colors.textLightGray,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8
    },
    clockIcon: {
        marginRight: 8,
        tintColor: Colors.title // Make our clock color match the theme
    },
    dateText: {
        fontSize: 22,
        color: Colors.textLightGray,
        fontWeight: '500'
    },
    welcomeText: {
        color: 'white',
        fontSize: 26,
        fontWeight: "bold",
        textAlign: 'left',
        marginVertical: 12,
        paddingBottom: 16,
        marginBottom: 8,
        letterSpacing: 0.5
    },
    content: {
        flex: 1,
        padding: 16,
        paddingTop: 8,
        gap: 16
    },
    incomePrompt: {
        backgroundColor: Colors.cardBackground,
        padding: 12,
        marginTop: 10,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: Colors.buttonBackground,
    },
    promptText: {
        color: Colors.subTitle,
        fontSize: 14,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        gap: 20
    },
    button: {
        flex: 1,
        minWidth: 120
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        paddingBottom: 100,
    },
    // Motivational Message
    motivationalCard: {
        marginHorizontal: 16,
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        marginBottom: 8
    },
    motivationalsuccess: {
        backgroundColor: '#E8F5E8',
        borderLeftColor: '#4CAF50'
    },
    motivationalwarning: {
        backgroundColor: '#FFF8E1',
        borderLeftColor: '#FF9800'
    },
    motivationaldanger: {
        backgroundColor: '#FFEBEE',
        borderLeftColor: '#F44336'
    },
    motivationalcritical: {
        backgroundColor: '#FFEBEE',
        borderLeftColor: '#D32F2F'
    },
    motivationalText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    
    // Primary Actions Container
    primaryActionsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 20,
    },
    primaryActionsButton: {
        fontSize: 18,
        color: 'white'
    },
    primaryActionsContent: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600'
    }
})