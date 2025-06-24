import { CommonActions } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Alert, Button, Dimensions, Image, Platform, StyleSheet, Switch, Text, View } from 'react-native'
import { UserContext } from '../../store/user-context'
import Title from '../../components/Title'
import PrimaryButton from '../../components/PrimaryButton'
import { Colors } from '../../constants/colors'

const GetReady = ({route, navigation, setHasOnBoarded}) => {
    const {hasCompletedOnboarding, setHasCompletedOnboarding, setOnboardingStep, setDailyReminders} = useContext(UserContext)

    const confirmedUser = () => {
        setOnboardingStep("Completed")
        setHasCompletedOnboarding(true)
        setHasOnBoarded(true)
    }

    return (
        <View style={styles.container}> 
            <Title>Yay, you are all set!!!</Title>
            <Image 
                source={require('../../assets/congrat-person.png')}
                style={styles.image}
            />
            <Text style={styles.description}>
                Ready to take control of your finances? Let's get started on your journey to better money management.
            </Text>

            <PrimaryButton onPress={confirmedUser}>
                Go to Dashboard
            </PrimaryButton>
        </View>
    )
}

export default GetReady

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: height * 0.2,
        alignItems: 'center',
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 40,
        lineHeight: 22,
    },
})