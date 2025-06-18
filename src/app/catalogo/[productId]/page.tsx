import ProductDetails from "@/components/catalogo/productId/product-details";
import ProductHeader from "@/components/catalogo/productId/product-header";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

const ProductIdPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) {
    return notFound();
  }
  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductIdPage;
