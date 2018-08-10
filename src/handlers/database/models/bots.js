import client from '../connection'

export class Bot {

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO bots(username, password) VALUES($1, $2) RETURNING *`
      const values = [data.username, data.password]

      const query = {
        name: 'create-bots',
        text: sql,
        values: values,
      }
    
      client.query(query)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(err))
    })
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM bots`

      const query = {
        name: 'find-all-bots',
        text: sql
      }
    
      client.query(query)
        .then(res => resolve(res.rows))
        .catch(err => reject(err))
    })
  }

  static findOne(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM bots WHERE id =${id}`

      const query = {
        name: 'find-one-bots',
        text: sql
      }
    
      client.query(query)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(err))
    })
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM bots WHERE id = ${id};`

      const query = {
        name: 'delete-bots',
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
      const sql = ` UPDATE bots SET ${params} WHERE id = ${id};`

      const query = {
        name: 'update-bots',
        text: sql,
        values: values,
      }
    
      client.query(query)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}