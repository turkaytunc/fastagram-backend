import pool from './pool';

class User {
  createUser = async (username: string, fullname: string, email: string, password: string) => {
    try {
      return await pool.query(
        'INSERT INTO users(username,fullname, email, password) values($1, $2, $3, $4) RETURNING username,fullname, user_id,email',
        [username, fullname, email, password]
      );
    } catch (error) {
      return { rows: [] };
    }
  };

  findUserById = async (userId: string) => {
    try {
      return await pool.query(
        `Select username, fullname, email from users where users.user_id = $1`,
        [userId]
      );
    } catch (error) {
      return { rows: [] };
    }
  };

  searchUserByUsername = async (username: string) => {
    try {
      return await pool.query(
        `Select user_id, username, fullname, email from users where username ILIKE $1`,
        [`%${username}%`]
      );
    } catch (error) {
      return { rows: [] };
    }
  };

  findUserByEmail = async (email: string) => {
    try {
      return await pool.query(`Select * from users where users.email = $1`, [email]);
    } catch (error) {
      return { rows: [] };
    }
  };
}

export default new User();
