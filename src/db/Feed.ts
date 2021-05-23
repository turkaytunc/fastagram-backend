import pool from './pool';

export const getFeedPhotos = async () => {
  try {
    return await pool.query(`Select * from photos order by created_at limit 10`);
  } catch (error) {
    return { rows: [] };
  }
};
