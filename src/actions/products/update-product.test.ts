import { UpdateProduct } from './update-product';
import { Category } from '@prisma/client';

jest.mock('@/lib/prisma', () => ({
  db: {
    product: {
      update: jest.fn(),
    },
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

describe('UpdateProduct', () => {
  it('deve atualizar o produto e revalidar os caminhos', async () => {
    const fakeProduct = {
      id: 'produto-456',
      name: 'Produto Atualizado',
      description: 'Nova descrição',
      price: 199.99,
      category: 'ELETRONICO' as Category,
      stock: 20,
      imageUrl: 'https://example.com/image.jpg',
    };

    await UpdateProduct(fakeProduct);

    expect(db.product.update).toHaveBeenCalledWith({
      where: { id: fakeProduct.id },
      data: {
        name: fakeProduct.name,
        description: fakeProduct.description,
        price: fakeProduct.price,
        category: fakeProduct.category,
        stock: fakeProduct.stock,
        imageUrl: fakeProduct.imageUrl,
      },
    });

    expect(revalidatePath).toHaveBeenCalledWith('/products');
    expect(revalidatePath).toHaveBeenCalledWith('/catalogo');
  });
});

