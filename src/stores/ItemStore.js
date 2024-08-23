import { create } from "zustand";

const useItemStore = create((set) => ({
  items: [
    { id: "1", name: "Item 1", icon: "🛏️", img: "/path/to/img1", text: "Item 1 Description", price: 100000 },
    { id: "2", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "3", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "4", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "5", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "6", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "7", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "8", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "9", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "10", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
    { id: "11", name: "Item 2", icon: "🍽️", img: "/path/to/img2", text: "Item 2 Description", price: 200000 },
  ],
  updateItemQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
export default useItemStore;