export {up} from './migrations/up'
export {down} from './migrations/down'
export {Bot} from './models/bots'

import client from './connection'
export const db = client;
export default client;
