import React, { useContext, useEffect, useRef } from 'react'
import { Animated, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Title from '../../components/Title'
import BenefitsCard from '../../components/BenefitsCard'
import PrimaryButton from '../../components/PrimaryButton'
import { UserContext } from '../../store/user-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../../constants/colors'

const Benefits = ({navigation}) => {
    const {setOnboardingStep} = useContext(UserContext)
    const navigateToGetName = () => {
        setOnboardingStep("GetName")
        navigation.navigate('GetNameScreen');
    }

    // Animation values
    const titleAnim = useRef(new Animated.Value(0)).current
    const imageAnim = useRef(new Animated.Value(0)).current
    const card1Anim = useRef(new Animated.Value(0)).current
    const card2Anim = useRef(new Animated.Value(0)).current
    const card3Anim = useRef(new Animated.Value(0)).current
    const buttonAnim = useRef(new Animated.Value(0)).current
    const floatingAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        // Entrance animations
        Animated.sequence([
            Animated.timing(titleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }),
            Animated.timing(imageAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }),
            // Allowing Parallel animation
            Animated.stagger(200, [
                Animated.timing(card1Anim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(card2Anim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(card3Anim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(buttonAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            })
        ]).start()

        // Floating animation for decorativ elements
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatingAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(floatingAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        ).start()
    }, [])

    // Animations interpolations
    const titleTranslateY = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    })

    const imageScale = imageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
    })

    const imageRotate = imageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-5deg', '0deg'],
    })

    const cardAnimations = [card1Anim, card2Anim, card3Anim].map(anim => ({
        translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
        }),
        opacity: anim,
        scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
        }),
    }))

    const buttonScale = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
    })

    const floatingTranslateY = floatingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    })

    return (
        <SafeAreaView
            style={styles.safeArea}
        >
            <LinearGradient
                colors={['#000000', Colors.primary + '08', '#000000']}
                style={styles.container}
            >
                {/* Decorative floating elements */}
                <Animated.View
                    style={[
                        styles.floatingElement1,
                        {transform: [{translateY: floatingTranslateY}]}
                    ]}
                >
                    <Text style={styles.floatingIcon}>✨</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.floatingElement2,
                        {transform: [{translateY: floatingTranslateY}]}
                    ]}
                >
                    <Text style={styles.floatingIcon}>🎯</Text>
                </Animated.View>

                {/* Screen Content */}
                <View style={styles.content}>
                    {/* Title Section */}
                    <Animated.View
                        style={[styles.titleContainer,
                            {
                                transform: [{translateY: titleTranslateY}],
                                opacity: titleAnim
                            }
                        ]}
                    >
                        <Text style={styles.mainTitle}>We ensure you will be able to</Text>
                    </Animated.View>

                    {/* Image Section */}
                    <Animated.View
                        style={[styles.imageContainer,
                            {
                                transform: [
                                    {scale: imageScale},
                                    {rotate: imageRotate}
                                ]   ,
                                opacity: imageAnim
                            }
                        ]}
                    >
                        <View style={styles.imageBackground}>
                            <Image 
                                source={require('../../assets/ChikawaHello.png')}
                                style={styles.chikawaImage}
                                resizeMode="contain"
                            />
                        </View>
                    </Animated.View>

                    {/* Benefits Cards Section */}
                    <View style={styles.cardBox}>
                        {[
                            { text: 'Track Expenses', anim: cardAnimations[0]},
                            { text: 'See Insights', anim: cardAnimations[1]},
                            { text: 'Be Aware', anim: cardAnimations[2]},
                        ].map((item, index) => (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.cardWrapper,
                                    {
                                        transform: [
                                            {translateY: item.anim.translateY},
                                            {scale: item.anim.scale}
                                        ],
                                        opacity: item.anim.opacity
                                    }
                                ]}
                            >
                                <BenefitsCard>{item.text}</BenefitsCard>
                            </Animated.View>
                        ))}
                    </View>
                </View>

                {/* Button Selection */}
                <Animated.View
                    style={[styles.buttonContainer,
                        {
                            transform: [{ scale: buttonScale }],
                            opacity: buttonAnim
                        }
                    ]}
                >
                    <PrimaryButton onPress={navigateToGetName}>I got it! 🎉</PrimaryButton>
                </Animated.View>
                {/* <View style={styles.container}>
                <View style={styles.titleBox} >
                    
                    <View style={styles.cardBox}>
                        <BenefitsCard>Track Expenses</BenefitsCard>
                        <BenefitsCard>See Insights</BenefitsCard>
                        <BenefitsCard>Earn Badges</BenefitsCard>
                    </View>
                </View>
                <PrimaryButton onPress={navigateToGetName}>I got it!</PrimaryButton> */}
            </LinearGradient>
        </SafeAreaView>
        
    )
}

export default Benefits


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50
    },
    content: {
        flex: 1,
        justifyContent: 'center', // center
        alignItems: 'center'
    },
    titleBox: {
        marginTop: 20,
    },
    cardBox: {
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    floatingElement1: {
        position: 'absolute',
        top: 80,
        right: 30,
        opacity: 0.4,
        zIndex: 1
    },
    floatingElement2: {
        position: 'absolute',
        top: 150,
        left: 25,
        opacity: 0.4,
        zIndex: 1
    },
    floatingIcon: {
        fontSize: 20
    },
    titleContainer: {
        alignItems: 'center',
        paddingHorizontal: 20
    },
    mainTitle: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.title,
        lineHeight: 32
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    imageBackground: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 2,
        borderColor: Colors.primary + '30',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    chikawaImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    cardWrapper: {
        width: '90%'
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 30
    }
})