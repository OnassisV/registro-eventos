// Referencias al DOM
const form = document.getElementById('event-form');
const successMessage = document.getElementById('success-message');

// Manejo del evento de formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío estándar del formulario

    // Recopilar datos del formulario
    const fechaPartida = document.getElementById('fecha-partida').value;
    const fechaRetorno = document.getElementById('fecha-retorno').value;
    const asistentes = Array.from(
        document.querySelectorAll('#asistentes-container input:checked')
    ).map(input => input.value);
    const departamento = document.getElementById('departamento').value;
    const provincia = document.getElementById('provincia').value;
    const distrito = document.getElementById('distrito').value;
    const temas = document.getElementById('temas').value;

    // Crear un objeto con los datos
    const evento = {
        fechaPartida,
        fechaRetorno,
        asistentes,
        departamento,
        provincia,
        distrito,
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
    }, 3000);
});