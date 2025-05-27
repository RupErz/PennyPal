import React from 'react'
import { Button, Text, View } from 'react-native'

const Welcome = ({route, navigation}) => {
    return (
        <View>
            <Text>Welcome to the App !!!</Text>
            <Button 
                title='Get Started'
                onPress={() => navigation.navigate('GetNameScreen')}
            />
        </View>
    )
}

export default Welcome