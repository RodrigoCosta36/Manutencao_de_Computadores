document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navList = document.querySelector('.nav-list');
    const navItems = document.querySelectorAll('.nav-list li');
    const images = document.querySelectorAll('.image-effect');

    menuIcon.addEventListener('click', function () {
        navList.classList.toggle('show');
    });

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navList.classList.remove('show');
        });
    });

    function checkVisibility() {
        images.forEach(image => {
            const rect = image.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            if (isVisible && !image.classList.contains('show')) {
                image.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    document.addEventListener('DOMContentLoaded', checkVisibility);
    checkVisibility();
});

function enviarFormulario(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString,
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'success') {
            // Exibe mensagem de confirmação
            alert('Mensagem enviada com sucesso!');
            
            // Redireciona para a Home após 3 segundos
            setTimeout(() => {
                form.style.display = 'none';
                document.getElementById('confirmation-message').style.display = 'block';
                window.location.href = '/index.html'; // Redireciona para a Home
            }, 3000);
        }
    })
    .catch(error => console.error('Erro:', error));
}

document.getElementById('contact-form').addEventListener('submit', enviarFormulario);
