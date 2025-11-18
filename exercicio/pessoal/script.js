// A função `toggleDetails` é crucial para os botões "Mostrar Detalhes"
// e deve ser definida fora do DOMContentLoaded para ser acessível através do 'onclick' no HTML.
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


document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // 1. Dark Mode Toggle
    // ===============================================
    const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
    const body = document.body;

    // Função para atualizar o ícone da lua/sol
    function updateDarkModeIcon(isDarkMode) {
        if (toggleDarkModeBtn) {
            // Se estiver no modo escuro, mostra o sol para convidar à mudança para o modo claro
            if (isDarkMode) { 
                toggleDarkModeBtn.innerHTML = '<i class="fas fa-sun"></i>'; 
            } else {
                // Se estiver no modo claro, mostra a lua para convidar à mudança para o modo escuro
                toggleDarkModeBtn.innerHTML = '<i class="fas fa-moon"></i>'; 
            }
        }
    }

    // Carregar e aplicar o tema (preferência do utilizador ou do sistema)
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateDarkModeIcon(currentTheme === 'dark-theme');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Usa a preferência do sistema se não houver tema guardado
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateDarkModeIcon(true);
    } else {
        updateDarkModeIcon(false);
    }

    // Evento de clique
    if (toggleDarkModeBtn) {
        toggleDarkModeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDarkMode = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkMode ? 'dark-theme' : 'light-theme');
            updateDarkModeIcon(isDarkMode);
        });
    }

    // ===============================================
    // 2. Botão Voltar ao Topo
    // ===============================================
    const btnVoltarTopo = document.getElementById('btnVoltarTopo');

    if (btnVoltarTopo) {
        // Mostra/Esconde o botão
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { 
                btnVoltarTopo.classList.remove('hidden');
                btnVoltarTopo.style.display = 'flex'; 
            } else {
                btnVoltarTopo.classList.add('hidden');
                btnVoltarTopo.style.display = 'none';
            }
        });

        // Rolagem suave
        btnVoltarTopo.addEventListener('click', (e) => {
            e.preventDefault(); 
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ===============================================
    // 3. Typewriter Effect (Modo Loop: Digitar/Apagar)
    // ===============================================
    const typewriterTextElement = document.getElementById('typewriter-text');
    if (typewriterTextElement) {
        // Frase que você definiu:
        const textToType = "e Conhecereis a Verdade, e a Verdade Vos Libertara! . Nasci Para Prosperar , Eu Sou Oposto de Falençia.";
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; 
        const delayBetweenSentences = 1500; 

        function type() {
            const currentText = textToType.substring(0, charIndex);
            typewriterTextElement.textContent = currentText;

            if (!isDeleting && charIndex < textToType.length) {
                // Digitando
                charIndex++;
                typingSpeed = 100; 
            } else if (isDeleting && charIndex > 0) {
                // Apagando
                charIndex--;
                typingSpeed = 50; 
            } else if (!isDeleting && charIndex === textToType.length) {
                // Pausa antes de começar a apagar
                isDeleting = true;
                typingSpeed = delayBetweenSentences; 
            } else if (isDeleting && charIndex === 0) {
                // Pausa antes de começar a redigitar
                isDeleting = false;
                typingSpeed = 500; 
            }

            // Garante que a próxima chamada à função é feita, criando o loop
            setTimeout(type, typingSpeed);
        }

        // Inicia o efeito
        type();
    }


    // ===============================================
    // 4. Lightbox de Imagens (Funcional)
    // ===============================================
    const lightboxOverlay = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galeriaImagens = document.querySelectorAll('.galeria-fotos .foto-item img');

    if (lightboxOverlay && lightboxContent && galeriaImagens.length > 0) {
        
        // Abre o lightbox
        galeriaImagens.forEach(image => {
            image.addEventListener('click', () => {
                lightboxOverlay.classList.remove('hidden'); // Remove a classe que esconde o lightbox
                lightboxOverlay.classList.add('active'); // Adiciona a classe para mostrá-lo (com CSS transition)
                lightboxContent.src = image.src; 
                lightboxContent.alt = image.alt; 
            });
        });

        // Fecha o lightbox ao clicar no 'x'
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxOverlay.classList.remove('active');
                // Opcional: Adicionar a classe 'hidden' de volta (se usada no CSS)
                // lightboxOverlay.classList.add('hidden');
            });
        }
       
        // Fecha o lightbox ao clicar fora da imagem
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) { 
                lightboxOverlay.classList.remove('active');
            }
        });

        // Fecha o lightbox ao pressionar a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
                lightboxOverlay.classList.remove('active');
            }
        });
    }

});