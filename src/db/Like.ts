import pool from './pool';

class Like {
  getLikes = async (photoId: string) => {
    try {
      return await pool.query(`Select count(*) from likes where photo_id = $1 `, [photoId]);
    } catch (error) {
      return { rows: [] };
    }
  };

  addLike = async (photoId: string, userId: string) => {
    try {
      return await pool.query(`Insert into likes(photo_id, user_id) values($1, $2)  `, [
        photoId,
        userId,
      ]);
    } catch (error) {
      return { rows: [] };
    }
  };

  findLike = async (photoId: string, userId: string) => {
    try {
      return await pool.query(`Select * from likes where photo_id = $1 and user_id = $2`, [
        photoId,
        userId,
      ]);
    } catch (error) {
      return { rows: [] };
    }
  };
}

export default new Like();
