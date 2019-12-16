require('dotenv').config()
const { argv: [, , port], env: { PORT = port || 8080, SECRET_KEY, URL_CLIENTS } } = process
const { name, version } = require('./package.json')
const fs = require('fs').promises
const https = require('https')
const http = require('http')
const jwt = require('jsonwebtoken')

const server = http.createServer(async (req, res) => {  
  const { method } = req

  debugger
  const { headers: { authorization } } = req
    
  authorization && ([, token] = authorization.split(' '))

  if(method === 'POST'){
    if(req.url.split('/')[2]==='login'){
      const body = JSON.parse(await getPostData(req))
      const results = JSON.parse(await fs.readFile('login.json'))
      const {id} = results.find(res => res.username === body.username && res.password === body.password )
      res.end(JSON.stringify({token:jwt.sign({sub: id}, SECRET_KEY)}))  
    }
  }
  if(method === 'GET'){debugger
    if(req.url.split('/')[2]==='contacts'){debugger
      try {
        jwt.verify(token, SECRET_KEY)
      } catch ({message}) {
        console.log(message)
      }
      await https.get(URL_CLIENTS, async _res =>{
        const { statusCode } = _res;
        const contentType = _res.headers['content-type'];   
        res.end(await getPostData(_res))     
        
      })
    }
  }
});


function getPostData(req) {
  return new Promise((resolve, reject) => {
     try {
         let body = '';
         req.on('data', chunk => {
             body += chunk.toString(); // convert Buffer to string
         });

         req.on('end', () => {
             //resolve(parse(body));
             resolve(body);
         });
     }
     catch (e) {
         reject(e);
     }
  });
}
server.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`));