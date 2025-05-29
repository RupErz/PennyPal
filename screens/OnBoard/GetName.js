import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Title from '../../components/Title'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'

const GetName = ({route, navigation}) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/HappyFace.png')}
                style={styles.image}
            />
            <View style={styles.titleContainer}>
                <Title>May we know your name ?</Title>
            </View>
            <Input />
            <View style={styles.buttonContainer}>
                <PrimaryButton>Next</PrimaryButton>
            </View>
        </View>
    )
}

export default GetName


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 150
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    titleContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 20
    }
})