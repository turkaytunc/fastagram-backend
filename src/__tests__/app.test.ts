import supertest from 'supertest';
import app from '../app';

describe('app', () => {
  it('should get 404 page not found', async () => {
    try {
      const response = await supertest(app).get('/jfdshhjhjf').expect(404);

      expect(response.body.message).toBeTruthy();
      expect(response.body.message).toBe('Page Not Found');
    } catch (err) {
      console.log('error: ', err);
    }
  });
});
