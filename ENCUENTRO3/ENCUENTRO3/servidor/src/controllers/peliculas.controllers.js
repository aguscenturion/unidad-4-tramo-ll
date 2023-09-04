import { randomUUID } from 'node:crypto';
import { peliculas } from "../../peli.js";


export const ctrlTraerPeliculas = (req, res) => {
    res.json(peliculas)
}

export const ctrlTraerPelicula = (req, res) => {
    // CAPTURAMOS EL ID QUE SE RECIBE POR PARAMETRO DE LA RUTA
    const { id } = req.params;
    try {
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
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

export const ctrlCrearPelicula = (req, res) => {
    const {
        title,
        year,
        direction,
        duration,
        poster,
        genre,
        rate
    } = req.body;

    try {
        const nuevaPelicula = {
            id: randomUUID(),
            title,
            year,
            direction,
            duration,
            poster,
            genre,
            rate
        }

        peliculas.push(nuevaPelicula);
        res.status(201).json({
            message: "pelicula creada correctamente",
            nuevaPelicula
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }

}

export const ctrlActualizarPelicula = (req, res) => {
    // CAPTURAMOS EL ID QUE SE RECIBE POR PARAMETRO DE LA RUTA
    const { id } = req.params;
    // CAPTURAMOS EL YEAR QUE SE RECIBE POR BODY O CUERPO DE LA PETICION POST
    const { year } = req.body;
    try {
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
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

export const ctrlEliminarPelicula = (req, res) => {
    // CAPTURAMOS EL ID QUE SE RECIBE POR PARAMETRO DE LA RUTA
    const { id } = req.params;

    try {
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
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

