document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navContainer = document.getElementById('nav-container');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav_item');

    // Função para fechar o menu
    function fecharMenu() {
        if (menuToggle && navContainer) {
            menuToggle.classList.remove('ativo');
            navContainer.classList.remove('ativo');
        }
    }

    // Abre/fecha ao clicar no botão hamburguer
    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('ativo');
            navContainer.classList.toggle('ativo');
        });
    }

    // Fecha ao clicar no botão "X"
    if (navClose) {
        navClose.addEventListener('click', fecharMenu);
    }

    // Fecha o menu automaticamente ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    // Fecha o menu se clicar fora dele
    window.addEventListener('click', (e) => {
        if (navContainer && navContainer.classList.contains('ativo')) {
            if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                fecharMenu();
            }
        }
    });
});