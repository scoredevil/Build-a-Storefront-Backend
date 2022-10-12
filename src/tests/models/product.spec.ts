import { BaseProduct, Product, ProductStore } from '../../models/product';

const product_store = new ProductStore();

describe('Product Model', () => {
  const product: BaseProduct = {
    name: 'Ahmed',
    price: 2000,
  };

  async function createProduct(product: BaseProduct) {
    return product_store.create(product);
  }

  async function deleteProduct(id: number) {
    return product_store.deleteProduct(id);
  }

  it('Should have an index method', () => {
    expect(product_store.index).toBeDefined();
  });

  it('Should have a show method', () => {
    expect(product_store.read).toBeDefined();
  });

  it('Should have a add method', () => {
    expect(product_store.create).toBeDefined();
  });

  it('Should have a delete method', () => {
    expect(product_store.deleteProduct).toBeDefined();
  });

  it('Should add a product', async () => {
    const createdProduct: Product = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product,
    });
    await deleteProduct(createdProduct.id);
  });

  it('Should return a list of products', async () => {
    const productList: Product[] = await product_store.index();
    expect(productList).toEqual([
      {
        id: 1,
        name: 'Shoes',
        price: 234,
      },
    ]);
  });

  it('Should return the correct product', async () => {
    const createdProduct: Product = await createProduct(product);
    const productData = await product_store.read(createdProduct.id);
    expect(productData).toEqual(createdProduct);
    await deleteProduct(createdProduct.id);
  });

  it('Should update the product', async () => {
    const createdProduct: Product = await createProduct(product);
    const newProduct: BaseProduct = {
      name: 'New Product List',
      price: 2423,
    };
    const { name, price } = await product_store.update(createdProduct.id, newProduct);
    expect(name).toEqual(newProduct.name);
    expect(price).toEqual(newProduct.price);
    await deleteProduct(createdProduct.id);
  });

  it('should remove the product', async () => {
    const createdProduct: Product = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      name: 'Ahmed',
      price: 2000,
    });
  });
});
