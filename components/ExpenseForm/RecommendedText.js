import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const RecommendedText = () => {
    return (
        <View style={styles.recommendedIndicator}>
            <Text style={styles.recommendedText}>💡 Recommended</Text>
        </View>
    )
}

export default RecommendedText

const styles = StyleSheet.create({
    recommendedIndicator: {
        backgroundColor: Colors.blurGreen200,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.blurGreen400,
        elevation: 1,
        shadowColor: Colors.blurGreen400,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    recommendedText: {
        fontSize: 15,
        color: '#388E3C',
        fontWeight: '600',
    }
})