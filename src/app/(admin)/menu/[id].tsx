import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { defaultImage } from "@/src/components/ProductListItem";
import ProductListItem from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";

export default function productList() {
  const sizes :PizzaSize[] = ["S", "M", "L", "XL"];
  const router = useRouter();
  const {addItem}=useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const addToCart = () => {
    // console.warn('Added to cart,size:',selectedSize);
    if(!product){
      return;
    }
    addItem(product,selectedSize);
    router.navigate('/cart');
  }

  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id.toString() === id);
  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
      // name="[id]" 
      options={{title:'Menu',
       headerRight: () => (
        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    }} />
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        style={styles.image}
        source={{ uri: product?.image || defaultImage }}
      />
      <Text style={styles.title}>{product?.name}</Text>

      

      <Text style={styles.price}>${product?.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    // borderRadius: 20,
    flex: 1,
  },
selectsize: {
  fontSize: 20,
  fontWeight: "bold",
},
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    color: Colors.dark.background,
  },
  price: {
    fontSize: 20,
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gray",
    width: 50,
    aspectRatio: 1,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
