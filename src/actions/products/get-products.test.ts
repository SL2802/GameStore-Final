import { GetProducts } from './get-products';

jest.mock('@/lib/prisma', () => ({
  db: {
    product: {
      findMany: jest.fn(),
    },
  },
}));

import { db } from '@/lib/prisma';

describe('GetProducts', () => {
  it('deve retornar os produtos do banco', async () => {
    const fakeProducts = [
      { id: '1', name: 'Produto A', price: 10 },
      { id: '2', name: 'Produto B', price: 20 },
    ];

    (db.product.findMany as jest.Mock).mockResolvedValue(fakeProducts);

    const result = await GetProducts();

    expect(db.product.findMany).toHaveBeenCalled();
    expect(result).toEqual(JSON.parse(JSON.stringify(fakeProducts)));
  });
});

