/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import pool from './pool';

class Comment {
  private static readonly instance = new Comment();

  private constructor() {}

  static getInstance = () => Comment.instance;

  getComments = async (photoId: string) => {
    try {
      return await pool.query(
        `Select * from comments where photo_id = $1 order by created_at limit 5`,
        [photoId]
      );
    } catch (error) {
      return { rows: [] };
    }
  };

  addComment = async (photoId: string, userId: string, username: string, content: string) => {
    try {
      return await pool.query(
        `insert into comments(user_id, photo_id, username, content) values($1,$2,$3, $4) Returning *`,
        [userId, photoId, username, content]
      );
    } catch (error) {
      return { rows: [] };
    }
  };
}

export default Comment.getInstance();
