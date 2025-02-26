import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { OrderItem } from "../types";
import { defaultImage } from "./ProductListItem";
import { Tables } from "../database.types";

type OrderItemListItemProps = {
  item: { products: Tables<"products"> } & Tables<"order_item">;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  const product = item.products || {}; // Ensure `products` exists
  const productImage = product.image || defaultImage;
  const productName = product.name || "Unknown Product";
  const productPrice = product.price ? product.price.toFixed(2) : "N/A";

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: productImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{productName}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${productPrice}</Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderItemListItem;
