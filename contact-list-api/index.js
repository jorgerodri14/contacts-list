require('dotenv').config()
const { argv: [, , port], env: { PORT = port || 8080, SECRET_KEY, URL_CONTACT_LIST } } = process
const { name, version } = require('./package.json')
const http = require('http')
const router = require('./router')
const routes = require('./router/routes')


const server = http.createServer(async (req, res) => {
  await router(req, res, routes)
});

server.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`));