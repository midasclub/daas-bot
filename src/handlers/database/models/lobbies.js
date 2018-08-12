import client from '../connection'

export class Lobby {
  static get GameMode () {
    return {
      ALL_PICK: 0,
      ALL_DRAFT: 1,
      CAPTAINS_MODE: 2,
      RANDOM_DRAFT: 3,
      SINGLE_DRAFT: 4,
      ALL_RANDOM: 5,
      CAPTAINS_DRAFT: 6,
      ABILITY_DRAFT: 7,
      ALL_RANDOM_DEATHMATCH: 8,
      ONE_VS_ONE_MID: 9,
      TURBO: 10
    }
  }

  static create (data) {
    const params = Object.keys(data).join(', ')
    const n_values = Object.keys(data).map((p, i) => {
      return `$${i + 1}`
    }).join(', ')

    const values = Object.values(data)

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO lobbies(${params}) VALUES(${n_values}) RETURNING *`

      const query = {
        name: 'create-lobbies',
        text: sql,
        values
      }

      client.query(query)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(err))
    })
  }

  static findAll () {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM lobbies`

      const query = {
        name: 'find-all-lobbies',
        text: sql
      }

      client.query(query)
        .then(res => resolve(res.rows))
        .catch(err => reject(err))
    })
  }

  static findOne (id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM lobbies WHERE id =${id}`

      const query = {
        name: 'find-one-lobbies',
        text: sql
      }

      client.query(query)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(err))
    })
  }

  static delete (id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM lobbies WHERE id = ${id};`

      const query = {
        name: 'delete-lobbies',
        text: sql
      }

      client.query(query)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  static update (id, data) {
    const params = Object.keys(data).map((param, i) => {
      return `${param} = $${i + 1}`
    })

    const values = Object.values(data)

    return new Promise((resolve, reject) => {
      const sql = ` UPDATE lobbies SET ${params} WHERE id = ${id};`

      const query = {
        name: 'update-lobbies',
        text: sql,
        values: values
      }

      client.query(query)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}
