// Declaring the needed elements
let audio = document.querySelector('.player-wrapper audio'),
    playBtn = document.querySelector('.player-wrapper_btnPlay'),
    playPrevBtn = document.querySelector('.player-wrapper_btnPrev'),
    playNextBtn = document.querySelector('.player-wrapper_btnNext'),
    trackCurrentTime = document.querySelector('.player-wrapper__timeStart'),
    trackDurationTime = document.querySelector('.player-wrapper__timeEnd'),
    trackProgress = document.querySelector('.player-wrapper__duration'),
    trackProgressBar = document.querySelector('.player-wrapper__durationFill'),
    trackName = document.querySelector('.player-wrapper__info'),
    counter = 0,
    playBtnSpan = document.querySelector('.player-wrapper_btnPlay span');
// Using the audio API

playBtn.addEventListener("click", audioPlayHandler);
function audioPlayHandler(e) {
    e.preventDefault()
    counter++
    if (counter % 2 || counter === 0) {
        playBtnSpan.innerHTML = "pause"
        audio.play()
    } else {
        playBtnSpan.innerHTML = "play_arrow"
        audio.pause()
    }
}

audio.addEventListener("loadedmetadata", function () {
    let durationTime = timeConverter(audio.duration);
    trackDurationTime.innerHTML = durationTime;
});
audio.addEventListener("timeupdate", () => {
    let currentTime = timeConverter(audio.currentTime);
    trackCurrentTime.innerHTML = currentTime;
});

// Converting the audio time
function timeConverter(time) {
    let tempMinutes = Math.floor(time / 60),
        seconds = Math.floor(time - tempMinutes * 60),
        minutes;

    if (tempMinutes < 10) {
        minutes = "0" + tempMinutes;
    } else {
        minutes = tempMinutes;
    }
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
}


// Setting the audio track name
let urlTrack = audio.src.replace('.mp3', "").split("/"),
    tempNameTrack = urlTrack[urlTrack.length - 1].split("%20-%20"),
    fullNameTrack = `${tempNameTrack[0]} - ${tempNameTrack[1]} - ${tempNameTrack[2]}`;
trackName.innerHTML = fullNameTrack;


// Test
console.log(fullNameTrack);