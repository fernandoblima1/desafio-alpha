"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Product } from "@/types";
import { AddProductButton } from "../buttons/add-product-button";
import useMediaQuery from "@/hooks/use-media-query";
import { Icons } from "../shared/icons";
import { useDeleteProduct } from "@/hooks/use-delete-product-modal";
import { useUpdateProduct } from "@/hooks/use-update-product-modal";

const columnClasses = {
  name: "w-[200px]",
  description: "w-[300px]",
  price: "w-[150px]",
  stock: "w-[150px]",
};

type ProductTableProps = {
  products: Product[];
  setSelectedProductId: (id: number) => void;
  selectedProductId: number;
};

export default function ProductTable({
  products,
  setSelectedProductId,
  selectedProductId,
}: ProductTableProps) {
  const { isTablet } = useMediaQuery();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const handleSelectProduct = (selectedProductId: number) => {
    setSelectedProductId(selectedProductId);
  };

  return (
    <>
      <Tabs defaultValue="week">
        <div className="flex items-center"></div>
        <TabsContent value="week">
          <Card>
            <CardHeader className="px-7 flex flex-row justify-between">
              <div>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>
                  Gerencie os seus produtos aqui.
                </CardDescription>
              </div>
              <AddProductButton />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={columnClasses.name}>Nome</TableHead>
                    {!isTablet && (
                      <TableHead className={columnClasses.description}>
                        Descrição
                      </TableHead>
                    )}

                    <TableHead className={columnClasses.price}>Preço</TableHead>
                    <TableHead className={columnClasses.stock}>
                      Estoque
                    </TableHead>
                    {isTablet && (
                      <TableHead className="w-[50px]">Ação</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className={
                        selectedProductId === product.id ? "bg-accent" : ""
                      }
                    >
                      <TableCell className={columnClasses.name}>
                        {product.name}
                      </TableCell>
                      {!isTablet && (
                        <TableCell className={columnClasses.description}>
                          {product.description}
                        </TableCell>
                      )}
                      <TableCell className={columnClasses.price}>
                        {product.price}
                      </TableCell>
                      <TableCell className={columnClasses.stock}>
                        {product.stock}
                      </TableCell>
                      {isTablet && (
                        <TableCell className="w-[50px] flex flex-row gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateProduct.onOpen(product.id);
                            }}
                          >
                            <Icons.pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProduct.onOpen(product.id);
                            }}
                          >
                            <Icons.trash className="w-5 h-5" />
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
