import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; // or whatever icon library you're using
import { Colors } from '../../constants/colors';


const PickDateButton = ({ date, onPress, label="Select Date" }) => {
    return (
        <TouchableOpacity 
            style={[
                styles.dateButton,
                date ? styles.dateButtonFilled : styles.dateButtonEmpty
            ]} 
            onPress={onPress}
        >
            <Text style={[
                styles.dateButtonText,
                date ? styles.dateButtonTextFilled : styles.dateButtonTextEmpty
            ]}>
                {date || label}
            </Text>
            <Ionicons 
                name="calendar-outline" 
                size={20} 
                color={date ? 'white' : Colors.grayFaded} 
            />
        </TouchableOpacity>
    )
}

export default PickDateButton

const styles = StyleSheet.create({
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        borderWidth: 1,
        minWidth: '45%',
        marginVertical: 5,
        paddingHorizontal: 15,
        minHeight: 40,
    },
    dateButtonEmpty: {
        backgroundColor: Colors.darkHeavy,
        borderColor: Colors.greenShine,
    },
    dateButtonFilled: {
        backgroundColor: Colors.darkHeavy,
        borderColor: Colors.greenShine,
    },
    dateButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    dateButtonTextEmpty: {
        color: Colors.grayFaded,
    },
    dateButtonTextFilled: {
        color: 'white',
    },
})