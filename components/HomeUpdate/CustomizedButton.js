import React from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'

const CustomizedButton = ({children, onPress, type}) => {
    return (
        <View style={[styles.container, 
            type === "Add" ? {backgroundColor: Colors.buttonBackground} : {backgroundColor: Colors.blueWhite}
        ]}>
            <Pressable
                style={({ pressed }) => [styles.innerPressable, pressed && styles.pressed] }
                android_ripple={{ color: Colors.subTitle, borderless: true }}
                onPress={onPress}
            >
                {children}
            </Pressable>
        </View>
    )
}

export default CustomizedButton

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.buttonBackground,
        flex: 1,
        minHeight: height * 0.07,
        borderRadius: 12,
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
    pressed: {
        opacity: 0.75
    },
    innerPressable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',   
        padding: 10, // use Padding no margin to avoid clipping text
        gap: 12
    }
})