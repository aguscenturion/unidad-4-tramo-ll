const http = require('node:http');

const hostname = 'localhost'
const port = 3002;

const server = http.createServer((req, res) => {
    console.log('peticion recibida');
    res.end('Hola mundo desde el servidor nuevamente')
})

server.listen(port, hostname, () => {
    console.log(`servidor escuchando en el puerto http://${hostname}:${port}`)
})


