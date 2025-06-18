import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GetProducts } from "@/actions/products/get-products";
import { redirect } from "next/navigation";

import Header from "@/components/products/header";
import { Content } from "@/components/products/content";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const products = await GetProducts();
  return (
    <>
      <Header />
      <Content products={products} />
    </>
  );
}
