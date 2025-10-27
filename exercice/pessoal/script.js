

const toggleButton = document.getElementById('toggleDarkMode');
const body = document.body;
const darkThemeKey = 'isDarkTheme'; 

function applyTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-theme');
        
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-theme');
       
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    }
}


document.addEventListener('DOMContentLoaded', () => {
   
    const savedTheme = localStorage.getItem(darkThemeKey);
    const isDark = savedTheme === 'true'; 
    applyTheme(isDark);
});

toggleButton.addEventListener('click', () => {
  
    const isCurrentlyDark = body.classList.contains('dark-theme');
    
    
    applyTheme(!isCurrentlyDark);

    
    localStorage.setItem(darkThemeKey, !isCurrentlyDark);
});



function toggleDetails(elementId) {
    const detailsDiv = document.getElementById(elementId);
   
    const button = event.target; 

    detailsDiv.classList.toggle('hidden');

    if (detailsDiv.classList.contains('hidden')) {
        button.textContent = 'Mostrar Detalhes';
    } else {
        button.textContent = 'Esconder Detalhes';
    }
}


window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const btnTopo = document.getElementById("btnVoltarTopo");
  
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btnTopo.classList.remove("hidden");
    } else {
    
        btnTopo.classList.add("hidden");
    }
}