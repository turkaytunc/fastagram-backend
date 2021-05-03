import pool from './pool';

export const initializeDB = async () => {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
)`);
};
