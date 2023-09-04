import { body } from 'express-validator';

const generos = ['Action', 'Crime', 'Drama', 'Adventure', 'Sci-Fi']

export const crearPeliculaSchema = [
    body('title')
        .isString().withMessage('El campo title debe ser string')
        .notEmpty().withMessage('El campo title no debe ser vacio'),
    body('year')
        .isNumeric().withMessage('El campo year debe ser numerico')
        .notEmpty().withMessage('El campo year no debe ser vacio')
        .isInt({ min: 1900, max: 2023 }).withMessage('El campo year debe ser un numero entre 1900 y 2023'),
    body('director')
        .isString().withMessage('El campo director debe ser string')
        .notEmpty().withMessage('El campo director no debe ser vacio'),
    body('duration')
        .notEmpty().withMessage('El campo duration no debe ser vacio')
        .trim()
        .isLength({ max: 3 }).withMessage('El campo duration no puede tener mas de 3 digitos')
        .isInt({ min: 40, max: 240 }).withMessage('El campo duration debe ser un numero entre 60 y 240'),
    body('poster')
        .notEmpty().withMessage('El campo poster no debe ser vacio')
        .isURL().withMessage('El campo poster no debe ser vacio'),
    body('genre')
        .notEmpty().withMessage('El campo genre no debe ser vacio')
        .isArray().withMessage('El campo genre debe ser un arreglo')
        .custom(values => {
            for (const value of values) {
                if (!generos.includes(value)) {
                    throw new Error(`el genero '${value}' no pertenece`)
                }
                return true;
            }
        }),
    body('rate')
        .notEmpty().withMessage('El campo rate no debe ser vacio')
        .isInt({ min: 0, max: 10 }).withMessage('El campo rate debe ser un numero entre 0 y 10')
]


