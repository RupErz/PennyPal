import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect } from "react";

export const UserContext = createContext({
    userName: "",
    monthlyIncome: 0,
    hasCompletedOnboarding: false,
    setUserName: () => {},
    setMonthlyIncome: () => {},
    setHasCompletedOnboarding: () => {}
})

export const UserContextProvider = ({children}) => {
    const [userName, setUserName] = useState("")
    const [monthlyIncome, setMonthlyIncome] = useState(0)
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

    // Load Data from AsyncStorage
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedName = await AsyncStorage.getItem("userName")
                const storedIncome = await AsyncStorage.getItem("monthlyIncome")
                const onboardingComplete = await AsyncStorage.getItem("hasCompletedOnboarding")
                
                if (storedName) setUserName(storedName)
                if (storedIncome) setMonthlyIncome(Number(storedIncome))
                if (onboardingComplete) setHasCompletedOnboarding(onboardingComplete === "true")
            } catch (error) {
                console.log("Failed to load user data:",  error)
            }
        }

        loadUserData()
    }, [])

    // Save Data to AsyncStorage whenever it changes
    useEffect(() => {
        AsyncStorage.setItem("userName", userName)
    }, [userName])

    useEffect(() => {
        AsyncStorage.setItem("monthlyIncome", monthlyIncome.toString())
    })

    useEffect(() => {
        AsyncStorage.setItem("hasCompletedOnboarding", hasCompletedOnboarding.toString())
    })

    // Provide the context values
    return (
        <UserContext.Provider
            value={{
                userName,
                monthlyIncome,
                hasCompletedOnboarding,
                setUserName,
                setMonthlyIncome,
                setHasCompletedOnboarding
            }}
        >
            {children}
        </UserContext.Provider>
    )
}