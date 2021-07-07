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
    playBtnSpan = document.querySelector('.player-wrapper_btnPlay span'),
    volumeElement = document.querySelector('.player-wrapper_btnVol'),
    volumeBarWrapper = document.querySelector('.player-wrapper__volumeBarProgress'),
    volumeBarFilled = document.querySelector('.player-wrapper__volumeBarProgressActual'),
    volumeIcon = volumeElement.querySelector("span"),
    currentYear = document.querySelectorAll('footer p')[1];
    counter = 0,
    volumeCounter = 0

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

// Filling the length of the track and progress bar
audio.addEventListener("loadedmetadata", function () {
    let durationTime = timeConverter(audio.duration);
    trackDurationTime.innerHTML = durationTime;
    let length = audio.currentTime / audio.duration * trackProgress.clientWidth
    trackProgressBar.style.width = `${length}px`
});
audio.addEventListener("timeupdate", () => {
    let currentTime = timeConverter(audio.currentTime);
    trackCurrentTime.innerHTML = currentTime;
    let length = audio.currentTime / audio.duration * trackProgress.clientWidth
    trackProgressBar.style.width = `${length}px`
});

// Adding listeners to the bars
trackProgress.addEventListener("click", trackClickHandler);
trackProgressBar.addEventListener("click", trackClickHandler);

function trackClickHandler(e) {
    audio.currentTime = e.offsetX / trackProgress.offsetWidth * audio.duration;
}

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

// Handler for the volume
volumeBarWrapper.addEventListener("click", (e) => {
    let barHeight = (e.offsetY * 100 / volumeBarWrapper.offsetHeight);
    volumeBarFilled.style.height = `${barHeight}px`
    if (barHeight > volumeBarWrapper.offsetHeight) {
        volumeBarFilled.style.height = `${volumeBarWrapper.offsetHeight}px`
    }
    if (barHeight < 4) {
        volumeBarFilled.style.height = "0px"
    }

    let volumeValue = barHeight / volumeBarWrapper.offsetHeight,
        audioVolume = audio.volume
    if (volumeValue > 1) {
        audio.volume = 1
    }
    else if (volumeValue < 0.03) {
        audio.volume = 0
    }
    else {
        audio.volume = volumeValue;
    }

    if (audioVolume > 0.4) {
        volumeIcon.innerHTML = "volume_up"
    }
    else if (audioVolume < 0.4 && audioVolume > 0.03) {
        volumeIcon.innerHTML = "volume_down"
    }
    else if (audioVolume < 0.03) {
        volumeIcon.innerHTML = "volume_mute"
    }
})

// Muting the track on click
volumeElement.addEventListener("click", (e) => {
    e.preventDefault();

    volumeCounter++
    if (volumeCounter % 2 || volumeCounter === 0) {
        volumeIcon.innerHTML = "volume_mute"
        audio.volume = 0;
        volumeBarFilled.style.height = "0px";
    } else {
        audio.volume = 0.50;
        volumeIcon.innerHTML = "volume_up"
        let barHeight = (50 * 100 / volumeBarWrapper.offsetHeight);
        volumeBarFilled.style.height = `${barHeight}px`
    }
})

// Setting the track scrolling forward
playNextBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (audio.currentTime>0) {
        audio.currentTime+=5
    }    
})

// Setting the track scrolling back
playPrevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (audio.currentTime < 5) {
        audio.currentTime = 0;
    } else {
        audio.currentTime-=5
    }
})


// Setting the audio track name
let urlTrack = audio.src.replace('.mp3', "").split("/"),
    tempNameTrack = urlTrack[urlTrack.length - 1].split("%20-%20"),
    fullNameTrack = `${tempNameTrack[0]} - ${tempNameTrack[1]} - ${tempNameTrack[2]}`;
trackName.innerHTML = fullNameTrack;

// Setting the year
if (new Date().getFullYear() === 2021) {
    currentYear.innerHTML = new Date().getFullYear();
} else {
    currentYear.innerHTML = `2021 - ${new Date().getFullYear()}`
}