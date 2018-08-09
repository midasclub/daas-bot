import * as dotenv from 'dotenv'
import DotaStrategy from './helpers/dota2'
import LobbyManager from './helpers/LobbyManager'

dotenv.config()

const bot = {
  username: 'midasbot3',
  password: 'midasclub3'
}
const players = [
  {
    steamId: '76561198847401345',
    isCaptain: 1,
    isRadiant: 1,
    isReady: false
  }
]
const lobby = {
  name: 'DaaS Test - New Bot v2',
  password: '123',
  gameMode: 0,
  players
}

async function init () {
  const dotaInstance = await DotaStrategy.connect(bot)
  const lobbyInstance = new LobbyManager(dotaInstance)
  await lobbyInstance.launchLobby(lobby)
}

init()
