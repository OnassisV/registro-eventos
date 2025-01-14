// Referencias al DOM
const form = document.getElementById('event-form');
const successMessage = document.getElementById('success-message');
const departamentoSelect = document.getElementById('departamento');
const provinciaSelect = document.getElementById('provincia');

// Datos de departamentos y provincias
const provinciasPorDepartamento = {
    "Amazonas": ["Chachapoyas", "Bagua", "Bongará", "Condorcanqui", "Luya", "Rodríguez de Mendoza", "Utcubamba"],
    "Áncash": ["Huaraz", "Aija", "Antonio Raimondi", "Asunción", "Bolognesi"],
    "Apurímac": ["Abancay", "Andahuaylas", "Antabamba", "Aymaraes", "Cotabambas"],
    "Arequipa": ["Arequipa", "Camana", "Caraveli", "Castilla", "Caylloma"],
    "Ayacucho": ["Huamanga", "Cangallo", "Huanca Sancos", "Huanta", "La Mar"],
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
        const response = await fetch('/guardar-registro', {
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