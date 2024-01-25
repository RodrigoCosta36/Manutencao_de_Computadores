// Configuração de eventos após o carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o ícone do menu e a lista de navegação
    const menuIcon = document.querySelector('.menu-icon');
    const navList = document.querySelector('.nav-list');

    // Adiciona evento de clique ao ícone de "hambúrguer"
    menuIcon.addEventListener('click', function () {
        // Toggle class 'show' para exibir ou ocultar a lista de navegação
        navList.classList.toggle('show');
    });

    // Seleciona todos os itens da lista de navegação
    const navItems = document.querySelectorAll('.nav-list li');

    // Adiciona eventos de clique aos itens da lista de navegação
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Oculta a lista de navegação após o clique em um item
            navList.classList.remove('show');
        });
    });

    // Seleciona todas as imagens com efeito
    const images = document.querySelectorAll('.image-effect');

    /**
     * Função para verificar a visibilidade das imagens durante o scroll.
     */
    function checkVisibility() {
        images.forEach(image => {
            const rect = image.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            if (isVisible && !image.classList.contains('show')) {
                image.classList.add('show');
            }
        });
    }

    // Adiciona eventos de rolagem e redimensionamento para verificar a visibilidade das imagens
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Chama a função de verificação ao carregar a página
    document.addEventListener('DOMContentLoaded', checkVisibility);
    checkVisibility();
});

// script.js

/**
 * Função para enviar o formulário de contato.
 * @param {Event} event - Objeto de evento do formulário.
 */
function enviarFormulario(event) {
    // Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    // Seleciona o formulário e obtém os dados
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    // Constrói a string de consulta a partir do objeto FormData
    const queryString = new URLSearchParams(formData).toString();

    // Envia os dados para o servidor usando Fetch API
    fetch('https://rodrigocosta36.netlify.app//enviarforms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString,
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
