import { ActivityIndicator, FlatList } from "react-native";
import orders from "../../../../../assets/data/orders";
import OrderListItem from "../.././../../components/OrderListItem";
import { Stack } from "expo-router";
import { useOrderList } from "@/src/api/orders";
import { Text } from "react-native";
export default function OrdersScreen() {
  const { data: orders, error, isLoading } = useOrderList({ archived: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
