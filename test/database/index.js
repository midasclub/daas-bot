const TestBotDatabase = require('./models/bot')
const TestLobbyDatabase = require('./models/lobby')

module.exports = () => {
  TestBotDatabase()
  TestLobbyDatabase()
}