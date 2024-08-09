import { create } from "zustand";

interface useUpdateProductModalStore {
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
  productId: number | null;
}

export const useUpdateProduct = create<useUpdateProductModalStore>((set) => ({
  isOpen: false,
  onOpen: (id: number) => set({ isOpen: true, productId: id }),
  onClose: () => set({ isOpen: false }),
  productId: null,
}));
