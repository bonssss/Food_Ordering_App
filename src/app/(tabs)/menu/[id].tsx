import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

export default function productList() {
  const {id} = useLocalSearchParams()
  return (
    <View>
      <Stack.Screen options={{title:'product Details'}}/>
      <Text style={{color:'white'}}>productList :{id}</Text>
    </View>
  )
}

