
function toggleAudio(audioId) {
    var audioElements = document.getElementsByTagName('audio');

    // Pause all audio elements
    for (var i = 0; i < audioElements.length; i++) {
        if (audioElements[i].id !== audioId) {
            audioElements[i].pause();
        }
    }

    // Play or pause the selected audio element
    var audio = document.getElementById(audioId);
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}