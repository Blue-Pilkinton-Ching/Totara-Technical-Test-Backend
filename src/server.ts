import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3002

app.use(cors())

import { auth } from 'express-oauth2-jwt-bearer'
import { getRegistrationByUID } from './db-api'

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://totara-test.com/',
  issuerBaseURL: `https://dev-6k5h6ojs067v2f8l.au.auth0.com/`,
})

app.get('/', (req, res) => {
  res.send(`Totara Express Server backend`)
})

// Pass in checkJwt as a middleware to ensure that every request is authenticated.
app.get('/api/registration/', checkJwt, async (req, res) => {
  const uid = req.auth?.payload.sub?.split('|')[1]

  if (uid == undefined) {
    res.status(401).send('Malformed JWT')
    return
  }

  const regi = await getRegistrationByUID(uid)

  res.json(regi || null)
})

app.post('/api/registration', (req, res) => {
  res.send(`Totara Express Server backend`)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
