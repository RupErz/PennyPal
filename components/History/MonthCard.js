import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { formatCurrency2Digits } from '../../util/utility'

const MonthCard = ({data}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => console.log("Pressed")}
            activeOpacity={0.7}
        >
            {/* Header */}
            <View style={styles.cardHeader}>
                <Text style={styles.monthTitle}>{data.month}</Text>
                <Text style={styles.totalSpentTitle}>{formatCurrency2Digits(data.totalSpent).toLocaleString()}</Text>
            </View>

            {/* Category Content */}
            <View style={styles.categorySection}>
                <View style={{marginBottom: 5}}>
                    <View style={styles.categoryRow}>
                        <View style={styles.categoryItem}>
                            <View style={[styles.dot, {backgroundColor: Colors.must}]} />
                            <Text style={styles.categoryDetail}>Must: {formatCurrency2Digits(data.must).toLocaleString()}</Text>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={[styles.dot, {backgroundColor: Colors.nice}]} />
                            <Text style={styles.categoryDetail}>Nice: {formatCurrency2Digits(data.must).toLocaleString()}</Text>
                        </View>
                    </View>

                    <View style={styles.categoryRow}>
                        <View style={styles.categoryItem}>
                            <View style={[styles.dot, {backgroundColor: Colors.must}]} />
                            <Text style={styles.categoryDetail}>Wasted: {formatCurrency2Digits(data.wasted).toLocaleString()}</Text>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={[styles.dot, {backgroundColor: Colors.nice}]} />
                            <Text style={styles.categoryDetail}>
                                Income: {data.income !== 0
                                    ? (formatCurrency2Digits(data.income).toLocaleString())
                                    : "N/A"}
                            </Text>
                        </View>
                    </View>
                </View>
                

                {/* Balance Section */}
                <View style={styles.balanceSection}>
                    <Text style={styles.balanceDetails}>
                        Balance: {data.income !== 0
                            ? (formatCurrency2Digits(data.income - data.totalSpent).toLocaleString())
                            : "N/A"}
                    </Text>
                </View>
                
            </View>
        </TouchableOpacity>
        
    )
}

export default MonthCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.cardPurpleBlackBackground,
        padding: 20,
        marginBottom: 16,
        marginTop: 5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.buttonBackground,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    totalSpentTitle: {
        color: Colors.title,
        fontSize: 18,
        fontWeight: '600'
    },
    categorySection: {
        marginBottom: 12
    },
    categoryRow: {
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    categoryItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6, 
        marginRight: 8
    },
    categoryDetail: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text
    },
    balanceSection: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 2,
        borderTopColor: 'white',
    },
    balanceDetails: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.buttonBackground,
    }
})