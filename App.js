import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background
        }
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
      />
      <Stack.Screen
        name='AddExpense'
        component={AddExpense}
        options={{
          presentation: 'modal'
        }}
      />
      <Stack.Screen 
        name='EditExpense'
        component={EditExpense}
      />
      <Stack.Screen
        name='MonthlySummary'
        component={MonthlySummary}
      />
    </Stack.Navigator>
  )
}

const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
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
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.title
        },
        // For styling tab bar
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: Colors.background // Tab bar background
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray"
      }}
    >
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
  const {onboardingStep} = useContext(UserContext)
  
  // By default, we start with the Welcome Screen
  // If the onboardingStep is set, we navigate to the respective screen
  let initialRouteName = 'WelcomeScreen'
  if (onboardingStep === 'GetBenefits') initialRouteName = 'BenefitsScreen'
  if (onboardingStep === 'GetName') initialRouteName = 'GetNameScreen' 
  if (onboardingStep === 'GetIncome') initialRouteName = 'GetIncomeScreen' 
  if (onboardingStep === 'GetReady') initialRouteName = 'GetReadyScreen' 
 
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false ,
        contentStyle: { backgroundColor: Colors.background}
      }}
      initialRouteName={initialRouteName} // Indicate which screen to show first
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
  const {userName, monthlyIncome, hasCompletedOnboarding, onboardingStep, isLoading} = useContext(UserContext)
  const [hasOnBoarded, setHasOnBoarded] = useState(null)

  // Debugging logs
  // console.log(userName)
  // console.log(monthlyIncome)
  // console.log(hasCompletedOnboarding)
  // console.log(onboardingStep)

  // Loading state
  useEffect(() => {
    if (!isLoading) {
      setHasOnBoarded(hasCompletedOnboarding)
    }
  }, [isLoading, hasCompletedOnboarding])

  // Will fix this later, make a custom loading / splash screen
  if (isLoading || hasOnBoarded === null) {
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
