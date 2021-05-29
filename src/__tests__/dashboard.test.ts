import supertest from 'supertest';
import app from '../app';

describe('/dashboard', () => {
  it('should search user with credentials included in jwt and cant find any user', async () => {
    try {
      const response = await supertest(app)
        .post('/dashboard')
        .send({
          auth:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbmVtZUBlbWFpbC5jb20iLCJ1c2VySWQiOiI4Nzk0NzQtZnNkZiIsImlhdCI6MTcxNjIzOTAyMn0.HYucGEs17qBuPZxKiZRodYlfepJBwTUT4FxXMGgDR58',
        })
        .expect(404);

      expect(response.body.message).toBeTruthy();
      expect(response.body.message).toBe('User not found');
    } catch (error) {
      console.log(error);
    }
  });

  it('should get error because jwt not provided', async () => {
    try {
      const response = await supertest(app)
        .post('/dashboard')
        .send({
          auth:
            'eyJhbGXVCJ9.eyJlbWFpbCI6ImRlbmVtZUBlbWFpbC5jb20iLCJ1c2VySWQiOiI4Nzk0NzQtZnNkZiIsImlhdCI6MTcxNjIzOTAyMn0.HYucGEs17qBuPZxKiZRodYlfepJBwTUT4FxXMGgDR58',
        })
        .expect(403);

      expect(await response.body.message).toBeTruthy();
      expect(await response.body.message).toBe('You must provide valid auth token');
    } catch (error) {
      console.log(error);
    }
  });
});
