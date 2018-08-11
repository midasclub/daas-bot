require('mocha')
const testDatabase = require('./database')
const {up, down, closeDb, db} = require('../dist/handlers/database')

before(async () => {
  await down()
  await up()
})

describe("Test database functions", () => testDatabase())

after(async () => {
  await down()
  await db.end()
})
