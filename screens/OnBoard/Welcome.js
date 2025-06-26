import React, { useContext, useEffect, useRef } from 'react'
import { Animated, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import PrimaryButton from '../../components/PrimaryButton'
import Title from '../../components/Title'
import { UserContext } from '../../store/user-context'
import { LinearGradient } from 'expo-linear-gradient'

const Welcome = ({route, navigation}) => {
    const {setOnboardingStep} = useContext(UserContext)
    const navigateToBenefits = () => {
        setOnboardingStep("GetBenefits")
        navigation.navigate('BenefitsScreen');
    }

    // Animated Values
    const logoAnim = useRef(new Animated.Value(0)).current
    const titleAnim = useRef(new Animated.Value(0)).current
    const subtitleAnim = useRef(new Animated.Value(0)).current
    const buttonAnim = useRef(new Animated.Value(0)).current
    const floatingAnim1 = useRef(new Animated.Value(0)).current
    const floatingAnim2 = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(titleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }),
            Animated.timing(subtitleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }),
            Animated.timing(buttonAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            })
        ]).start()

        // Floating animations
        const createFloatingAnimation = (animValue) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(animValue, {
                        toValue: 1,
                        duration: 3000,
                        useNativeDriver: true
                    }),
                    Animated.timing(animValue, {
                        toValue: 0,
                        duration: 3000,
                        useNativeDriver: true
                    })
                ])
            )
        }

        createFloatingAnimation(floatingAnim1).start()
        setTimeout(() => createFloatingAnimation(floatingAnim2).start(), 1500)
    }, [])

    // Map the animated value from 1 range to another
    const logoScale = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1]
    })

    const logoOpacity = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const titleTranslateY = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
    })

    const subtitleTranslateY = subtitleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
    })

    const buttonScale = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1]
    })

    const floating1TranslateY = floatingAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20]
    })

    const floating2TranslateY = floatingAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -15]
    })

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#000000', Colors.primary + '10', '#000000']}
                style={styles.container}
            >
                {/* Floating Element */}
                <Animated.View
                    style={[
                        styles.floatingElement1,
                        {
                            transform: [{translateY: floating1TranslateY}]
                        }
                    ]}
                >
                    <Text style={styles.floatingIcon}>💰</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.floatingElement2,
                        {
                            transform: [{translateY: floating2TranslateY}]
                        }
                    ]}
                >
                    <Text style={styles.floatingIcon}>💳</Text>
                </Animated.View>

                <View style={styles.content}>
                    {/* Logo Section */}
                    <Animated.View
                        style={[
                            styles.logoContainer,
                            {
                                transform: [{scale: logoScale}],
                                opacity: logoOpacity
                            }
                        ]}
                    >
                        <View style={styles.logoBackground}>
                             <Image 
                                source={require('../../assets/logo/AppLogo.png')}
                                style={styles.logoImg}
                            />
                        </View>
                    </Animated.View>

                    {/* Title Section */}
                    <Animated.View
                        style={[
                            styles.titleContainer, 
                            {
                                transform: [{translateY: titleTranslateY}],
                                opacity: titleAnim
                            }
                        ]}
                    >
                        <Title marginTop={20}>Track Smarter, Spend Better</Title>
                        <Title>with PennyPal</Title>
                    </Animated.View>

                    {/* Subtitle Section */}
                    <Animated.View
                        style={[
                            styles.subtitleContainer,
                            {
                                transform: [{ translateY: subtitleTranslateY }],
                                opacity: subtitleAnim
                            }
                        ]}
                    >
                        <Text style={styles.subTitle}>
                            Your personal finance companion for smarter spending decisions
                        </Text>
                    </Animated.View>

                    {/* Features Preview */}
                    <Animated.View
                        style={[
                            styles.featuresContainer,
                            {
                                opacity: subtitleAnim
                            }
                        ]}
                    >
                        <View style={styles.featureItem}>
                            <Text style={styles.featureIcon}>📊</Text>
                            <Text style={styles.featureText}>Track Expenses</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Text style={styles.featureIcon}>🎯</Text>
                            <Text style={styles.featureText}>Aim Goals</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Text style={styles.featureIcon}>💡</Text>
                            <Text style={styles.featureText}>Smart Insights</Text>
                        </View>
                    </Animated.View>
                </View>

                {/* Button Section */}
                <Animated.View
                    style={[
                        styles.buttonContainer,
                        {
                            transform: [{ scale: buttonScale }],
                            opacity: buttonAnim
                        }
                    ]}
                >
                    <PrimaryButton onPress={navigateToBenefits}>Get Started</PrimaryButton>
                </Animated.View>
            </LinearGradient>
        </SafeAreaView>
        
    )
}

export default Welcome

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 90,
        // borderWidth: 2,
        // borderColor: 'white'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logoImg: {
        width: 200,
        height: 200,
    },
    imagePosition: {
        position: 'absolute',
        top: 150,
        alignItems: 'center',
        width: '100%',
    },
    titlez: {
        marginTop: 200
    },
    // Floating transition
    floatingElement1: {
        position: 'absolute',
        top: 150,
        right: 30,
        opacity: 0.4
    },
    floatingElement2: {
        position: 'absolute',
        top: 200,
        left: 40,
        opacity: 0.4
    },
    floatingIcon: {
        fontSize: 20
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoBackground: {
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.4,
        shadowRadius: 25,
        elevation: 15,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    subtitleContainer: {
        paddingHorizontal: 30,
        marginBottom: 30
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.textLightGray,
        letterSpacing: 0.7,
        lineHeight: 24,
        fontWeight: '400'
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    featureItem: {
        alignItems: 'center',
        flex: 1
    },
    featureIcon: {
        fontSize: 24,
        marginBottom: 8
    },
    featureText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '500',
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center'
    },
})