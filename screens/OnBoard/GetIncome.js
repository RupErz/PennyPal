import React, { useContext, useState } from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
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

  const handleIncomeChange = (income) => {
    setStringIncome(income)
    setErrorMessage("") // Reset error message on input change
  }

  const incomeConsent = () => {
    // If user press "I Consent" button -> They cannot leave empy input
    if (!stringIncome.trim()) {
      setErrorMessage("Income cannot be empty if you consent")
      return;
    }

    // Replace commas with dots
    let normalized = stringIncome.replace(/,/g, '.').trim();

    // Remove spaces and keep digits and only the first dot
    let clean = "";
    let dotFound = false;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (char >= '0' && char <= '9') {
        clean += char;
      } else if (char === '.' && !dotFound) {
        clean += '.';
        dotFound = true;
      }
      // Ignore everything else (like spaces, extra dots, etc.)
    }

    const parsed = parseFloat(clean);
    console.log("Parsed:", parsed);

    if (isNaN(parsed) || parsed <= 0) {
      setErrorMessage("Please enter a valid income amount");
      return;
    }

    setIncomeInput(parsed);
    setMonthlyIncome(parsed);
    setOnboardingStep("GetReady")
    navigation.navigate("GetReadyScreen");
  }

  const incomeSkip = () => {
    setIncomeInput(0) // Set to empty value
    setStringIncome("") // Reset the string input
    setMonthlyIncome(0)
    setOnboardingStep("GetReady")
    navigation.navigate("GetReadyScreen") 
  }
    
  return (
      <View style={styles.container}>
        <Title>To maximize your experience</Title>
        <Title>Do you mind giving us your</Title>
        <Title>monthly Income</Title>

        <Input 
          value={stringIncome} 
          onChangeText={handleIncomeChange} 
          style={{marginTop: 35, marginBottom: 10}}
          placeholderText={"Enter Your Estimated Monthly Income"}
          keyboardType={'numeric'}
        />
        <Text style={styles.hintMessage}>E.g: 12 500.50 - use either dot or comma not both!</Text>
        
        <View style={styles.errorMsgContainer}>
          {errorMessage !== "" && (
            <Text style={styles.warningText}>{errorMessage}</Text>
          )}
        </View>

        <PrimaryButton onPress={incomeConsent}>I Consent</PrimaryButton>
        <PrimaryButton onPress={incomeSkip}>Skip for now</PrimaryButton>
        
        <View style={styles.warningContainer}>
          <Image source={require('../../assets/warning-sign.png')} />
          <Text style={styles.warningText}>If you skip, you will have limited features</Text>
          <Image source={require('../../assets/warning-sign.png')} />
        </View>
          
      </View>
  )
}

export default GetIncome

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: height * 0.2
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
      marginHorizontal: 10,
    },
    errorMsgContainer: {
      height: 20,
      marginTop: 40
    },
    hintMessage: {
      color: Colors.grayFaded,
      fontSize: 18,
      fontFamily: "Monsterat_400Regular",
    },
})