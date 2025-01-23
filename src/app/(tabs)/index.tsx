import { StyleSheet,Image,FlatList } from 'react-native';

import { Text, View } from '@/src/components/Themed';

import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';



export default function TabOneScreen() {
  return (
    <View >
    {/* <ProductListItem  product ={products[3]}/>
    <ProductListItem   product ={products[5]}/> */}
    <FlatList
    data={products}
    renderItem={({item})=> <ProductListItem  product={item}/> }
    />
  </View>
  );
}
