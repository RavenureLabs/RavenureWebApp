import { create } from "zustand";

interface CartState {
    isOpen: boolean;
    toggle: () => void;
    setOpen: (value: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (value) => set({ isOpen: value }),
}));