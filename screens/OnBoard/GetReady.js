import { CommonActions } from '@react-navigation/native'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { Alert, Button, Dimensions, Image, Platform, StyleSheet, Switch, Text, View, Animated } from 'react-native'
import { UserContext } from '../../store/user-context'
import Title from '../../components/Title'
import PrimaryButton from '../../components/PrimaryButton'
import { Colors } from '../../constants/colors'

const GetReady = ({route, navigation, setHasOnBoarded}) => {
    const {hasCompletedOnboarding, setHasCompletedOnboarding, setOnboardingStep, setDailyReminders} = useContext(UserContext)

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideUpAnim = useRef(new Animated.Value(50)).current
    const imageScaleAnim = useRef(new Animated.Value(0)).current
    const imageBounceAnim = useRef(new Animated.Value(1)).current
    const titleScaleAnim = useRef(new Animated.Value(0.8)).current
    const descriptionSlideAnim = useRef(new Animated.Value(30)).current
    const descriptionOpacityAnim = useRef(new Animated.Value(0)).current
    const buttonSlideAnim = useRef(new Animated.Value(40)).current
    const buttonOpacityAnim = useRef(new Animated.Value(0)).current
    const buttonScaleAnim = useRef(new Animated.Value(1)).current
    const celebrationRotateAnim = useRef(new Animated.Value(0)).current

    // Screen entrance animation sequence
    useEffect(() => {
        // Start the celebration sequence
        const animationSequence = Animated.sequence([
            // 1. Fade in container and slide up
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(slideUpAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                })
            ]),
            
            // 2. Pop in title with scale
            Animated.spring(titleScaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 6,
                useNativeDriver: true,
            }),
            
            // 3. Scale up image dramatically then settle
            Animated.spring(imageScaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 6,
                useNativeDriver: true,
            }),
            
            // 4. Slide in description
            Animated.parallel([
                Animated.timing(descriptionSlideAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(descriptionOpacityAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                })
            ]),
            
            // 5. Finally, slide in button
            Animated.parallel([
                Animated.timing(buttonSlideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonOpacityAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ])
        ])

        animationSequence.start(() => {
            // Start continuous celebration animations
            startCelebrationAnimations()
        })
    }, [])

    const startCelebrationAnimations = () => {
        // Gentle bounce animation for the image
        Animated.loop(
            Animated.sequence([
                Animated.timing(imageBounceAnim, {
                    toValue: 1.05,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(imageBounceAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start()

        // Subtle rotation celebration for the whole screen
        Animated.loop(
            Animated.sequence([
                Animated.timing(celebrationRotateAnim, {
                    toValue: 1,
                    duration: 8000,
                    useNativeDriver: true,
                }),
                Animated.timing(celebrationRotateAnim, {
                    toValue: 0,
                    duration: 8000,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }

    const handleButtonPress = () => {
        // Button press animation
        Animated.sequence([
            Animated.spring(buttonScaleAnim, {
                toValue: 0.95,
                tension: 300,
                friction: 10,
                useNativeDriver: true,
            }),
            Animated.spring(buttonScaleAnim, {
                toValue: 1.05,
                tension: 300,
                friction: 10,
                useNativeDriver: true,
            }),
            Animated.spring(buttonScaleAnim, {
                toValue: 1,
                tension: 300,
                friction: 10,
                useNativeDriver: true,
            })
        ]).start(() => {
            // Execute the original function after animation
            confirmedUser()
        })
    }

    const confirmedUser = () => {
        setOnboardingStep("Completed")
        setHasCompletedOnboarding(true)
        setHasOnBoarded(true)
    }

    const rotateInterpolation = celebrationRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '2deg']
    })

    return (
        <Animated.View 
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [
                        { translateY: slideUpAnim },
                        { rotate: rotateInterpolation }
                    ]
                }
            ]}
        > 
            <Animated.View
                style={{
                    transform: [{ scale: titleScaleAnim }]
                }}
            >
                <Title>Yay, you are all set!!!</Title>
            </Animated.View>
            
            <Animated.Image 
                source={require('../../assets/congrat-person.png')}
                style={[
                    styles.image,
                    {
                        transform: [
                            { scale: imageScaleAnim },
                            { scale: imageBounceAnim }
                        ]
                    }
                ]}
            />
            
            <Animated.Text 
                style={[
                    styles.description,
                    {
                        opacity: descriptionOpacityAnim,
                        transform: [{ translateY: descriptionSlideAnim }]
                    }
                ]}
            >
                Ready to take control of your finances? Let's get started on your journey to better money management.
            </Animated.Text>

            <Animated.View
                style={{
                    opacity: buttonOpacityAnim,
                    transform: [
                        { translateY: buttonSlideAnim },
                        { scale: buttonScaleAnim }
                    ]
                }}
            >
                <PrimaryButton onPress={handleButtonPress}>
                    Go to Dashboard
                </PrimaryButton>
            </Animated.View>
        </Animated.View>
    )
}

export default GetReady

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: height * 0.2,
        alignItems: 'center',
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 40,
        lineHeight: 22,
    },
})