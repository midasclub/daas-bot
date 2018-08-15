import * as dotenv from 'dotenv'
dotenv.config()

import DotaStrategy from './helpers/dota2'
import LobbyManager from './helpers/LobbyManager'
import { Bot } from './handlers/database'
import Redis from './handlers/redis'

const channel = 'foo'
const players = [
  {
    steamId: '76561198847401345',
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
  // Find one bot available
  const bot = await Bot.findByStatus(Bot.STATUS.OFFLINE)

  // Init Lobby Dota with data
  const dotaInstance = await DotaStrategy.connect(bot)
  const lobbyInstance = new LobbyManager(channel, dotaInstance)

  // Receive messages from Pub/Sub
  await Redis.receiveMessages(channel, lobbyInstance)

  await lobbyInstance.launchLobby(channel, lobby)
}

init()
