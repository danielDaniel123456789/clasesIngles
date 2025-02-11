 // Variables de control
 let isPlaying = false;
 let currentAudioIndex = 0;
 let isBackgroundMusicPlaying = false;  // Controla la música de fondo
 let currentlyPlayingIndefinitely = null;  // Controla qué audio está sonando 

 // Lista de los elementos de audio
 const audios = [
     document.getElementById("audio01"),
     document.getElementById("audio02"),
     document.getElementById("audio03"),
     document.getElementById("audio04"),
     document.getElementById("audio05"),
     document.getElementById("audio06"),
     document.getElementById("audio07"),
     document.getElementById("audio08"),
     document.getElementById("audio09"),
     document.getElementById("audio10"),
     document.getElementById("audio11"),
     document.getElementById("audio12"),
 ];
 const backgroundAudio = document.getElementById("backgroundAudio");

 // Función para  todos los audios en secuencia y repetir
 function Todo() {
     if (isPlaying) return;  // Evitar que se inicie si ya está reproduciendo

     isPlaying = true;
     currentAudioIndex = 0;
     document.getElementById("btnPlay").disabled = true;  // Deshabilitar el botón de reproducción

     //  los otros audios en secuencia
     const playNextAudio = () => {
         if (currentAudioIndex < audios.length) {
             const audio = audios[currentAudioIndex];
             audio.play();
             audio.onended = () => {
                 currentAudioIndex++;
                 playNextAudio(); //  el siguiente audio
             };
         } else {
             currentAudioIndex = 0; // Reiniciar la secuencia
             playNextAudio(); // Volver a  desde el inicio
         }
     };

     playNextAudio(); // Iniciar la secuencia
 }

 // Función para detener todos los audios
 function detenerTodo() {
     isPlaying = false;
     document.getElementById("btnPlay").disabled = false;  // Habilitar el botón de reproducción
     backgroundAudio.pause();  // Detener música de fondo
     backgroundAudio.currentTime = 0;  // Reiniciar música de fondo

     // Detener los otros audios
     document.querySelectorAll('audio').forEach(audio => {
         audio.pause();
         audio.currentTime = 0;  // Reiniciar el tiempo de los audios
     });

     if (currentlyPlayingIndefinitely) {
         const audio = document.getElementById(currentlyPlayingIndefinitely);
         audio.pause();
         audio.currentTime = 0;  // Reiniciar audio que estaba sonando 
         currentlyPlayingIndefinitely = null;
     }
 }

 // Función para alternar la reproducción de la música de fondo
 function toggleBackgroundMusic() {
     if (isBackgroundMusicPlaying) {
         backgroundAudio.pause();  // Detener música de fondo
         document.getElementById("btnBackgroundPlay").textContent = " música de fondo";
     } else {
         backgroundAudio.play();  //  música de fondo
         document.getElementById("btnBackgroundPlay").textContent = "Detener música de fondo";
     }

     isBackgroundMusicPlaying = !isBackgroundMusicPlaying;  // Cambiar el estado de la música de fondo
 }

 // Función para  un audio 
 function playIndefinitely(audioId) {
     // Detener el audio que estaba sonando  (si hay alguno)
     if (currentlyPlayingIndefinitely) {
         const currentAudio = document.getElementById(currentlyPlayingIndefinitely);
         currentAudio.pause();
         currentAudio.currentTime = 0;  // Reiniciar audio anterior
     }

     //  el nuevo audio 
     const audio = document.getElementById(audioId);
     audio.loop = true;  // Activar repetición
     audio.play();
     currentlyPlayingIndefinitely = audioId;  // Establecer el audio que está sonando 
 }

 // Función para cambiar la velocidad de reproducción
 function changeSpeed(amount) {
     // Cambiar la velocidad de todos los audios (más rápido o más lento)
     audios.forEach(audio => {
         audio.playbackRate += amount;
     });
     backgroundAudio.playbackRate += amount;  // Cambiar la velocidad de la música de fondo también
 }