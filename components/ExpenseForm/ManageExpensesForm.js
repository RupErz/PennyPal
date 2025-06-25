import React, { useContext, useEffect, useState } from 'react'
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
import CancelButton from '../CancelButton'
import IconButton from './IconButton'

const ManageExpensesForm  = ({defaultValue, onSubmit, submitButtonLabel, onDelete, isEdit, defaultMonth, defaultYear, context}) => {
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

    console.log("Context is: ", context)


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
        const now = new Date()
        const today = getFormattedDate(now) // Use your utility function
        
        inputChangeHandler('date', today)
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

    // Get current date for picker (fallback: today)
    // If this is edit : show the date they pick 
    // Else show current date
    const getPickerDate = () => {
        // If editing, always show the existing date (guaranteed to exist due to validation)
        if (isEdit) {
            const [year, month, day] = inputs.date.value.split('-').map(Number);
            return new Date(year, month - 1, day, 12, 0, 0);
        }
        
        // If adding from HistoryTab, start at first day of the viewed month/year
        if (context === "history") {
            // no -1 because defaultMonth is already a month index
            return new Date(defaultYear, defaultMonth, 1, 12, 0, 0);
        }
        
        // Default case: show current date (for HomeTab add, since context is undefined)
        return new Date();
    }
    
    const inputChangeHandler = (inputIdentifier, enteredData) => {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: { value: enteredData, isValid: true }
            }
        })
    }

    // Input Validate once user press Submit
    const submitHandler = () => {
        // Handle white spacing amount input
        const cleanedAmount = inputs.amount.value.replace(/\s/g, '').trim()
        const parsedAmount = parseFloat(cleanedAmount)

        let dateObj;
        if (inputs.date.value) {
            const [year, month, day] = inputs.date.value.split('-').map(Number)
            // Create date at noon local time to avoid timezone issues
            dateObj = new Date(year, month - 1, day, 12, 0, 0)
        } else {
            dateObj = new Date()
        }

        const expenseData = {
            title: inputs.title.value,
            amount: parsedAmount,
            date: dateObj,
            category: inputs.category.value,
        }

        // Input Validation-------------------------
        // Title : Cannot be empty
        const titleIsValid = expenseData.title.trim().length > 0

        // Amount : Cannot be empty or NaN or <= 0
        const amountIsValid = !isNaN(expenseData.amount) && 
                                expenseData.amount > 0 &&
                                cleanedAmount !== "" &&
                                isFinite(parsedAmount) // Ensure it's a real number

        
        // Date : valid format
        const dateIsValid = dateObj && !isNaN(dateObj.getTime()) && inputs.date.value.match(/^\d{4}-\d{2}-\d{2}$/)        
        
        // Category : Must not be empty
        // For now default value is ""
        const categoryIsValid = expenseData.category.trim().length > 0
        
        if (!titleIsValid || !amountIsValid || !dateIsValid || !categoryIsValid) {
            setInputs((curInputs) => {
                return {
                    title: {
                        value: curInputs.title.value,
                        isValid: titleIsValid
                    },
                    amount: {
                        value: curInputs.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: curInputs.date.value,
                        isValid: dateIsValid
                    },
                    category: {
                        value: curInputs.category.value,
                        isValid: categoryIsValid
                    }
                }
            })
            return;
        }
        
        // Use onSubmit so we can reuse for edit screen
        onSubmit(expenseData)
    }

    // Form is valid of not
    const formIsInvalid = !inputs.title.isValid || !inputs.amount.isValid || !inputs.date.isValid || !inputs.category.isValid

    return (
        <View style={styles.formContainer}>
            {/* Getting the title of expense */}
            <View style={styles.titleContainer}>
                <CategoryTitle isValid={inputs.title.isValid}>Title</CategoryTitle>
                <ExpenseInput 
                    label={"Enter Your Expense Title"}
                    textInputConfig={{
                        value: inputs.title.value,
                        onChangeText: inputChangeHandler.bind(this, 'title'),
                        maxLength: 40,
                        autoCapitalize:'words'
                    }}
                />
            </View>
            


            {/* Getting amount */}
            <View style={styles.rowContainer}>
                <CategoryTitle isValid={inputs.amount.isValid}>Amount :</CategoryTitle>
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
                    <CategoryTitle isValid={inputs.date.isValid}>Date :</CategoryTitle>
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
            <CategoryTitle isValid={inputs.category.isValid}>Category :</CategoryTitle>
            <View style={styles.categoryContainer}>
                <View style={styles.radioButtonContainer}>
                    <RadioButton 
                        inputs={inputs}
                        category={"must"}
                        onPress={() => {inputChangeHandler('category', "must")}}
                        label={"Must Have"}
                    />
                    {suggestedCategory === "Must Have" && (
                        <RecommendedText />
                    )}
                </View>
                
                <View style={styles.radioButtonContainer}>
                    <RadioButton 
                        inputs={inputs}
                        category={"nice"}
                        onPress={() => {inputChangeHandler('category', "nice")}}
                        label={"Nice to Have"}
                    />
                    {suggestedCategory === "Nice to Have" && (
                        <RecommendedText />
                    )}
                </View>

                <View style={styles.radioButtonContainer}>
                    <RadioButton 
                        inputs={inputs}
                        category={"wasted"}
                        onPress={() => {inputChangeHandler('category', "wasted")}}
                        label={"Wasted"}
                    />
                    {suggestedCategory === "Wasted" && (
                        <RecommendedText />
                    )}
                </View>
            </View>

            {/* Alert about invalid input */}
            {formIsInvalid && (
                <Text style={styles.textAlert}>Invalid inputs, please check again.</Text>
            )}


            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={submitHandler}>{submitButtonLabel}</PrimaryButton>
                <CancelButton>Cancel</CancelButton>
            </View>
            {isEdit && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        name={'trash'}
                        color={Colors.redSmooth}
                        size={40}
                        onPress={onDelete}
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpensesForm 
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
        gap: 15 // control spacing between child elements in flexbox
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
    // Title
    titleContainer: {
        gap: 8 
    },
    // Category
    categoryContainer: {
        paddingVertical: 5,
        gap: 8
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    // Invalid prompt
    textAlert: {
        color: Colors.redAlert,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    // Delete Container: 
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})