import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/colors'

const ExpenseInput = ({label, textInputConfig}) => {
    return (
        <View style={styles.expenseDiplayContainer}>
            <TextInput 
                placeholder={label}
                placeholderTextColor={Colors.grayFaded}
                style={styles.innerInput}
                allowFontScaling={false}
                autoFocus={true}
                {...textInputConfig}
            />
        </View>
    )
}

export default ExpenseInput

const styles = StyleSheet.create({
    expenseDiplayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkHeavy,
        borderRadius: 12,
        borderColor: Colors.greenShine,
        borderWidth: 1,
        minWidth: '45%',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    innerInput: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        minHeight: 40,  // Add this
        width: '100%',  // Add this
    }
})