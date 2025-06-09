import React, { useLayoutEffect } from 'react'
import { Text, View } from 'react-native'

const MonthlySummary = ({navigation}) => {
  // Change the header title from Tab parent
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      title: "Dashboard"
    })
  }, [navigation])

  return (
    <View>
        <Text>This is Monthly Summary Screen</Text>
    </View>
  )
}

export default MonthlySummary