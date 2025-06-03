import React, { useState } from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '../constants/colors'

const Input = ({value, onChangeText, style, placeholderText, keyboardType}) => {

    return (
        <View style={[styles.inputContainer, style]}>
            <TextInput 
                placeholder={placeholderText}
                placeholderTextColor={Colors.grayFaded}
                style={styles.text}
                maxLength={20}
                keyboardType={keyboardType || 'default'}
                autoCapitalize='words'
                value={value}
                onChangeText={onChangeText}
                allowFontScaling={false}
                autoFocus={true}
            />
        </View>
    )
}

export default Input

const { width, height } = Dimensions.get('window'); 

const styles = StyleSheet.create({
    inputContainer: {
        width: '80%',
        height: 50,
        backgroundColor: Colors.inputBackground,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 10,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: Colors.background,
        fontFamily: "Monsterat_400Regular",
        textAlign: 'left',
        height: '100%',
        fontWeight: 'normal'
    }
})