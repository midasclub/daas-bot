import client from '../connection'

function createBotTable() {
  return client.query(`
    CREATE TABLE IF NOT EXISTS bots (
      id       SERIAL PRIMARY KEY,
      username VARCHAR (50) UNIQUE NOT NULL,
      password VARCHAR (50) NOT NULL,
      status   INTEGER NOT NULL DEFAULT 0,
      disabled_until TIMESTAMP,
      sentry_file BYTEA
    );
  `)
}

function createLobbyTable() {
  return client.query(`
    CREATE TABLE IF NOT EXISTS lobbies (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR (100) NOT NULL,
      password  VARCHAR (50) NOT NULL,
      server    INTEGER NOT NULL,
      game_mode INTEGER NOT NULL,
      radiant_has_first_pick BOOLEAN NOT NULL,
      match_id  VARCHAR (100),
      match_result INTEGER,
      status INTEGER NOT NULL DEFAULT 0
    );
  `) 
  // machine_id INTEGER REFERENCES machines(id) UNIQUE
}

function createLobbyPlayersTable() {
  return client.query(`
    CREATE TABLE IF NOT EXISTS lobby_players (
      id         SERIAL PRIMARY KEY,
      steam_id   VARCHAR (50) NOT NULL,
      lobby_id   INTEGER NOT NULL,
      is_radiant BOOLEAN NOT NULL,
      is_ready   BOOLEAN NOT NULL DEFAULT false,
      is_captain BOOLEAN NOT NULL DEFAULT false,
      FOREIGN KEY ("lobby_id") REFERENCES lobbies("id") on delete cascade on update cascade
    );
  `) 
}

export function up () {
  const queries = [];
  queries.push(createBotTable())
  queries.push(createLobbyTable())
  queries.push(createLobbyPlayersTable())
  
  return Promise.all(queries)
}