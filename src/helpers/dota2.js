import steam from 'steam'
import { Dota2Client } from 'dota2'

class DotaStrategy {
  constructor () {
    // Get list of IPs from Steam
    steam.servers = this.getListOfServers()
    this.steamClient = new steam.SteamClient()
    this.steamUser = new steam.SteamUser(this.steamClient)
    this.steamFriends = new steam.SteamFriends(this.steamClient)
    this.dota = new Dota2Client(this.steamClient, false, false)
  }

  getListOfServers () {
    const serverlist = [
      '162.254.195.44:27019',
      '162.254.195.47:27019',
      '162.254.195.47:27018',
      '162.254.195.44:27017',
      '162.254.195.44:27018',
      '162.254.195.47:27017',
      '162.254.195.45:27017',
      '162.254.195.45:27018',
      '162.254.195.45:27019',
      '162.254.195.46:27019',
      '162.254.195.46:27017',
      '162.254.195.46:27018',
      '208.78.164.9:27017',
      '208.78.164.9:27018',
      '208.78.164.9:27019',
      '208.78.164.10:27017',
      '208.78.164.10:27018',
      '208.78.164.10:27019',
      '208.78.164.11:27017',
      '208.78.164.11:27018',
      '208.78.164.11:27019',
      '208.78.164.12:27017',
      '208.78.164.12:27018',
      '208.78.164.12:27019',
      '208.78.164.13:27017',
      '208.78.164.13:27018',
      '208.78.164.13:27019',
      '208.78.164.14:27017',
      '208.78.164.14:27018',
      '208.78.164.14:27019'
    ]
    const servers = serverlist.map((server) => {
      const parts = server.split(':')
      return {
        host: parts[0],
        port: parts[1]
      }
    })

    return servers
  }

  async connect (bot = {}) {
    const self = this
    try {
      return new Promise((resolve, reject) => {
        self.steamClient.on('error', (err) => {
          console.log('Connection failed - Error: ', JSON.stringify(err, null, 2))
          reject(new Error(err))
        })

        self.steamClient.on('connected', (err) => {
          if (err) {
            console.log('Connection failed - Error: ', JSON.stringify(err, null, 2))
            reject(new Error(err))
          }
          const logInDetails = {}

          logInDetails.account_name = bot.username
          logInDetails.password = bot.password

          if (bot.sentryFile) {
            logInDetails.sha_sentryfile = bot.sentryFile
          }

          self.steamClient.on('logOnResponse', async (response) => {
            if (response.eresult === steam.EResult.OK) {
              console.log('Login success!')
              self.steamFriends.setPersonaState(steam.EPersonaState.Online)
              self.steamUser.gamesPlayed([
                {
                  game_id: 570
                }
              ])

              self.dota.on('ready', () => {
                console.log('Dota is Ready!')
                resolve(self.dota)
              })

              return self.dota.launch()
            } else {
              reject(new Error(`Login failed. Error code = ${response.eresult}`))
            }
          })

          self.steamUser.logOn(logInDetails)
        })

        self.steamClient.connect()
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new DotaStrategy()
