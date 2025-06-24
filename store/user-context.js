import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    userName: "",
    monthlyIncome: 0,
    hasCompletedOnboarding: false,
    onboardingStep: "Welcome",
    dailyReminders: false, // Future feature for daily reminders
    currentAchievement: "Beginner Saver", // Default achievement
    setUserName: () => {},
    setMonthlyIncome: () => {},
    setHasCompletedOnboarding: () => {},
    setOnboardingStep: () => {},
    setDailyReminders: () => {},
    setCurrentAchievement: () => {},
    resetUserData: () => {} // To Clear All Data to get back to OnBoarding Phase
})

export const UserContextProvider = ({children}) => {
    const [userName, setUserName] = useState("")
    const [monthlyIncome, setMonthlyIncome] = useState(0)
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
    const [dailyReminders, setDailyReminders] = useState(false)
    const [currentAchievement, setCurrentAchievement] = useState("Beginner Saver") // Default achievement

    // Tracking onboarding step
    const [onboardingStep, setOnboardingStep] = useState("Welcome")
    const [isLoading, setIsLoading] = useState(true)

    // Load Data from AsyncStorage
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedName = await AsyncStorage.getItem("userName")
                const storedIncome = await AsyncStorage.getItem("monthlyIncome")
                const onboardingComplete = await AsyncStorage.getItem("hasCompletedOnboarding")
                const storedOnboardingStep = await AsyncStorage.getItem("onboardingStep")
                const storedDailyReminders = await AsyncStorage.getItem("dailyReminders")
                const storedCurrentAchievement = await AsyncStorage.getItem("currentAchievement")

                // Debugging logs
                console.log('Loaded userName:', storedName);
                console.log('Loaded monthlyIncome:', storedIncome);
                console.log('Loaded hasCompletedOnboarding:', onboardingComplete)
                console.log('Loaded onboardingStep:', storedOnboardingStep);
                console.log('Loaded dailyReminders:', storedDailyReminders);
                console.log('Loaded currentAchievement:', storedCurrentAchievement);

                if (storedName) setUserName(storedName)
                if (storedIncome) setMonthlyIncome(Number(storedIncome))
                if (onboardingComplete) setHasCompletedOnboarding(onboardingComplete === "true")
                if (storedOnboardingStep) setOnboardingStep(storedOnboardingStep)   
                if (storedDailyReminders) setDailyReminders(storedDailyReminders === "true")   
                if (storedCurrentAchievement) setCurrentAchievement(storedCurrentAchievement)
            } catch (error) {
                console.log("Failed to load user data:",  error)
            } finally {
                setIsLoading(false); // Set loading to false after attempting to load data
            }
        }

        loadUserData()
    }, [])

    // Save all data whenever any of the tracked values change
    useEffect(() => {
        const saveUserData = async () => {
            try {
                await AsyncStorage.setItem("userName", userName);
                await AsyncStorage.setItem("monthlyIncome", monthlyIncome.toString());
                await AsyncStorage.setItem("hasCompletedOnboarding", hasCompletedOnboarding.toString());
                await AsyncStorage.setItem("onboardingStep", onboardingStep);
                await AsyncStorage.setItem("dailyReminders", dailyReminders.toString())
                await AsyncStorage.setItem("currentAchievement", currentAchievement);
                // console.log("User data saved successfully!"); Debugging Log
            } catch (error) {
                console.log("Failed to save user data:", error);
            }
        };

        saveUserData();
    }, [userName, monthlyIncome, hasCompletedOnboarding, onboardingStep, dailyReminders, currentAchievement]);

    // Function to reset User Data
    const resetUserData = async () => {
        try {
            await AsyncStorage.multiRemove([
                "userName",
                "monthlyIncome",
                "hasCompletedOnboarding",
                "onboardingStep",
                "dailyReminders"
            ]);

            // Reset state values to default
            setUserName("");
            setMonthlyIncome(0);
            setHasCompletedOnboarding(false);
            setOnboardingStep("Welcome");
            setDailyReminders(false);

            console.log("User data has been reset.");
        } catch (error) {
            console.log("Failed to reset user data:", error);
        }
    };


    // Provide the context values
    return (
        <UserContext.Provider
            value={{
                userName,
                monthlyIncome,
                hasCompletedOnboarding,
                onboardingStep,
                dailyReminders,
                currentAchievement,
                setUserName,
                setMonthlyIncome,
                setHasCompletedOnboarding,
                setOnboardingStep,
                setDailyReminders,
                resetUserData,
                setCurrentAchievement,
                isLoading // expose loading state
            }}
        >
            {children}
        </UserContext.Provider>
    )
}