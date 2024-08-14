"use client";

import { useCallback, useEffect, useState } from "react";
import { AddProductButton } from "@/components/buttons/add-product-button";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import ProductDetails from "@/components/products/product-details";
import ProductTable from "@/components/products/product-table";
import { Product } from "@/types";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { useRouter } from "next/navigation";
import { useCreateProduct } from "@/hooks/use-create-product-modal";
import { useUpdateProduct } from "@/hooks/use-update-product-modal";
import { useDeleteProduct } from "@/hooks/use-delete-product-modal";

export default function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const createProductModal = useCreateProduct();
  const updateProductModal = useUpdateProduct();
  const deleteProductModal = useDeleteProduct();

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const fetchProducts = useCallback(async () => {
    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("authToken");
      }

      setIsLoading(true);
      const response = await fetch(
        "https://interview.t-alpha.com.br/api/products/get-all-products",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const { data } = await response.json();
      const products: Product[] = data.products;
      setProducts(products);
      setSelectedProductId(products[0]?.id ?? null);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    router.refresh();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    !createProductModal.isOpen &&
      !updateProductModal.isOpen &&
      !deleteProductModal.isOpen &&
      fetchProducts();
  }, [
    fetchProducts,
    createProductModal.isOpen,
    updateProductModal.isOpen,
    deleteProductModal.isOpen,
  ]);

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? null;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 md-col-span-3 mb-8">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            {products.length > 0 ? (
              <ProductTable
                products={products}
                setSelectedProductId={setSelectedProductId}
                selectedProductId={selectedProductId ?? -1}
              />
            ) : (
              <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="post" />
                <EmptyPlaceholder.Title>
                  Você não tem produtos ainda.
                </EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  Vamos começar adicionando alguns produtos.
                </EmptyPlaceholder.Description>
                <AddProductButton />
              </EmptyPlaceholder>
            )}
          </>
        )}
      </div>
      <div className="hidden lg:block mt-2">
        <ProductDetails product={selectedProduct} />
      </div>
    </main>
  );
}
