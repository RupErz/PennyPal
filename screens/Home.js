import React from 'react'
import { Text, View } from 'react-native'
import ExpenseCard from '../components/ExpenseCard'

const Home = () => {
    
    return (
        <View>
            <Text>This is Home Screen</Text>
            <ExpenseCard />
        </View>
    )
}

export default Home