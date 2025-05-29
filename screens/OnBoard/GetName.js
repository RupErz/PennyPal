import React, { useContext, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Title from '../../components/Title'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import { Colors } from '../../constants/colors'
import { UserContext } from '../../store/user-context'

const GetName = ({route, navigation}) => {
    const [userInput, setUserInput] = useState("");
    // For input validation
    const [isValid, setIsValid] = useState(true)

    const {userName, setUserName} = useContext(UserContext)

    const handleNameChange = (name) => {
        setUserInput(name)
        if (!isValid) setIsValid(true)
    } 

    const confirmName = () => {
        // Check if userName is empty
        if (userInput.trim() === "") {
            setIsValid(false)
            return;
        }

        // Else we confirm saving the name to context and navigate
        setUserName(userInput.trim()) // trim the whitespaces
        navigation.navigate("GetIncomeScreen")
    }

    // Adding Input Alert if empty entered
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/HappyFace.png')}
                style={styles.image}
            />
            <View style={styles.titleContainer}>
                <Title>May we know your name ?</Title>
            </View>
            <Input value={userInput} onChangeText={handleNameChange}/>
            <View style={styles.alertContainer}>
                {!isValid && (
                    <Text style={styles.alertText}>Your name cannot be empty !</Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmName}>Next</PrimaryButton>
            </View>
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