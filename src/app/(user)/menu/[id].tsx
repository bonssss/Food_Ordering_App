import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { defaultImage } from "@/src/components/ProductListItem";
import ProductListItem from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";

export default function productList() {
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const addToCart = () => {
    // console.warn('Added to cart,size:',selectedSize);
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.navigate("/cart");
  };

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        style={styles.image}
        source={{ uri: product?.image || defaultImage }}
      />
      <Text style={styles.title}>{product?.name}</Text>

      <Text style={styles.selectsize}>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor:
                  size === selectedSize ? Colors.light.tint : "gainsboro",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: size === selectedSize ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product?.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
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
    marginTop: "auto",
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
