"use client";

import { Category, Product } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FormatMonetaryValue } from "@/lib/currency";
import { CATEGORY_LABELS } from "@/schemas/product-schema";

import { CartContext } from "./contexts/cart";
import CartSheet from "./cart-sheet";
import CategoryProducts from "./category-products";

interface CatalogoCategoriesProps {
  productsByCategory: Record<Category, Product[]>;
}

const CatalogoCategories = ({
  productsByCategory,
}: CatalogoCategoriesProps) => {
  const categoryKeys = Object.keys(CATEGORY_LABELS) as Category[];
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categoryKeys[0]
  );
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };
  const { products, total, toggleCart, totalQuantity } = useContext(CartContext);
  const getCategoryButtonVariant = (category: Category) => {
    return selectedCategory === category ? "default" : "secondary";
  };
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white pb-20">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={"/game-logo.jpg"}
            alt={"game-wallpaper"}
            height={45}
            width={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{"Gamestore"}</h2>
            <p className="text-xs opacity-55">{"A loja perfeita para gamers!"}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {categoryKeys.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
            >
              {CATEGORY_LABELS[category]}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <CategoryProducts
        categoryProducts={productsByCategory[selectedCategory] ?? []}
      />

      {/* VER CARRINHO */}
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-purple-200 px-5 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {FormatMonetaryValue(total)}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>
          <Button onClick={toggleCart}>Ver carrinho</Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
};

export default CatalogoCategories;
