import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { UserContext } from '../store/user-context'
import SectionHeader from '../components/Settings/SectionHeader'
import SettingItem from '../components/Settings/SettingItem'
import { Colors } from '../constants/colors'
import PickerModal from '../components/Settings/PickerModal'
import { TouchableOpacity } from 'react-native'
import ManageButton from '../components/Settings/ManageButton'

const Settings = () => {
    // userName : string, monthlyIncome : number
    const {userName, monthlyIncome, currentAchievement, setUserName, setMonthlyIncome, setCurrentAchievement} = useContext(UserContext)
    // Perhaps add a extra value for achievements in UserContext


    const [displayName, setDisplayName] = useState(userName || "Guest")
    // Convert income to string for TextInput
    const [displayIncome, setDisplayIncome] = useState(monthlyIncome.toString())
    const [isValidInput, setIsValidInput] = useState(true) // By default at settings, input all satisfied
    // Whether show the modal or not
    const [showAchievementPicker, setShowAchievementPicker] = useState(false)
    const [selectedAchievement, setSelectedAchievement] = useState(currentAchievement || "Beginner Saver")

    // Original Value in case user wants to cancel changes
    const [originalName, setOriginalName] = useState(userName || "Guest");
    const [originalIncome, setOriginalIncome] = useState(monthlyIncome.toString());
    const [originalAchievement, setOriginalAchievement] = useState(currentAchievement || "Beginner Saver");
   
    // When Settings screen mounts, set initial values
    // This is to ensure that if the user has not set these values, they will be initialized properly
    useEffect(() => {
        setDisplayName(userName || "Guest");
        setDisplayIncome(monthlyIncome.toString());
        setSelectedAchievement(currentAchievement || "Beginner Saver");

        setOriginalName(userName || "Guest");
        setOriginalIncome(monthlyIncome.toString());
        setOriginalAchievement(currentAchievement || "Beginner Saver");
    }, [])

    // Achievements fetching from context
    const availableAchievements = [
        "Beginner Saver",
        "God of Discipline",
        "Expense Guru",
        "Budget Master",
        "Savings Champion",
        "Financial Wizard",
        "Investment Pro",
    ]

    // Formatted income input from user
    const handleIncomeChange = (input) => {
        setIsValidInput(true)
        // Remove non-digit characters
        const cleaned = input.replace(/[^\d.]/g, '');

        // Allow empty string to avoid breaking input
        if (cleaned === '') {
            setDisplayIncome('');
            return;
        }

        // Convert to number
        const number = parseFloat(cleaned);
        if (!isNaN(number)) {
            // Format with commas (US-style)
            const formatted = number.toLocaleString('en-US');
            setDisplayIncome(formatted);
        }
    };

    // Handle Save and Cancel actions
    const handleSave = () => {
        // Input validation -----
        // Title : Cannot be empty
        const titleIsValid = displayName.trim().length > 0

        // Income can be empty, but if not, it must be a valid number
        const cleanedAmount = displayIncome.replace(/,/g, '').replace(/\s/g, '').trim();
        const numberValue = parseFloat(cleanedAmount);  

        // Format it with commas again for display:
        const formattedIncome = numberValue.toLocaleString('en-US');

        let amountIsValid = true;
        if (cleanedAmount.length > 0) {
            amountIsValid = /^[0-9]+(\.[0-9]+)?$/.test(cleanedAmount);
        }

        if (!titleIsValid || !amountIsValid) {
            setIsValidInput(false)
            return;
        }

        Alert.alert(
            "Settings Saved",
            "Your settings have been updated successfully",
            [{ text: "OK" }]
        )

        // Save to context and AsyncStorage
        setUserName(displayName);
        setMonthlyIncome(numberValue);
        setCurrentAchievement(selectedAchievement);

        // ✅ Update backup values too
        setOriginalName(displayName);
        setOriginalIncome(formattedIncome);
        setOriginalAchievement(selectedAchievement);
        console.log("Saved")
    }

    const handleCancel = () => {
        Alert.alert(
            "Discard Changes",
            "Are you sure you want to discard your changes?",
            [
                {text: "Cancel", style: "cancel"},
                {text: "Discard", style: "destructive",
                    onPress: () => {
                        setDisplayName(originalName)
                        setDisplayIncome(originalIncome)
                        setSelectedAchievement(originalAchievement)
                        setIsValidInput(true) // Reset validation state
                        console.log("Changes discarded")
                    }
                }
            ]
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Financial Settings */}
                <SectionHeader icon="💰" title="Financial Settings" isValid={isValidInput} section={"Financial"}/>
                <SettingItem icon="💵" label="Monthly Income">
                    <TextInput
                        style={styles.input}
                        value={displayIncome}
                        onChangeText={handleIncomeChange}
                        placeholder="Enter your monthly income"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        keyboardType="numeric"
                    />
                </SettingItem>
                <SettingItem icon="👤" label="Display Name">
                    <TextInput
                        style={styles.input}
                        value={displayName}
                        onChangeText={(name) => {
                            setDisplayName(name)
                            setIsValidInput(true)
                        }}
                        placeholder="Enter your name"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                    />
                </SettingItem>

                {/* Achievements */}
                <SectionHeader icon="🏆" title="Achievements" />
                <SettingItem icon="🏅" label="Current Achievement">
                    {/* <View style={styles.achievementBadge}>
                    <Text style={styles.achievementText}>🎯 God of Discipline</Text>
                    </View> */}
                    <TouchableOpacity 
                        style={styles.selectButton}
                        onPress={() => setShowAchievementPicker(true)}
                    >
                    <Text style={styles.selectButtonText}>{selectedAchievement}</Text>
                    <Text style={styles.selectButtonArrow}>▼</Text>
                    </TouchableOpacity>
                </SettingItem>
            </ScrollView>
        
            {/* Bottom Buttons */}
            <ManageButton 
                saveOnPress={handleSave}
                cancelOnPress={handleCancel}
                saveLabel="Save Settings"
                cancelLabel="Cancel"
            />

            {/* Picker Modals For Achievements */}
            <PickerModal 
                visible={showAchievementPicker}
                options={availableAchievements}
                selected={selectedAchievement}
                onSelect={setSelectedAchievement}
                onClose={() => setShowAchievementPicker(false)}
            />

        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 20
    },
    input: {
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.blurGreen400,
        borderRadius: 8,
        padding: 12,
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    // Picker Modal : 
    selectButton: {
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.blurGreen400,
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    selectButtonArrow: {
        color: Colors.blurGreen400,
        fontSize: 12,
    },
})