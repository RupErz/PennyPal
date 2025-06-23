import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ManageButton = ({saveOnPress, cancelOnPress, saveLabel, cancelLabel}) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveOnPress}>
                <Text style={styles.saveButtonText}>{saveLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelOnPress}>
                <Text style={styles.cancelButtonText}>{cancelLabel}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ManageButton

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
        gap: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#22c55e',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: '600',
    },
})