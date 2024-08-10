"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { useDeleteProduct } from "@/hooks/use-delete-product-modal";
import { Product } from "@/types";

const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres."),
  price: z.string().min(1, "O preço é obrigatório."),
  stock: z
    .number()
    .int()
    .positive("Estoque deve ser um número inteiro positivo."),
});

type ProductFormData = z.infer<typeof productSchema>;

export const DeleteProductModal = () => {
  const { isOpen, onClose, productId } = useDeleteProduct();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const deleteProduct = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("authToken") ?? "";

      const response = await fetch(
        `https://interview.t-alpha.com.br/api/products/delete-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        console.log(res);
        if (!res.ok) {
          toast.error("Ocorreu um erro ao apagar o produto.");
        }
        toast.success("Produto apagado com sucesso.");
        onClose();
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Ocorreu um erro ao apagar o produto.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal showModal={isOpen} setShowModal={onClose}>
      <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center ">
        <Icons.trash className="h-10 w-10" />
        <h3 className="font-urban text-2xl font-bold">Apagar Produto</h3>
        <p className="text-sm text-gray-500">
          Tem certeza que deseja apagar este produto?
        </p>
      </div>

      <div className="flex flex-row space-x-4 justify-center bg-secondary/50 px-4 py-8 ">
        <Button
          variant="default"
          onClick={onClose}
          className={
            isDeleting
              ? "bg-slate-700 text-white hover:bg-slate-700 hover:cursor-not-allowed"
              : ""
          }
          disabled={isDeleting}
        >
          Cancelar
        </Button>
        <Button
          variant="default"
          onClick={deleteProduct}
          className="bg-red-600 text-white hover:bg-red-700"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.trash className="mr-2 h-4 w-4" />
          )}
          Apagar produto
        </Button>
      </div>
    </Modal>
  );
};
