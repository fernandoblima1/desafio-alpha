"use client";

import { Button } from "@/components/ui/button";
import { useCreateProduct } from "@/hooks/use-create-product-modal";

export function AddProductButton() {
  const createProductModal = useCreateProduct();

  return (
    <>
      <Button variant="default" onClick={createProductModal.onOpen}>
        Adicione um produto
      </Button>
    </>
  );
}
