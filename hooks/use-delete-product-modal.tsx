import { create } from "zustand";

interface useDeleteProductModalStore {
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
  productId: number | null;
}

export const useDeleteProduct = create<useDeleteProductModalStore>((set) => ({
  isOpen: false,
  onOpen: (id: number) => set({ isOpen: true, productId: id }),
  onClose: () => set({ isOpen: false }),
  productId: null,
}));
