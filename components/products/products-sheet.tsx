"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Product } from "@prisma/client";
import { ProductsForm } from "./products-form";

interface ProductsSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product?: Product;
}

export function ProductsSheet({ open, setOpen, product }: ProductsSheetProps) {
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader className="mb-8">
            <SheetTitle>Formulário</SheetTitle>
            <SheetDescription>
              Preencha todos os dados!
            </SheetDescription>
          </SheetHeader>
          <ProductsForm setOpen={setOpen} product={product} />
        </SheetContent>
      </Sheet>
    </>
  );
}
