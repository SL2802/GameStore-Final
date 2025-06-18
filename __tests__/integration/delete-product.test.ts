import { db } from "@/lib/prisma";
import { DeleteProduct } from "@/actions/products/delete-product";

describe("Delete Product", () => {
    let productId: string;

    beforeAll(async () => {
        const product = await db.product.create({
            data: {
                name: "Produto para Deletar",
                description: "Descrição",
                price: 60,
                category: "GAME",
                stock: 5,
                imageUrl: "https://example.com/image.jpg",
            },
        });
        productId = product.id;
    });

    afterAll(async () => {
        await db.$disconnect();
    });

    it("deve deletar um produto", async () => {
        await DeleteProduct({ id: productId });

        const deleted = await db.product.findUnique({ where: { id: productId } });

        expect(deleted).toBeNull();
    });
});
