class AudioManager {
    constructor() {
        this.audioContext = null;
        this.gainNode = null;
        this.oscillator = null;
        this.isMuted = true;
    }

    initialize() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.setVolume(0.1); // Set initial volume
        }
    }

    playNote(value) {
        if (this.isMuted) return;
        
        this.initialize();

        // Stop previous oscillator if it exists
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
        }

        // Create and configure oscillator
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.connect(this.gainNode);

        // Map array value to frequency (between 220Hz and 880Hz)
        const frequency = 220 + (value * 3);
        this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // Use sine wave for a more melodic sound
        this.oscillator.type = 'sine';

        // Start the oscillator
        this.oscillator.start();

        // Stop the oscillator after a short duration
        this.oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    toggle() {
        this.isMuted = !this.isMuted;
        if (!this.isMuted) {
            this.initialize();
        }
        return !this.isMuted;
    }

    setVolume(value) {
        if (this.gainNode) {
            this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
        }
    }
}

export const audioManager = new AudioManager();
