import { db } from "@/lib/prisma";
import { UpdateProduct } from "@/actions/products/update-product";

describe("Update Product", () => {
    let productId: string;

    beforeAll(async () => {
        const product = await db.product.create({
            data: {
                name: "Produto para Atualizar",
                description: "Descrição antiga",
                price: 70,
                category: "GAME",
                stock: 5,
                imageUrl: "https://example.com/image.jpg",
            },
        });
        productId = product.id;
    });

    afterAll(async () => {
        await db.product.deleteMany();
        await db.$disconnect();
    });

    it("deve atualizar um produto", async () => {
        const updated = await UpdateProduct({
            id: productId,
            name: "Produto Atualizado",
            description: "Descrição nova",
            price: 80,
            category: "GAME",
            stock: 10,
            imageUrl: "https://example.com/image-updated.jpg",
        });

        expect(updated.name).toBe("Produto Atualizado");
        expect(updated.price).toBe(80);
    });
});
