import pool from './pool';

export const createUser = async (name: string) => {
  try {
    await pool.query(`CREATE TABLE users(id SERIAL PRIMARY KEY,
    name VARCHAR(70))`);
    await pool.query('INSERT INTO users(name) values($1)', [name]);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (name: string) => {
  try {
    const query = await pool.query(`Select * from users where users.name = $1`, [name]);
    return query.rows[0];
  } catch (error) {
    return {};
  }
};
