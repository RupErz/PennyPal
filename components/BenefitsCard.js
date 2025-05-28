import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Title from './Title'
import { Colors } from '../constants/colors'

const BenefitsCard = ({children}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.innerText}>{children}</Text>
        </View>
    )
}

export default BenefitsCard

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        width: width * 0.6, // 80% of screen width
        height: height * 0.1, // 10% of screen height
        borderRadius: 20,
        marginVertical: 20
    },
    innerText: {
        fontSize: 20,
        color: Colors.text,
        fontFamily: "Monsterat_400Regular"
    }
})