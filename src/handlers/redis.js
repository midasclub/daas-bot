import redis from 'redis'
import Core from '../handlers/core'

class Redis {
  constructor () {
    this.connectSubscribe = redis.createClient({
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
      db: 1
    })
    console.log('Connected to Redis on subscribe')

    this.connectPublish = redis.createClient({
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
      db: 1
    })
    console.log('Connected to Redis on publish')
  }

  receiveMessages (channel, lobbyInstance) {
    return new Promise((resolve, reject) => {
      this.connectSubscribe.on('message', async (channel, message) => {
        await Core.receiveCommand(lobbyInstance, message)
      })

      console.log(`Subscribe in channel ${channel}`)
      this.connectSubscribe.subscribe(channel)

      resolve()
    })
  }

  sendMessage (channel, message) {
    this.connectPublish.publish(channel, message)
  }
}

export default new Redis()
