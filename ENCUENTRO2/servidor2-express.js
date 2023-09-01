//REQUERIMOS EL MODULO DE EXPRESS PREVIAMENTE INSTALADO
const express = require('express');
//REQUERIMOS EL MODULO NATIVO CRYPTO PARA USAR SU METODO PARA CREAR UN ID RANDOM
const crypto = require('node:crypto')

// SE CREA UNA INSTANCIA DE LA APLICACION EXPRESS
const app = express()

//LE ASIGNAMOS UN NOMBRE A UNA VARIABLE PARA GUARDAR LOS DATOS DEL JSON QUE REQUERIMOS
//EL JSON ESTA EN LA RAIZ DE NUESTRO PROYECTO
const peliculas = require('./peliculas.json')

// GUARDAMOS EN UNA VARIABLE EL VALOR PUERTO DONDE SE EJECUTARA EL SERVIDOR
const port = 3000;

// SE UTILIZA EL MIDDLEWARE "express.json()" PARA ANALIZAR EL CUERPO DE LAS SOLICITUDES ENTRANTES CON FORMATO JSON
// ESTO PERMITE AL SERVIDOR QUE ENTIENDA LOS DATOS ENVIADOS EN LAS SOLICITUDES POST Y PUT CON FORMATO JSON.
app.use(express.json());

//RUTA(ENDPOINT) PARA TRAER TODAS LAS PELICULAS DEL JSON QUE IMPORTAMOS Y LAS MUESTRA COMO JSON, UTILIZANDO EL METODO GET.
app.get('/peliculas', (req, res) => {
    res.json(peliculas)
})

//RUTA(ENDPOINT) PARA TRAER UNA PELICULA POR ID, QUE RECIBE POR PARAMETRO DE LA RUTA.
app.get('/peliculas/:id', (req, res) => {
    // CAPTURAMOS EL ID QUE SE RECIBE POR PARAMETRO DE LA RUTA
    const { id } = req.params;
    // SE BUSCA EN EL ARCHIVO JSON DE "peliculas" COINCIDENCIA CON CADA ID DE CADA PELICULA RECORRIDA, CON EL ID QUE SE RECIBE POR PARAMETRO.
    const peliculaId = peliculas.find(pelicula => pelicula.id === id);

    //SI ENCUENTRA UNA PELICULA DEVUELVE COMO JSON TODO EL ELEMENTO, SINO DA UN ERROR DE PELICULA NO ENCONTRADA.
    if (peliculaId) {
        return res.json(peliculaId)
    } else {
        res.status(404).json({
            message: "Pelicula no encontrada"
        })
    }
})

//RUTA(ENDPOINT) PARA AGREGAR UNA NUEVA PELICULA, UTILIZANDO EL METODO POST.
app.post('/peliculas', (req, res) => {
    // LEEMOS LOS DATOS ENVIADOS POR EL CUERPO DE LA SOLICITUD POST 
    const {
        title,
        year,
        direction,
        duration,
        poster,
        genre,
        rate
    } = req.body;

    // CREAMOS UN OBJETO DE UNA NUEVA PELICULA CON UN ID ALEATORIO Y CON LOS DATOS QUE LEIMOS DEL CUERPO DE LA SOLICITUD POST.
    const nuevaPelicula = {
        id: crypto.randomUUID(),
        title,
        year,
        direction,
        duration,
        poster,
        genre,
        rate
    }

    //a partir de aca ya se agregaria o guardia en la base de datos
    //vamos a "guardar" los datos pero lo hariamos en memoria

    // AGREGAMOS CON EL METODO DE ARREGLOS PUSH, AL ARREGLO DE PELICULAS, LOS DATOS QUE GUARDAMOS EN nuevaPelicula
    peliculas.push(nuevaPelicula);
    // Y SE DEVUELVE UN JSON CON UN MSJ Y LOS DATOS DE LA PELICULA NUEVA CREADA
    res.status(201).json({
        message: "pelicula creada correctamente",
        nuevaPelicula
    })
})

//RUTA(ENDPOINT) PARA EDITAR UNA PELICULA EXISTENTE, POR ESO SOLICITAMOS POR PARAMETRO EL ID.
app.put('/peliculas/:id', (req, res) => {
    // CAPTURAMOS EL ID QUE SE RECIBE POR PARAMETRO DE LA RUTA
    const { id } = req.params;
    // CAPTURAMOS EL YEAR QUE SE RECIBE POR BODY O CUERPO DE LA PETICION POST
    const { year } = req.body;
    // SE BUSCA EN EL ARCHIVO JSON DE "peliculas" COINCIDENCIA CON CADA ID DE CADA PELICULA RECORRIDA, CON EL ID QUE SE RECIBE POR PARAMETRO.
    // ESTO DEVUELVE LA POSICION EN LA QUE SE ENCUENTRA EN EL ARREGLO PORQUE USAMOS EL METODO findIndex
    const peliculaIndex = peliculas.findIndex(pelicula => pelicula.id === id)

    //SI EL INDICE ENCONTRADO ES MENOR A 0, ES DECIR NO EXISTE EN EL ARREGLO, ENTONCES SE DEVUELVE UN JSON CON UN MENSAJE QUE DICE PELICULA NO ENCONTRADA
    if (peliculaIndex < 0) {
        return res.status(404).json({
            message: "Pelicula no encontrada"
        })
    }

    // CREAMOS UN OBJETO CON LOS DATOS DE LA PELICULA CON EL INDICE ADQUIRIDO Y LE SUMAMOS EL DATO DEL YEAR
    // AL CREAR UN OBJETO ASI, SI EL SEGUNDO OBJETO COMPARTE DATOS QUE TIENE EL PRIMER OBJETO, REEMPLAZA SU VALOR
    const peliculaActualizada = {
        ...peliculas[peliculaIndex],
        year
    }

    // ACA ACTUALIZAMOS LA PELICULA CON EL INDICE ENCONTRADO CON LOS DATOS QUE SE GUARDARON EN peliculaActualizada
    peliculas[peliculaIndex] = peliculaActualizada;

    // Y SE DEVUELVE UN JSON CON UN MSJ Y LOS DATOS DE LA PELICULA ACTUALIZADA
    res.status(201).json({
        message: "Pelicula actualizada correctamente",
        peliculaActualizada
    })
})

//RUTA(ENDPOINT) PARA ELIMINAR UNA PELICULA EXISTENTE, POR ESO SOLICITAMOS POR PARAMETRO EL ID.
app.delete('/peliculas/:id', (req, res) => {
    // CAPTURAMOS EL ID QUE SE RECIBE POR PARAMETRO DE LA RUTA
    const { id } = req.params;
    // SE BUSCA EN EL ARCHIVO JSON DE "peliculas" COINCIDENCIA CON CADA ID DE CADA PELICULA RECORRIDA, CON EL ID QUE SE RECIBE POR PARAMETRO.
    // ESTO DEVUELVE LA POSICION EN LA QUE SE ENCUENTRA EN EL ARREGLO PORQUE USAMOS EL METODO findIndex
    const peliculaIndex = peliculas.findIndex(pelicula => pelicula.id === id)

    // MOSTRAMOS POR CONSOLA EL INDICE QUE NOS DEVUELVE, SI NOS DEVUELVE -1 ES PORQUE NO EXISTE EN EL ARREGLO
    // ESTE console.log SOLAMENTE ES PARA VER QUE RECIBIMOS Y PODER CREAR EL CONDICIONAL
    console.log(peliculaIndex)

    //SI EL INDICE ENCONTRADO ES MENOR A 0, ES DECIR NO EXISTE EN EL ARREGLO, ENTONCES SE DEVUELVE UN JSON CON UN MENSAJE QUE DICE PELICULA NO ENCONTRADA
    if (peliculaIndex < 0) {
        return res.status(404).json({
            message: "Pelicula no encontrada"
        })
    }

    // UTILIZAMOS EL METODO SPLICE EN EL ARREGLO DE peliculas, EL PRIMER PARAMETRO INDICA DESDE QUE INDICE Y EL SEGUNDO CUANTOS ELEMENTOS CORTAR DEL ARREGLO
    // EL peliculaIndex HACE REFERENCIA A LA POSICION DE LA PELICULA QUE COINICIDE CON EL ID Y EL 1 LE DECIMOS QUE SOLO ESE ELEMENTO VAMOS A CORTAR
    peliculas.splice(peliculaIndex, 1)

    // Y SE DEVUELVE UN JSON CON UN MSJ DE PELICULA ELIMINADA CORRECTAMENTE
    res.status(200).json({
        message: "Pelicula eliminada correctamente"
    })
})


// UNA RUTA GET QUE SI VAMOS AL NAVEGADOR EN http://localhost:3000/contactos NOS VA A DEVOLVER UN "Hola bienvenidos a contacto"
// ESTO FUNCIONA PORQUE LAS PETICIONES GET PODEMOS HACERLOS DIRECTAMENTE DESDE EL NAVEGADOR
app.get('/contacto', (req, res) => {
    res.status(201).send('Hola bienvenidos a contacto')
})

//RUTA(ENDPOINT) QUE DEVUELVE UN ERROR 404, SI SE INGRESA A UNA RUTA QUE NO CREAMOS NI ESPECIFICAMOS EN NUESTRO SERVIDOR
app.use((req, res) => {
    res.status(404).send('Error 404')
})


// SE PONE EN MARCHA EL SERVIDOR DE EXPRESS
//LE PASAMOS LA VARIABLE DE port QUE CREAMOS AL PRINCIPIO Y LO QUE TIENE QUE EJECUTAR CUANDO SE LEVANTA
app.listen(port, () => {
    //DEVOLVEMOS UN CONSOLE LOG CUANDO SE LEVANTA EL SERVIDOR Y CONCATENAMOS EL VALOR DEL PUERTO
    console.log(`server escuchando en el puerto http://localhost:${port}`)
})
