"use client";

import { useMounted } from "@/hooks/use-mounted";

import { SignInModal } from "../modals/sign-in-modal";
import { CreateProductModal } from "../modals/create-product-modal";
import { UpdateProductModal } from "../modals/update-product-modal";
import { DeleteProductModal } from "../modals/delete-product-modal";

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      <CreateProductModal />
      <UpdateProductModal />
      <DeleteProductModal />
    </>
  );
};
