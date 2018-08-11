'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lobby = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lobby = exports.Lobby = function () {
  function Lobby() {
    _classCallCheck(this, Lobby);
  }

  _createClass(Lobby, null, [{
    key: 'create',
    value: function create(data) {
      var params = Object.keys(data).join(', ');
      var n_values = Object.keys(data).map(function (p, i) {
        return '$' + (i + 1);
      }).join(', ');

      var values = Object.values(data);

      return new Promise(function (resolve, reject) {
        var sql = 'INSERT INTO lobbies(' + params + ') VALUES(' + n_values + ') RETURNING *';

        var query = {
          name: 'create-lobbies',
          text: sql,
          values: values
        };

        _connection2.default.query(query).then(function (res) {
          return resolve(res.rows[0]);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      return new Promise(function (resolve, reject) {
        var sql = 'SELECT * FROM lobbies';

        var query = {
          name: 'find-all-lobbies',
          text: sql
        };

        _connection2.default.query(query).then(function (res) {
          return resolve(res.rows);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'findOne',
    value: function findOne(id) {
      return new Promise(function (resolve, reject) {
        var sql = 'SELECT * FROM lobbies WHERE id =' + id;

        var query = {
          name: 'find-one-lobbies',
          text: sql
        };

        _connection2.default.query(query).then(function (res) {
          return resolve(res.rows[0]);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      return new Promise(function (resolve, reject) {
        var sql = 'DELETE FROM lobbies WHERE id = ' + id + ';';

        var query = {
          name: 'delete-lobbies',
          text: sql
        };

        _connection2.default.query(query).then(function (res) {
          return resolve(res);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      var params = Object.keys(data).map(function (param, i) {
        return param + ' = $' + (i + 1);
      });

      var values = Object.values(data);

      return new Promise(function (resolve, reject) {
        var sql = ' UPDATE lobbies SET ' + params + ' WHERE id = ' + id + ';';

        var query = {
          name: 'update-lobbies',
          text: sql,
          values: values
        };

        _connection2.default.query(query).then(function (res) {
          return resolve(res);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return Lobby;
}();