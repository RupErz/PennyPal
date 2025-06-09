import React, { useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const GetCurrentDateButton = ({children, onPress}) => {
   
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.innerPressable, pressed && styles.pressed] }
                android_ripple={{ color: Colors.subTitle, borderless: true }}
                onPress={onPress}
            >
                <Text style={styles.text}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default GetCurrentDateButton

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
     container: {
        backgroundColor: Colors.greenShine,
        minWidth: width * 0.3,
        minHeight: 45,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    innerPressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
        padding: 10 // use Padding no margin to avoid clipping text
    },  
    text: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    }
})