fetch('http://localhost:3000/peliculas')
    .then(res => res.json())
    .then(data => console.log(data))


