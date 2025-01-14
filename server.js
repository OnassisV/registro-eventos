const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Sirve archivos estáticos (como HTML)

// Ruta para guardar datos en un archivo JSON
app.post('/guardar-registro', (req, res) => {
    const nuevoRegistro = req.body;

    // Leer el archivo existente o inicializar con un array vacío
    let registros = [];
    const archivo = 'registros.json';

    if (fs.existsSync(archivo)) {
        registros = JSON.parse(fs.readFileSync(archivo, 'utf-8'));
    }

    // Agregar el nuevo registro y guardar en el archivo
    registros.push(nuevoRegistro);
    fs.writeFileSync(archivo, JSON.stringify(registros, null, 2));

    res.status(200).send({ mensaje: 'Registro guardado exitosamente.' });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});