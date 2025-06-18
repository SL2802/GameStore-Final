import { CreateProduct } from './create-product';

jest.mock('@/lib/prisma', () => ({
  db: {
    product: {
      create: jest.fn(),
    },
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Category } from '@prisma/client';

describe('CreateProduct', () => {
  it('deve criar um produto e revalidar os caminhos', async () => {
    const fakeProduct = {
      name: 'Produto Teste',
      description: 'Um ótimo produto',
      price: 99.9,
      category: 'CONSOLE' as Category,
      stock: 5,
      imageUrl: 'https://exemplo.com/imagem.jpg',
    };

    await CreateProduct(fakeProduct);

    expect(db.product.create).toHaveBeenCalledWith({
      data: fakeProduct,
    });

    expect(revalidatePath).toHaveBeenCalledWith('/products');
    expect(revalidatePath).toHaveBeenCalledWith('/catalogo');
  });
});
