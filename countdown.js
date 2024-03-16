// Fecha del evento (año, mes (0 indexado), día, hora, minuto, segundo)
var eventDate = new Date('2024-06-08T00:00:00');

// Función para actualizar el contador regresivo
function updateCountdown() {
    var currentDate = new Date();
    var difference = eventDate - currentDate;

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = formatTime(days);
    document.getElementById('hours').innerText = formatTime(hours);
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
}

// Agregar ceros a la izquierda si el número es menor que 10
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);

// Llamar a la función por primera vez para evitar un retraso inicial
updateCountdown();
