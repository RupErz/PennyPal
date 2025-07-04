import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import Icon from 'react-native-vector-icons/Feather';

const CardContainer = ({children, sectionLabel, iconCongig}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <Text style={styles.headerTitle}>{sectionLabel}</Text>
                <Icon {...iconCongig} />
            </View>
            {/* Body */}
            {children}
        </View>
    )
}

export default CardContainer

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 17,
        marginHorizontal: 18,
        marginBottom: 20,
        borderRadius: 18,
        backgroundColor: Colors.cardPurpleBlackBackground,
        // borderWidth: 1,
        // borderColor: Colors.lightBorder,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.7,
        color: "white"
    }
})