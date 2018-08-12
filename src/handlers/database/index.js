export {up} from './migrations/up'
export {down} from './migrations/down'
export {Bot} from './models/bots'
export {Lobby} from './models/lobbies'
export {LobbyPlayer} from './models/lobby_players'
export {Machine} from './models/machine'

import client from './connection'
export const db = client
export default client
