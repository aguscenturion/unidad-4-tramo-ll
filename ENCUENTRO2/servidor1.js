// REQUERIMOS LOS MODULOS NATIVOS DE NODE PARA UTILIZAR.
// HTTP PARA EL SERVIDOR
const http = require('node:http');
// FS PARA LEER ARCHIVOS
const fs = require('node:fs');

// GUARDAMOS EN VARIABLES EL VALOR DEL HOST Y PUERTO
const hostname = 'localhost'
const port = 3002;

//LOGICA QUE LE PASAMOS AL SERVIDOR SEGUN LOS ENDPOINT(RUTAS) Y METODOS
//POR DEFECTO LA PETICION ES DE METODO GET
const procesamientoRespuesta = (req, res) => {
    // DE LA PETICION DESESTRUCTURAMOS LOS DATOS DEL METODO Y LA URL
    const { method, url } = req;

    // HACEMOS UN SWITCH Y CAPTURAMOS EL METODO 
    switch (method) {
        // SEGUN EL METODO (GET O POST) VAMOS A HACER OTRO SWITCH CAPTURANDO LA URL
        case 'GET':
            switch (url) {
                // SI LA PETICION ES A http:localhost:3000/ VA A DEVOLVER UN H1
                // SETEAMOS EL HEADER CON UN CONTENT TYPE PARA ESPECIFICAR EL CONTENIDO
                // Y SETEAMOS CON UN CHARSET=UTF-8 PARA CONDIFICAR EL CONTENIDO
                case '/':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    res.end('<h1>Bienvenidos niño a mi página</h1>');
                    break;
                // SI LA PETICION ES A http:localhost:3000/contacto VA A DEVOLVER UN H1
                case '/contacto':
                    res.statusCode = 200;
                    res.end('<h1>Bienvenidos a contactos</h1>');
                    break;
                // SI LA PETICION ES A http:localhost:3000/imagen VA A DEVOLVER UNA IMAGEN
                // USAMOS EL MODULO NATIVO DE FS PARA LEER UNA IMAGEN DE NUESTRO PROYECTO Y DEVOLVERLA
                case '/imagen':
                    fs.readFile('./200123.jpg', (err, data) => {
                        if (err) {
                            res.statusCode = 500;
                            res.end('<h1>500 Internal Server Error</h1>')
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'image/jpg')
                            res.end(data);
                        }
                    })
                    break;
                // SI LA PETICION ES A UNA RUTA QUE NO EXISTE VA A DEVOLVER UN H1 CON ERROR 404
                default:
                    res.statusCode = 404
                    res.end('<h1>Error 404 - Not Found</h1>');
                    break;
            }
            break;
        // SI LA PETICION ES DE TIPO POST ASI ES COMO TRABAJO POR DETRAS
        // ESTA INFORMACION DEL POST ES SOLO PARA CONOCER, NO HACE FALTA APRENDERLO SI USAMOS EXPRESS
        case 'POST':
            switch (url) {
                case '/crear':
                    let body = '';

                    req.on('data', chunk => {
                        body = body + chunk.toString()
                    })

                    req.on('end', () => {
                        let data = JSON.parse(body)
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

                        res.end(JSON.stringify(data))
                    })
                    break;
            }
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