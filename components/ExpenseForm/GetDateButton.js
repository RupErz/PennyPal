import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'

const GetDateButton = ({onPress}) => {
    const [isChangingColor, setIsChangingColor] = useState(false)
    const [isPressed, setIsPressed] = useState(false)


    const handleOnPressAutoFillDateButton = () => {
        setIsChangingColor(!isChangingColor)
        onPress()
    }

    const newBackground = {
        backgroundColor: Colors.greenShine
    }

    return (
        <Pressable
            style={[styles.container, isChangingColor && newBackground ]}
            onPress={handleOnPressAutoFillDateButton}
        >
        </Pressable>
    )
}

export default GetDateButton

const styles = StyleSheet.create({
    container: {
        width: 17,
        height: 17,
        borderColor: Colors.greenShine,
        backgroundColor: Colors.background,
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    }
})