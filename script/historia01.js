function historia01() {
    Swal.fire({
        title: "Selecciona una canción",
        input: "select",
        inputOptions: {
            historia01: "Canción 1",
            historia02: "Canción 2",
            historia03: "Canción 3",
            historia04: "Canción 4",
            historia05: "Canción 5",
            historia06: "Canción 6",
            historia07: "Canción 7",
            historia08: "Canción 8",
            historia09: "Canción 9"
        },
        inputPlaceholder: "Elige una canción",
        showCancelButton: true,
        confirmButtonText: "Reproducir",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            reproducirHistoria(result.value);
        }
    });
}

function reproducirHistoria(id) {
    let audio = document.getElementById(id);
    
    if (!audio) {
        Swal.fire("Error", "No se encontró el audio.", "error");
        return;
    }

    audio.loop = true; // Repite el audio indefinidamente

    Swal.fire({
        title: "Reproduciendo Audio",
        text: "Escucha la historia...",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Detener",
        cancelButtonText: "Cerrar",
        didOpen: () => {
            audio.play();
        },
        preConfirm: () => {
            audio.pause();
            audio.currentTime = 0; // Reinicia el audio
            audio.loop = false; // Detiene el loop cuando se detiene la reproducción
        }
    });
}
