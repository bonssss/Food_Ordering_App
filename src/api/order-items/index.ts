import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { InsertTables } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const useId = session?.user.id;
  return useMutation({
    async mutationFn(items: InsertTables<"order_item">[]) {
      const { error, data: newProduct } = await supabase
        .from("order_item")
        .insert(items)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
   
  });
};
