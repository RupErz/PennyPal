import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    userName: "",
    monthlyIncome: 0,
    hasCompletedOnboarding: false,
    onboardingStep: "Welcome",
    setUserName: () => {},
    setMonthlyIncome: () => {},
    setHasCompletedOnboarding: () => {},
    setOnboardingStep: () => {},
})

export const UserContextProvider = ({children}) => {
    const [userName, setUserName] = useState("")
    const [monthlyIncome, setMonthlyIncome] = useState(0)
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

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

                // Debugging logs
                console.log('Loaded userName:', storedName);
                console.log('Loaded monthlyIncome:', storedIncome);
                console.log('Loaded hasCompletedOnboarding:', onboardingComplete)
                console.log('Loaded onboardingStep:', storedOnboardingStep);

                if (storedName) setUserName(storedName)
                if (storedIncome) setMonthlyIncome(Number(storedIncome))
                if (onboardingComplete) setHasCompletedOnboarding(onboardingComplete === "true")
                if (storedOnboardingStep) setOnboardingStep(storedOnboardingStep)      
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
            // console.log("User data saved successfully!"); Debugging Log
            } catch (error) {
                console.log("Failed to save user data:", error);
            }
        };

        saveUserData();
    }, [userName, monthlyIncome, hasCompletedOnboarding, onboardingStep]);


    // Provide the context values
    return (
        <UserContext.Provider
            value={{
                userName,
                monthlyIncome,
                hasCompletedOnboarding,
                onboardingStep,
                setUserName,
                setMonthlyIncome,
                setHasCompletedOnboarding,
                setOnboardingStep,
                isLoading // expose loading state
            }}
        >
            {children}
        </UserContext.Provider>
    )
}