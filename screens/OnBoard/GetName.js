import React, { useContext, useState, useEffect, useRef } from 'react'
import { Dimensions, Image, StyleSheet, Text, View, Animated } from 'react-native'
import Title from '../../components/Title'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import { Colors } from '../../constants/colors'
import { UserContext } from '../../store/user-context'

const GetName = ({route, navigation}) => {
    const [userInput, setUserInput] = useState("");
    const [isValid, setIsValid] = useState(true)

    const {userName, setUserName, setOnboardingStep} = useContext(UserContext)

    // Animation refs
    const imageAnim = useRef(new Animated.Value(0)).current
    const titleAnim = useRef(new Animated.Value(0)).current
    const inputAnim = useRef(new Animated.Value(0)).current
    const buttonAnim = useRef(new Animated.Value(0)).current
    const alertAnim = useRef(new Animated.Value(0)).current
    const floatingAnim = useRef(new Animated.Value(0)).current
    const shakeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        // Entrance animations with staggered timing
        Animated.sequence([
            Animated.timing(imageAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(titleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }),
            Animated.timing(inputAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(buttonAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]).start()

        // Subtle floating animation for the image
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatingAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true
                }),
                Animated.timing(floatingAnim, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true
                })
            ])
        ).start()
    }, [])

    // Shake animation for invalid input
    const triggerShake = () => {
        shakeAnim.setValue(0)
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(shakeAnim, {
                toValue: -1,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(shakeAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            })
        ]).start()
    }

    // Alert slide-in animation
    useEffect(() => {
        if (!isValid) {
            Animated.timing(alertAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(alertAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start()
        }
    }, [isValid])

    const handleNameChange = (name) => {
        setUserInput(name)
        if (!isValid) setIsValid(true)
    } 

    const confirmName = () => {
        if (userInput.trim() === "") {
            setIsValid(false)
            triggerShake()
            return;
        }

        // Exit animation before navigation
        Animated.parallel([
            Animated.timing(imageAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(titleAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(inputAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(buttonAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => {
            setUserName(userInput.trim())
            setOnboardingStep("GetIncome")
            navigation.navigate("GetIncomeScreen")
        })
    }

    // Animation interpolations
    const imageScale = imageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    })

    const imageOpacity = imageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const floatingTranslateY = floatingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8]
    })

    const titleTranslateY = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
    })

    const inputTranslateY = inputAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0]
    })

    const buttonScale = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1]
    })

    const alertTranslateY = alertAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 0]
    })

    const shakeTranslateX = shakeAnim.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [-10, 0, 10]
    })

    return (
        <View style={styles.container}>
            <Animated.View style={{
                opacity: imageOpacity,
                transform: [
                    { scale: imageScale },
                    { translateY: floatingTranslateY }
                ]
            }}>
                <Image 
                    source={require('../../assets/ChikawaStaring.png')}
                    style={styles.image}
                />
            </Animated.View>
            
            <Animated.View style={[
                styles.titleContainer,
                {
                    opacity: titleAnim,
                    transform: [{ translateY: titleTranslateY }]
                }
            ]}>
                <Title>May we know your name ?</Title>
            </Animated.View>
            
            <Animated.View style={{
                opacity: inputAnim,
                transform: [
                    { translateY: inputTranslateY },
                    { translateX: shakeTranslateX }
                ]
            }}>
                <Input 
                    value={userInput} 
                    onChangeText={handleNameChange} 
                    placeholderText={"Enter Your Name Here"}
                />
            </Animated.View>
            
            <Animated.View style={[
                styles.alertContainer,
                {
                    opacity: alertAnim,
                    transform: [{ translateY: alertTranslateY }]
                }
            ]}>
                {!isValid && (
                    <Text style={styles.alertText}>Your name cannot be empty.</Text>
                )}
            </Animated.View>
            
            <Animated.View style={[
                styles.buttonContainer,
                {
                    opacity: buttonAnim,
                    transform: [{ scale: buttonScale }]
                }
            ]}>
                <PrimaryButton onPress={confirmName}>Next</PrimaryButton>
            </Animated.View>
        </View>
    )
}

export default GetName

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 150
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    titleContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 20
    },
    alertText: {
        color: Colors.redAlert,
        fontSize: 15
    },
    alertContainer: {
        height: 20,
        marginTop: 10
    }
})