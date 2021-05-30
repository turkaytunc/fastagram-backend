import supertest from 'supertest';
import pool from '../db/pool';
import app from '../app';

describe('auth', () => {
  describe('register', () => {
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

  describe('login', () => {
    it('should login with given credentials', async () => {
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

      const loginResponse = await supertest(app)
        .post('/auth/login')
        .send({
          email: 'fakeuser@gmail.com',
          password: 'randomfpass123',
        })
        .expect(200);

      expect(await loginResponse.body).toHaveProperty('token');
      expect(await loginResponse.body.user).toHaveProperty('userId');
      expect(await loginResponse.body.token).toBeTruthy();
    });

    it('should fail to login with given credentials', async () => {
      await pool.query('delete from users where username=$1', ['fakeusernafhf2']);

      const loginResponse = await supertest(app)
        .post('/auth/login')
        .send({
          email: 'fakeuser@gmail.com',
          password: 'randomfpass123',
        })
        .expect(404);

      expect(await loginResponse.body.message).toBe('User not exists!');
      expect(await loginResponse.body).not.toHaveProperty('user');
    });

    it('should fail to login because wrong password', async () => {
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

      const loginResponse = await supertest(app)
        .post('/auth/login')
        .send({
          email: 'fakeuser@gmail.com',
          password: 'randomfpas123',
        })
        .expect(403);

      expect(await loginResponse.body.message).toBe('Wrong email or password!');
      expect(await loginResponse.body).not.toHaveProperty('user');
    });
  });
});
