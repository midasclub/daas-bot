'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dota = require('dota2');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LobbyManager = function () {
  function LobbyManager(instance) {
    _classCallCheck(this, LobbyManager);

    this.dota = instance;
    this.CMPick = _dota.schema.lookupEnum('DOTA_CM_PICK').values;
    this.ChatChannelType = _dota.schema.lookupEnum('DOTAChatChannelType_t').values;
  }

  _createClass(LobbyManager, [{
    key: 'getCMPick',
    value: function getCMPick() {
      var radiantHasFirstPick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (radiantHasFirstPick) {
        return this.CMPick.DOTA_CM_GOOD_GUYS;
      } else {
        return this.CMPick.DOTA_CM_BAD_GUYS;
      }
    }
  }, {
    key: 'getLobbyOptions',
    value: function getLobbyOptions(lobby) {
      return {
        game_name: lobby.name || '',
        pass_key: lobby.password || '',
        server_region: lobby.server || _dota.ServerRegion.BRAZIL,
        game_mode: lobby.gameMode || 0,
        game_version: _dota.schema.lookupEnum('DOTAGameVersion').values.GAME_VERSION_CURRENT,
        series_type: _dota.SeriesType.NONE,
        cm_pick: this.getCMPick(lobby.radiantHasFirstPick),
        allow_cheats: false,
        fill_with_bots: false,
        allow_spectating: true,
        radiant_series_wins: 0,
        dire_series_wins: 0,
        allchat: false,
        dota_tv_delay: _dota.schema.lookupEnum('LobbyDotaTVDelay').values.LobbyDotaTV_120,
        leagueid: 0
      };
    }
  }, {
    key: 'kickBotFromTeam',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.kickFromTeam(this.dota.AccountID));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function kickBotFromTeam() {
        return _ref.apply(this, arguments);
      }

      return kickBotFromTeam;
    }()
  }, {
    key: 'kickFromTeam',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(steamId) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  _this.dota.practiceLobbyKickFromTeam(steamId, function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function kickFromTeam(_x2) {
        return _ref2.apply(this, arguments);
      }

      return kickFromTeam;
    }()
  }, {
    key: 'handleLobbyIdReceived',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(lobby) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', new Promise(function (resolve, reject) {
                  _this2.chatChannel = 'Lobby_' + lobby.lobby_id;
                  _this2.dota.joinChat(_this2.chatChannel);
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleLobbyIdReceived(_x3) {
        return _ref3.apply(this, arguments);
      }

      return handleLobbyIdReceived;
    }()
  }, {
    key: 'inviteAll',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(lobby) {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return lobby.players.forEach(function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(it) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.abrupt('return', _this3.invite(it.steamId, lobby));

                          case 1:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this3);
                  }));

                  return function (_x5) {
                    return _ref5.apply(this, arguments);
                  };
                }());

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function inviteAll(_x4) {
        return _ref4.apply(this, arguments);
      }

      return inviteAll;
    }()
  }, {
    key: 'invite',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(playerId, lobby) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('Sent an invite to ' + playerId + ' to lobby #' + lobby.name);
                  _this4.dota.inviteToLobby(playerId, function (err) {
                    if (err) {
                      console.log(err);
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                }));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function invite(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return invite;
    }()
  }, {
    key: 'startLobby',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(lobby) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt('return', Promise.all([
                // The bot SteamId has in Instance
                this.kickBotFromTeam(),

                // Setup handlers
                // this.handleLobbyTimeout()
                this.handleLobbyIdReceived(lobby),
                // this.handleMatchIdReceived()
                // this.handleGameResultReceived()
                // this.handleMemberPositionUpdated()
                // this.handlePlayerReady()
                this.inviteAll(lobby)]));

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function startLobby(_x8) {
        return _ref7.apply(this, arguments);
      }

      return startLobby;
    }()
  }, {
    key: 'launchLobby',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(lobby) {
        var _this5 = this;

        var self;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                self = this;
                return _context9.abrupt('return', new Promise(function (resolve, reject) {
                  var options = self.getLobbyOptions(lobby);

                  self.dota.on('practiceLobbyUpdate', function (lobby) {
                    return console.log(JSON.stringify(lobby, null, 2));
                  });

                  self.dota.createPracticeLobby(options, function () {
                    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(err) {
                      return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              if (!err) {
                                _context8.next = 3;
                                break;
                              }

                              console.log('Failed to \'createPracticeLobby\' ' + lobby.name + ' - ', err);
                              throw new Error('Failed to \'createPracticeLobby\' ' + lobby.name);

                            case 3:
                              _context8.next = 5;
                              return self.startLobby(lobby);

                            case 5:

                              console.log('Lobby creation successful! \n Name: ' + lobby.name);
                              resolve();

                            case 7:
                            case 'end':
                              return _context8.stop();
                          }
                        }
                      }, _callee8, _this5);
                    }));

                    return function (_x10) {
                      return _ref9.apply(this, arguments);
                    };
                  }());
                }));

              case 5:
                _context9.prev = 5;
                _context9.t0 = _context9['catch'](0);

                console.log('Error in launch Lobby: ', _context9.t0);
                throw new Error(_context9.t0);

              case 9:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 5]]);
      }));

      function launchLobby(_x9) {
        return _ref8.apply(this, arguments);
      }

      return launchLobby;
    }()
  }, {
    key: 'invitePlayers',
    value: function invitePlayers(players) {
      var _this6 = this;

      console.log('Init invite players');
      players.forEach(function (player) {
        _this6.dota.on('lobbyInviteUpdate', function (invite) {
          console.log(JSON.stringify(invite, null, 2));
          _this6.dota.respondLobbyInvite(invite.group_id, true);
        });
      });

      console.log('Players inviteds: ' + players.length);
    }
  }]);

  return LobbyManager;
}();

exports.default = LobbyManager;