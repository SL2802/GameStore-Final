import { GetProducts } from "@/actions/products/get-products";
import CatalogoHeader from "@/components/catalogo/header";
import CatalogoCategories from "@/components/catalogo/categories";
import { Category, Product } from "@prisma/client";

export default async function CatalogoPage() {
  const products = await GetProducts();
  const productsByCategory: Record<Category, Product[]> = {
    GAME: [],
    CONSOLE: [],
    PERIPHERAL: [],
    OTHER: [],
  };

  products.forEach((product: Product) => {
    productsByCategory[product.category].push(product);
  });

  return (
    <>
      <div>
        <CatalogoHeader />
        <CatalogoCategories productsByCategory={productsByCategory} />
      </div>
    </>
  );
}
