import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ExpenseCard from '../components/ExpenseCard'
import { UserContext } from '../store/user-context'
import { formatCurrency, getCurrentDate } from '../util/utility'
import Title from '../components/Title'
import { Colors } from '../constants/colors'
import PrimaryButton from '../components/PrimaryButton'

const Home = () => {
    const {userName, monthlyIncome} = useContext(UserContext)
    
    // Mock data for now, will replace with data from context / database later
    const totalSpent = 15000 
    const balance = monthlyIncome && monthlyIncome > 0 ? monthlyIncome - totalSpent : null
    
    const createFinanceData = () => {
        const hasIncome = monthlyIncome && monthlyIncome > 0
        return [
            {
                label: "Income",
                expense: hasIncome ? formatCurrency(monthlyIncome) : "xxxx"
            },
            {
                label: "Spent",
                expense: formatCurrency(totalSpent)
            },
            {
                label: "Balance",
                expense: hasIncome ? formatCurrency(balance) : "xxxx"
            }
        ]
    }
    
    const userFinance = createFinanceData()
    // Create category breakdown data (mock for now - will be fetched from user data later)
    const categoryData = [
        { label: "Must Have", expense: "xxxx", type: "must" },
        { label: "Nice to Have", expense: "xxxx", type: "nice" },
        { label: "Wasted", expense: "xxxx", type: "wasted" }
    ]

    const current_date = getCurrentDate()

    return (
        <View style={styles.container}>
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
            
            
            <View style={styles.content}>
                <ExpenseCard 
                    title="Personal Finance"
                    expenseData={userFinance}
                />
                <ExpenseCard 
                    title="Spending Categories"
                    expenseData={categoryData}
                />
            </View>
            

            {/* Show prompt if no income is set */}
            {(!monthlyIncome || monthlyIncome === 0) && (
                <View style={styles.incomePrompt}>
                    <Text style={styles.promptText}>
                        💡 Set your monthly income in Settings to see your balance and get better insights!
                    </Text>
                </View>
            )}

            {/* I was thinking whether this is needed ? */}
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <PrimaryButton>View Analytics</PrimaryButton>
                </View>
                <View style={styles.button}>
                    <PrimaryButton>History</PrimaryButton>
                </View>
               
            </View>
        </View>
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
    }
})