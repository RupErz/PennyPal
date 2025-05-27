import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

const GetReady = ({route, navigation, setHasOnBoarded}) => {
    return (
        <View>
            <Text>Congratulations things all done let get started.</Text>
            <Button
                title='Go to Dashboard'
                onPress={() => {
                    setHasOnBoarded(true);
                }}
            />
        </View>
    )
}

export default GetReady