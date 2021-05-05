import pool from './pool';

export const createUser = async (name: string, email: string, password: string) => {
  try {
    return await pool.query(
      'INSERT INTO users(name,email,password) values($1, $2, $3) RETURNING name,user_id,email',
      [name, email, password]
    );
  } catch (error) {
    return { rows: [] };
  }
};

export const findUserById = async (userId: string) => {
  try {
    return await pool.query(`Select user_id, name, email from users where users.user_id = $1`, [
      userId,
    ]);
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
