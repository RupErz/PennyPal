import React, { useState } from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '../constants/colors'

const Input = () => {
    const [name, setName] = useState('');

    const handleNameChange = (text) => {
        setName(text)
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Enter your name here'
                placeholderTextColor={Colors.grayFaded}
                style={styles.text}
                maxLength={20}
                keyboardType='default'
                autoCapitalize='words'
                value={name}
                onChangeText={handleNameChange}
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