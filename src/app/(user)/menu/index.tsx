import { StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";

import { Text, View } from "@/src/components/Themed";

import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useProductList } from "@/src/api/products";

export default function TabOneScreen() {
  // useEffect(()=>{
  //   const fetchProducts = async ()=>{
  //   const {data,error}=  await supabase.from('products').select('*');

  //   console.log(data);

  //   };
  //   fetchProducts()

  // },[])
  const { data: products, error, isLoading } = useProductList();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <View>
      {/* <ProductListItem  product ={products[3]}/>
    <ProductListItem   product ={products[5]}/> */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
