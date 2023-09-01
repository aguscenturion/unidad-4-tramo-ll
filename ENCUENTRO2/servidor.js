// SERVIDOR BASICO CON MODULO NATIVO DE NODE JS = HTTP
// REQUERIMOS EL MODULO NATIVO
const http = require('node:http');

// GUARDAMOS EN VARIABLES EL VALOR DEL HOST Y PUERTO
const hostname = 'localhost'
const port = 3002;

//LOGICA QUE LE PASAMOS AL SERVIDOR SEGUN LOS ENDPOINT(RUTAS)
const procesamientoRespuesta = (req, res) => {
    if (req.url === '/') {
        console.log(req.method)
        res.statusCode = 200;
        res.end('<h1>Bienvenidos al inicio</h1>');
    } else if (req.url === '/contacto') {
        res.statusCode = 200;
        res.end('<h1>Bienvenidos a contactos</h1>');
    } else {
        console.log(req.url)
        res.statusCode = 404
        res.end('<h1>Error 404 - Not Found</h1>');
    }
}

//CREAMOS EL SERVIDOR Y RECIBIMOS LA FUNCION DE procesamientoRespuesta
const server = http.createServer(procesamientoRespuesta)

//ESTABLECEMOS EL PUERTO Y HOST QUE ESCUCHA NUESTRO SERVIDOR
//USAMOS LAS VARIABLES QUE CREAMOS AL PRINCIPIO
server.listen(port, hostname, () => {
    //DEVOLVEMOS UN CONSOLE LOG CUANDO SE LEVANTA EL SERVIDOR Y CONCATENAMOS LOS VALOS DEL HOST Y PUERTO
    console.log(`servidor escuchando en el puerto http://${hostname}:${port}`)
})