const TestBotDatabase = require('./models/bot')
const TestLobbyDatabase = require('./models/lobby')
const TestLobbyPlayerDatabase = require('./models/lobby_player')

module.exports = () => {
  TestBotDatabase()
  TestLobbyDatabase()
  TestLobbyPlayerDatabase()
}