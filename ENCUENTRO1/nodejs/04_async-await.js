const fs = require('node:fs/promises');


//TRABAJAMOS CON ASYNC AWAIT - ASINCRONICA SECUENCIAL

// const probando = async () => {
//     console.log('leyendo el primer archivo');
//     const text1 = await fs.readFile('./archivo.txt', 'utf-8');
//     console.log(text1)

//     console.log('leyendo el segundo archivo');
//     const text2 = await fs.readFile('./archivo2.txt', 'utf-8');
//     console.log(text2)
// }

// console.log('iniciar tarea')
// probando()
// console.log('finalizar tarea')

//FUNCION AUTO INVOCADA
console.log('primer tarea iniciada');

// no olvidarse de colocar el punto y coma al principio
// ;(
//     async () => {
//         console.log('leyendo el primer archivo');
//         const text1 = await fs.readFile('./archivo.txt', 'utf-8');
//         console.log(text1)
    
//         console.log('leyendo el segundo archivo');
//         const text2 = await fs.readFile('./archivo2.txt', 'utf-8');
//         console.log(text2)
//     }
// )()
// console.log('tarea ultima')
