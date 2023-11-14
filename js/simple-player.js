const audio = new Audio("SongAudio/Nothing Can Stop Me (320 kbps).mp3");

// const audio = songs;
const button = document.getElementById("play-pause-button");
const trackTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");
let seeking = false;
// Array of Songs to allow selection
let songs = [
    {
        title: "Song 1",
        src: "SongAudio/30 Hours (320 kbps).mp3"
    }, {
        title: "Song 2",
        src: "SongAudio/Brent Faiyaz & Paperboyfabe - Language (320 kbps).mp3"
    }, {
        title: "Song 3",
        src: "SongAudio/Nothing Can Stop Me (320 kbps).mp3"
    }
]

// specify default song

let currentSongIndex = 0;

// updates the source of audio object with a song from array

function playSong(songIndex) {
    audio.src = songs[currentSongIndex].src;
    audio.play();
}
 
// function that plays next song

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    playSong(currentSongIndex);
}

//function that plays previous song

function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    playSong(currentSongIndex);
}

//function to automatically play next song when audio ends.

audio.onended = function(){
    button.src = "images/play.svg";
    trackTime.innerHTML = formatTime(0);
    seekBar.value = 0;
    nextSong();
};


// loop that creates a button to assign onclick events

// for (let i = 0; i < songs.length; i++) {
//     let btn = document.createElement('button');
//     btn.textContent = 'play ${songs[i].title}';
//     btn.onclick = function(){
//         currentSongIndex = i;
//         playSong(currentSongIndex);
//     };
//     document.body.appendChild(btn);
//     }




button.onclick = function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};
audio.oncanplaythrough = () => {
    button.disabled = false;
    seekBar.disabled = false;
};
audio.onplay = function () {
    button.src = "images/pause.svg";
};
audio.onpause = function () {
    button.src = "images/play.svg";
};
audio.onended = function () {
    button.src = "images/play.svg";
    trackTime.innerHTML = formatTime(0);
    seekBar.value = 0;
};
audio.onloadedmetadata = function () {
    trackTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
};
audio.ontimeupdate = function () {
    trackTime.innerHTML = formatTime(audio.currentTime);
    if (!seeking) {
        seekBar.value = Math.floor(audio.currentTime);
    }
};
seekBar.oninput = function () {
    seeking = true;
};
seekBar.onchange = function () {
    audio.currentTime = seekBar.value;
    if (!audio.paused) {
        audio.play();
    }
    seeking = false;
};

function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}