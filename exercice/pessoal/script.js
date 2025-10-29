
const toggleButton = document.getElementById('toggleDarkMode');
const body = document.body;
const darkThemeKey = 'isDarkTheme'; 

function applyTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-theme');
        
        if (toggleButton) {
             toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        body.classList.remove('dark-theme');
        
        if (toggleButton) {
            toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}


function toggleDetails(event, elementId) {
    const detailsDiv = document.getElementById(elementId);
   
    const button = event.target; 

    detailsDiv.classList.toggle('hidden');

    if (detailsDiv.classList.contains('hidden')) {
        button.textContent = 'Mostrar Detalhes';
    } else {
        button.textContent = 'Esconder Detalhes';
    }
}


window.toggleDetails = toggleDetails; 


function typewriter(elementId, textArray, delay = 150) {
    const outputElement = document.getElementById(elementId);
    if (!outputElement) return;

    let textIndex = 0;
    let charIndex = 0;

    function type() {
        // Pega o texto atual
        const currentText = textArray[textIndex];
        
        // Adiciona a próxima letra
        if (charIndex < currentText.length) {
            outputElement.innerHTML += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(type, delay);
        } else {
            // Se terminou o texto, avança para o próximo (ou repete)
            setTimeout(erase, 2000); // Espera 2 segundos antes de apagar
        }
    }

    function erase() {
        const currentText = textArray[textIndex];

        // Apaga a última letra
        if (charIndex > 0) {
            outputElement.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, delay / 2); // Apaga mais rápido
        } else {
            // Se terminou de apagar, avança para o próximo texto
            textIndex = (textIndex + 1) % textArray.length; // Volta ao início se for o último
            setTimeout(type, 1000); // Espera 1 segundo e começa a escrever o próximo
        }
    }

    type(); // Inicia o efeito
}


// ===================================================
// EVENTOS PRINCIPAIS (CONSOLIDADO em um único DOMContentLoaded)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LÓGICA DO MODO ESCURO
    if (toggleButton) {
        const savedTheme = localStorage.getItem(darkThemeKey);
        // Verifica se há tema salvo ou se o sistema prefere dark (se não houver tema salvo)
        const isDark = savedTheme === 'true' || (savedTheme === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        applyTheme(isDark);

        toggleButton.addEventListener('click', () => {
            const isCurrentlyDark = body.classList.contains('dark-theme');
            
            applyTheme(!isCurrentlyDark);
            
            localStorage.setItem(darkThemeKey, !isCurrentlyDark);
        });
    }

    // 2. LÓGICA DO LIGHTBOX PARA GALERIA
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galeriaFotos = document.querySelector('.galeria-fotos'); 

    if (galeriaFotos && lightbox) { 
        galeriaFotos.addEventListener('click', (e) => {
            
            if (e.target.tagName === 'IMG' && e.target.closest('.foto-item')) {
                lightbox.classList.add('active'); 
                lightboxContent.src = e.target.src; 
            }
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { 
                lightbox.classList.remove('active');
            }
        });
    }

    // Fechar o lightbox ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
    
    // 3. LÓGICA DO TYPEWRITER
    const textos = [
        "Estudante de Gestão e Informática.",
        "Entusiasta de HTML, CSS e JS.",
        "Futuro Desenvolvedor de Aplicações."
    ];
    // Inicia a animação no elemento com ID 'typewriter-text'
    typewriter('typewriter-text', textos); 

}); // FIM DO ÚNICO DOMContentLoaded

// ===================================================
// FUNÇÕES DE SCROLL (Botão Voltar ao Topo)
// ===================================================
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const btnTopo = document.getElementById("btnVoltarTopo");
    
    if (btnTopo) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            btnTopo.classList.remove("hidden");
        } else {
            btnTopo.classList.add("hidden");
        }
    }
}