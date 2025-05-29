import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../../store/user-context'

const GetIncome = ({route, navigation}) => {
    const { userName, monthlyIncome, hasCompletedOnboarding } = useContext(UserContext);
  return (
    <View>
      <Text style={styles.text}>UserName: {userName}</Text>
      <Text style={styles.text}>Monthly Income: {monthlyIncome}</Text>
      <Text style={styles.text}>Completed Onboarding: {hasCompletedOnboarding ? 'Yes' : 'No'}</Text>
    </View>
  );
    // return (
    //     <View>
    //         <Text>What is your income ?</Text>
    //         <Button
    //             title='Next'
    //             onPress={() => navigation.navigate('GetReadyScreen')}
    //         /> 
    //     </View>
    // )
}

export default GetIncome

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }
})