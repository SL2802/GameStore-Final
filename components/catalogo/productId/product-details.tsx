"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormatMonetaryValue } from "@/lib/currency";

import CartSheet from "../cart-sheet";
import { CartContext } from "../contexts/cart";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };
  const handleIncreaseQuantity = () => {
    if (quantity >= product.stock) {
      alert("Estoque máximo atingido.");
      return quantity;
    }
    setQuantity((prev) => prev + 1);
  };
  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5 bg-white">
        <div className="flex-auto overflow-hidden">
          {/* LOJA */}
          <div className="flex items-center gap-1.5">
            <Image
              src={"/game-logo.jpg"}
              alt={"Gamestore"}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">Gamestore</p>
          </div>

          {/* NOME E QUANTIDADE */}
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-6">{quantity}</p>
              <Button
                className="h-8 w-8 rounded-xl"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          {/* PREÇO E ESTOQUE */}
          <h3 className="text-xl font-semibold">
            {FormatMonetaryValue(product.price)}
          </h3>
          <p className="text-sm text-muted-foreground">
            Quantidade em estoque:{" "}
            <span className="font-bold text-primary">
              {new Intl.NumberFormat("pt-BR").format(product.stock)}
            </span>
          </p>

          {/* SOBRE */}
          <h4 className="mt-4 font-semibold">Sobre</h4>
          <ScrollArea className="h-3/4">
            <div className="space-y-3 pr-2 pb-10">
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
          </ScrollArea>
        </div>
        <Button className="mt-4 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </Button>
        <CartSheet />
      </div>
    </>
  );
};

export default ProductDetails;
