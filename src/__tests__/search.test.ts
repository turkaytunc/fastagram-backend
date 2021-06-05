import supertest from 'supertest';
import app from '../app';
import pool from '../db/pool';

beforeAll(async () => {
  const res = await supertest(app)
    .post('/auth/register')
    .send({
      email: 'searchuser@gmail.com',
      password: 'rdfdomfpass123',
      username: 'fdfskkeusernafhf2',
      fullname: 'smithwilson',
    })
    .expect(201);
});

afterAll(async () => {
  await pool.query('delete from users where username=$1', ['fdfskkeusernafhf2']);
});

describe('/search', () => {
  it('should return error message because query string not found for username', async () => {
    const res = await supertest(app).get('/search').expect(400);

    expect(res.body.message).toBe('Please provide valid username');
  });

  it('should return error message because user not exists', async () => {
    const res = await supertest(app)
      .get('/search')
      .query({ username: 'randomusername21' })
      .expect(404);

    expect(res.body.message).toBe('Oops something went wrong');
  });

  it('should find and return user', async () => {
    const res = await supertest(app).get('/search').query({ username: 'fdfsk' }).expect(200);

    expect(res.body.users).toHaveLength(1);
    expect(res.body.users[0]).toHaveProperty('username');
    expect(res.body.users[0].username).toBe('fdfskkeusernafhf2');
  });
});
