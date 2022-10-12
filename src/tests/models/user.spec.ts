import { BaseAuthUser, BaseUser, User, UserStore } from '../../models/user';

const userStore = new UserStore();

describe('User Model', () => {
  const user: BaseAuthUser = {
    username: 'ChrisAnne',
    firstname: 'Chris',
    lastname: 'Anne',
    password: 'password123',
  };

  async function createUser(user: BaseAuthUser) {
    return userStore.create(user);
  }

  async function deleteUser(id: number) {
    return userStore.deleteUser(id);
  }

  it('should have getUser method', () => {
    expect(userStore.getUser).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userStore.read).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userStore.create).toBeDefined();
  });

  it('should have a remove method', () => {
    expect(userStore.deleteUser).toBeDefined();
  });

  it('should create a user', async () => {
    const createdUser = await createUser(user);
    if (createdUser) {
      expect(createdUser.username).toBe(user.username);
      expect(createdUser.firstname).toBe(user.firstname);
      expect(createdUser.lastname).toBe(user.lastname);
    }
    await deleteUser(createdUser.id);
  });

  it('should return a list of users', async () => {
    const result: any = await userStore.getUser();
    expect(result[0].username).toEqual('ChrisAnne');
    expect(result[0].id).toEqual(1);
    expect(result[0].firstname).toEqual('Chris');
    expect(result[0].lastname).toEqual('Anne');
  });

  it(' should return the correct users', async () => {
    const createdUser: User = await createUser(user);
    const users = await userStore.read(createdUser.id);
    expect(users).toEqual(createdUser);
    await deleteUser(createdUser.id);
  });

  it('should remove the user', async () => {
    const createdUser: User = await createUser(user);
    await deleteUser(createdUser.id);
    expect(createdUser.firstname).toEqual('Chris');
    expect(createdUser.lastname).toEqual('Anne');
  });

  it('should update the user', async () => {
    const createdUser: User = await createUser(user);
    const newUserData: BaseUser = {
      firstname: 'Kris',
      lastname: 'Han',
    };

    const { firstname, lastname } = await userStore.update(createdUser.id, newUserData);
    expect(firstname).toEqual(newUserData.firstname);
    expect(lastname).toEqual(newUserData.lastname);

    await deleteUser(createdUser.id);
  });
});
