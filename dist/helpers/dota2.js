'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _steam = require('steam');

var _steam2 = _interopRequireDefault(_steam);

var _dota = require('dota2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DotaStrategy = function () {
  function DotaStrategy() {
    _classCallCheck(this, DotaStrategy);

    // Get list of IPs from Steam
    _steam2.default.servers = this.getListOfServers();
    this.steamClient = new _steam2.default.SteamClient();
    this.steamUser = new _steam2.default.SteamUser(this.steamClient);
    this.steamFriends = new _steam2.default.SteamFriends(this.steamClient);
    this.dota = new _dota.Dota2Client(this.steamClient, false, false);
  }

  _createClass(DotaStrategy, [{
    key: 'getListOfServers',
    value: function getListOfServers() {
      var serverlist = ['162.254.195.44:27019', '162.254.195.47:27019', '162.254.195.47:27018', '162.254.195.44:27017', '162.254.195.44:27018', '162.254.195.47:27017', '162.254.195.45:27017', '162.254.195.45:27018', '162.254.195.45:27019', '162.254.195.46:27019', '162.254.195.46:27017', '162.254.195.46:27018', '208.78.164.9:27017', '208.78.164.9:27018', '208.78.164.9:27019', '208.78.164.10:27017', '208.78.164.10:27018', '208.78.164.10:27019', '208.78.164.11:27017', '208.78.164.11:27018', '208.78.164.11:27019', '208.78.164.12:27017', '208.78.164.12:27018', '208.78.164.12:27019', '208.78.164.13:27017', '208.78.164.13:27018', '208.78.164.13:27019', '208.78.164.14:27017', '208.78.164.14:27018', '208.78.164.14:27019'];
      var servers = serverlist.map(function (server) {
        var parts = server.split(':');
        return {
          host: parts[0],
          port: parts[1]
        };
      });

      return servers;
    }
  }, {
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var bot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var self;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                _context2.prev = 1;
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  self.steamClient.on('error', function (err) {
                    console.log('Connection failed - Error: ', JSON.stringify(err, null, 2));
                    reject(new Error(err));
                  });

                  self.steamClient.on('connected', function (err) {
                    if (err) {
                      console.log('Connection failed - Error: ', JSON.stringify(err, null, 2));
                      reject(new Error(err));
                    }
                    var logInDetails = {};

                    logInDetails.account_name = bot.username;
                    logInDetails.password = bot.password;

                    if (bot.sentryFile) {
                      logInDetails.sha_sentryfile = bot.sentryFile;
                    }

                    self.steamClient.on('logOnResponse', function () {
                      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                if (!(response.eresult === _steam2.default.EResult.OK)) {
                                  _context.next = 8;
                                  break;
                                }

                                console.log('Login success!');
                                self.steamFriends.setPersonaState(_steam2.default.EPersonaState.Online);
                                self.steamUser.gamesPlayed([{
                                  game_id: 570
                                }]);

                                self.dota.on('ready', function () {
                                  console.log('Dota is Ready!');
                                  resolve(self.dota);
                                });

                                return _context.abrupt('return', self.dota.launch());

                              case 8:
                                reject(new Error('Login failed. Error code = ' + response.eresult));

                              case 9:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, _this);
                      }));

                      return function (_x2) {
                        return _ref2.apply(this, arguments);
                      };
                    }());

                    self.steamUser.logOn(logInDetails);
                  });

                  self.steamClient.connect();
                }));

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](1);

                console.log(_context2.t0);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 5]]);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }]);

  return DotaStrategy;
}();

exports.default = new DotaStrategy();