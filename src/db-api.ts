import knex from 'knex'
import { IRegistration } from './../schema'

export async function getRegistrationByUID(uid: string) {
  return await knex('registrations').select('*').where('uid', uid).first()
}

export async function addRegistrationByUID(regi: IRegistration) {
  return await knex('registrations').where('uid', regi.uid).insert({ regi })
}
