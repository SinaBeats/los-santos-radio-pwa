const stations = [
    {
        name: "Los Santos Rock Radio",
        file: "assets/audio/los_santos_rock.mp3",
        icon: "assets/images/rock_radio_icon.png"
    },
    {
        name: "Non-Stop Pop FM",
        file: "assets/audio/non_stop_pop.mp3",
        icon: "assets/images/non_stop_pop_icon.png"
    },
    {
        name: "West Coast Classics",
        file: "assets/audio/west_coast_classics.mp3",
        icon: "assets/images/west_coast_classics_icon.png"
    }
];

class RadioPlayer {
    constructor() {
        this.currentStationIndex = 0;
        this.audio = new Audio();
        this.initializeElements();
        this.loadStation(this.currentStationIndex);
    }

    initializeElements() {
        this.stationIcon = document.getElementById('station-icon');
        this.stationName = document.getElementById('station-name');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.volumeSlider = document.getElementById('volume-slider');

        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.prevStation());
        this.nextBtn.addEventListener('click', () => this.nextStation());
        this.volumeSlider.addEventListener('input', () => this.adjustVolume());
    }

    loadStation(index) {
        const station = stations[index];
        this.audio.src = station.file;
        this.stationIcon.src = station.icon;
        this.stationName.textContent = station.name;
        this.audio.play();
        this.playPauseBtn.textContent = '❚❚';
    }

    togglePlayPause() {
        if (this.audio.paused) {
            this.audio.play();
            this.playPauseBtn.textContent = '❚❚';
        } else {
            this.audio.pause();
            this.playPauseBtn.textContent = '▶';
        }
    }

    prevStation() {
        this.currentStationIndex = (this.currentStationIndex - 1 + stations.length) % stations.length;
        this.loadStation(this.currentStationIndex);
    }

    nextStation() {
        this.currentStationIndex = (this.currentStationIndex + 1) % stations.length;
        this.loadStation(this.currentStationIndex);
    }

    adjustVolume() {
        this.audio.volume = this.volumeSlider.value / 100;
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Initialize Radio Player
const radioPlayer = new RadioPlayer();
