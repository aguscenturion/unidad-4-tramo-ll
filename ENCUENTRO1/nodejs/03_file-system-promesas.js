//TRABAJANDO CON PROMESAS DE MODULOS NATIVOS
// const fs = require('node:fs/promises')

// console.log('leyendo el primer archivo');
// fs.readFile('./archivo.txt', 'utf-8')
//     .then(text => console.log(text))

// console.log('-----> ESTOY HACIENDO TAREAS')


// console.log('leyendo el segundo archivo');
// fs.readFile('./archivo2.txt', 'utf-8')
//     .then(text => console.log(text))


const fs = require('node:fs')
const { promisify } = require('node:util')
const readFile = promisify(fs.readFile)

console.log('leyendo el primer archivo');
readFile('./archivo.txt', 'utf-8')
    .then(text => console.log(text))

console.log('-----> ESTOY HACIENDO TAREAS')


console.log('leyendo el segundo archivo');
readFile('./archivo2.txt', 'utf-8')
    .then(text => console.log(text))