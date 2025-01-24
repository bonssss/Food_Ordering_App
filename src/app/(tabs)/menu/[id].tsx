import { View, Text,Image } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products'
import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'
import { defaultImage } from '@/src/components/ProductListItem'
import ProductListItem from '@/src/components/ProductListItem'

export default function productList() {

  const sizes = ['S','M','L','XL']
  
  const {id} = useLocalSearchParams()
  const product = products.find((product) => product.id.toString() === id);
  if (!product){
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product?.name}}/>

      
      <Image  style={styles.image} source={{uri:product?.image || defaultImage  }}/>
      <Text style={styles.title}>{product?.name}</Text>

      <Text style={styles.title}>Select Size</Text>
      <View   style={styles.sizes}>
      {sizes.map((size)=>(
        <View key={size}  style={styles.size}> 
          <Text style={styles.sizeText} >{size}</Text></View>
        
      ))}
      </View>
    


      <Text style={styles.price}>${product?.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:
  {
    backgroundColor:'white',
    padding:10,
    borderRadius:20,
    flex:1,
    },

  title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginVertical:10,
      color: Colors.dark.background
  
    },
    price:{
      fontSize: 20,
      color: Colors.light.tint
    },
    image:{
      width:'100%',
      aspectRatio:1
    },
    sizes:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical:10,
    },
    size:{
      backgroundColor:'gray',
      width:50,
      aspectRatio:1,
      borderRadius:'50%',
      alignItems:'center',
      justifyContent:'center'
    },
    sizeText:{
      fontSize:20,
      fontWeight:'500'
    }
})

