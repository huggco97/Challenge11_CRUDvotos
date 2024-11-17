
const peliculasmodels = require('../models/peliculasmodels');

// Renderiza la vista principal con todas las películas
exports.index = async (req, res) => {
    const pelicula = await peliculasmodels.getAll();
    res.render('index', { pelicula });
};

// Agrega una nueva película
exports.create = async (req, res) => {
    const { pelicula, enlace } = req.body;
    await peliculasmodels.create(pelicula, enlace);
    res.redirect('/pelicula');
};

// Actualiza una película existente
exports.update = async (req, res) => {
    const { id } = req.params;
    const { pelicula, enlace } = req.body;
    await peliculasmodels.update(id, pelicula, enlace);
    res.redirect('/pelicula');
};

// Elimina una película
exports.delete = async (req, res) => {
    const { id } = req.params;
    await peliculasmodels.delete(id);
    res.redirect('/pelicula');
};

// Incrementa el voto de una película

exports.vote = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await peliculasmodels.vote(id);
        
        // Si el modelo no devuelve los votos actualizados.
        const votos = result.votos || result.rows[0].votos;
        
        res.json({
            success: true,
            votos: votos
        });
    } catch (error) {
        console.error('Error al votar:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar el voto'
        });
    }
};


// Este archivo usa el modelo peliculasmodels para interactuar con la base de datos.
//El controlador maneja la lógica  y coordina las operaciones entre el modelo y la vista. 
//Aquí se define la lógica para obtener la lista de películas y para manejar la votación.
