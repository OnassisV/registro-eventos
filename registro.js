// Referencias al DOM
const form = document.getElementById('event-form');
const successMessage = document.getElementById('success-message');
const departamentoSelect = document.getElementById('departamento');
const provinciaSelect = document.getElementById('provincia');

// Datos de departamentos y provincias
const provinciasPorDepartamento = {
    "Amazonas": ["Chachapoyas", "Bagua", "Bongará", "Condorcanqui", "Luya", "Rodríguez de Mendoza", "Utcubamba"],
    "Áncash": ["Huaraz", "Aija", "Antonio Raimondi", "Asunción", "Bolognesi", "Carhuaz", "Carlos Fermín Fitzcarrald", "Casma", "Corongo", "Huari", "Huarmey", "Huaylas", "Mariscal Luzuriaga", "Ocros", "Pallasca", "Pomabamba", "Recuay", "Santa", "Sihuas", "Yungay"],
    "Apurímac": ["Abancay", "Andahuaylas", "Antabamba", "Aymaraes", "Cotabambas", "Chincheros", "Grau"],
    "Arequipa": ["Arequipa", "Camana", "Caraveli", "Castilla", "Caylloma", "Condesuyos", "Islay", "La Unión"],
    "Ayacucho": ["Huamanga", "Cangallo", "Huanca Sancos", "Huanta", "La Mar", "Lucanas", "Parinacochas", "Páucar del Sara Sara", "Sucre", "Víctor Fajardo", "Vilcas Huamán"],
    "Cajamarca": ["Cajamarca", "Cajabamba", "Celendín", "Chota", "Contumazá", "Cutervo", "Hualgayoc", "Jaén", "San Ignacio", "San Marcos", "San Miguel", "San Pablo", "Santa Cruz"],
    "Callao": ["Callao"],
    "Cusco": ["Cusco", "Acomayo", "Anta", "Calca", "Canas", "Canchis", "Chumbivilcas", "Espinar", "La Convención", "Paruro", "Paucartambo", "Quispicanchi", "Urubamba"],
    "Huancavelica": ["Huancavelica", "Acobamba", "Angaraes", "Castrovirreyna", "Churcampa", "Huaytará", "Tayacaja"],
    "Huánuco": ["Huánuco", "Ambo", "Dos de Mayo", "Huacaybamba", "Huamalíes", "Leoncio Prado", "Marañón", "Pachitea", "Puerto Inca", "Lauricocha", "Yarowilca"],
    "Ica": ["Ica", "Chincha", "Nazca", "Palpa", "Pisco"],
    "Junín": ["Huancayo", "Chanchamayo", "Chupaca", "Concepción", "Jauja", "Junín", "Satipo", "Tarma", "Yauli"],
    "La Libertad": ["Trujillo", "Ascope", "Bolívar", "Chepén", "Gran Chimú", "Julcán", "Otuzco", "Pacasmayo", "Pataz", "Sánchez Carrión", "Santiago de Chuco", "Virú"],
    "Lambayeque": ["Chiclayo", "Ferreñafe", "Lambayeque"],
    "Lima": ["Lima", "Barranca", "Cajatambo", "Cañete", "Canta", "Huaral", "Huarochirí", "Huaura", "Oyón", "Yauyos"],
    "Loreto": ["Maynas", "Alto Amazonas", "Datem del Marañón", "Loreto", "Mariscal Ramón Castilla", "Putumayo", "Requena", "Ucayali"],
    "Madre de Dios": ["Tambopata", "Manu", "Tahuamanu"],
    "Moquegua": ["Mariscal Nieto", "General Sánchez Cerro", "Ilo"],
    "Pasco": ["Pasco", "Daniel Alcides Carrión", "Oxapampa"],
    "Piura": ["Piura", "Ayabaca", "Huancabamba", "Morropón", "Paita", "Sechura", "Sullana", "Talara"],
    "Puno": ["Puno", "Azángaro", "Carabaya", "Chucuito", "El Collao", "Huancané", "Lampa", "Melgar", "Moho", "San Antonio de Putina", "San Román", "Sandia", "Yunguyo"],
    "San Martín": ["Moyobamba", "Bellavista", "El Dorado", "Huallaga", "Lamas", "Mariscal Cáceres", "Picota", "Rioja", "San Martín", "Tocache"],
    "Tacna": ["Tacna", "Candarave", "Jorge Basadre", "Tarata"],
    "Tumbes": ["Tumbes", "Contralmirante Villar", "Zarumilla"],
    "Ucayali": ["Coronel Portillo", "Atalaya", "Padre Abad", "Purús"]
};

// Actualización dinámica de provincias
departamentoSelect.addEventListener('change', () => {
    const departamentoSeleccionado = departamentoSelect.value;
    provinciaSelect.innerHTML = '<option value="">Seleccione...</option>';
    if (provinciasPorDepartamento[departamentoSeleccionado]) {
        provinciasPorDepartamento[departamentoSeleccionado].forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia;
            option.textContent = provincia;
            provinciaSelect.appendChild(option);
        });
    }
});

// Enviar datos al backend
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const fechaPartida = document.getElementById('fecha-partida').value;
    const fechaRetorno = document.getElementById('fecha-retorno').value;
    const responsable = document.getElementById('responsable').value;
    const nombreActividad = document.getElementById('nombre-actividad').value;
    const asistentes = Array.from(document.querySelectorAll('#asistentes-container input:checked')).map(input => input.value).join(', ');
    const departamento = departamentoSelect.value;
    const provincia = provinciaSelect.value;
    const salidaRegiones = document.getElementById('salida-regiones').value;
    const temas = document.getElementById('temas').value;

    const evento = {
        FECHA_DE_PARTIDA: fechaPartida,
        FECHA_DE_RETORNO: fechaRetorno,
        RESPONSABLE: responsable,
        NOMBRE_DE_LA_ACTIVIDAD: nombreActividad,
        ASISTENTES: asistentes,
        DEPARTAMENTO: departamento,
        PROVINCIA: provincia,
        SALIDA_A_REGIONES: salidaRegiones,
        TEMAS_TRATADOS: temas,
    };

    try {
        const response = await fetch('http://localhost:3000/guardar-registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(evento),
        });

        if (response.ok) {
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
                form.reset();
                provinciaSelect.innerHTML = '<option value="">Seleccione...</option>';
            }, 3000);
        } else {
            console.error('Error al guardar los datos:', await response.text());
        }
    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
    }
});