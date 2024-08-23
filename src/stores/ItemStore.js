import { create } from "zustand";

const useItemStore = create((set) => ({
  items: [
    { id: "item_1", name: "Item 1", icon: "🛏️", img: "/path/to/img1", text: "Item 1 Description", price: 100000 },
    { id: "item_2", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    // ... 10 more items
  ],
  updateItemQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
export default useItemStore;