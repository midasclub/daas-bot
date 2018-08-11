const TestBotDatabase = require('./models/bot')
const TestLobbyDatabase = require('./models/lobby')
const TestLobbyPlayerDatabase = require('./models/lobby_player')
const TestMachineDatabase = require('./models/machine')

module.exports = () => {
  TestBotDatabase()
  TestMachineDatabase()
  TestLobbyDatabase()
  TestLobbyPlayerDatabase()
}