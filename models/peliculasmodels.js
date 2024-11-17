const pool = require('../config');

class PeliculasModels {
    static async getAll() {
        const query = 'SELECT * FROM pelicula ORDER BY votos DESC';
        const result = await pool.query(query);
        return result.rows;
    }

    static async create(pelicula, enlace) {
        const query = 'INSERT INTO pelicula (pelicula, enlace, votos) VALUES ($1, $2, 0) RETURNING *';
        const values = [pelicula, enlace];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async update(id_pelicula, pelicula, enlace) {
        const query = 'UPDATE pelicula SET pelicula = $1, enlace = $2 WHERE id_pelicula = $3 RETURNING *';
        const values = [pelicula, enlace, id_pelicula];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async delete(id_pelicula) {
        const query = 'DELETE FROM pelicula WHERE id_pelicula = $1 RETURNING *';
        const values = [id_pelicula];
        const result = await pool.query(query, values);
        return result.rowCount > 0;
    }

    static async vote(id_pelicula) {
        const query = 'UPDATE pelicula SET votos = votos + 1 WHERE id_pelicula = $1 RETURNING *';
        const values = [id_pelicula];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

}

module.exports = PeliculasModels;


// contiene las funciones necesarias para realizar operaciones CRUD y gestionar los votos en la tabla 
//El modelo se encarga de interactuar con la base de datos.