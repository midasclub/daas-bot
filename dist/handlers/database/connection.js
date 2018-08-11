'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

if (!process.env.DATABASE_URL) {
  dotenv.config();
}

var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL
});

client.connect(function (err) {
  if (err) {
    console.error('Postgres connection error.', err.stack);
  } else {
    console.log('Postgres DB connected.');
  }
});

exports.default = client;