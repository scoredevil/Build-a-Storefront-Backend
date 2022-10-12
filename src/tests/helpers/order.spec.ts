/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from 'supertest';
import { OrderStore } from '../../models/order';
import { BaseAuthUser } from '../../models/user';
import app from '../..';

const req = supertest(app);

describe('Order Handler', () => {
  let token: string;

  beforeAll(async () => {
    const UserData: BaseAuthUser = {
      username: 'ChrisAnne',
      firstname: 'Chris',
      lastname: 'Anne',
      password: 'password123',
    };

    const { body: userBody } = await req.post('/users/create').send(UserData);
    token = userBody;

    spyOn(OrderStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        products: [
          {
            product_id: 5,
            quantity: 5,
          },
        ],
        user_id: 3,
        status: true,
      })
    );

    spyOn(OrderStore.prototype, 'update').and.returnValue(
      Promise.resolve({
        id: 2,
        products: [
          {
            product_id: 5,
            quantity: 5,
          },
        ],
        user_id: 3,
        status: false,
      })
    );
  });

  it('should create order endpoint', async (done) => {
    const res = await req
      .post('/orders/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        id: 1,
        products: [
          {
            product_id: 5,
            quantity: 5,
          },
        ],
        user_id: 3,
        status: true,
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      products: [
        {
          product_id: 5,
          quantity: 5,
        },
      ],
      user_id: 3,
      status: true,
    });
    done();
  });

  it('gets the index endpoint', async (done) => {
    req
      .get('/orders')
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should gets the read endpoint', async (done) => {
    req
      .get(`/orders/1`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should gets the delete endpoint', async (done) => {
    req
      .delete(`/orders/2`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
