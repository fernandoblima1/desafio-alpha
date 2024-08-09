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

type ProductDetailsProps = {
  product: Product | null;
};

export default function ProductDatails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { onOpen } = useUpdateProduct();

  return (
    <main className="">
      <div className="">
        {product ? (
          <Card className={`overflow-hidden `} x-chunk="dashboard-05-chunk-4">
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
                    <DropdownMenuItem onClick={() => onOpen(product.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <File className="mr-2 h-4 w-4" />
                      <span>Apagar</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Detalhes do produto</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nome</span>
                    <span>{product?.name}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Descrição</span>
                    <span>{product?.description}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estoque</span>
                    <span>{product?.stock}</span>
                  </li>
                  <Separator className="my-2" />
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Preço</span>
                    <span>
                      <Badge className="text-xs" variant="default">
                        {formatCurrency(product?.price) || "Não precificado"}
                      </Badge>
                    </span>
                  </li>
                </ul>
              </div>
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
