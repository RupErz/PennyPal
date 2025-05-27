import React from 'react'
import { Button, Text, View } from 'react-native'

const GetName = ({route, navigation}) => {
    return (
        <View>
            <Text>What is ur name?</Text>
            <Button
                title='Next'
                onPress={() => navigation.navigate('GetIncomeScreen')}
            />
        </View>
    )
}

export default GetName