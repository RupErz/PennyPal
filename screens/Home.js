import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { Animated, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import ExpenseCard from '../components/ExpenseCard'
import { UserContext } from '../store/user-context'
import { formatCurrency, formatCurrency2Digits, getCurrentDate } from '../util/utility'
import Title from '../components/Title'
import { Colors } from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'
import RecentExpenseCard from '../components/RecentExpenseCard'
import { ExpenseContext } from '../store/expense-context'

const Home = ({navigation}) => {
    // Monthly Income by default is 0 if empty
    const {userName, monthlyIncome} = useContext(UserContext)
    const {getExpensesByMonth, getTotalExpensesByMonth, getExpensesByCategory} = useContext(ExpenseContext)

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

    // Mock streak and badge data : Might replace with something since we don't have any data related
    const streakDays = 5
    const currentBadge = "Balanced Week"

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
    }, [])

    const onPressAddButton = () => {
        const today = new Date()
        navigation.navigate("ManageExpense",{
            defaultMonth: today.getFullYear() ,
            defaultYear: today.getMonth() // Month index
        }) // Change to ManageExpense
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
                        <Image source={require('../assets/clock.png')} style={styles.clockIcon} />
                        <Title
                            style={styles.dateText}
                        >
                            {current_date}
                        </Title>
                    </View>  

                    <Text style={styles.welcomeText}>
                        Welcome back{userName ? `,${userName}` : ''}! 👋
                    </Text>
                </View>

                {/* Badge/Streak Section */}
                <View style={styles.badgeContainer}>
                    <View style={styles.streakBadge}>
                        <Text style={styles.streakEmoji}>🔥</Text>
                        <Text style={styles.streakNumber}>{streakDays}</Text>
                        <Text style={styles.streakText}>Day Streak</Text>
                    </View>
                    <View style={styles.achievementBadge}>
                        <Text style={styles.badgeEmoji}>🏆</Text>
                        <Text style={styles.badgeText}>{currentBadge}</Text>
                    </View>
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

                {/* Quick Add Expense Action */}
                <View style={styles.quickActionCard}>
                    <Text style={styles.quickActionTitle}>Track Today's Spending</Text>
                    <Text style={styles.quickActionSubtitle}>Keep your streak going! 🎯</Text>
                    <PrimaryButton onPress={onPressAddButton}>+ Add Expense</PrimaryButton>
                </View>


                {/* Show prompt if no income is set */}
                {(!monthlyIncome || monthlyIncome === 0) && (
                    <View style={styles.incomePrompt}>
                        <Text style={styles.promptText}>
                            💡 Set your monthly income in Settings to see your balance and get better insights!
                        </Text>
                    </View>
                )}

                {/* Button to clear expense data */}
                <Button title='Press me to clear' onPress={clearData}/>
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
        padding: 8,
        gap: 5
    },
    header : {
        paddingHorizontal: 16,
        paddingBottom: 8
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 8
    },
    clockIcon: {
        width: 30,
        height: 30,
        marginRight: 8,
        tintColor: Colors.title // Make our clock color match the theme
    },
    dateText: {
        fontSize: 16,
        color: Colors.subTitle,
        fontWeight: 500
    },
    welcomeText: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: 'left',
        marginVertical: 12,
        paddingBottom: 16,
        borderBottomColor: Colors.title,
        borderBottomWidth: 2,
        marginBottom: 8
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
        backgroundColor: Colors.background
    },
    contentContainer: {
        paddingVertical: 16,
        paddingBottom: 100,
    },

    // Badge and Streak
    badgeContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 8
    },
    streakBadge: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: Colors.orange,
        elevation: 2,
        shadowColor: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    streakEmoji: {
        fontSize: 24,
        marginBottom: 4
    },
    streakNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 2
    },
    streakText: {
        fontSize: 12,
        color: Colors.subTitle,
        fontWeight: '500'
    },
    achievementBadge: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: Colors.yellow,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    badgeEmoji: {
        fontSize: 24,
        marginBottom: 8
    },
    badgeText: {
        fontSize: 12,
        color: Colors.text,
        fontWeight: '600',
        textAlign: 'center'
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
    
    // Add Expense 
    quickActionCard: {
        backgroundColor: Colors.cardBackground,
        marginHorizontal: 16,
        marginVertical: 16,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    quickActionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4
    },
    quickActionSubtitle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
        marginBottom: 16
    }
})