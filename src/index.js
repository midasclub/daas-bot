import * as dotenv from 'dotenv'
dotenv.config()

import DotaStrategy from './helpers/dota2'
import LobbyManager from './helpers/LobbyManager'
import { Bot } from './handlers/database'

const players = [
  {
    steamId: '76561198178623609',
    isCaptain: 1,
    isRadiant: 1,
    isReady: false
  }
]

const lobby = {
  name: 'DaaS Test - New Bot v1',
  password: '123',
  gameMode: 0,
  players
}

async function init () {
  const bot = await Bot.findByStatus(Bot.STATUS.OFFLINE)
  const dotaInstance = await DotaStrategy.connect(bot)
  const lobbyInstance = new LobbyManager(dotaInstance)
  await lobbyInstance.launchLobby(lobby)
}

init()
