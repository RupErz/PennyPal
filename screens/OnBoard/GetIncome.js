import React, { useContext, useState, useEffect, useRef } from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import { UserContext } from '../../store/user-context'
import Title from '../../components/Title'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import { Colors } from '../../constants/colors'

const GetIncome = ({route, navigation}) => {
  const {monthlyIncome, setMonthlyIncome, setOnboardingStep} = useContext(UserContext)
  // Keep user raw input as string
  const [stringIncome, setStringIncome] = useState("")
  // As number for calculations
  const [incomeInput, setIncomeInput] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const errorSlideAnim = useRef(new Animated.Value(-20)).current
  const errorOpacityAnim = useRef(new Animated.Value(0)).current
  const inputScaleAnim = useRef(new Animated.Value(1)).current
  const successAnim = useRef(new Animated.Value(1)).current
  const warningPulseAnim = useRef(new Animated.Value(1)).current
  const shakeAnim = useRef(new Animated.Value(0)).current

  // Screen entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start()
  }, [])

  // Error message animation
  useEffect(() => {
    if (errorMessage) {
      // Shake input field
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start()

      // Slide in error message
      Animated.parallel([
        Animated.timing(errorSlideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(errorOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start()
    } else {
      // Hide error message
      Animated.parallel([
        Animated.timing(errorSlideAnim, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(errorOpacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start()
    }
  }, [errorMessage])

  const handleIncomeChange = (income) => {
    setStringIncome(income)
    setErrorMessage("") // Reset error message on input change
  }

  const handleInputFocus = () => {
    Animated.spring(inputScaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start()
  }

  const handleInputBlur = () => {
    Animated.spring(inputScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const animateSuccess = () => {
    Animated.sequence([
      Animated.spring(successAnim, {
        toValue: 1.05,
        useNativeDriver: true,
      }),
      Animated.spring(successAnim, {
        toValue: 1,
        useNativeDriver: true,
      })
    ]).start()
  }

  const startWarningPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(warningPulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(warningPulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start()
  }

  const stopWarningPulse = () => {
    warningPulseAnim.stopAnimation()
    Animated.timing(warningPulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const incomeConsent = () => {
    if (!stringIncome.trim()) {
      setErrorMessage("Income cannot be empty if you consent");
      return;
    }

    // Step 1: Remove all spaces
    let input = stringIncome.trim().replace(/\s/g, '');

    // Step 2: If input contains commas AND dots
    if (input.includes(',') && input.includes('.')) {
      // Assume last separator (dot or comma) is decimal separator
      const lastDot = input.lastIndexOf('.');
      const lastComma = input.lastIndexOf(',');

      const decimalSeparator = lastDot > lastComma ? '.' : ',';

      // Remove all thousands separators (either ',' or '.') except the decimal separator
      input = input
        .split('')
        .filter((char, idx) => {
          if (char === '.' || char === ',') {
            return idx === (decimalSeparator === '.' ? lastDot : lastComma);
          }
          return true;
        })
        .join('');

      // Replace decimal separator with dot if needed (if decimal separator was comma)
      if (decimalSeparator === ',') {
        input = input.replace(',', '.');
      }

    } else if (input.includes(',')) {
      // Only commas exist, assume commas are thousands separators, remove all commas
      input = input.replace(/,/g, '');
    }
    // else only dots or no separators → keep as is (dot is decimal separator)

    const parsed = parseFloat(input);

    console.log("Parsed:", parsed);

    if (isNaN(parsed) || parsed <= 0) {
      setErrorMessage("Please enter a valid income amount using '.' as decimal separator");
      return;
    }

    animateSuccess();

    setTimeout(() => {
      setIncomeInput(parsed);
      setMonthlyIncome(parsed); // Store as number
      setOnboardingStep("GetReady");
      navigation.navigate("GetReadyScreen");
    }, 300);
  };


  const incomeSkip = () => {
    setIncomeInput(0) // Set to empty value
    setStringIncome("") // Reset the string input
    setMonthlyIncome(0)
    setOnboardingStep("GetReady")
    navigation.navigate("GetReadyScreen") 
  }
    
  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Title>To maximize your experience</Title>
      <Title>Do you mind giving us your</Title>
      <Title>monthly Income</Title>

      <Animated.View
        style={{
          transform: [
            { scale: inputScaleAnim },
            { scale: successAnim },
            { translateX: shakeAnim }
          ]
        }}
      >
        <Input 
          value={stringIncome} 
          onChangeText={handleIncomeChange} 
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{marginTop: 35, marginBottom: 10}}
          placeholderText={"Enter Your Estimated Monthly Income"}
          keyboardType={'numeric'}
        />
      </Animated.View>
      
      <Text style={styles.hintMessage}>Please enter your income using digits only.</Text>
      <Text style={styles.hintMessage}>Use a dot (.) as the decimal separator for cents.</Text>
      <Text style={styles.hintMessage}>E.g: 12 000 / 12000 / 12 000.56 </Text>
      <View style={styles.errorMsgContainer}>
        {errorMessage !== "" && (
          <Animated.Text 
            style={[
              styles.warningText,
              {
                opacity: errorOpacityAnim,
                transform: [{ translateY: errorSlideAnim }]
              }
            ]}
          >
            {errorMessage}
          </Animated.Text>
        )}
      </View>

      <PrimaryButton onPress={incomeConsent}>I Consent</PrimaryButton>
      
      <PrimaryButton 
        onPress={incomeSkip}
        onPressIn={startWarningPulse}
        onPressOut={stopWarningPulse}
      >
        Skip for now
      </PrimaryButton>
      
      <Animated.View 
        style={[
          styles.warningContainer,
          {
            transform: [{ scale: warningPulseAnim }]
          }
        ]}
      >
        <Image source={require('../../assets/warning-sign.png')} />
        <Text style={styles.warningText}>If you skip, you will have limited features</Text>
        <Image source={require('../../assets/warning-sign.png')} />
      </Animated.View>
        
    </Animated.View>
  )
}

export default GetIncome

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: height * 0.15
    },
    warningContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
    },
    warningText: {
      color: Colors.redAlert,
      fontSize: 16,
      fontFamily: "Monsterat_400Regular",
      textAlign: 'center',
      marginHorizontal: 20,
    },
    errorMsgContainer: {
      height: 20,
      marginTop: 40,
    },
    hintMessage: {
      color: Colors.grayFaded,
      fontSize: 18,
      fontFamily: "Monsterat_400Regular",
    },
})