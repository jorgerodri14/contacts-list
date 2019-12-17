require('dotenv').config()
const { argv: [, , port], env: { PORT = port || 8080, SECRET_KEY, URL_CONTACT_LIST } } = process
const { name, version } = require('./package.json')
const tokenVerifier = require('./utils/token-verifier')
const fs = require('fs').promises
const statusRes = require('./utils/state-res')
const https = require('https')
const http = require('http')
const jwt = require('jsonwebtoken')
const router = require('./router')
const routes = require('./routes')


const server = http.createServer(async (req, res) => {
  await router(req, res, routes)
/*   const { method } = req

  if (method === 'POST') {
    if (req.url.split('/')[2] === 'login') {
      authenticateUser(await getPostData(req))
      const results = JSON.parse(await fs.readFile('login.json'))
      const { id } = results.find(res => res.username === body.username && res.password === body.password)
      res.end(JSON.stringify({ token: jwt.sign({ sub: id }, SECRET_KEY) }))
    }
  }
  if (method === 'GET') {
    debugger
    if (req.url.split('/')[2] === 'contacts') {
      debugger
      try {
        tokenVerifier(SECRET_KEY, req, res)
      } catch ({message}) {
        res.end(statusRes(401, message))
      }
      await https.get(URL_CONTACT_LIST, async _res => {

        res.end(await getPostData(_res))

      })
    }
  } */
});

server.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`));