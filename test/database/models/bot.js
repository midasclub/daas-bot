require('mocha')
const expect =  require('chai').expect
const {Bot} = require('../../../dist/handlers/database')

async function TestBotDatabase () {
  describe("Test database Bot functions.", () => {
    it("should create a Bot.", async () => {
      const data = {
        username: 'testbot1',
        password: '1234'
      }

      const bot = await Bot.create(data)

      expect(bot).to.have.property('username', data.username)
      expect(bot).to.have.property('password', data.password)
      expect(bot).to.have.property('status', 0)
    })

    it("should get a Bot.", async () => {
      const bot = await Bot.findOne(1)

      expect(bot).to.have.property('username', 'testbot1')
      expect(bot).to.have.property('password', '1234')
      expect(bot).to.have.property('status', 0)
    })

    it("should get all Bots.", async () => {
      const bots = await Bot.findAll()
      expect(bots).to.have.lengthOf(1);
    })

    it("should update a Bot", async () => {
      const data = {
        username: 'newname',
        status: 1,
      }

      await Bot.update(1, data)
      const bot = await Bot.findOne(1)

      expect(bot).to.have.property('username', data.username)
      expect(bot).to.have.property('password', '1234')
      expect(bot).to.have.property('status', data.status)
    })

    it("should delete a Bot", async () => {
      await Bot.delete(1)
      const bot = await Bot.findOne(1)
      expect(bot).to.be.undefined;
    })

  })
}

module.exports = TestBotDatabase;
