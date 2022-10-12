import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import { BaseAuthUser } from '../../models/user';
import app from '../..';

const req = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe('User Handler', () => {
  const userData: BaseAuthUser = {
    username: 'ChrisAnne',
    firstname: 'Chris',
    lastname: 'Anne',
    password: 'password123',
  };

  let token: string,
    userId = 1;

  it('gets the create endpoint', async (done) => {
    const res = await req.post('/users/create').send(userData);

    const { body, status } = res;
    token = body;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { user } = jwt.verify(token, SECRET);
    userId = user.id;

    expect(status).toBe(200);
    done();
  });

  it(' gets the index endpoint', async (done) => {
    const res = await req.get('/users').set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it(' gets the read endpoint', async (done) => {
    const res = await req.get(`/users/${userId}`).set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('get the update endpoint', async (done) => {
    const newUserData: BaseAuthUser = {
      ...userData,
      firstname: 'Chris',
      lastname: 'Anne',
    };

    const res = await req
      .put(`/users/${userId}`)
      .send(newUserData)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('gets the auth endpoint', async (done) => {
    const res = await req
      .post('/users/authenticate')
      .send({
        username: userData.username,
        password: userData.password,
      })
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done();
  });

  it('gets the auth endpoint with wrong password', async (done) => {
    const res = await req
      .post('/users/authenticate')
      .send({
        username: userData.username,
        password: 'trtdtxcfcf',
      })
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(401);
    done();
  });

  it('gets the delete endpoint', async (done) => {
    const res = await req.delete(`/users/${userId}`).set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    done();
  });
});
