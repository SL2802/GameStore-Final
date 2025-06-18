"use server";

import { db } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateProductParams {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
  imageUrl: string;
}

export async function UpdateProduct({
  id,
  name,
  description,
  price,
  category,
  stock,
  imageUrl,
}: UpdateProductParams) {
  const updatedProduct = await db.product.update({
    where: { id },
    data: { name, description, price, category, stock, imageUrl },
  });

  ["/products", "/catalogo"].forEach((path) => revalidatePath(path));

  return updatedProduct; // Retorna o produto atualizado para o teste usar
}
