import supertest from 'supertest';
import app from '../app';
import pool from '../db/pool';

let dashToken: string;
let user: { userId: string; email: string };

beforeEach(async () => {
  const res = await supertest(app)
    .post('/auth/register')
    .send({
      email: 'dashuserr@gmail.com',
      password: 'randomfps123',
      username: 'dashusehf2',
      fullname: 'mr fakmithfd',
    })
    .expect(201);

  user = res.body.user;
  dashToken = res.body.token;
});

afterEach(async () => {
  await pool.query('delete from users where username=$1', ['dashusehf2']);
});

describe('/dashboard', () => {
  it('should search user with credentials included in jwt and cant find any user', async () => {
    const response = await supertest(app)
      .post('/dashboard')
      .send({
        auth:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbmVtZUBlbWFpbC5jb20iLCJ1c2VySWQiOiI4Nzk0NzQtZnNkZiIsImlhdCI6MTcxNjIzOTAyMn0.HYucGEs17qBuPZxKiZRodYlfepJBwTUT4FxXMGgDR58',
      })
      .expect(404);

    expect(response.body.message).toBeTruthy();
    expect(response.body.message).toBe('User not found');
  });

  it('should get error because jwt not provided', async () => {
    const response = await supertest(app).post('/dashboard').expect(403);

    expect(await response.body.message).toBeTruthy();
    expect(await response.body.message).toBe('You must provide valid auth token');
  });

  it('should find user and return it', async () => {
    const response = await supertest(app)
      .post('/dashboard')
      .send({
        auth: dashToken,
      })
      .expect(200);

    expect(await response.body).toHaveProperty('user');
    expect(await response.body.user).toHaveProperty('userId');
    expect(await response.body.user.email).toBe('dashuserr@gmail.com');
  });

  describe('/feed', () => {
    it('should get error because jwt not provided', async () => {
      const response = await supertest(app)
        .post('/dashboard/feed')
        .send({
          auth: dashToken,
        })
        .expect(404);

      expect(await response.body.message).toBe('No photos found');
    });
  });
});
