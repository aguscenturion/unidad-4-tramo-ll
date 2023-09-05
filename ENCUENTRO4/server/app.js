import express from 'express';
import { taskRouter } from './src/routes/task.routes.js';
import { startDb } from './src/config/database.js';
import cors from 'cors'

const app = express();

//middlewares
app.use(express.json())
app.use(cors())

const port = 3000

app.use('/', taskRouter)

app.listen(port, () => {
    console.log(`server listening http://localhost:${port}`)
    startDb()
})