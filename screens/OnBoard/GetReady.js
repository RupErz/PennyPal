import { CommonActions } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { UserContext } from '../../store/user-context'

const GetReady = ({route, navigation, setHasOnBoarded}) => {
    const {userName, monthlyIncome, hasCompletedOnboarding} = useContext(UserContext)
    console.log(userName)
    console.log(monthlyIncome)
    console.log(hasCompletedOnboarding)
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