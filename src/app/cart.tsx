import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native'

import { useCart} from '../providers/CartProvider'
import { StyleSheet } from 'react-native'
// import { FlatList } from 'react-native-reanimated/lib/typescript/Animated'
import CartListItem from '../components/CartListItem'
import Button from '../components/Button'
export default function cartScreen() {
  const { items ,total} = useCart();

  return (
    <View style={styles.container}>
      <FlatList
      data={items}
      renderItem={({item}) => <CartListItem cartItem={item}/>}
      contentContainerStyle={{gap:10}}

      />
      <Text style={styles.total}>Total: ${total}</Text>
                  <Button text='Checkout' />
      
      <StatusBar backgroundColor='#4f3' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  total:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:10,
    alignSelf:'center'

  }
});