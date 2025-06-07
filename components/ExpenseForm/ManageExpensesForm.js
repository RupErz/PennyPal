import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../constants/colors'
import CategoryTitle from './CategoryTitle'
import ExpenseInput from './ExpenseInput'
import GetCurrentDateButton from './GetCurrentDateButton'
import CategoryButton from './CategoryButton'
import { getFormattedDate } from '../../util/utility'
import DateTimePicker from '@react-native-community/datetimepicker'
import PickDateButton from './PickDateButton'
import RadioButton from './RadioButton'
import PrimaryButton from '../PrimaryButton'
import { categoryMapping } from '../../constants/SuggestedModel'
import RecommendedText from './RecommendedText'

const AddForm = ({defaultValue}) => {
    const [inputs, setInputs] = useState({
        title: {
            value: defaultValue ? defaultValue.title : "",
            isValid: true
        },
        amount: {
            value: defaultValue ? defaultValue.amount.toString() : "",
            isValid: true
        },
        date: {
            value: defaultValue ? getFormattedDate(defaultValue.date) : "",
            isValid: true
        },
        category: {
            value: defaultValue ? defaultValue.category : "",
            isValid: true
        }
    })
    // State for date picker
    const [showDatePicker, setShowDatePicker] = useState(false)
    // State for suggested category 
    const [suggestedCategory, setSuggestedCategory] = useState("")

    // Handle date picker change
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false)
        if (selectedDate && event.type !== 'dismissed') {
            const formattedDate = getFormattedDate(selectedDate)
            inputChangeHandler('date', formattedDate)
        }        
    }

    // Handle current date button press
    const handleCurrentDatePress = () => {
        const currentDate = new Date()
        const formattedDate = getFormattedDate(currentDate)
        inputChangeHandler('date', formattedDate)
    }

    // Function to guess category based on title
    const guessCategory = (title) => {
        if (!title) return ""

        const lowerTitle = title.toLowerCase().trim()

        // Check for fully matches 
        if (categoryMapping[lowerTitle]) {
            return categoryMapping[lowerTitle]
        }

        // Check for partial matches
        for (const [keyword, category] of Object.entries(categoryMapping)) {
            if (lowerTitle.includes(keyword)) {
                return category
            }
        }

        return ""
    }

    // Upon input title is changing we find the suggestion 
    useEffect(() => {
        const suggestion = guessCategory(inputs.title.value)
        setSuggestedCategory(suggestion)
    }, [inputs.title.value])

    //Get current date for picker (fallback: today)
    // If this is edit : show the date they pick 
    // Else show current date
    const getPickerDate = () => {
        if (inputs.date.value) {
            const dateObj = new Date(inputs.date.value)
            return dateObj.toString() !== 'Invalid Date' ? dateObj : new Date()
        }
        return new Date()
    }
    
    const inputChangeHandler = (inputIdentifier, enteredData) => {
        console.log("Amount change handler")
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier] : {value: enteredData, isValid: true}
            }
        })
    }

    // Input Validate once user press Submit
    const submitHandler = () => {
        const expenseData = {
            title: inputs.title.value,
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            category: inputs.category.value,
        }
        // Input Validation-------------------------
        // Title : Cannot be empty
        const titleIsValid = expenseData.title.trim().length > 0

        // Amount : Cannot be empty or NaN or <= 0
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        
        // Date : valid format
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        
        // Category : Must not be empty
        // For now default value is ""
        const categoryIsValid = expenseData.category.trim().length > 0
        
        if (!titleIsValid || !amountIsValid || !dateIsValid || !categoryIsValid) {
            setInputs((curInputs) => {
                return {
                    title: {
                        value: curInputs.title,
                        isValid: titleIsValid
                    },
                    amount: {
                        value: curInputs.amount.toString(),
                        isValid: amountIsValid
                    },
                    date: {
                        value: getFormattedDate(curInputs.date),
                        isValid: dateIsValid
                    },
                    category: {
                        value: curInputs.category,
                        isValid: categoryIsValid
                    }
                }
            })
            return;
        }
        // Submit the data if its all passed
    }

    // Form is valid of not
    const formIsInvalid = null

    return (
        <View style={styles.formContainer}>
            {/* Getting the title of expense */}
            <CategoryTitle>Title</CategoryTitle>
            <ExpenseInput 
                label={"Enter Your Expense Title"}
                textInputConfig={{
                    value: inputs.title.value,
                    onChangeText: inputChangeHandler.bind(this, 'title'),
                    maxLength: 40,
                    autoCapitalize:'words'
                }}
            />

            {/* Getting amount */}
            <View style={styles.rowContainer}>
                <CategoryTitle>Amount :</CategoryTitle>
                <View style={styles.inputContainer}>
                    <ExpenseInput 
                        label={"Enter Your Amount"}
                        textInputConfig={{
                            value: inputs.amount.value,
                            onChangeText: inputChangeHandler.bind(this, 'amount'),
                            keyboardType: "decimal-pad",
                        }}
                    />
                </View>
            </View>
            
            {/* Getting the date */}
            <View style={styles.dateSection}>
                <View style={styles.rowContainer}>
                    <CategoryTitle>Date :</CategoryTitle>
                    <View style={styles.inputContainer}>
                        <PickDateButton 
                            date={inputs.date.value} 
                            onPress={() => setShowDatePicker(true)} 
                            label='YYYY-MM-DD'    
                        />
                    </View>
                </View>

                {/* Button to auto fill current date for user */}
                <View style={styles.dateButtonContainer}>
                    <GetCurrentDateButton onPress={handleCurrentDatePress}>
                        Get Current Date
                    </GetCurrentDateButton>
                </View>
            </View>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <DateTimePicker
                    value={getPickerDate()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()} // Optional: prevent future dates
                />
            )}

            {/* Category with Smart Suggestions */}
            <CategoryTitle>Category :</CategoryTitle>
            <View style={styles.categoryContainer}>
                <View style={styles.radioButtonContainer}>
                    <RadioButton 
                        inputs={inputs}
                        category={"Must Have"}
                        onPress={() => {inputChangeHandler('category', "Must Have")}}
                    />
                    {suggestedCategory === "Must Have" && (
                        <RecommendedText />
                    )}
                </View>
                
                <View style={styles.radioButtonContainer}>
                    <RadioButton 
                        inputs={inputs}
                        category={"Nice to Have"}
                        onPress={() => {inputChangeHandler('category', "Nice to Have")}}
                    />
                    {suggestedCategory === "Nice to Have" && (
                        <RecommendedText />
                    )}
                </View>

                <View style={styles.radioButtonContainer}>
                    <RadioButton 
                        inputs={inputs}
                        category={"Wasted"}
                        onPress={() => {inputChangeHandler('category', "Wasted")}}
                    />
                    {suggestedCategory === "Wasted" && (
                        <RecommendedText />
                    )}
                </View>
            </View>
        </View>
    )
}

export default AddForm
const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    formContainer: {
        width: 0.9 * width,
        justifyContent: 'center',
        backgroundColor: Colors.cardBackground,
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: Colors.buttonBackground,
        borderWidth: 2,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        gap: 20 // control spacing between child elements in flexbox
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        gap: 15,
    },
    inputContainer: {
        flex: 1,
        marginLeft: 15
    },
    // Category
    categoryContainer: {
        paddingVertical: 5,
        gap: 12
    },
    // Date
    dateSection: {
        gap: 10
    },
    dateButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10
    },
    dateButtonText: {
        fontSize: 14,
        color: "white",
        fontWeight: '500',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})