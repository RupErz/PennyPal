import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const SettingItem = ({children, icon, label, description}) => {
    return (
        <View style={styles.settingItem}>
            <View style={styles.settingHeader}>
                <Text style={styles.settingIcon}>{icon}</Text>
                <Text style={styles.settingLabel}>{label}</Text>
            </View>
            {description && <Text style={styles.settingDescription}>{description}</Text>}
            {children}
        </View>
    )
}

export default SettingItem
const styles = StyleSheet.create({
    settingItem: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.buttonBackground,
        padding: 16,
        marginBottom: 12,
    },
    settingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    settingIcon: {
        fontSize: 18,
        marginRight: 12,
        width: 24,
        textAlign: 'center',
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#22c55e',
        flex: 1,
    },
    settingDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)',
        marginBottom: 8,
        marginLeft: 36,
    },
})