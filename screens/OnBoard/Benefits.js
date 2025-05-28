import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Title from '../../components/Title'
import BenefitsCard from '../../components/BenefitsCard'
import PrimaryButton from '../../components/PrimaryButton'

const Benefits = ({navigation}) => {
    const navigateToGetName = () => {
        navigation.navigate('GetNameScreen');
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleBox} >
                <Title>We ensure you will be able to</Title>
                <View style={styles.cardBox}>
                    <BenefitsCard>Track Expenses</BenefitsCard>
                    <BenefitsCard>See Insights</BenefitsCard>
                    <BenefitsCard>Earn Badges</BenefitsCard>
                </View>
            </View>
            <PrimaryButton onPress={navigateToGetName}>I got it!</PrimaryButton>
        </View>
    )
}

export default Benefits

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 150
    },
    titleBox: {
        marginTop: 20,
    },
    cardBox: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})