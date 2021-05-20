import pool from './pool';

export const createUser = async (
  username: string,
  fullname: string,
  email: string,
  password: string
) => {
  try {
    return await pool.query(
      'INSERT INTO users(username,fullname, email, password) values($1, $2, $3, $4) RETURNING username,fullname, user_id,email',
      [username, fullname, email, password]
    );
  } catch (error) {
    return { rows: [] };
  }
};

export const findUserById = async (userId: string) => {
  try {
    return await pool.query(
      `Select username, fullname, email from users where users.user_id = $1`,
      [userId]
    );
  } catch (error) {
    return { rows: [] };
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await pool.query(`Select * from users where users.email = $1`, [email]);
  } catch (error) {
    return { rows: [] };
  }
};
