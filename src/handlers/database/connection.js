import { Client } from 'pg'
import * as dotenv from 'dotenv'

if (!process.env.DATABASE_URL) {
	dotenv.config()
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

client.connect((err) => {
  if (err) {
    console.error('Postgres connection error.', err.stack)
  } else {
    console.log('Postgres DB connected.')
  }
})

export default client