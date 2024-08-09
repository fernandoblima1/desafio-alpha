"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useCreateProduct } from "@/hooks/use-create-product-modal";
import { Icons } from "@/components/shared/icons";

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

export const CreateProductModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createProductModal = useCreateProduct();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const priceValue = watch("price") ?? "";

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/[^\d,]/g, "");
    if (value.includes(",")) {
      value = value.replace(",", ".");
    }
    const parts = value.split(".");
    if (parts[0] && parts[0].length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const formattedValue = `R$ ${parts.join()}`;
    setValue("price", formattedValue);
  };

  const createProduct = async (productData: ProductFormData) => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
      const priceToSend = productData.price
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".");

      const response = await fetch(
        "https://interview.t-alpha.com.br/api/products/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...productData,
            price: parseFloat(priceToSend), // Convert to number before sending
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao adicionar o produto");
      }

      const data = await response.json();

      return { success: true, data };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.error("Erro ao adicionar produto", errorMessage);
      toast.error("Ocorreu um erro ao adicionar o produto.");
      return { success: false, error: errorMessage };
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    const response = await createProduct(data);

    if (response.success) {
      toast.success("Produto adicionado com sucesso.");
      createProductModal.onClose();
    } else {
      toast.error("Ocorreu um erro ao adicionar o produto.");
    }

    setIsLoading(false);
  };

  return (
    <Modal
      showModal={createProductModal.isOpen}
      setShowModal={createProductModal.onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center ">
          <Icons.shoppingCart className="h-10 w-10" />
          <h3 className="font-urban text-2xl font-bold">Adicionar Produto</h3>
          <p className="text-sm text-gray-500">
            Preencha os campos abaixo para adicionar um novo produto.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 ">
          <div>
            <input
              type="text"
              placeholder="Nome"
              {...register("name")}
              className="p-2 border rounded w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message?.toString()}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Descrição"
              {...register("description")}
              className="p-2 border rounded w-full"
            />
            {errors.description && (
              <p className="text-red-500">
                {errors.description.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Preço"
              value={priceValue}
              onChange={handlePriceChange}
              className="p-2 border rounded w-full"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message?.toString()}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Estoque"
              {...register("stock", { valueAsNumber: true })}
              className="p-2 border rounded w-full"
            />
            {errors.stock && (
              <p className="text-red-500">{errors.stock.message?.toString()}</p>
            )}
          </div>

          <Button variant="default" disabled={isLoading} type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" />
            )}
            Adicionar Produto
          </Button>
        </div>
      </form>
    </Modal>
  );
};
