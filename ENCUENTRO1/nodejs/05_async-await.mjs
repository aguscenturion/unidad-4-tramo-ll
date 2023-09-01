//ES MODULE - TOP LEVEL AWAIT SOLO TIENE SOPORTE DE UTILIZARLO EN EL CUERPO DEL ARCHIVO
import fs from 'node:fs/promises';

//TOP LEVEL AWAIT
//SIGUE FUNCIONANDO DE MANERA ASYNCRONA SECUENCIAL
console.log('leyendo el primer archivo');
const text1 = await fs.readFile('./archivo.txt', 'utf-8');
console.log(text1)
    
console.log('leyendo el segundo archivo');
const text2 = await fs.readFile('./archivo2.txt', 'utf-8');
console.log(text2)
