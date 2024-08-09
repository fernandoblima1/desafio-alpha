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
  const [categories, setCategories] = useState([]);

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
                    <TableHead className={columnClasses.description}>
                      Descrição
                    </TableHead>
                    <TableHead className={columnClasses.price}>Preço</TableHead>
                    <TableHead className={columnClasses.stock}>
                      Estoque
                    </TableHead>
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
                      <TableCell className={columnClasses.description}>
                        {product.description}
                      </TableCell>
                      <TableCell className={columnClasses.price}>
                        {product.price}
                      </TableCell>
                      <TableCell className={columnClasses.stock}>
                        {product.stock}
                      </TableCell>
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
