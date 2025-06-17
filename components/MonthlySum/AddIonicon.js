import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const AddIonicon = ({defaultMonth, defaultYear, context}) => {
    const navigation = useNavigation()
    const goToAddForm = () => {
        navigation.navigate("ManageExpense", {
            defaultMonth: defaultMonth,
            defaultYear: defaultYear,
            context: context
        })
    }
    return (
        <Pressable
            style={({pressed}) => [styles.container, pressed && styles.pressed]}
            onPress={goToAddForm}
        >
            <Ionicons name="add-circle" size={40} color="black" />
        </Pressable>
    )
}

export default AddIonicon

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4 // Add padding for better interaction when user touching by hand
    },
    pressed: {
        opacity: 0.75
    }
})