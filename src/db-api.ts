import knex from 'knex'
import { IRegistration } from './../schema'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db/totara.sqlite3',
  },
})

export async function getRegistrationByUID(uid: string) {
  return await db('registrations').select('').where('uid', uid).first()
}

export async function addRegistrationByUID(regi: IRegistration) {
  return await db('registrations')
    .table('registrations')
    .insert({ ...regi })
}
