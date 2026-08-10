// ====== 1. EFECTO MÁQUINA DE ESCRIBIR ======
document.addEventListener('DOMContentLoaded', function() {
    const nombre = 'Kriss😺🈶'; // ⚠️ CAMBIA ESTO POR EL NOMBRE DE TU AMIGA
    const typedText = document.getElementById('typed-text');
    
    if (typedText) {
        let i = 0;
        const speed = 100; // velocidad en milisegundos
        
        function typeWriter() {
            if (i < nombre.length) {
                typedText.textContent += nombre.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        typeWriter();
    }
    
    // ====== 2. DATOS RANDOM (MEMES) ======
    const datosRandom = [
        "🖤 Tiene más ropa negra que el armario de Nicky Jam",
        "🌙 Su momento favorito es las 8 de la noche, ¿quien se acuesta a esa hora mano?",
        "🎨 Dibuja cosas raras que solo ella entiende (y son arte)",
        "📺 Se sabe los diálogos de 'Smilling Friends' de memoria",
        "😂 Se ríe hasta con memes malos",
        "🍕 Puede comerse una Pollo entero entera mirando una película triste",
        "🧠 Es profesional en 'valeverguismo'",
        "😐 Su cara de 'todo bien' es su cara de 'estoy planeando algo'",
        "🌮 Prefiere los POLLOS DEL ARA antes que una cita romántica",
        "✨ Es la persona más increíble que conozco",
        "🍦 Se come un Smirnoff de Tamarindo en 2 minutos",
        "🍵 Toma Matcha bajo la lluvia como en una película",
        "🎨 Dibuja vainas raras mk🙏",
        "🐔 Es experta en comer pollo de Ara",
        "🚶 Adicta al Roblox nivel dios"
        
    ];
    
    const btnDato = document.getElementById('btnDatoRandom');
    const datoDiv = document.getElementById('datoRandom');
    let datoMostrado = false;
    
    if (btnDato && datoDiv) {
        btnDato.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * datosRandom.length);
            const dato = datosRandom[randomIndex];
            
            datoDiv.textContent = dato;
            datoDiv.style.display = 'block';
            
            // Reiniciar animación
            datoDiv.classList.remove('animate__fadeIn', 'animate__flipInY');
            // Forzar reflow
            void datoDiv.offsetWidth;
            datoDiv.classList.add('animate__flipInY');
            
            datoMostrado = true;
        });
    }
    
    // ====== 3. REPRODUCTOR DE MÚSICA ======
    // Crear el objeto de audio
    const audio = new Audio('music/Niña-Bonita.mp3'); // ⚠️ CAMBIA LA RUTA SI ES NECESARIO
    let isPlaying = false;
    
    // Elementos del reproductor
    const miniPlayerWrapper = document.getElementById('miniPlayerWrapper');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const playIcon = document.getElementById('playIcon');
    const progressBar = document.getElementById('progressBar');
    const volumeControl = document.getElementById('volumeControl');
    const songName = document.getElementById('songName');
    
    // Configurar volumen inicial
    audio.volume = 0.7;
    if (volumeControl) volumeControl.value = 0.7;
    
    // ====== FUNCIÓN PARA MOSTRAR EL REPRODUCTOR ======
    function showPlayer() {
        if (miniPlayerWrapper) {
            miniPlayerWrapper.style.display = 'block';
            // Agregar animación de entrada
            miniPlayerWrapper.style.animation = 'none';
            void miniPlayerWrapper.offsetWidth;
            miniPlayerWrapper.style.animation = 'slideInUp 0.5s ease';
        }
    }
    
    // ====== FUNCIÓN PARA OCULTAR EL REPRODUCTOR ======
    function hidePlayer() {
        if (miniPlayerWrapper) {
            miniPlayerWrapper.style.animation = 'slideOutDown 0.3s ease forwards';
            setTimeout(() => {
                miniPlayerWrapper.style.display = 'none';
            }, 300);
        }
    }
    
    // ====== 4. FUNCIONALIDAD DE LA FOTO PRINCIPAL ======
    const fotoContainer = document.getElementById('fotoPrincipal');
    
    if (fotoContainer) {
        fotoContainer.addEventListener('click', function() {
            // Si la canción está pausada o no ha empezado, reproducir
            if (!isPlaying) {
                audio.play().catch(error => {
                    console.log('Error al reproducir:', error);
                    alert('🎵 ¡Pon una canción en la carpeta music/ con el nombre Niña-Bonita.mp3!');
                });
                isPlaying = true;
                if (playIcon) playIcon.className = 'bi bi-pause-circle-fill fs-2';
                if (btnPlayPause) btnPlayPause.classList.add('playing');
                if (songName) songName.textContent = '🎵 Reproduciendo: Binomio Oficial - Niña Bonita';
                
                // MOSTRAR EL REPRODUCTOR
                showPlayer();
            }
            
            // EFECTO CONFETI
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                // Si no está cargada la librería, usar efecto simple
                crearConfetiCasero();
            }
            
            // Animación de la foto
            const img = document.querySelector('.foto-hero');
            if (img) {
                img.style.animation = 'none';
                void img.offsetHeight;
                img.style.animation = 'pulseIcon 0.5s ease';
            }
        });
    }
    
    // ====== 5. CONTROLES DEL REPRODUCTOR ======
    
    // Botón Play/Pausa
    if (btnPlayPause) {
        btnPlayPause.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                if (playIcon) playIcon.className = 'bi bi-play-circle-fill fs-2';
                btnPlayPause.classList.remove('playing');
                if (songName) songName.textContent = '⏸️ Pausado';
                // OCULTAR EL REPRODUCTOR CUANDO SE PAUSA
                hidePlayer();
            } else {
                audio.play().catch(error => {
                    console.log('Error al reproducir:', error);
                    alert('🎵 ¡Pon una canción en la carpeta music/ con el nombre Niña-Bonita.mp3!');
                });
                isPlaying = true;
                if (playIcon) playIcon.className = 'bi bi-pause-circle-fill fs-2';
                btnPlayPause.classList.add('playing');
                if (songName) songName.textContent = '🎵 Reproduciendo: Binomio Oficial - Niña Bonita';
                // MOSTRAR EL REPRODUCTOR CUANDO SE REPRODUCE
                showPlayer();
            }
        });
    }
    
    // Barra de progreso (actualizar mientras suena)
    if (audio && progressBar) {
        audio.addEventListener('timeupdate', function() {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.value = progress;
            }
        });
    }
    
    // Control de progreso (cuando el usuario mueve la barra)
    if (progressBar) {
        progressBar.addEventListener('input', function() {
            if (audio.duration) {
                const seekTime = (progressBar.value / 100) * audio.duration;
                audio.currentTime = seekTime;
            }
        });
    }
    
    // Control de volumen
    if (volumeControl) {
        volumeControl.addEventListener('input', function() {
            audio.volume = volumeControl.value;
        });
    }
    
    // Cuando la canción termina, reiniciar botón y OCULTAR REPRODUCTOR
    if (audio) {
        audio.addEventListener('ended', function() {
            isPlaying = false;
            if (playIcon) playIcon.className = 'bi bi-play-circle-fill fs-2';
            if (btnPlayPause) btnPlayPause.classList.remove('playing');
            if (songName) songName.textContent = '🎵 Canción finalizada';
            if (progressBar) progressBar.value = 0;
            // OCULTAR EL REPRODUCTOR CUANDO TERMINA
            hidePlayer();
        });
    }
    
    // ====== 6. CONFETI CASERO (si no carga la librería) ======
    function crearConfetiCasero() {
        const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bd6', '#C9A8E8'];
        const container = document.body;
        
        for (let i = 0; i < 30; i++) {
            const confeti = document.createElement('div');
            confeti.style.cssText = `
                position: fixed;
                top: -20px;
                left: ${Math.random() * 100}vw;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 9999;
                animation: confetiFall ${Math.random() * 3 + 2}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            container.appendChild(confeti);
            
            // Eliminar después de la animación
            setTimeout(() => {
                confeti.remove();
            }, 5000);
        }
    }
    
    // ====== 7. ANIMACIÓN AL SCROLL (Línea de tiempo) ======
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkVisibility() {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                item.classList.add('visible');
            }
        });
    }
    
    // Verificar al cargar y al hacer scroll
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    
    // ====== 8. AGREGAR ESTILO PARA CONFETI CASERO Y ANIMACIONES ======
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes slideOutDown {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(20px) scale(0.9);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 ¡Página cargada! Disfruta haciendo el regalo para tu amiga.');
});