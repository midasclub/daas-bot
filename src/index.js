import * as dotenv from 'dotenv'
dotenv.config()

// import DotaStrategy from './helpers/dota2'
// import LobbyManager from './helpers/LobbyManager'
import Database from './handlers/database'

// const bot = {
//   username: 'midasbot3',
//   password: 'midasclub3'
// }
// const players = [
//   {
//     steamId: '76561198847401345',
//     isCaptain: 1,
//     isRadiant: 1,
//     isReady: false
//   }
// ]
// const lobby = {
//   name: 'DaaS Test - New Bot v2',
//   password: '123',
//   gameMode: 0,
//   players
// }

async function init () {
  const db = new Database()
  // const dotaInstance = await DotaStrategy.connect(bot)
  // const lobbyInstance = new LobbyManager(dotaInstance)
  // await lobbyInstance.launchLobby(lobby)
  const bot = await db.getBots(1)
  console.log(bot)
}

init()
