import express from 'express';
import cors from 'cors'

import { peliculasRouter } from './src/routes/peliculas.routes.js';

const app = express()

const port = 3000;

//middlewares
app.use(express.json());
app.use(cors())


app.use('/peliculas', peliculasRouter)

app.use((req, res) => {
    res.status(404).send('Error 404')
})

app.listen(port, () => {
    console.log(`server escuchando en el puerto http://localhost:${port}`)
})
