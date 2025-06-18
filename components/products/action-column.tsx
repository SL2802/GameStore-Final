"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Product } from "@prisma/client";
import { AlertDelete } from "./alert-delete";

interface ActionColumnProps {
  product: Product;
  setOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product) => void;
}

export function ActionColumn({
  product,
  setOpen,
  setSelectedProduct,
}: ActionColumnProps) {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <AlertDelete
        open={openDelete}
        setOpen={setOpenDelete}
        product={product}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setSelectedProduct(product); // Produto atual
              setOpen(true);
            }}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
