"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { AddProductButton } from "./add-product-button";
import { ProductsSheet } from "./products-sheet";
import { ProductsTable } from "./products-table";

interface ContentProps {
  products: Product[];
}

export function Content({ products }: ContentProps) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  return (
    <>
      <div className="flex flex-col gap-2 container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-8 md:space-y-0">
          <h1 className="text-2xl">Lista de Produtos</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-end gap-2">
            <AddProductButton
              setOpen={setOpen}
              setSelectedProduct={setSelectedProduct}
            />
          </div>
        </div>

        <ProductsTable
          data={products}
          setOpen={setOpen}
          setSelectedProduct={setSelectedProduct}
        />
        <ProductsSheet open={open} setOpen={setOpen} product={selectedProduct} />
      </div>
    </>
  );
}
