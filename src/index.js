const http = require('http');
const routers = require('./routes')
const {URL} = require('url')
const bodyParsers = require('./helpers/bodyParsers')

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)
  let {pathname} = parsedUrl
  let id = null

  const searchParams = pathname.split('/').filter(Boolean)
  
  if(searchParams.length > 1) {
    pathname = `/${searchParams[0]}/:id`
    id = searchParams[1]
  }

  const route = routers.find((routeObj) => (routeObj.method === request.method && routeObj.url === pathname))

  if(route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = {id}
    response.send = (statusCode, body) => {
      response.writeHead(statusCode,{'content-type': 'application/json'});
      response.end(JSON.stringify(body))
    }
    if(['POST','PUT','PATCH'].includes(request.method)){
      bodyParsers(request, () => route.handler(request, response))
    }else {
      route.handler(request, response)
    }
  }else{
    response.writeHead(404,{'Content-Type': 'text/html'})
    response.end(`Cannot ${request.method} ${pathname}`)
  }

})

server.listen(3000, () => {console.log('🔥 Server at http://localhost:3000')})