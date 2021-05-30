import supertest from 'supertest';
import app from '../app';
import pool from '../db/pool';

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

  it('should get error because jwt not provided', async () => {
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

    const token = res.body.token!;

    const response = await supertest(app)
      .post('/dashboard')
      .send({
        auth: token,
      })
      .expect(200);

    expect(await response.body).toHaveProperty('user');
    expect(await response.body.user).toHaveProperty('userId');
    expect(await response.body.user.email).toBe('fakeuser@gmail.com');
  });

  describe('/feed', () => {
    it('should get error because jwt not provided', async () => {
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

      const token = res.body.token!;

      const response = await supertest(app)
        .post('/dashboard/feed')
        .send({
          auth: token,
        })
        .expect(404);

      expect(await response.body.message).toBe('No photos found');
    });
  });
});
