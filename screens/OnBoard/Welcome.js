import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import PrimaryButton from '../../components/PrimaryButton'
import Title from '../../components/Title'
import { UserContext } from '../../store/user-context'

const Welcome = ({route, navigation}) => {
    const {setOnboardingStep} = useContext(UserContext)
    const navigateToBenefits = () => {
        setOnboardingStep("GetBenefits")
        navigation.navigate('BenefitsScreen');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imagePosition}>
                <Image 
                    source={require('../../assets/logo/Logo.png')}
                    style={styles.logoImg}
                />
                <Title marginTop={20}>Track Smarter, Spend Better</Title>
                <Title>with PennyPal</Title>
            </View>
            <PrimaryButton onPress={navigateToBenefits}>Get Started</PrimaryButton>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    logoImg: {
        width: 200,
        height: 200,
    },
    imagePosition: {
        position: 'absolute',
        top: 150,
        alignItems: 'center',
        width: '100%',
    },
    titlez: {
        marginTop: 200
    }
})