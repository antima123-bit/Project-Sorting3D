class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.isMuted = false;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.setVolume(0.1); // Set initial volume to a lower level
    }

    playNote(value) {
        if (this.isMuted) return;

        // Create oscillator
        const oscillator = this.audioContext.createOscillator();
        oscillator.connect(this.gainNode);

        // Map array value to frequency (between 220Hz and 880Hz)
        const frequency = 220 + (value * 6.6);
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // Use sine wave for a more melodic sound
        oscillator.type = 'sine';

        // Start and stop the note
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    mute() {
        this.isMuted = true;
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    }

    unmute() {
        this.isMuted = false;
        this.setVolume(0.1);
    }

    setVolume(value) {
        this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
    }
}

const soundIcon = document.getElementById('sound-toggle');
const swapSound = document.getElementById('swap-sound');

let isMuted = true; // Start muted

soundIcon.addEventListener('click', () => {
    console.log('Icon clicked. Current muted state:', isMuted);
    if (isMuted) {
        swapSound.currentTime = 0; // Reset sound to start
        swapSound.play(); // Play sound when unmuted
        soundIcon.src = 'path/to/unmute-icon.png'; // Change icon to unmute
    } else {
        swapSound.pause(); // Stop sound when muted
        soundIcon.src = 'path/to/mute-icon.png'; // Change icon to mute
    }
    isMuted = !isMuted; // Toggle mute state
});

function playSwapSound() {
    if (!isMuted) {
        swapSound.currentTime = 0; // Reset sound to start
        swapSound.play();
    }
}
