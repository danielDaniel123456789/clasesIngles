document.addEventListener("DOMContentLoaded", function () {
    // Establecer el volumen bajo para todos los audios con la clase .musicaCristiana
    let audios = document.querySelectorAll(".musicaCristiana");
    audios.forEach(audio => {
        audio.volume = 0.1; // Ajustar volumen al 20% por defecto
    });
});

function musica_cristiana() {
    const audioFiles = {
        'cancion01': 'Canción 1',
        'cancion02': 'Canción 2',
        'cancion03': 'Canción 3',
        'cancion04': 'Canción 4',
        'cancion05': 'Canción 5',
        'cancion06': 'Canción 6',
        'cancion07': 'Canción 7',
        'cancion08': 'Canción 8',
        'cancion09': 'Canción 9',
        'cancion10': 'Canción 10',
        'cancion11': 'Canción 11',
        'cancion12': 'Canción 12',
        'cancion13': 'Canción 13',
        'cancion14': 'Canción 14',
        'cancion15': 'Canción 15'
    };

    let selectHTML = '<select id="audioSelect" class="swal2-select">';
    for (let key in audioFiles) {
        selectHTML += `<option value="${key}">${audioFiles[key]}</option>`;
    }
    selectHTML += '</select>';

    Swal.fire({
        title: 'Selecciona un audio',
        html: selectHTML,
        showCancelButton: true,
        confirmButtonText: 'Reproducir',
        cancelButtonText: 'Cancelar',
        didOpen: () => {
            document.getElementById('audioSelect').focus();
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let selectedAudio = document.getElementById('audioSelect').value;
            if (selectedAudio) {
                let audioElement = document.getElementById(selectedAudio);
                if (audioElement) {
                    detenerTodo(); // Detener otros audios antes de reproducir
                    // Ajustar el volumen del audio seleccionado (opcionalmente puedes mantenerlo al 30% o al 50%)
                    audioElement.volume = 0.1; // Ajustar volumen a 30% para el audio seleccionado
                    audioElement.play();
                    Swal.fire('Reproduciendo', `Ahora suena: ${audioFiles[selectedAudio]}`, 'success');
                } else {
                    Swal.fire('Error', 'No se encontró el audio.', 'error');
                }
            }
        }
    });
}

function detenerTodo() {
    let audios = document.querySelectorAll("audio");
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}
