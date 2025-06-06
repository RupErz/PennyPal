import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../constants/colors'
import CategoryTitle from './CategoryTitle'
import ExpenseInput from './ExpenseInput'
import GetCurrentDateButton from './GetCurrentDateButton'
import CategoryButton from './CategoryButton'
import { getFormattedDate } from '../../util/utility'
import DateTimePicker from '@react-native-community/datetimepicker'
import PickDateButton from './PickDateButton'

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
                    <GetCurrentDateButton onPress={handleCurrentDatePress} />
                    <Text style={styles.dateButtonText}>Get current date</Text>
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

            {/* Category */}
            <CategoryTitle>Category :</CategoryTitle>
            <View style={styles.categoryContainer}>
                <View style={styles.categoryOption}>
                    <CategoryButton />
                    <Text style={styles.categoryTitle}>Must Have</Text>
                </View>
                <View style={styles.categoryOption}>
                    <CategoryButton />
                    <Text style={styles.categoryTitle}>Nice to Have</Text>
                </View>
                <View style={styles.categoryOption}>
                    <CategoryButton />
                    <Text style={styles.categoryTitle}>Wasted</Text>
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
    categoryContainer: {
        paddingVertical: 5,
        gap: 12
    },
    categoryTitle: {
        fontSize: 15,
        color: "white",
        fontWeight: 'bold',
    },
    categoryOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    dateSection: {
        gap: 10
    },
    dateButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 15,
        marginTop: 10
    },
    dateButtonText: {
        fontSize: 14,
        color: "white",
        fontWeight: '500',
    }
})