import pool from './pool';

export const getFeedPhotos = async () => {
  try {
    return await pool.query(`Select * from photos limit 10`);
  } catch (error) {
    return { rows: [] };
  }
};
