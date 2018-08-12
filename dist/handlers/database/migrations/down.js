'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = down;

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function down() {
  var commands = ['DROP TABLE IF EXISTS bots CASCADE;', 'DROP TABLE IF EXISTS lobbies CASCADE;', 'DROP TABLE IF EXISTS lobby_players CASCADE;', 'DROP TABLE IF EXISTS machines CASCADE;'];

  var queries = [];
  commands.forEach(function (sql) {
    return queries.push(_connection2.default.query(sql));
  });
  return Promise.all(queries);
}