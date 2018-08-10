const pgp = require('pg-promise')

export default class Database {
  constructor () {
    this.db = pgp({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_DB,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS
    })

    this.BotStatus = {
      OFFLINE: 0,
      DISABLED: 1,
      IDLE: 2,
      IN_LOBBY: 3,
      IN_MATCH: 4,
      WAITING_FOR_MATCH_RESULTS: 5
    }
  }

  getBots (numbersOfBots = 1) {
    return this.db.any('SELECT * FROM bots WHERE status = $1 LIMIT $2', this.BotStatus.OFFLINE, numbersOfBots)
  }
}
