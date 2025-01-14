const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
app.use(bodyParser.json());

// Ruta del archivo CSV
const filePath = 'registros.csv';

// Crear el escritor de CSV con encabezados
const csvWriter = createCsvWriter({
    path: filePath,
    header: [
        { id: 'fechaPartida', title: 'Fecha de Partida' },
        { id: 'fechaRetorno', title: 'Fecha de Retorno' },
        { id: 'asistentes', title: 'Asistentes' },
        { id: 'departamento', title: 'Departamento' },
        { id: 'provincia', title: 'Provincia' },
        { id: 'temas', title: 'Temas Tratados' },
    ],
});

// Asegurarse de que el archivo CSV tenga encabezados
if (!fs.existsSync(filePath)) {
    csvWriter.writeRecords([]);
}

// Ruta para recibir datos del formulario
app.post('/guardar-registro', async (req, res) => {
    console.log('Datos recibidos:', req.body); // <-- Depuración
    const nuevoRegistro = req.body;

    try {
        await csvWriter.writeRecords([nuevoRegistro]);
        res.status(200).send({ mensaje: 'Registro guardado exitosamente.' });
    } catch (error) {
        console.error('Error al guardar registro:', error);
        res.status(500).send({ mensaje: 'Error al guardar el registro.' });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// agrega este middleware al servidor
const cors = require('cors');
app.use(cors());