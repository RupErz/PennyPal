import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const ViewAllButton = ({onPress, children}) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.innerPressable, pressed && styles.pressed] }
                android_ripple={{ color: Colors.subTitle, borderless: true }}
                onPress={onPress}
            >
                <Text style={styles.text}>
                    {children}
                </Text>
            </Pressable>
        </View>
    )
}

export default ViewAllButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.title,
        minWidth: '80%', // To enable ripple u need fixed width and height
        height: 50,
        borderRadius: 20,
        marginTop: 20,
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
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    innerPressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
        padding: 10
    },
    pressed: {
        opacity: 0.75
    }
})