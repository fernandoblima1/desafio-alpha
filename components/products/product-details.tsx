"use client";

import { useRouter } from "next/navigation";
import { File, MoreVertical, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types";
import { EmptyPlaceholder } from "../shared/empty-placeholder";
import { formatCurrency } from "@/lib/utils";
import { useUpdateProduct } from "@/hooks/use-update-product-modal";
import { useDeleteProduct } from "@/hooks/use-delete-product-modal";
import useMediaQuery from "@/hooks/use-media-query";

type ProductDetailsProps = {
  product: Product | null;
};

export default function ProductDatails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return null;
  }
  return (
    <main className="">
      <div className="">
        {product ? (
          <Card className="max-w-xl overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {product.name}
                </CardTitle>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8" size="icon" variant="outline">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">Mais</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => updateProduct.onOpen(product.id)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteProduct.onOpen(product.id)}
                    >
                      <File className="mr-2 h-4 w-4" />
                      <span>Apagar</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="font-semibold">Detalhes do produto</div>
              <ul className="flex flex-col w-full gap-1 mt-2 overflow-hidden">
                <li className="flex gap-2 items-center justify-between">
                  <span className="text-muted-foreground">Nome</span>
                  <span className="break-words">{product?.name}</span>
                </li>
                <li className="flex gap-2 items-center justify-between">
                  <span className="text-muted-foreground">Descrição</span>
                  <span className="w-full overflow-auto break-words text-right">
                    {product?.description}
                  </span>
                </li>
                <li className="flex gap-2 items-center justify-between">
                  <span className="text-muted-foreground">Estoque</span>
                  <span>{product?.stock}</span>
                </li>
                <Separator className="my-2" />
                <li className="flex gap-2 items-center justify-between">
                  <span className="text-muted-foreground">Preço</span>
                  <span>
                    <Badge className="text-xs" variant="default">
                      {formatCurrency(product?.price) || "Não precificado"}
                    </Badge>
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3"></CardFooter>
          </Card>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>Detalhes do produto</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Selecione um produto para ver os detalhes.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </main>
  );
}
