// Usuarios válidos
const validUsers = [
    { username: "persona1", password: "clave1" },
    { username: "persona2", password: "clave2" },
    { username: "persona3", password: "clave3" },
    { username: "persona4", password: "clave4" },
    { username: "persona5", password: "clave5" }
];

// Referencias a elementos del DOM
const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Manejo del evento de login
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación de credenciales
    const user = validUsers.find(u => u.username === username && u.password === password);
    if (user) {
        // Redirigir al menú principal
        window.location.href = "menu.html";
    } else {
        // Mostrar mensaje de error
        errorMessage.classList.remove('hidden');
    }
});