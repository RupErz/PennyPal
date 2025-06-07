import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../constants/colors'

const RadioButton = ({inputs, category, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.categoryOption}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.radioButton}>
                {inputs.category.value === category && 
                (
                    <View style={styles.radioButtonSelected} />
                )}
            </View>
            <Text style={styles.categoryTitle}>{category}</Text>
        </TouchableOpacity>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    categoryOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 7,
        borderWidth: 2, // Test
    },
    categoryTitle: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',
        flex: 1
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.buttonBackground,
        backgroundColor: 'transparent',
        // Center the inner circle when being chosen
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.buttonBackground
    }
})