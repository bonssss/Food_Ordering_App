import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem } from "../types";
import { randomUUID } from "expo-crypto";
import { Tables } from "../database.types";
import { useInsertOrder } from "../api/orders";
import { router } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type Product = Tables<"products">;
type CartType = {
  items: CartItem[];
  addItem: (Product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});
const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    // console.log(product);
    const newCartItenm: CartItem = {
      id: randomUUID(),
      product,
      size,
      quantity: 1,
      product_id: product.id,
    };
    setItems([newCartItenm, ...items]);
  };
  // console.log(items);

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((items) => items.quantity > 0)
    ); // ✅ updatedItems is now CartItem[]
  };
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const clearCartItems = () => {
    setItems([]);
  };
  const checkout = () => {
    // console.log("Checkout called");
    // Here you can call your checkout API
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
      // Add any other fields you need here like price, etc.
    }));

    insertOrderItems(
      orderItems,

      {
        onSuccess: () => {
          console.log(order);
          clearCartItems();
          router.push(`/(user)/orders/${order.id}`);
        }, // Add your own success callback here if needed
      }
    );

    // Here you can save the order items to your database
  };
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
