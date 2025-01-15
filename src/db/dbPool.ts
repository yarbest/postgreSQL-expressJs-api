import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: '1111',
    host: 'localhost',
    port: 5432,
    database: 'test1',
})

pool.connect((err, client, release) => {
  if (err) {
      return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
  release();
});

export default pool;