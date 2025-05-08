document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validación simple (en un caso real, esto sería una llamada a un servidor)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'inventario.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
