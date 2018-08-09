import * as dotenv from 'dotenv'
import DotaStrategy from './helpers/dota2'
import LobbyManager from './helpers/LobbyManager'

dotenv.config()

const bot = {
  username: '',
  password: ''
}
const players = [
  {
    steamId: '000000',
    isCaptain: 1,
    isRadiant: 1,
    isReady: false
  }
]
const lobby = {
  name: 'nameBot',
  password: '123789',
  gameMode: 0,
  players
}

async function init () {
  const dotaInstance = await DotaStrategy.connect(bot)
  const lobbyInstance = new LobbyManager(dotaInstance)
  await lobbyInstance.launchLobby(lobby)
}

init()
