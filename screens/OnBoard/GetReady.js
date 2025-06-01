import { CommonActions } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../../store/user-context'
import Title from '../../components/Title'
import PrimaryButton from '../../components/PrimaryButton'

const GetReady = ({route, navigation, setHasOnBoarded}) => {
    const confirmedUser = () => {
        setHasOnBoarded(true)
    }
    
    return (
        <View style={styles.container}> 
            <Title>Yay, you are all set!!!</Title>
            <Image 
                source={require('../../assets/congrat-person.png')}
                style={styles.image}
            />
            <PrimaryButton onPress={confirmedUser}>Go to Dashboard</PrimaryButton>
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
    }
})