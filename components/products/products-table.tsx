"use client";

import { Product } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "../data-table";

interface ProductsTableProps {
  data: Product[];
  setOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product) => void;
}

export function ProductsTable({
  data,
  setOpen,
  setSelectedProduct,
}: ProductsTableProps) {
  return (
    <DataTable
      columns={columns({ setOpen, setSelectedProduct })}
      data={data}
    />
  );
}
