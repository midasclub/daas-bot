import client from '../connection'

export function down () {
  const commands = [
    'DROP TABLE IF EXISTS bots CASCADE;',
    'DROP TABLE IF EXISTS lobbies CASCADE;'
  ]

  const queries = []
  commands.forEach(sql => queries.push(client.query(sql)))
  return Promise.all(queries);
}