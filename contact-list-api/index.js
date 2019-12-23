require('dotenv').config()
const { argv: [, , port], env: { PORT = port || 8080 } } = process
const { name, version } = require('./package.json')
const http = require('http')
const router = require('./router')
const routes = require('./router/routes')

const cors = (res, req) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
  
  if ( req.method === 'OPTIONS' ) {
    res.writeHead(200);
    res.end();
    return;
  }

} 
const server = http.createServer(async (req, res) => {

  cors(res, req)

  await router(req, res, routes)
});

server.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`));