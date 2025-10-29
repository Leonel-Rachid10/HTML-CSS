document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // 1. Dark Mode Toggle
    // ===============================================
    const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
    const body = document.body;

    // Carregar preferência do utilizador ou do sistema
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        // Atualizar ícone da lua/sol conforme o tema carregado
        updateDarkModeIcon(currentTheme === 'dark-theme');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Se não houver preferência guardada, usar a do sistema
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateDarkModeIcon(true);
    } else {
        updateDarkModeIcon(false); // Tema claro por padrão
    }

    toggleDarkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark-theme');
            updateDarkModeIcon(true);
        } else {
            localStorage.setItem('theme', 'light-theme');
            updateDarkModeIcon(false);
        }
    });

    // Função para atualizar o ícone da lua/sol
    function updateDarkModeIcon(isDarkMode) {
        if (toggleDarkModeBtn) {
            if (isDarkMode) {
                toggleDarkModeBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para modo escuro
            } else {
                toggleDarkModeBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para modo claro
            }
        }
    }

    // ===============================================
    // 2. Botão Voltar ao Topo
    // ===============================================
    const btnVoltarTopo = document.getElementById('btnVoltarTopo');

    // Mostra ou esconde o botão ao rolar a página
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Mostra o botão após 300px de rolagem
            btnVoltarTopo.classList.remove('hidden');
            btnVoltarTopo.style.display = 'block'; // Garante que seja visível
        } else {
            btnVoltarTopo.classList.add('hidden');
            btnVoltarTopo.style.display = 'none'; // Esconde o botão
        }
    });

    // Rola suavemente para o topo ao clicar no botão
    btnVoltarTopo.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o comportamento padrão do link
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ===============================================
    // 3. Typewriter Effect
    // ===============================================
    const typewriterTextElement = document.getElementById('typewriter-text');
    if (typewriterTextElement) {
        const textToType = "e Conhecereis a Verdade, e a Verdade Vos Libertara! . Nasci Para Prosperar , Eu Sou Oposto de Falençia.";
        let i = 0;
        let isDeleting = false;
        let charIndex = 0;
        let typingSpeed = 100; // Velocidade de digitação (ms)
        let deletingSpeed = 50; // Velocidade de apagamento (ms)
        let delayBetweenSentences = 1500; // Pausa antes de apagar/redigitar (ms)

        function type() {
            const currentText = textToType.substring(0, charIndex);
            typewriterTextElement.textContent = currentText;

            if (!isDeleting && charIndex < textToType.length) {
                charIndex++;
                typingSpeed = 100; // Velocidade normal de digitação
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                typingSpeed = 50; // Velocidade normal de apagamento
            } else if (!isDeleting && charIndex === textToType.length) {
                isDeleting = true;
                typingSpeed = delayBetweenSentences; // Pausa antes de apagar
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                typingSpeed = 500; // Pausa antes de digitar novamente
            }

            setTimeout(type, typingSpeed);
        }

    
        type();
    }


    
    window.toggleDetails = function(event, id) {
        event.preventDefault(); 
        const detalhes = document.getElementById(id);
        const button = event.target;

        if (detalhes) {
            detalhes.classList.toggle('hidden');
            if (detalhes.classList.contains('hidden')) {
                button.textContent = 'Mostrar Detalhes';
            } else {
                button.textContent = 'Esconder Detalhes';
            }
        }
    };

    const lightboxOverlay = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galeriaImagens = document.querySelectorAll('.galeria-fotos .foto-item img');

   
    galeriaImagens.forEach(image => {
        image.addEventListener('click', () => {
            lightboxOverlay.classList.add('active'); 
            lightboxContent.src = image.src; 
            lightboxContent.alt = image.alt; 
        });
    });

    
    lightboxClose.addEventListener('click', () => {
        lightboxOverlay.classList.remove('active');
    });

    
    lightboxOverlay.addEventListener('click', (e) => {
    
        if (e.target === lightboxOverlay) { 
            lightboxOverlay.classList.remove('active');
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            lightboxOverlay.classList.remove('active');
        }
    });

}); 