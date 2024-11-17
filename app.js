
const express = require('express');
const path = require('path'); //proporciona utilidades para trabajar con rutas de archivos y directorios
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const peliculascontrollers = require('./controllers/peliculascontrollers');

const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Middleware para archivos estáticos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Rutas   importa el controlador y configura las rutas para cada operación (CRUD y votación).
app.get('/pelicula', peliculascontrollers.index);
app.post('/pelicula', peliculascontrollers.create);
app.post('/pelicula/:id/vote', peliculascontrollers.vote);
app.put('/pelicula/:id', peliculascontrollers.update);
app.delete('/pelicula/:id', peliculascontrollers.delete);

// Configuración del puerto y escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//Este archivo configura el servidor Express, define el motor de plantillas, y configura las rutas y el middleware.

const db = require('./config');

db.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a PostgreSQL:', err);
        process.exit(1);
    } else {
        console.log('Conexión a PostgreSQL exitosa');
        release();
    }
});

// probar la conexión al iniciar el servidor: