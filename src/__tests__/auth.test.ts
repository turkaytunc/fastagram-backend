import supertest from 'supertest';
import pool from '../db/pool';
import app from '../app';

describe('auth', () => {
  it('should init db without getting error', async () => {
    const res1 = await supertest(app).get('/').expect(200);
    expect(res1.body.message).toBe('Initial configuration completed successfully!');
    const res2 = await supertest(app).get('/').expect(200);
    expect(res2.body.message).toBe('Hello from express!');
  });

  it('should return error message because user already exists', async () => {
    await pool.query('delete from users where username=$1', ['ranusernafhf2']);
    const res1 = await supertest(app)
      .post('/auth/register')
      .send({
        email: 'fakefdd@gmail.com',
        password: 'randompass123',
        username: 'ranusernafhf2',
        fullname: 'fake smithfd',
      })
      .expect(201);
    const res = await supertest(app)
      .post('/auth/register')
      .send({
        email: 'fakefdd@gmail.com',
        password: 'randompass123',
        username: 'ranusernafhf2',
        fullname: 'fake smithfd',
      })
      .expect(400);

    expect(await res.body.message).toBe('User already exists!');
  });

  it('should create and return user', async () => {
    await pool.query('delete from users where username=$1', ['fakeusernafhf2']);
    const res = await supertest(app)
      .post('/auth/register')
      .send({
        email: 'fakeuser@gmail.com',
        password: 'randomfpass123',
        username: 'fakeusernafhf2',
        fullname: 'mr fake smithfd',
      })
      .expect(201);

    expect(await res.body.user.email).toBe('fakeuser@gmail.com');
    expect(await res.body.user).toHaveProperty('userId');
  });
});
