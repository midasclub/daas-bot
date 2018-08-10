import client from '../connection'

export function down () {
  const sql = `
    DROP TABLE IF EXISTS bots CASCADE;
  `
  const query = {
    name: 'delete-tables',
    text: sql
  }

  return client.query(query)
}