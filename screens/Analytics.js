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

  console.log(overallSpending)

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
    backgroundColor: '#1F1927',
    backgroundGradientFrom: '#1F1927',
    backgroundGradientTo: '#0F0C1C', // slightly darker tone
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`, // soft gray for lines
    labelColor: (opacity = 1) => `rgba(180, 180, 180, ${opacity})`, // subtle labels
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      // Let dot color be passed from your dataset!
      // If static, remove fill and stroke here so chart uses dataset colors
    },
  };

  // Data for pie chart
  const pieData = [
    {
      name: "Must Have",
      expense: must,
      color: "rgb(123, 241, 113)",
      legendFontColor: Colors.textLightGray,
      legendFontSize: 15
    },
    {
      name: "Nice to Have",
      expense: nice,
      color: "rgb(239, 241, 109)",
      legendFontColor: Colors.textLightGray,
      legendFontSize: 15
    },
    {
      name: "Wasted",
      expense: wasted,
      color: "rgb(229, 87, 69)",
      legendFontColor: Colors.textLightGray,
      legendFontSize: 15
    }
  ]

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
          <CardContainer
            sectionLabel={"Spending Health Score"}
            iconCongig={
              {name:'target' , size:20, color:Colors.textLightGray}
            }
          >
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
                  style={styles.chartStyling}
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
          <CardContainer
            sectionLabel={"Spending Trends"}
            iconCongig={
              {name:"trending-up", size:16, color:Colors.onClickGreen}
            }
          >
            <LineChart 
              data={trendData}
              width={chartWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyling}
              withDots={true}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
            />
            <View style={styles.trendDetailContainer}>
              <View style={styles.trendDetailItem}>
                <View style={[styles.dot, {backgroundColor: Colors.must}]}/>
                <Text style={styles.trendDetailText}>Must</Text>
              </View>
              <View style={styles.trendDetailItem}>
                <View style={[styles.dot, {backgroundColor: Colors.nice}]}/>
                <Text style={styles.trendDetailText}>Nice</Text>
              </View>
              <View style={styles.trendDetailItem}>
                <View style={[styles.dot, {backgroundColor: Colors.wasted}]}/>
                <Text style={styles.trendDetailText}>Wasted</Text>
              </View>
            </View>
          </CardContainer>

          {/* Smart Insights */}
          <CardContainer
            sectionLabel={"Smart Insights"}
            iconCongig={
              {name:"alert-triangle", size:20, color:Colors.yellowAlert}
            }
          >
            <View style={styles.insightContainer}>
              {insights.map((insight, index) => (
                <View
                  key={index}
                  style={[styles.insightBackground, { backgroundColor: insight.backgroundColor }]}
                >
                  <View style={styles.insightContent}>
                    <View style={[styles.insightDot, {backgroundColor: insight.color}]} />
                    <View style={styles.insightText}>
                      <Text style={[styles.insightTitle, {color: insight.color}]}>{insight.title}</Text>
                      <Text style={styles.insightMessage}>{insight.message}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </CardContainer>
          
          {/* Spending Distribution */}
          <CardContainer
            sectionLabel={"Spending Distribution"}
            iconCongig={
              {name:"pie-chart", size:20, color:Colors.textLightGray}
            }
          >
            <PieChart 
              data={pieData}
              width={chartWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={"expense"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              style={styles.chartStyling}
            />
          </CardContainer>
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
  },
  // Spending Trends
  chartStyling: {
    alignItems: 'center',
    borderRadius: 18,
    marginVertical: 5,
  },
  trendDetailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  trendDetailItem: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  trendDetailText: {
    fontSize: 13,
    letterSpacing: 1.5,
    color: 'white'
  },
  // Smart Insights
  insightContainer: {
    gap: 12
  },
  insightContent: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  insightBackground: {
    marginHorizontal: 8,
    padding: 16,
    marginBottom: 8,
    borderRadius: 16,
  },
  insightText: {
    gap: 4,
  },
  insightTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.8
  },
  insightMessage: {
    fontSize: 14,
    color: 'white',
    letterSpacing: 0.3
  },
  insightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  }
})