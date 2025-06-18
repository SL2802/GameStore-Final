import { Category } from "@prisma/client";
import { z } from "zod";

export const CATEGORY_LABELS = {
  GAME: "Jogos",
  CONSOLE: "Consoles e Videogames",
  PERIPHERAL: "Periféricos",
  OTHER: "Outros",
};

export const CATEGORY_OPTIONS = [
  {
    value: Category.GAME,
    label: CATEGORY_LABELS[Category.GAME],
  },
  {
    value: Category.CONSOLE,
    label: CATEGORY_LABELS[Category.CONSOLE],
  },
  {
    value: Category.PERIPHERAL,
    label: CATEGORY_LABELS[Category.PERIPHERAL],
  },
  {
    value: Category.OTHER,
    label: CATEGORY_LABELS[Category.OTHER],
  },
];

export const ProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  description: z.string().min(2, {
    message: "Descrição deve ter ao menos dois caracteres.",
  }),
  price: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  category: z.nativeEnum(Category, {
    required_error: "A categoria é obrigatória.",
  }),
  imageUrl: z.string().trim().min(1, {
    message: "O link é obrigatório.",
  }),
  stock: z
    .number({
      required_error: "A quantidade é obrigatória.",
    })
    .min(0, {
      message: "O valor mínimo é 0.",
    }),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
