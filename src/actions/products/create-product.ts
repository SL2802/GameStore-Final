"use server";

import { db } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
  imageUrl: string;
}

export async function CreateProduct(params: CreateProductParams) {
  const product = await db.product.create({
    data: {
      ...params,
    },
  });

  ["/products", "/catalogo"].forEach((path) => revalidatePath(path));

  return product;
}
