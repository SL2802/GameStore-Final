import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import { CartContext, CartProduct } from "./contexts/cart";
import { useContext } from "react";

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { products } = useContext(CartContext);

  function ConvertOrderToASCII(products: CartProduct[]) {
    const lines = [];
    lines.push(
      "Olá gostaria de finalizar meu pedido que iniciei na Gamestore:"
    );
    lines.push("🛒 *Resumo do Pedido:*");
    lines.push("```");
    lines.push(`Produto              Qtd    Preço`);
    lines.push("-----------------------------------");

    products.forEach((product) => {
      const name = product.name.slice(0, 20).padEnd(20, " ");
      const qty = String(product.quantity).padStart(3, " ");
      const price = product.price.toFixed(2).padStart(8, " ");
      lines.push(`${name}${qty} ${price}`);
    });

    lines.push("-----------------------------------");
    const total = products
      .reduce((sum, p) => sum + p.quantity * p.price, 0)
      .toFixed(2);
    lines.push(
      `Total               ${"".padStart(3)} ${total.padStart(8, " ")}`
    );
    lines.push("```");

    const message = lines.join("\n");
    return encodeURIComponent(message);
  }

  function handleSendMessage() {
    const WhastappLinkApi = "https://api.whatsapp.com/send?phone=";
    const PhoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;

    if (!PhoneNumber) {
      console.error("Número de telefone não definido.");
      return;
    }

    window.open(
      `${WhastappLinkApi}${PhoneNumber}&text=${ConvertOrderToASCII(products)}`,
      "_blank"
    );
  }
  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button className="w-full rounded-full">Finalizar pedido</Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-xl ml-auto">
          <DrawerHeader className="sm:text-center">
            <DrawerTitle>Finalizar Pedido</DrawerTitle>
            <DrawerDescription>
              Você será redirecionado para o Whatsapp da loja!
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              className="w-full rounded-full"
              onClick={() => handleSendMessage()}
            >
              Confirmar
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full rounded-full">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FinishOrderDialog;
