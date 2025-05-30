import React, { useContext, useState } from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../../store/user-context'
import Title from '../../components/Title'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import { Colors } from '../../constants/colors'

const GetIncome = ({route, navigation}) => {
  const {monthlyIncome, setMonthlyIncome} = useContext(UserContext)
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

    const normalized = stringIncome.replace(',','.').trim()
    const parsed = parseFloat(normalized)

    if (isNaN(parsed) || parsed <= 0) {
      setErrorMessage("Please enter a valid income amount")
      return;
    }
    setIncomeInput(parsed)

    // Save the income to context
    setMonthlyIncome(parsed) // it's async so use parsed so we don't have to wait
    // Navigate to get ready screen
    navigation.navigate("GetReadyScreen")
  }

  const incomeSkip = () => {
    setIncomeInput(0) // Set to empty value
    setStringIncome("") // Reset the string input
    setMonthlyIncome(0)
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
          style={{marginVertical: 40}}
          placeholderText={"Enter Your Estimated Monthly Income"}
          keyboardType={'numeric'}
        />

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
      height: 20
    }
})