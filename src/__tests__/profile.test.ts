import supertest from 'supertest';
import app from '../app';
import pool from '../db/pool';

let tok: string;
let userId: string;

beforeEach(async () => {
  const res = await supertest(app)
    .post('/auth/register')
    .send({
      email: 'profileuser1324@gmail.com',
      password: 'rdfdoass123',
      username: 'profileguy3',
      fullname: 'kekhwilson',
    })
    .expect(201);

  tok = res.body.token;
  userId = res.body.user.userId;
});

afterEach(async () => {
  await pool.query('delete from photos where user_id=$1', [userId]);
  await pool.query('delete from users where username=$1', ['profileguy3']);
});

describe('/profile', () => {
  describe('/', () => {
    it('should find user with given token', async () => {
      const res = await supertest(app).post('/profile').send({ auth: tok, userId }).expect(200);
      expect(res.body).toHaveProperty('profile');
      expect(res.body.profile.username).toBe('profileguy3');
    });

    it('should fail to find user because userId not provided', async () => {
      await pool.query('delete from users where username=$1', ['profileguy3']);
      const res = await supertest(app).post('/profile').send({ auth: tok }).expect(400);
      expect(res.body).toEqual({ message: 'User not found' });
    });
  });

  describe('/addphoto', () => {
    it('should photo for user', async () => {
      const res = await supertest(app)
        .post('/profile/addphoto')
        .send({ auth: tok, photoData: 'thisisphotosdataasbase64' })
        .expect(200);
      expect(res.body.photo).toEqual({ data: 'thisisphotosdataasbase64' });

      await pool.query('delete from photos where user_id=$1', [userId]);
    });
  });
});
