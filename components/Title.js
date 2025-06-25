import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'


const Title = ({ children, marginTop, style }) => {
    return (
        <View style={[styles.container, {marginTop: marginTop}]}>
            <Text style={[styles.title, style]}>{children}</Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30, // or 24
        color: Colors.title,
        fontWeight: 'bold'
    },
})