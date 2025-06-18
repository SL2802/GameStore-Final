"use client";
import { Button } from "../ui/button";
import { FilePlus } from "lucide-react";
import { Product } from "@prisma/client";

interface AddProductButtonProps {
  setOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product | undefined) => void;
}

export function AddProductButton({
  setOpen,
  setSelectedProduct,
}: AddProductButtonProps) {
  return (
    <>
      <Button
        onClick={() => {
          setSelectedProduct(undefined); // Novo produto
          setOpen(true);
        }}
      >
        <FilePlus />
        Adicionar
      </Button>
    </>
  );
}
