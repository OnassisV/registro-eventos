const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: 'https://onassisv.github.io', // Dominio permitido
    methods: ['GET', 'POST'],             // Métodos permitidos
    allowedHeaders: ['Content-Type'],     // Encabezados permitidos
};
app.use(cors(corsOptions));

// Configuración de middleware
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

// Ruta para guardar datos en un archivo CSV
app.post('/guardar-registro', async (req, res) => {
    const nuevoRegistro = req.body;

    try {
        // Verificar si el archivo ya existe
        const existeArchivo = fs.existsSync(filePath);

        // Crear un escritor de CSV dinámico (sin sobrescribir encabezados)
        const csvWriter = createCsvWriter({
            path: filePath,
            append: existeArchivo, // Añadir al archivo si ya existe
            header: [
                { id: 'fechaPartida', title: 'Fecha de Partida' },
                { id: 'fechaRetorno', title: 'Fecha de Retorno' },
                { id: 'asistentes', title: 'Asistentes' },
                { id: 'departamento', title: 'Departamento' },
                { id: 'provincia', title: 'Provincia' },
                { id: 'temas', title: 'Temas Tratados' },
            ],
        });

        // Agregar el nuevo registro al archivo CSV
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