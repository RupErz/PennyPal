import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({name, color, size, onPress}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.buttonContainer}>
                <Ionicons name={name} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton
const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    }
})