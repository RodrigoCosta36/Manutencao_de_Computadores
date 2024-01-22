document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navList = document.querySelector('.nav-list');

    // Adiciona evento de clique ao ícone de "hambúrguer"
    menuIcon.addEventListener('click', function() {
        // Toggle class 'show' para exibir ou ocultar a lista de navegação
        navList.classList.toggle('show');
    });

    const navItems = document.querySelectorAll('.nav-list li');

    // Adiciona eventos de clique aos itens da lista de navegação
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Oculta a lista de navegação após o clique em um item
            navList.classList.remove('show');
        });
    });

    const images = document.querySelectorAll('.image-effect');

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

    // Chama a função de verificação ao carregar a página
    checkVisibility();
});


// script.js

function enviarFormulario(event) {
    // Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    const form = document.getElementById('contact-form');

    // Obtém os dados do formulário
    const formData = new FormData(form);

    // Envia os dados para o servidor usando Fetch API
    fetch('/processar-formulario', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Exibe a mensagem de confirmação se o envio for bem-sucedido
        if (data === 'success') {
            form.style.display = 'none';
            document.getElementById('confirmation-message').style.display = 'block';
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Adiciona um ouvinte de evento para o envio do formulário
document.getElementById('contact-form').addEventListener('submit', enviarFormulario);
