import { DeleteProduct } from './delete-product';

jest.mock('@/lib/prisma', () => ({
  db: {
    product: {
      delete: jest.fn(),
    },
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

describe('DeleteProduct', () => {
  it('deve deletar um produto e revalidar os caminhos', async () => {
    const productId = 'produto-123';

    await DeleteProduct({ id: productId });

    expect(db.product.delete).toHaveBeenCalledWith({
      where: { id: productId },
    });

    expect(revalidatePath).toHaveBeenCalledWith('/products');
    expect(revalidatePath).toHaveBeenCalledWith('/catalogo');
  });
});


