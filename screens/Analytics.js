import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import {
  LineChart,
  ProgressChart,
  PieChart,
} from 'react-native-chart-kit';

import Icon from 'react-native-vector-icons/Feather';
import { ExpenseContext } from '../store/expense-context';
import { Colors } from '../constants/colors';


const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const {getAnalyticsData} = useContext(ExpenseContext)

  // Period Options for Horizontal Selections
  const periods = [
    {id: 'current', label: 'This Month', shortLabel: '1M'},
    {id: '3months', label: '3 Months', shortLabel: '3M'},
    {id: '6months', label: '6 Months', shortLabel: '6M'}
  ]

  const data = getAnalyticsData(selectedPeriod)
  // console.log(data)

  const changePeriod = (periodId) => {
    setSelectedPeriod(periodId)
  }


  return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.ScrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}

          {/* Period Selector */}
          <View style={styles.horizontalScrollContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.periodScrollContent}
            >
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  style={[
                    styles.periodOption,
                    period.id === selectedPeriod && styles.periodOptionSelected
                  ]}
                  onPress={() => changePeriod(period.id)}
                >
                  <Text style={[
                    styles.periodOptionText,
                    period.id === selectedPeriod && styles.periodOptionTextSelected
                  ]}>
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          

          {/* Spending Health Score */}

          {/* Trend Analysis */}

          {/* Smart Insights */}

          {/* Spending Distribution */}

          {/* Top Categories */}

        </ScrollView>
        
      </SafeAreaView>
          
  )
}

export default Analytics

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  // Select Period ScrollView
  horizontalScrollContainer: {
    marginBottom: 10,
    alignItems: 'center'
  },
  periodScrollContent: {
    paddingHorizontal: 24,
    gap: 12,
    margin: 5
  },
  periodOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.blackGray,
    borderWidth: 1,
    borderColor: Colors.blackGrayFadedBorder,
    minWidth: 100,
    alignItems: 'center'
  },
  periodOptionSelected: {
    backgroundColor: Colors.greenBackgroundOnClick,
    borderColor: Colors.onClickGreen 
  },
  periodOptionText: {
    color: Colors.textLightGray,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1
  },
  periodOptionTextSelected: {
    color: Colors.onClickGreen,
    fontWeight: '600'
  }
})