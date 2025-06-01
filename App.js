import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import History from './screens/History';
import AddExpense from './screens/AddExpense';
import EditExpense from './screens/EditExpense';
import MonthlySummary from './screens/MonthlySummary';
import Analytics from './screens/Analytics';
import Settings from './screens/Settings';
import { useContext, useEffect, useState } from 'react';
import Welcome from './screens/OnBoard/Welcome';
import GetName from './screens/OnBoard/GetName';
import GetIncome from './screens/OnBoard/GetIncome';
import GetReady from './screens/OnBoard/GetReady';
import Benefits from './screens/OnBoard/Benefits';
import { Colors } from './constants/colors';
import { UserContext, UserContextProvider } from './store/user-context';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
      />
      <Stack.Screen
        name='AddExpense'
        component={AddExpense}
      />
      <Stack.Screen 
        name='EditExpense'
        component={EditExpense}
      />
      <Stack.Screen
        name='History'
        component={History}
      />
    </Stack.Navigator>
  )
}

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='History'
        component={History}
      />
      <Stack.Screen 
        name='MonthlySummary'
        component={MonthlySummary}
      />
      <Stack.Screen 
        name='Analytics'
        component={Analytics}
      />
    </Stack.Navigator>
  )
}

const MainAppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='HomeTab'
        component={HomeStack} // Using HomeStack to include Home, AddExpense, EditExpense, and History
      />
      <Tab.Screen 
        name='HistoryTab'
        component={HistoryStack}
      />
      <Tab.Screen 
        name='AnalyticsTab'
        component={Analytics} // Assuming Analytics is a standalone screen
      />
      <Tab.Screen 
        name='SettingsTab'
        component={Settings}
      />
    </Tab.Navigator>
  )
}

const OnBoardingStack = ({setHasOnBoarded}) => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false ,
        contentStyle: { backgroundColor: Colors.background}
      }}
    >
      <Stack.Screen 
        name='WelcomeScreen'
        component={Welcome}
      />
      <Stack.Screen
        name='BenefitsScreen'
        component={Benefits}
      />
      <Stack.Screen 
        name='GetNameScreen'
        component={GetName}
      />
      <Stack.Screen 
        name='GetIncomeScreen'
        component={GetIncome}
      />
      <Stack.Screen 
        name='GetReadyScreen'
      >
        {(props) => <GetReady {...props} setHasOnBoarded={setHasOnBoarded} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

// Main Navigator to handle both Onboarding and Main App Stacks
const MainNavigator = () => {
  const {userName, monthlyIncome, hasCompletedOnboarding} = useContext(UserContext)
  const [hasOnBoarded, setHasOnBoarded] = useState(!!hasCompletedOnboarding)
  const [isLoading, setIsLoading] = useState(true)

  // Loading state
  useEffect(() => {
    setIsLoading(false)
  }, [])

  // Will fix this later, make a custom loading / splash screen
  if (isLoading) {
    // Optional: show a splash or loader while checking
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasOnBoarded ? (
        <Stack.Screen
          name='OnBoardingStack'
        >
          {(props) => <OnBoardingStack {...props} setHasOnBoarded={setHasOnBoarded} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name='MainAppStack'
          component={MainAppTabs}
        />
      ) }
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar style='light' />
        <MainNavigator />
      </NavigationContainer>
    </UserContextProvider>
  );
}


const styles = StyleSheet.create({
  
});
