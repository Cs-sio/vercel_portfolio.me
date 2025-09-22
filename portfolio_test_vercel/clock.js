function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = now.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('clock').innerHTML = `
        <div>${date}</div>
        <div>${hours}:${minutes}:${seconds}</div>
    `;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000); 