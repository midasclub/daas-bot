require('mocha')
const expect =  require('chai').expect
const {Lobby} = require('../../../dist/handlers/database')

async function TestLobbyDatabase () {
  describe("Test database Lobby functions.", () => {
    it("should create a lobby.", async () => {
      const data = {
        name: 'lobby test #1',
        password: '2322',
        server: 0,
        game_mode: 1,
        radiant_has_first_pick: true
      }

      const lobby = await Lobby.create(data)
      await Lobby.create(data)

      expect(lobby).to.have.property('name', 'lobby test #1')
      expect(lobby).to.have.property('password', '2322')
      expect(lobby).to.have.property('server', 0)
      expect(lobby).to.have.property('game_mode', 1)
      expect(lobby).to.have.property('radiant_has_first_pick', true)
      expect(lobby).to.have.property('status', 0)
    })

    it("should get a Lobby.", async () => {
      const lobby = await Lobby.findOne(1)

      expect(lobby).to.have.property('name', 'lobby test #1')
      expect(lobby).to.have.property('password', '2322')
      expect(lobby).to.have.property('server', 0)
      expect(lobby).to.have.property('game_mode', 1)
      expect(lobby).to.have.property('radiant_has_first_pick', true)
      expect(lobby).to.have.property('status', 0)
    })

    it("should get all Lobbies.", async () => {
      const lobbies = await Lobby.findAll()
      expect(lobbies).to.have.lengthOf(2);
    })

    it("should update a Lobby", async () => {
      const data = {
        name: 'new name lobby',
        password: '7777',
        server: 2,
        game_mode: 3,
        status: 1,
        radiant_has_first_pick: false
      }

      await Lobby.update(1, data)
      const lobby = await Lobby.findOne(1)

      expect(lobby).to.have.property('name', 'new name lobby')
      expect(lobby).to.have.property('password', '7777')
      expect(lobby).to.have.property('server', 2)
      expect(lobby).to.have.property('game_mode', 3)
      expect(lobby).to.have.property('radiant_has_first_pick', false)
      expect(lobby).to.have.property('status', 1)
    })

    it("should delete a Lobby", async () => {
      await Lobby.delete(1)
      const lobby = await Lobby.findOne(1)
      expect(lobby).to.be.undefined;
    })

  })
}

module.exports = TestLobbyDatabase;
