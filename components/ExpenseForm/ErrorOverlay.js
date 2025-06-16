import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const ErrorOverlay = ({message}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={[styles.text]}>{message}</Text>
        </View>
    )
}

export default ErrorOverlay
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 24, 
        backgroundColor: Colors.redSmooth
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})