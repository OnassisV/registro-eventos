// Referencias al DOM
const form = document.getElementById('event-form');
const successMessage = document.getElementById('success-message');
const departamentoSelect = document.getElementById('departamento');
const provinciaSelect = document.getElementById('provincia');

// Datos para provincias por departamento
const provinciasPorDepartamento = {
    "Departamento 1": ["Provincia 1A", "Provincia 1B", "Provincia 1C"],
    "Departamento 2": ["Provincia 2A", "Provincia 2B", "Provincia 2C"]
};

// Manejo del cambio en el departamento
departamentoSelect.addEventListener('change', () => {
    const departamentoSeleccionado = departamentoSelect.value;
    provinciaSelect.innerHTML = '<option value="">Seleccione...</option>'; // Resetear opciones

    if (provinciasPorDepartamento[departamentoSeleccionado]) {
        provinciasPorDepartamento[departamentoSeleccionado].forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia;
            option.textContent = provincia;
            provinciaSelect.appendChild(option);
        });
    }
});

// Manejo del evento de formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío estándar del formulario

    // Recopilar datos del formulario
    const fechaPartida = document.getElementById('fecha-partida').value;
    const fechaRetorno = document.getElementById('fecha-retorno').value;
    const asistentes = Array.from(
        document.querySelectorAll('#asistentes-container input:checked')
    ).map(input => input.value);
    const departamento = departamentoSelect.value;
    const provincia = provinciaSelect.value;
    const temas = document.getElementById('temas').value;

    // Crear un objeto con los datos
    const evento = {
        fechaPartida,
        fechaRetorno,
        asistentes,
        departamento,
        provincia,
        temas
    };

    // Guardar los datos (en localStorage por ahora)
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(evento);
    localStorage.setItem('registros', JSON.stringify(registros));

    // Mostrar mensaje de éxito
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        successMessage.classList.add('hidden');
        form.reset(); // Reiniciar el formulario
        provinciaSelect.innerHTML = '<option value="">Seleccione...</option>'; // Resetear provincias
    }, 3000);
});