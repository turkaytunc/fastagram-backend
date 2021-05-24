import pool from './pool';

class Feed {
  getFeedPhotos = async () => {
    try {
      return await pool.query(`Select * from photos order by created_at desc limit 10`);
    } catch (error) {
      return { rows: [] };
    }
  };
}

export default new Feed();
