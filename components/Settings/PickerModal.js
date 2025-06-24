import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PickerModal = ({ visible, options, selected, onSelect, onClose }) => {
    if (!visible) return null;
        
    return (
        <View style={styles.pickerOverlay}>
            <View style={styles.pickerModal}>
                <Text style={styles.pickerTitle}>Select Option</Text>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.pickerOption,
                            selected === option && styles.pickerOptionSelected
                        ]}
                        onPress={() => {
                        onSelect(option);
                        onClose();
                        }}
                    >
                        <Text style={[
                            styles.pickerOptionText,
                            selected === option && styles.pickerOptionTextSelected
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.pickerCancel} onPress={onClose}>
                    <Text style={styles.pickerCancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PickerModal
const styles = StyleSheet.create({
    // Picker Modal Styles
    pickerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerModal: {
        backgroundColor: '#2d2d2d',
        borderRadius: 16,
        padding: 20,
        width: '80%',
        maxWidth: 300,
    },
    pickerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    pickerOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    pickerOptionSelected: {
        backgroundColor: '#22c55e',
    },
    pickerOptionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    pickerOptionTextSelected: {
        fontWeight: 'bold',
    },
    pickerCancel: {
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    pickerCancelText: {
        color: '#ef4444',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
})