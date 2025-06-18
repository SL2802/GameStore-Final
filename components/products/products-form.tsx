"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelTopClose, Save } from "lucide-react";
import { CreateProduct } from "@/actions/products/create-product";
import { FormatMonetaryValue } from "@/lib/currency";
import { Category, Product } from "@prisma/client";
import { UpdateProduct } from "@/actions/products/update-product";
import {
  CATEGORY_OPTIONS,
  ProductSchema,
  ProductSchemaType,
} from "@/schemas/product-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ProductsFormProps {
  setOpen: (open: boolean) => void;
  product?: Product;
}

export function ProductsForm({ setOpen, product }: ProductsFormProps) {
  // 1. Define your form.
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || Category.GAME,
      imageUrl: product?.imageUrl || "",
      stock: product?.stock,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: ProductSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      if (!product) return CreateProduct(data);
      return await UpdateProduct({
        id: product.id,
        ...data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Digite a descrição..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  placeholder="R$ 3.000,00"
                  max={1000000000}
                  type="text"
                  {...field}
                  value={FormatMonetaryValue(field.value)}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/[^\d]/g, "");
                    const numericValue = Number(inputValue) / 100;
                    field.onChange(numericValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type="number"
                  min={0}
                  max={1000000}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link da imagem</FormLabel>
              <FormControl>
                <Input
                  placeholder="Adicione o link..."
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 w-full justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            <PanelTopClose size={16} />
            Cancelar
          </Button>
          <Button type="submit">
            <Save size={16} />
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
