import pool from './pool';

export const initializeDB = async () => {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      user_id uuid DEFAULT uuid_generate_v4(),
      username VARCHAR(20) NOT NULL,
      fullname VARCHAR(20),
      password VARCHAR(200) NOT NULL,
      email VARCHAR(50) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS photos (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id),
      created_at DATE NOT NULL DEFAULT CURRENT_DATE,
      data TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      photo_id INT NOT NULL REFERENCES photos(id),
      user_id INT NOT NULL REFERENCES users(id),
      content VARCHAR(150) NOT NULL,
      created_at DATE DEFAULT CURRENT_DATE
    );

    CREATE TABLE IF NOT EXISTS likes (
      id SERIAL PRIMARY KEY,
      photo_id INT NOT NULL REFERENCES photos(id),
      user_id INT NOT NULL REFERENCES users(id)
    );
    `);
};
