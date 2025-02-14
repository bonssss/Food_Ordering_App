import { StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";

import { Text, View } from "@/src/components/Themed";

import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { useProductList } from "@/src/api/products";

export default function TabOneScreen() {
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
