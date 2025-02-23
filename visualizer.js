class Visualizer {
    constructor() {
        this.array = [];
        this.isSorting = false;
        this.audioManager = new AudioManager();
        this.setupEventListeners();
        this.setupComplexityInfo();
        this.generateNewArray();
    }

    setupEventListeners() {
        document.getElementById('randomize').addEventListener('click', () => this.generateNewArray());
        document.getElementById('sort').addEventListener('click', () => this.startSorting());
        document.getElementById('array-size').addEventListener('input', () => this.generateNewArray());
        document.getElementById('speed').addEventListener('input', (e) => this.updateSpeed(e.target.value));
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                body.classList.add('dark-mode');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Sound toggle
        const soundToggle = document.getElementById('sound-toggle');
        soundToggle.addEventListener('click', () => {
            const icon = soundToggle.querySelector('i');
            if (this.audioManager.isMuted) {
                this.audioManager.unmute();
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
            } else {
                this.audioManager.mute();
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
            }
        });

        // Algorithm selection
        document.getElementById('algorithm').addEventListener('change', () => this.updateComplexityInfo());
    }

    setupComplexityInfo() {
        this.complexityInfo = {
            bubble: { time: 'O(n²)', space: 'O(1)' },
            selection: { time: 'O(n²)', space: 'O(1)' },
            insertion: { time: 'O(n²)', space: 'O(1)' },
            merge: { time: 'O(n log n)', space: 'O(n)' },
            quick: { time: 'O(n log n)', space: 'O(log n)' }
        };
    }

    updateComplexityInfo() {
        const algorithm = document.getElementById('algorithm').value;
        const info = this.complexityInfo[algorithm];
        document.getElementById('time-complexity').textContent = info.time;
        document.getElementById('space-complexity').textContent = info.space;
    }

    generateNewArray() {
        const size = document.getElementById('array-size').value;
        this.array = Array(parseInt(size)).fill().map(() => Math.random() * 100 + 1);
        this.updateDisplay(this.array);
        this.updateComplexityInfo();
    }

    updateSpeed(value) {
        const speeds = [200, 150, 100, 50, 25];
        this.delay = speeds[value - 1];
        if (this.sortingAlgorithm) {
            this.sortingAlgorithm.setDelay(this.delay);
        }
    }

    async updateDisplay(array, activeIndices = [], isSorted = false) {
        const container = document.getElementById('bars');
        container.innerHTML = '';
        const maxVal = Math.max(...array);
        
        array.forEach((value, idx) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxVal) * 100}%`;
            bar.style.width = `${90 / array.length}%`;
            
            if (activeIndices.includes(idx)) {
                bar.classList.add('selected');
                this.audioManager.playNote(value);
            } else if (isSorted) {
                bar.classList.add('sorted');
            }
            
            container.appendChild(bar);
        });
    }

    async startSorting() {
        if (this.isSorting) return;
        this.isSorting = true;
        
        const algorithm = document.getElementById('algorithm').value;
        this.sortingAlgorithm = new SortingAlgorithms([...this.array], this.updateDisplay.bind(this));
        this.sortingAlgorithm.setDelay(this.delay || 100);

        try {
            switch(algorithm) {
                case 'bubble':
                    await this.sortingAlgorithm.bubbleSort();
                    break;
                case 'selection':
                    await this.sortingAlgorithm.selectionSort();
                    break;
                case 'insertion':
                    await this.sortingAlgorithm.insertionSort();
                    break;
                case 'merge':
                    await this.sortingAlgorithm.mergeSort();
                    break;
                case 'quick':
                    await this.sortingAlgorithm.quickSort();
                    break;
            }
        } catch (error) {
            console.error('Sorting error:', error);
        }

        this.isSorting = false;
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Visualizer();
});
