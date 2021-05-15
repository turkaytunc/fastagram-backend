import pool from './pool';

export const createUser = async (username: string, email: string, password: string) => {
  try {
    return await pool.query(
      'INSERT INTO users(username,email,password) values($1, $2, $3) RETURNING username,user_id,email',
      [username, email, password]
    );
  } catch (error) {
    return { rows: [] };
  }
};

export const findUserById = async (userId: string) => {
  try {
    return await pool.query(`Select * from users where users.user_id = $1`, [userId]);
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

export const getUserPhotos = async (userId: string) => {
  try {
    return await pool.query(`Select * from photos where user_id = $1`, [userId]);
  } catch (error) {
    return { rows: [] };
  }
};
