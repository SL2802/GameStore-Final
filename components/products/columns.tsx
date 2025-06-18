"use client";

import { CATEGORY_LABELS } from "@/schemas/product-schema";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./action-column";
import { FormatMonetaryValue } from "@/lib/currency";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface ColumnsProps {
  setOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product) => void;
}

export const columns = ({
  setOpen,
  setSelectedProduct,
}: ColumnsProps): ColumnDef<Product>[] => [
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row: { original: product } }) => (
      <span className="line-clamp-4">{product.description}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row: { original: product } }) => (
      <span>{FormatMonetaryValue(product.price)}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: product } }) => CATEGORY_LABELS[product.category],
  },
  {
    accessorKey: "stock",
    header: "Estoque",
    cell: ({ row: { original: product } }) =>
      new Intl.NumberFormat("pt-BR").format(product.stock),
  },
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: ({ row: { original: product } }) => (
      <div className="relative min-h-[82px] min-w-[120px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-contain"
        />
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row: { original: product } }) => (
      <ActionColumn
        product={product}
        setOpen={setOpen}
        setSelectedProduct={setSelectedProduct}
      />
    ),
  },
];
