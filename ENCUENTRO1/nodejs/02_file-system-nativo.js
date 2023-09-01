const fs = require('node:fs');

// hacer tarea sincronica 
// const info = fs.statSync('./archivo.txt');

// console.log(info.isDirectory());
// console.log(info.isFile());
// console.log(info.size)


//PETICIONES BLOQUEANTES - SINCRONO
// console.log('leyendo el primer archivo');
// const contenido = fs.readFileSync('./archivo.txt', 'utf-8');
// console.log(contenido)

// console.log('-----> QUIERO HACER MAS TAREAS')


// console.log('leyendo el segundo archivo');
// const contenido2 = fs.readFileSync('./archivo2.txt', 'utf-8');
// console.log(contenido2)

//PETICIONES NO BLOQUEANTES - ASINCRONO
console.log('leyendo el primer archivo');
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
    console.log(text)
});

console.log('-----> ESTOY HACIENDO TAREAS')


console.log('leyendo el segundo archivo');
fs.readFile('./archivo2.txt', 'utf-8', (err, contenido) => {
    console.log(contenido)
});




