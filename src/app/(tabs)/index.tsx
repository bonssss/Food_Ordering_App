import { StyleSheet,Image } from 'react-native';

import { Text, View } from '@/src/components/Themed';

import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';



export default function TabOneScreen() {
  return (
    <View >
    <ProductListItem  product   ={products[2]}/>
    <ProductListItem   product   ={products[5]}/>
  </View>
  );
}
