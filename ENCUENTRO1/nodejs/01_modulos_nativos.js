const os = require('node:os');

console.log('Informacion del sistema operativo');

console.log('nombre del sistema operativo:', os.platform());
console.log('version:', os.release());
console.log('arquitectura:', os.arch())
