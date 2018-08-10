import client from '../connection'

export function up () {
  const sql = `
    CREATE TABLE IF NOT EXISTS bots (
      id       SERIAL PRIMARY KEY,
      username VARCHAR (50) UNIQUE NOT NULL,
      password VARCHAR (50) NOT NULL,
      status   INTEGER NOT NULL DEFAULT 0,
      disabled_until TIMESTAMP,
      sentry_file BYTEA
    );
  `
  const query = {
    name: 'create-tables',
    text: sql
  }

  return client.query(query)
}