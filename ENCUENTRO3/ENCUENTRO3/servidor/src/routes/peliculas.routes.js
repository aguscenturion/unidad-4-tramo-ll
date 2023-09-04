import { Router } from "express";
import { ctrlActualizarPelicula, ctrlCrearPelicula, ctrlEliminarPelicula, ctrlTraerPelicula, ctrlTraerPeliculas } from "../controllers/peliculas.controllers.js";
import { crearPeliculaSchema } from "../schema/pelicula.schema.js";
import { validacion } from "../middlewares/validacion.js";

// const peliculas = JSON.parse(readFileSync('../../peliculas.json', 'utf-8'))

const peliculasRouter = Router();

// ruta(endpoint) para traer todas las peliculas
peliculasRouter.get('/', ctrlTraerPeliculas)

// ruta(endpoint) para traer una pelicula por id
peliculasRouter.get('/:id', ctrlTraerPelicula)

// ruta(endpoint) para crear una pelicula
peliculasRouter.post('/', crearPeliculaSchema, validacion, ctrlCrearPelicula)

// ruta(endpoint) para actualizar una pelicula por id
peliculasRouter.put('/:id', ctrlActualizarPelicula)

// ruta(endpoint) para eliminar una pelicula por id
peliculasRouter.delete('/:id', ctrlEliminarPelicula)

export { peliculasRouter }
