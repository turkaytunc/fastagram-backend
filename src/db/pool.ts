import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, POSTGRES_PORT } = process.env;

const pool = new pg.Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: (POSTGRES_PORT as unknown) as number,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
});

// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });

export default pool;
