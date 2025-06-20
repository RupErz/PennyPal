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
import CardContainer from '../components/Analytics/CardContainer';
import { formatPercentage } from '../util/utility';

const { width: screenWidth } = Dimensions.get('window');

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
  const {overallSpending, trendData, healthScore, insights, topCategories} = data

  // Calculating analytical details
  const must = overallSpending.mustHave
  const nice = overallSpending.niceToHave
  const wasted = overallSpending.wasted
  const total = must + nice + wasted
  const mustPercentage = (must / total) * 100
  const nicePercentage = (nice / total) * 100
  const wastedPercentage = (wasted / total) * 100
  
  console.log(healthScore)
  console.log(must)

  const changePeriod = (periodId) => {
    setSelectedPeriod(periodId)
  }

  const getHealthColor = (score) => {
    if (score >= 80) {
      return Colors.must
    } else if (score >= 60) {
      return Colors.nice
    } else {
      return Colors.wasted
    }
  }

  // Health Chart 
  const healthDataChart = {
    data: [healthScore / 100],
    colors: [getHealthColor(healthScore)]
  }

  const chartConfig = {
    backgroundColor: '#1F2937',
    backgroundGradientFrom: '#1F2937',
    backgroundGradientTo: '#111827',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    },
  };

  // Calculate proper chart width accounting for card margins and padding
  const chartWidth = screenWidth - 88


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
          <CardContainer>
            <View style={styles.healthScoreContainer}>
              <View style={styles.chartWrapper}>
                <ProgressChart
                  data={healthDataChart}
                  width={chartWidth - 40}
                  height={160}
                  strokeWidth={15}
                  radius={50}
                  chartConfig={{
                    ...chartConfig,
                    color: (opacity = 1) => getHealthColor(healthScore),
                  }}
                  hideLegend={true}
                />
                <View style={styles.healthScoreOverlay}>
                  <Text style={[styles.healthScoreText, { color: getHealthColor(healthScore) }]}>
                    {healthScore}
                  </Text>
                </View>
              </View>
              {/* Health Score Details */}
              <View style={styles.healthScoreDetail}>
                  <Text style={styles.healthScoreTitle}>Based on overall spending patterns</Text>

                  <View style={styles.healthScoreCategoryContainer}>
                    <View style={styles.healthScoreCategoryItem}>
                      <View style={[styles.dot, {backgroundColor: Colors.must }]} />
                      <Text style={styles.categoryText}>Must Have: {formatPercentage(mustPercentage)}</Text>
                    </View>

                    <View style={styles.healthScoreCategoryItem}>
                      <View style={[styles.dot, {backgroundColor: Colors.nice }]} />
                      <Text style={styles.categoryText}>Nice to Have: {formatPercentage(mustPercentage)}</Text>
                    </View>

                    <View style={styles.healthScoreCategoryItem}>
                      <View style={[styles.dot, {backgroundColor: Colors.wasted }]} />
                      <Text style={styles.categoryText}>Wasted: {formatPercentage(mustPercentage)}</Text>
                    </View>
                  </View>
                  

                  
              </View>
              


            </View>
          </CardContainer>
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
  },
  // Health score
  healthScoreContainer: {
    alignItems: 'center',
    position: 'relative'
  },
  healthScoreOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthScoreText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  chartWrapper: {
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden', // 💥 This is necessary to clip chart corners
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthScoreDetail: {
    marginVertical: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  healthScoreTitle: {
    fontSize: 14,
    color: Colors.textLightGray,
    letterSpacing: 0.5,
    fontWeight: '500'
  },

  healthScoreCategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
    marginTop: 8
  },
  healthScoreCategoryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4, 
    marginRight: 6
  },
  categoryText: {
    fontSize: 12,
    color: 'white'
  }
})