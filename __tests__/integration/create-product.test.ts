import { db } from "@/lib/prisma";
import { CreateProduct } from "@/actions/products/create-product";
import { Category } from "@prisma/client";

describe("Create Product", () => {
    afterAll(async () => {
        await db.product.deleteMany();
        await db.$disconnect();
    });

    it("deve criar um produto novo", async () => {
        const data = {
            name: "Produto Teste",
            description: "Descrição teste",
            price: 100,
            category: Category.GAME,  // <-- aqui use o enum
            stock: 10,
            imageUrl: "https://example.com/image.jpg",
        };

        const product = await CreateProduct(data);

        expect(product).toHaveProperty("id");
        expect(product.name).toBe(data.name);
    });
});
