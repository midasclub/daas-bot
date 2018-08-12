'use strict';

// const bot = {
//   username: 'midasbot3',
//   password: 'midasclub3'
// }
// const players = [
//   {
//     steamId: '76561198847401345',
//     isCaptain: 1,
//     isRadiant: 1,
//     isReady: false
//   }
// ]
// const lobby = {
//   name: 'DaaS Test - New Bot v2',
//   password: '123',
//   gameMode: 0,
//   players
// }

var init = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var bot;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database.Bot.findByStatus(_database.Bot.STATUS.OFFLINE);

          case 2:
            bot = _context.sent;

            // const dotaInstance = await DotaStrategy.connect(bot)
            // const lobbyInstance = new LobbyManager(dotaInstance)
            // await lobbyInstance.launchLobby(lobby)
            console.log(bot);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

var _database = require('./handlers/database');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

dotenv.config();

// import DotaStrategy from './helpers/dota2'
// import LobbyManager from './helpers/LobbyManager'


init();