import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://totara-test.com/',
  issuerBaseURL: `https://dev-6k5h6ojs067v2f8l.au.auth0.com/`,
})

app.get('/private', checkJwt, (req, res) => {
  res.send('This route needs authentication')
})

app.get('/public', checkJwt, (req, res) => {
  res.send(`This route doesn't need authentication`)
})

app.get('/', (req, res) => {
  res.send(`Totara Express Server backend`)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
