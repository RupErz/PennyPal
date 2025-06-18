import React, { useState } from 'react';
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

const { width: screenWidth } = Dimensions.get('window');

const Analytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('6months');
  
  // Sample data - replace with your actual data
  const overallSpendingData = {
    mustHave: 62.4,
    niceToHave: 28.7,
    wasted: 8.9
  };
  
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [1200, 1300, 1250, 1400, 1350, 1450],
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Green for Must Have
        strokeWidth: 2
      },
      {
        data: [400, 350, 500, 380, 420, 390],
        color: (opacity = 1) => `rgba(251, 191, 36, ${opacity})`, // Yellow for Nice to Have
        strokeWidth: 2
      },
      {
        data: [150, 200, 120, 180, 100, 160],
        color: (opacity = 1) => `rgba(248, 113, 113, ${opacity})`, // Red for Wasted
        strokeWidth: 2
      }
    ]
  };

  const pieData = [
    {
      name: 'Must Have',
      population: overallSpendingData.mustHave,
      color: '#22C55E',
      legendFontColor: '#9CA3AF',
      legendFontSize: 12,
    },
    {
      name: 'Nice to Have',
      population: overallSpendingData.niceToHave,
      color: '#FBBF24',
      legendFontColor: '#9CA3AF',
      legendFontSize: 12,
    },
    {
      name: 'Wasted',
      population: overallSpendingData.wasted,
      color: '#F87171',
      legendFontColor: '#9CA3AF',
      legendFontSize: 12,
    },
  ];
  
  const getHealthScore = () => {
    const score = Math.round(100 - (overallSpendingData.wasted * 2) - (overallSpendingData.niceToHave * 0.5));
    return Math.max(0, Math.min(100, score));
  };
  
  const getHealthColor = (score) => {
    if (score >= 80) return '#22C55E';
    if (score >= 60) return '#FBBF24';
    return '#F87171';
  };
  
  const healthScore = getHealthScore();
  
  const progressData = {
    data: [healthScore / 100],
    colors: [getHealthColor(healthScore)]
  };

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

  const insights = [
    {
      type: 'success',
      title: 'Great Progress!',
      message: 'Your wasted spending decreased by 12% this month',
      color: '#22C55E',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
    },
    {
      type: 'warning',
      title: 'Watch Out',
      message: 'Nice-to-have expenses are trending upward',
      color: '#FBBF24',
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
    },
    {
      type: 'info',
      title: 'Recommendation',
      message: 'Set a monthly limit of $400 for discretionary spending',
      color: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
  ];

  const topCategories = [
    { name: 'Food & Dining', amount: '$487', percentage: 28, color: '#F87171' },
    { name: 'Transportation', amount: '$342', percentage: 20, color: '#3B82F6' },
    { name: 'Entertainment', amount: '$298', percentage: 17, color: '#22C55E' },
    { name: 'Shopping', amount: '$234', percentage: 14, color: '#FBBF24' },
  ];

  // Calculate proper chart width accounting for card margins and padding
  const chartWidth = screenWidth - 88; // 48 (margins) + 40 (padding)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>Overall Performance</Text>
          </View>
          <View style={styles.headerIcon}>
            <Icon name="bar-chart-2" size={20} color="#9CA3AF" />
          </View>
        </View>

        {/* Spending Health Score */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Spending Health Score</Text>
            <Icon name="target" size={20} color="#9CA3AF" />
          </View>
          
          <View style={styles.healthScoreContainer}>
            <ProgressChart
              data={progressData}
              width={chartWidth - 40} // Additional padding for progress chart
              height={160}
              strokeWidth={8}
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
          
          <View style={styles.healthScoreDetails}>
            <Text style={styles.healthScoreSubtext}>Based on overall spending patterns</Text>
            <View style={styles.healthScoreLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#22C55E' }]} />
                <Text style={styles.legendText}>Must Have: {overallSpendingData.mustHave}%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FBBF24' }]} />
                <Text style={styles.legendText}>Nice to Have: {overallSpendingData.niceToHave}%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F87171' }]} />
                <Text style={styles.legendText}>Wasted: {overallSpendingData.wasted}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trend Analysis */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Spending Trends</Text>
            <View style={styles.periodSelector}>
              <Icon name="trending-up" size={16} color="#22C55E" />
              <TouchableOpacity style={styles.periodButton}>
                <Text style={styles.periodText}>{selectedPeriod === '6months' ? '6M' : selectedPeriod}</Text>
                <Icon name="chevron-down" size={12} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
          
          <LineChart
            data={trendData}
            width={chartWidth} // Fixed width calculation
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withDots={true}
            withShadow={false}
            withInnerLines={false}
            withOuterLines={false}
          />
          
          <View style={styles.trendLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#22C55E' }]} />
              <Text style={styles.legendText}>Must Have</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FBBF24' }]} />
              <Text style={styles.legendText}>Nice to Have</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F87171' }]} />
              <Text style={styles.legendText}>Wasted</Text>
            </View>
          </View>
        </View>

        {/* Smart Insights */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Smart Insights</Text>
            <Icon name="alert-triangle" size={20} color="#FBBF24" />
          </View>
          
          <View style={styles.insightsContainer}>
            {insights.map((insight, index) => (
              <View key={index} style={[styles.insightCard, { backgroundColor: insight.backgroundColor }]}>
                <View style={styles.insightContent}>
                  <View style={[styles.insightDot, { backgroundColor: insight.color }]} />
                  <View style={styles.insightText}>
                    <Text style={[styles.insightTitle, { color: insight.color }]}>
                      {insight.title}
                    </Text>
                    <Text style={styles.insightMessage}>{insight.message}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Spending Distribution */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Spending Distribution</Text>
            <Icon name="pie-chart" size={20} color="#9CA3AF" />
          </View>
          
          <PieChart
            data={pieData}
            width={chartWidth} // Fixed width calculation
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </View>

        {/* Top Categories */}
        <View style={[styles.card, { marginBottom: 24 }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Top Categories</Text>
            <Icon name="list" size={20} color="#9CA3AF" />
          </View>
          
          <View style={styles.categoriesContainer}>
            {topCategories.map((category, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <View style={styles.categoryRight}>
                  <Text style={styles.categoryAmount}>{category.amount}</Text>
                  <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Analytics

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1F2937',
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  healthScoreContainer: {
    alignItems: 'center',
    position: 'relative',
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
    fontWeight: 'bold',
  },
  healthScoreDetails: {
    alignItems: 'center',
    marginTop: 16,
  },
  healthScoreSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  healthScoreLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  periodText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  chart: {
    borderRadius: 16,
  },
  trendLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  insightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightMessage: {
    fontSize: 12,
    color: '#D1D5DB',
    lineHeight: 16,
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryPercentage: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
});