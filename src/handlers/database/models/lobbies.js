import client from '../connection'

export class Lobby {

  static create(data) {
    const params = Object.keys(data).join(', ');
    const n_values = Object.keys(data).map((p, i) => {
      return `$${i + 1}`
    }).join(', ')

    const values = Object.values(data);

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO lobbies(${params}) VALUES(${n_values}) RETURNING *`

      const query = {
        name: 'create-lobbies',
        text: sql,
        values,
      }
    
      client.query(query)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(err))
    })
  }

  static findAll() {
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

  static findOne(id) {
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

  static delete(id) {
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

  static update(id, data) {
    const params = Object.keys(data).map((param, i) => {
      return `${param} = $${i + 1}`
    })

    const values = Object.values(data);

    return new Promise((resolve, reject) => {
      const sql = ` UPDATE lobbies SET ${params} WHERE id = ${id};`

      const query = {
        name: 'update-lobbies',
        text: sql,
        values: values,
      }
    
      client.query(query)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}