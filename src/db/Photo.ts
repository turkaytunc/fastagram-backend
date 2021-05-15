import pool from './pool';

export const getAllPhotos = async (userId: string) => {
  try {
    return await pool.query(`Select * from photos where user_id = $1`, [userId]);
  } catch (error) {
    return { rows: [] };
  }
};

export const addPhotoByUserId = async (userId: string, photoData: string) => {
  try {
    return await pool.query(`Insert into photos(user_id, data) values($1, $2) returning data`, [
      userId,
      photoData,
    ]);
  } catch (error) {
    return { rows: [] };
  }
};
