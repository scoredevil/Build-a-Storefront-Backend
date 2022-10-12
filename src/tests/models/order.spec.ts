import { BaseOrder, Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const order_store = new OrderStore();

describe('Order Model', () => {
  const user_store = new UserStore();
  const product_store = new ProductStore();

  let order: BaseOrder, user_id: number, product_id: number;

  function create_order(order: BaseOrder) {
    return order_store.create(order);
  }

  function delete_order(id: number) {
    return order_store.deleteOrder(id);
  }

  beforeAll(async () => {
    const user: User = await user_store.create({
      username: 'ChrisAnne',
      firstname: 'Chris',
      lastname: 'Anne',
      password: 'password123',
    });

    user_id = user.id;

    const product: Product = await product_store.create({
      name: 'OrderSpec Product',
      price: 99,
    });

    product_id = product.id;

    order = {
      products: [
        {
          product_id,
          quantity: 5,
        },
      ],
      user_id,
      status: true,
    };
  });

  afterAll(async () => {
    await user_store.deleteUser(user_id);
    await product_store.deleteProduct(product_id);
  });

  it('should have an index method', () => {
    expect(order_store.getOrder).toBeDefined();
  });

  it('should have a show method', () => {
    expect(order_store.read).toBeDefined();
  });

  it('should have a add method', () => {
    expect(order_store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(order_store.deleteOrder).toBeDefined();
  });

  it('should add a order', async () => {
    const createdOrder: Order = await create_order(order);
    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...order,
    });

    await delete_order(createdOrder.id);
  });

  it('should return a list of orders', async () => {
    const createdOrder: Order = await create_order(order);
    const orderList = await order_store.getOrder();
    expect(orderList).toEqual([createdOrder]);
    await delete_order(createdOrder.id);
  });

  it('show method should return the correct orders', async () => {
    const createdOrder: Order = await create_order(order);
    const orderData = await order_store.read(createdOrder.id);
    expect(orderData).toEqual(createdOrder);
    await delete_order(createdOrder.id);
  });

  it('should update the order', async () => {
    const createdOrder: Order = await create_order(order);
    const orderData: BaseOrder = {
      products: [
        {
          product_id,
          quantity: 20,
        },
      ],
      user_id,
      status: false,
    };
    const { products, status } = await order_store.update(createdOrder.id, orderData);
    expect(products).toEqual(orderData.products);
    expect(status).toEqual(orderData.status);
    await delete_order(createdOrder.id);
  });

  it('should remove the order item', async () => {
    const createdOrder: Order = await create_order(order);
    await delete_order(createdOrder.id);
    const orderList = await order_store.getOrder();
    expect(orderList).toEqual([]);
  });
});
