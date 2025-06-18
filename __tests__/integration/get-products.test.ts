import { db } from "@/lib/prisma";
import { GetProducts } from "@/actions/products/get-products";

describe("Get Products", () => {
    beforeAll(async () => {
        // Certifica que tem pelo menos 1 produto no banco
        await db.product.create({
            data: {
                name: "Produto Para Listar",
                description: "Teste",
                price: 50,
                category: "GAME",
                stock: 5,
                imageUrl: "https://example.com/image.jpg",
            },
        });
    });

    afterAll(async () => {
        await db.product.deleteMany();
        await db.$disconnect();
    });

    it("deve listar produtos", async () => {
        const products = await GetProducts();

        expect(products.length).toBeGreaterThan(0);
    });
});
