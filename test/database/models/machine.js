require('mocha')
const expect =  require('chai').expect
const {Machine} = require('../../../dist/handlers/database')

async function TestMachineDatabase () {
  describe("Test database Machine functions.", () => {
    it("should create a machine.", async () => {
      const data = {
        bot_id: 2,
        is_terminated: false,
        started_at: new Date()
      }

      const machine = await Machine.create(data)
      await Machine.create(data) // to next flow

      expect(machine).to.have.property('bot_id', 2)
      expect(machine).to.have.property('is_terminated', false)
    })

    it("should get a machine.", async () => {
      const machine = await Machine.findOne(1)

      expect(machine).to.have.property('bot_id', 2)
      expect(machine).to.have.property('is_terminated', false)
    })

    it("should get all machines.", async () => {
      const machines = await Machine.findAll()
      expect(machines).to.have.lengthOf(2);
    })

    it("should update a machine", async () => {
      const data = {
        is_terminated: true
      }

      await Machine.update(1, data)
      const machine = await Machine.findOne(1)

      expect(machine).to.have.property('is_terminated', true)
    })

    it("should delete a machine", async () => {
      await Machine.delete(1)
      const machine = await Machine.findOne(1)
      expect(machine).to.be.undefined;
    })

  })
}

module.exports = TestMachineDatabase;
