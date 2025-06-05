import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const CancelButton = ({ children }) => {
    const navigation = useNavigation()
    const handleCancel = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.innerPressable, pressed && styles.pressed] }
                android_ripple={{ color: Colors.subTitle, borderless: true }}
                onPress={handleCancel}
            >
                <Text style={styles.text}>{children}</Text>
            </Pressable>
        </View>
        
    )
}

export default CancelButton

// Suport Responsive Design
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.redSmooth,
        minWidth: width * 0.3,
        height: 50,
        borderRadius: 20,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    innerPressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
        padding: 10 // use Padding no margin to avoid clipping text
    },  
    text: {
        color: Colors.blankWhite,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Monsterat_600SemiBold"
    },
    pressed: {
        opacity: 0.75,
    }
})