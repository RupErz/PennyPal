import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

const CategorySlot = ({category, amount, percentage, catEmoji}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.categoryEmoji}>{catEmoji}</Text>
            <Text style={[styles.categoryTitle
                , category === 'Must Have' && {color: Colors.must}
                , category === 'Nice to Have' && {color: Colors.nice}
                , category === 'Wasted' && {color: Colors.wasted}
            ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
            >
                {category}
            </Text>
            <Text style={styles.categoryAmount}>{amount}</Text>
            <Text style={styles.categoryPercentage}>{percentage}</Text>
        </View>
    )
}

export default CategorySlot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightBackground,
        borderColor: Colors.lightBorder,
        borderRadius: 12,
        borderWidth: 1,
        marginHorizontal: 5,
        padding: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        minHeight: 100, // Ensure a consistent height
        minWidth: 90
    },
    categoryEmoji: {
        fontSize: 27,
        marginBottom: 4,
    },
    categoryTitle: {
        color: Colors.textLightGray,
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.3,
        marginBottom: 3,
    },
    categoryAmount: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.textDarkGray,
        marginBottom: 2,
    },
    categoryPercentage: {
        fontSize: 13,
        color: Colors.textGray,
    }
})