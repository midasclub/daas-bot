import redis from 'redis'

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

  receiveMessages (channel) {
    this.connectSubscribe.on('message', (channel, message) => {
      console.log(channel, message)
    })

    console.log(`Subscribe in channel ${channel}`)
    this.connectSubscribe.subscribe(channel)
  }

  sendMessage (channel, message) {
    this.connectPublish.publish(channel, message)
  }
}

export default new Redis()
