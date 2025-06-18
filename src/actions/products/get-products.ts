import { db } from "@/lib/prisma";

export async function GetProducts() {
  const products = await db.product.findMany();

  return JSON.parse(JSON.stringify(products));
}
