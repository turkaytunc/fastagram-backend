import pool from './pool';

export const getCommentsByPhotoId = async (photoId: string) => {
  try {
    return await pool.query(
      `Select * from comments where photo_id = $1 order by created_at limit 10`,
      [photoId]
    );
  } catch (error) {
    return { rows: [] };
  }
};

export const addComment = async (photoId: string, userId: string, content: string) => {
  try {
    return await pool.query(`insert into comments(user_id, photo_id, content) values($1,$2,$3)`, [
      userId,
      photoId,
      content,
    ]);
  } catch (error) {
    return { rows: [] };
  }
};
