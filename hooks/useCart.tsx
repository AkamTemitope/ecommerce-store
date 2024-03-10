import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product, Item } from "@/types";

interface CartStore {
  items: Item[];
  quantity: (id: string) => number;
  increaseByOne: (id: string) => void;
  decreaseByOne: (id: string) => void;
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      quantity: (id: string) => {
        const item = get().items.find((item) => item.product.id === id);

        return item ? item.quantity : 0;
      },
      increaseByOne: (id: string) => {
        set({
          items: [
            ...get().items.map((item) => {
              if (item.product.id === id) {
                return {
                  ...item,
                  quantity: item.quantity + 1
                };
              } else {
                return item;
              }
            })
          ]
        });
      },
      decreaseByOne: (id: string) => {
        const existingItem = get().items.find((item) => item.product.id === id);

        if (existingItem && existingItem.quantity > 1) {
          set({
            items: [
              ...get().items.map((item) => {
                if (item.product.id === id) {
                  return {
                    ...item,
                    quantity: item.quantity - 1
                  };
                } else {
                  return item;
                }
              })
            ]
          });
        } else {
          set({
            items: [...get().items.filter((item) => item.product.id !== id)]
          });
          toast.success("Item removed from cart.");
        }
      },
      addItem: (data: Product) => {
        const existingItem = get().items.find(
          (item) => item.product.id === data.id
        );

        if (existingItem) {
          set({
            items: [
              ...get().items.map((item) =>
                item.product.id === existingItem.product.id
                  ? {
                      ...existingItem,
                      quantity: existingItem.quantity + 1
                    }
                  : item
              )
            ]
          });
        } else {
          const item = {
            product: data,
            quantity: 1
          } as Item;

          set({ items: [...get().items, item] });
        }

        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.product.id !== id)]
        });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] })
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useCart;
