import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import History from './screens/History';
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
import { ExpenseContextProvider } from './store/expense-context';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import Loading from './screens/Loading';
import Icon from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.title
        },
        headerTintColor: 'white',
        cardStyle: {
          backgroundColor: Colors.background
        }
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: "Home"
        }}
      />
      <Stack.Screen
        name='ManageExpense'
        component={ManageExpense}
        options={{
          presentation: 'modal',
          title: "Manage Expense"
        }}
      />
      {/* <Stack.Screen 
        name='EditExpense'
        component={EditExpense}
        options={{
          title: "Edit Expense"
        }}
      /> */}
      <Stack.Screen
        name='MonthlySummary'
        component={MonthlySummary}
        options={({route}) => ({
          title : route.params?.month && route.params?.year
          ? `${route.params.month} ${route.params.year}`
          : "Current Month Summary"
        })}
      />
      <Stack.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: "All Expenses",
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  )
}

const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.title
        },
        cardStyle: {
          backgroundColor: Colors.background
        },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen 
        name='History'
        component={History}
        options={{
          title: "History"
        }}
      />
      <Stack.Screen
        name='MonthlySummary'
      >
        {/* Passing a prop to component != passing data through navigation */}
        {(props) => (
          <MonthlySummary 
            {...props} 
            context="history"  // Tell the component it's in history context
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: "All Expenses",
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name='ManageExpense'
        component={ManageExpense}
        options={{
          presentation: 'modal',
          title: "Manage Expense"
        }}
      />
    </Stack.Navigator>
  )
}

const AnalyticStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.title
        },
        cardStyle: {
          backgroundColor: Colors.background
        },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen 
        name='Analytics'
        component={Analytics}
      />
    </Stack.Navigator>
  )
}

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.title
        },
        cardStyle: {
          backgroundColor: Colors.background
        },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen 
        name='Settings'
        component={Settings}
      />
    </Stack.Navigator>
  )
}

const MainAppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // For styling tab bar
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: Colors.background, // Tab bar background
          height: 70,
          paddingBottom: 10,
          paddingTop: 2,
          borderTopWidth: 1,
          borderTopColor: '#333'
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          marginTop: 3
        }
      }}
    >
      <Tab.Screen 
        name='HomeTab'
        component={HomeStack} // Using HomeStack to include Home, ManageExpense, and History
        options={{
          title: "Home",
          tabBarIcon: ({focused, color}) => (
            <Icon name={focused ? "home" : "home-outline"} size={22} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name='HistoryTab'
        component={HistoryStack}
        options={{
          title: "History",
          tabBarIcon: ({focused, color}) => (
            <Icon name={focused ? "time" : "time-outline"} size={22} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name='AnalyticsTab'
        component={AnalyticStack} // Assuming Analytics is a standalone screen
        options={{
          title: "Analytics",
          tabBarIcon: ({focused, color}) => (
            <Icon name={focused ? "bar-chart" : "bar-chart-outline"} size={22} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name='SettingsTab'
        component={SettingStack}
        options={{title: "Settings",
          tabBarIcon: ({focused, color}) => (
            <Icon name={focused ? "settings" : "settings-outline"} size={24} color={color} />
          )
        }}
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
        cardStyle: { backgroundColor: Colors.background}
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

  // Loading state
  useEffect(() => {
    if (!isLoading) {
      setHasOnBoarded(hasCompletedOnboarding)
    }
  }, [isLoading, hasCompletedOnboarding])

  // Will fix this later, make a custom loading / splash screen
  if (isLoading || hasOnBoarded === null) {
    // Optional: show a splash or loader while checking
    return <Loading />;
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
      <ExpenseContextProvider>
        <NavigationContainer>
          <StatusBar style='light' />
          <MainNavigator />
        </NavigationContainer>
      </ExpenseContextProvider>
    </UserContextProvider>
  );
}


const styles = StyleSheet.create({
  
});
