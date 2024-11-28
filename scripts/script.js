const container = document.getElementById('container');
const registrarBtn = document.getElementById('registrar');
const loginBtn = document.getElementById('login');

registrarBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

