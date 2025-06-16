import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MonthCard from '../components/History/MonthCard';

const History = () => {
    // Sample data - replace with your actual data from AsyncStorage/Context
        const monthlyData = [
            {
            id: '2024-07',
            year: '2024',
            month: 'July',
            income: 5000,
            totalSpent: 3250,
            must: 1500,
            nice: 1200,
            wasted: 550
            },
            {
            id: '2024-06',
            year: '2024',
            month: 'June',
            income: 5000,
            totalSpent: 2890,
            must: 1400,
            nice: 990,
            wasted: 500
            },
            {
            id: '2024-05',
            year: '2024',
            month: 'May',
            income: 5000,
            totalSpent: 3100,
            must: 1600,
            nice: 1100,
            wasted: 400
            },
            {
            id: '2023-12',
            year: '2023',
            month: 'December',
            income: 4800,
            totalSpent: 3500,
            must: 1800,
            nice: 1200,
            wasted: 500
            }
        ];
    

    return (
        <View style={styles.container}>
            <MonthCard data={monthlyData[0]} />
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})