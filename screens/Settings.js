import React, { useContext, useState } from 'react'
import { Alert, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../store/user-context'

const Settings = () => {
    const {userName, monthlyIncome} = useContext(UserContext)
    const [displayName, setDisplayName] = useState(userName || "Guest")
    const [displayIncome, setDisplayIncome] = useState(monthlyIncome || 0)
    const [dailyReminders, setDailyReminders] = useState(true)

    // Handle Save and Cancel actions
    const handleSave = () => {
        Alert.alert(
            "Settings Saved",
            "Your settings have been updated successfully",
            [{ text: "OK" }]
        )
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


                {/* Notifications */}

            </ScrollView>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 20
    }
})