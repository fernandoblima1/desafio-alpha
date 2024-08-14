"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useUpdateProduct } from "@/hooks/use-update-product-modal";
import { Icons } from "@/components/shared/icons";
import { UpdateProduct } from "@/types";
import { InputSkeleton } from "../shared/input-skeleton";

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

export const UpdateProductModal = () => {
  const { isOpen, onClose, productId } = useUpdateProduct();
  const [product, setProduct] = useState<UpdateProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          let token = null;
          if (typeof window !== "undefined") {
            token = localStorage.getItem("authToken");
          }
          const response = await fetch(
            `https://interview.t-alpha.com.br/api/products/get-one-product/${productId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }

          const { data } = await response.json();
          setProduct(data.product);
          setValue("name", data.product.name);
          setValue("description", data.product.description);
          setValue(
            "price",
            `R$ ${data.product.price.toFixed(2).replace(".", ",")}`
          );
          setValue("stock", data.product.stock);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProduct();
    }
  }, [productId, setValue]);

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

  const updateProduct = async (productData: ProductFormData) => {
    try {
      setIsUpdating(true);
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("authToken");
      }
      const priceToSend = productData.price
        .replace("R$ ", "")
        .replace(/\./g, "")
        .replace(",", ".");

      const response = await fetch(
        `https://interview.t-alpha.com.br/api/products/update-product/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...productData,
            price: parseFloat(priceToSend),
          }),
        }
      ).then((res) => {
        if (!res.ok) {
          toast.error("Ocorreu um erro ao atualizar o produto.");
        }
        toast.success("Produto atualizado com sucesso.");
        onClose();
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Ocorreu um erro ao atualizar o produto.");
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    const response = await updateProduct(data);
  };

  return (
    <Modal showModal={isOpen} setShowModal={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center ">
          <Icons.shoppingCart className="h-10 w-10" />
          <h3 className="font-urban text-2xl font-bold">Atualizar Produto</h3>
          <p className="text-sm text-gray-500">
            Atualize os detalhes do produto abaixo.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 ">
          {isLoading ? (
            <div className="space-y-4 flex flex-col justify-center items-center my-8">
              <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  {...register("name")}
                  className="p-2 border rounded w-full"
                />
                {errors.name && (
                  <p className="text-red-500">
                    {errors.name.message?.toString()}
                  </p>
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
                  value={watch("price") ?? ""}
                  onChange={handlePriceChange}
                  className="p-2 border rounded w-full"
                />
                {errors.price && (
                  <p className="text-red-500">
                    {errors.price.message?.toString()}
                  </p>
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
                  <p className="text-red-500">
                    {errors.stock.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          )}
          <Button variant="default" type="submit" disabled={isUpdating}>
            {isUpdating ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.pencil className="mr-2 h-4 w-4" />
            )}
            Atualizar Produto
          </Button>
        </div>
      </form>
    </Modal>
  );
};
