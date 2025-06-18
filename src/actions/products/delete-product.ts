"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteProductParams {
  id: string;
}

export async function DeleteProduct({ id }: DeleteProductParams) {
  await db.product.delete({
    where: { id },
  });

  ["/products", "/catalogo"].forEach((path) => revalidatePath(path));
}
