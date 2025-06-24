import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const SectionHeader = ({icon, title, isValid, section}) => {
    return (
        <View style={styles.sectionHeader}>
            <View style={styles.sectionLeft}>
                <Text style={styles.sectionIcon}>{icon}</Text>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            {!isValid && section === "Financial" && (
                <Text style={styles.invalid}>- Invalid input.</Text>
            )}
        </View>
)
}

export default SectionHeader

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
        justifyContent: 'space-between'
    },
    sectionIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.onClickGreen,
        letterSpacing: 0.7
    },
    sectionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    invalid: {
        color: Colors.redAlert,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10,
    }
})