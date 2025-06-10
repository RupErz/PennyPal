import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const SmartSummaryCard = ({title, amount, percentage, type }) => {
    return (
        <View style={[styles.summaryCard, 
            type == "fixed" && styles.fixedCard,
            type == "flexible" && styles.flexibleCard,
            type == "waste" && styles.wasteCard,
            type == "waste" && styles.fullWidthCard
        ]}>
            {type === "waste" ? (
                <View style={styles.wasteCardContent}>
                    <View>
                        <Text style={styles.summaryCardTitle}>{title}</Text>
                        <Text style={styles.wasteCardAmount}>{amount}</Text>
                    </View>
                    <View style={styles.wastePercentage}>
                        <Text style={styles.wastePercentageText}>{percentage}</Text>
                        <Text style={styles.wastePercentageLabel}>of total</Text>
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={styles.summaryCardTitle}>{title}</Text>
                    <Text style={styles.summaryCardAmount}>{amount}</Text>
                    <Text style={styles.summaryCardPercentage}>{percentage} of Total Expense</Text>
                </View>
            )}
            
        </View>
    )
}

export default SmartSummaryCard

const styles = StyleSheet.create({
    summaryCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
    fixedCard: {
        flex: 1, // Take all the remaining space within a View
        marginRight: 7.5,
        borderLeftWidth: 4,
        borderLeftColor: Colors.greenShine,
    },
    flexibleCard: {
        flex: 1,
        marginLeft: 7.5,
        borderLeftWidth: 4,
        borderLeftColor: Colors.nice
    },
    wasteCard: {
        borderLeftWidth: 4,
        borderLeftColor: Colors.wasted
    },
    fullWidthCard: {
        marginTop: 10
    },
    summaryCardTitle: {
        fontSize: 12,
        color: Colors.textGray,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontWeight: '600'
    },
    summaryCardAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textDarkGray,
        marginBottom: 2,
    },
    summaryCardPercentage: {
        fontSize: 13,
        color: Colors.textLightGray,
    },
    wasteCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wasteCardAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.wasted,
    },
    wastePercentage: {
        alignItems: 'flex-end',
    },
    wastePercentageText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.wasted,
    },
    wastePercentageLabel: {
        fontSize: 10,
        color: Colors.textGray,
    }
})