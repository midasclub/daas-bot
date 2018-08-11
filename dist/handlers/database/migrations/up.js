'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBotTable() {
  return _connection2.default.query('\n    CREATE TABLE IF NOT EXISTS bots (\n      id       SERIAL PRIMARY KEY,\n      username VARCHAR (50) UNIQUE NOT NULL,\n      password VARCHAR (50) NOT NULL,\n      status   INTEGER NOT NULL DEFAULT 0,\n      disabled_until TIMESTAMP,\n      sentry_file BYTEA\n    );\n  ');
}

function createLobbyTable() {
  return _connection2.default.query('\n    CREATE TABLE IF NOT EXISTS lobbies (\n      id        SERIAL PRIMARY KEY,\n      name      VARCHAR (100) NOT NULL,\n      password  VARCHAR (50) NOT NULL,\n      server    INTEGER NOT NULL,\n      game_mode INTEGER NOT NULL,\n      radiant_has_first_pick BOOLEAN NOT NULL,\n      match_id  VARCHAR (100),\n      match_result INTEGER,\n      status INTEGER NOT NULL DEFAULT 0\n    );\n  ');
  // machine_id INTEGER REFERENCES machines(id) UNIQUE
}

function createLobbyPlayersTable() {
  return _connection2.default.query('\n    CREATE TABLE IF NOT EXISTS lobby_players (\n      id         SERIAL PRIMARY KEY,\n      steam_id   VARCHAR (50) NOT NULL,\n      lobby_id   INTEGER NOT NULL,\n      is_radiant BOOLEAN NOT NULL,\n      is_ready   BOOLEAN NOT NULL DEFAULT false,\n      is_captain BOOLEAN NOT NULL DEFAULT false,\n      FOREIGN KEY ("lobby_id") REFERENCES lobbies("id") on delete cascade on update cascade\n    );\n  ');
}

function up() {
  var queries = [];
  queries.push(createBotTable());
  queries.push(createLobbyTable());
  queries.push(createLobbyPlayersTable());

  return Promise.all(queries);
}