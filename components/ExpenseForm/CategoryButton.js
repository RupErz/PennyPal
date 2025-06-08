import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'

const CategoryButton = () => {
    return (
        <Pressable
            style={styles.container}
        >
        </Pressable>
    )
}

export default CategoryButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 360,
        backgroundColor: Colors.blankWhite,
        minWidth: 25,
        minHeight: 25,
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    }
    
})