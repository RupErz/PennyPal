import React from 'react'
import { Button, Text, View } from 'react-native'

const GetIncome = ({route, navigation}) => {
    return (
        <View>
            <Text>What is your income ?</Text>
            <Button
                title='Next'
                onPress={() => navigation.navigate('GetReadyScreen')}
            /> 
        </View>
    )
}

export default GetIncome