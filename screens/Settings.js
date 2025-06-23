import React, { useContext, useState } from 'react'
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
    const {userName, monthlyIncome} = useContext(UserContext)
    // Perhaps add a extra value for achievements and dailyReminder in UserContext


    const [displayName, setDisplayName] = useState(userName || "Guest")
    // Convert income to string for TextInput
    const [displayIncome, setDisplayIncome] = useState(monthlyIncome.toString())
    const [dailyReminders, setDailyReminders] = useState(true)
    const [isValidInput, setIsValidInput] = useState(true) // By default at settings, input all satisfied
    // Whether show the modal or not
    const [showAchievementPicker, setShowAchievementPicker] = useState(false)
    const [selectedAchievement, setSelectedAchievement] = useState("God of Discipline")
   
    // Achievements fetching from context
    const availableAchievements = [
        "God of Discipline",
        "Expense Guru",
        "Budget Master",
        "Savings Champion",
        "Financial Wizard",
        "Investment Pro",
    ]

    // Handle Save and Cancel actions
    const handleSave = () => {
        // Input validation -----
        // Title : Cannot be empty
        const titleIsValid = displayName.trim().length > 0

        // Income can be empty, but if not, it must be a valid number
        const cleanedAmount = displayIncome.replace(/\s/g, '').trim()
        let amountIsValid = true
        if (cleanedAmount.length > 0) {
            const parsedAmount = parseFloat(cleanedAmount)
            amountIsValid = !isNaN(parsedAmount) && parsedAmount >= 0 && isFinite(parsedAmount)
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
        console.log("Saved")
    }

    const handleCancel = () => {
        Alert.alert(
            "Discard Changes",
            "Are you sure you want to discard your changes?",
            [
                {text: "Cancel", style: "cancel"},
                {text: "Discard", style: "destructive"}
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
                        onChangeText={(income) => {
                            setDisplayIncome(income)
                            setIsValidInput(true)
                        }}
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

                {/* Notifications */}
                <SectionHeader icon="🔔" title="Notifications" section={"Notification"}/>
                <SettingItem 
                    icon="🔔" 
                    label="Daily Reminders"
                    description="Get reminded to track your expenses"
                >
                    <Switch
                        value={dailyReminders}
                        onValueChange={setDailyReminders}
                        trackColor={{ false: Colors.switchButtonUnactive, true: Colors.onClickGreen }}
                        thumbColor={dailyReminders ? '#ffffff' : '#f4f3f4'}
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