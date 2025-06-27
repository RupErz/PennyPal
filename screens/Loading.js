import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Image, StyleSheet, View } from 'react-native'
import { Colors } from '../constants/colors'

const Loading = () => {
    const spinValue = useRef(new Animated.Value(0)).current
    const fadeValue = useRef(new Animated.Value(0.5)).current

    useEffect(() => {
        // Spining Animation
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
                easing: Easing.linear // ensures smooth rotation
            }),
        )

        // Pulsing text animation
        const fadeAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeValue, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }),
                Animated.timing(fadeValue, {
                    toValue: 0.5,
                    duration: 800,
                    useNativeDriver: true
                })
            ])
        )
        
        spinAnimation.start()
        fadeAnimation.start()

        // Run when the component unmount or dependency change
        return () => {
            // Stop it to avoid memory leak
            spinAnimation.stop()
            fadeAnimation.stop()
        }
    }, [])

    // Mapping value with interpolations 
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <View style={styles.container}>
            {/* Loading Circle */}
            <Animated.View
                style={[
                    styles.loadingCircle,
                    {
                        transform: [{ rotate: spin }]
                    }
                ]}
                resizeMode="contain"
            >
                <Image 
                    source={require('../assets/ChikawaStaring.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Loading Text */}
            <Animated.Text
                style={[
                    styles.loadingText,
                    {
                        opacity: fadeValue
                    }
                ]}
            >
                Loading...
            </Animated.Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    },
    loadingCircle: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '300',
        letterSpacing: 0.7
    },
})