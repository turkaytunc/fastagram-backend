import supertest from 'supertest';

import app from '../app';

describe('auth', () => {
  it('should init db without getting error', async () => {
    const res1 = await supertest(app).get('/').expect(200);
    expect(res1.body.message).toBe('Initial configuration completed successfully!');
    const res2 = await supertest(app).get('/').expect(200);
    expect(res2.body.message).toBe('Hello from express!');
  });

  it('should return user', async () => {
    const res = await supertest(app)
      .post('/auth/register')
      .send({
        email: 'fakefdd@gmail.com',
        password: 'randompass123',
        username: 'ranusernafhf2',
        fullname: 'fake smithfd',
      })
      .expect(201);

    expect(await res.body).toBe({});
  });
});
