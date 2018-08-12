require('mocha')
const expect = require('chai').expect
const {LobbyPlayer} = require('../../../dist/handlers/database')

async function TestLobbyPlayerDatabase () {
  describe('Test database Lobby Player functions.', () => {
    it('should create a Lobby Player.', async () => {
      const data = {
        steam_id: '213634532223',
        lobby_id: 2,
        is_radiant: true
      }

      const lobbyPlayer = await LobbyPlayer.create(data)

      expect(lobbyPlayer).to.have.property('steam_id', '213634532223')
      expect(lobbyPlayer).to.have.property('lobby_id', 2)
      expect(lobbyPlayer).to.have.property('is_radiant', true)
    })

    it('should get a Lobby Player.', async () => {
      const lobbyPlayer = await LobbyPlayer.findOne(1)

      expect(lobbyPlayer).to.have.property('steam_id', '213634532223')
      expect(lobbyPlayer).to.have.property('lobby_id', 2)
      expect(lobbyPlayer).to.have.property('is_radiant', true)
      expect(lobbyPlayer).to.have.property('is_ready', false)
      expect(lobbyPlayer).to.have.property('is_captain', false)
    })

    it('should get all Lobby Players.', async () => {
      const lobbyPlayers = await LobbyPlayer.findAll()
      expect(lobbyPlayers).to.have.lengthOf(1)
    })

    it('should update a Lobby Player', async () => {
      const data = {
        steam_id: '11111111111111',
        is_radiant: false,
        is_ready: true,
        is_captain: true
      }

      await LobbyPlayer.update(1, data)
      const lobbyPlayer = await LobbyPlayer.findOne(1)

      expect(lobbyPlayer).to.have.property('steam_id', '11111111111111')
      expect(lobbyPlayer).to.have.property('is_radiant', false)
      expect(lobbyPlayer).to.have.property('is_ready', true)
      expect(lobbyPlayer).to.have.property('is_captain', true)
    })

    it('should delete a Lobby Player', async () => {
      await LobbyPlayer.delete(1)
      const lobbyPlayer = await LobbyPlayer.findOne(1)
      expect(lobbyPlayer).to.be.undefined
    })
  })
}

module.exports = TestLobbyPlayerDatabase
