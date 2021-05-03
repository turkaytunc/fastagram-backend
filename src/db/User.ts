import pool from './pool';

export const createUser = async (name: string, email: string, password: string) => {
  try {
    return await pool.query('INSERT INTO users(name,email,password) values($1, $2, $3)', [
      name,
      email,
      password,
    ]);
  } catch (error) {
    return error;
  }
};

export const findUser = async (userId: string) => {
  try {
    const query = await pool.query(`Select * from users where users.user_id = $1`, [userId]);
    return query.rows[0];
  } catch (error) {
    return error;
  }
};
