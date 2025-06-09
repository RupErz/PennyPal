import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const CategoryTitle = ({children, isValid}) => {
    return (
        <View>
            <Text style={[styles.text, !isValid && styles.invalid]}>{children}</Text>
        </View>
    )
}

export default CategoryTitle

const styles = StyleSheet.create({
    text: {
        color: Colors.subTitle,
        fontSize: 23,
        fontWeight: 'bold',
    },
    invalid: {
        color: Colors.redAlert
    }
})