const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();

// Configuración de CORS
app.use(cors());
app.use(bodyParser.json());

// Ruta del archivo CSV
const filePath = 'registros.csv';

// Configuración para anexar registros
const csvWriter = createCsvWriter({
    path: filePath,
    append: fs.existsSync(filePath),
    header: [
        { id: 'FECHA_DE_PARTIDA', title: 'FECHA DE PARTIDA' },
        { id: 'FECHA_DE_RETORNO', title: 'FECHA DE RETORNO' },
        { id: 'RESPONSABLE', title: 'RESPONSABLE' },
        { id: 'NOMBRE_DE_LA_ACTIVIDAD', title: 'NOMBRE DE LA ACTIVIDAD' },
        { id: 'ASISTENTES', title: 'ASISTENTES' },
        { id: 'DEPARTAMENTO', title: 'DEPARTAMENTO' },
        { id: 'PROVINCIA', title: 'PROVINCIA' },
        { id: 'SALIDA_A_REGIONES', title: 'SALIDA A REGIONES' },
        { id: 'TEMAS_TRATADOS', title: 'TEMAS TRATADOS' },
    ],
});

// Guardar registro en el CSV
app.post('/guardar-registro', async (req, res) => {
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
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});