function togglesSideBarRight() {
    const right = document.getElementById('right');
    const rightNav = document.getElementById('sideNavRight');

    if (right.style.flexBasis === "20%") {
        setTimeout(function () {
            right.style.flexBasis = "0%";
            right.style.visibility = "hidden";
            rightNav.style.display = "none";
        }, 400);
        rightNav.style.animation = "rightToggleOff 0.5s";
        right.style.animation = "rightToggleOff2 0.5s";
    } else {
        right.style.flexBasis = "0%";
        rightNav.style.display = "block";
        right.style.visibility = "visible";
        setTimeout(function () {
            right.style.flexBasis = "20%";
        }, 400);
        rightNav.style.animation = "rightToggleOn 0.5s";
        right.style.animation = "rightToggleOn2 0.5s";
    }
}

function togglesSideBarLeft() {
    const left = document.getElementById('left');
    const leftNav = document.getElementById('sideNavLeft');
    if (left.style.flexBasis === "20%") {
        setTimeout(function () {
            left.style.flexBasis = "0%";
            left.style.visibility = "hidden";
            leftNav.style.display = "none";
        }, 400);
        leftNav.style.animation = "leftToggleOff 0.5s";
        left.style.animation = "leftToggleOff2 0.5s";
    } else {
        left.style.flexBasis = "0%";
        leftNav.style.display = "block";
        left.style.visibility = "visible";
        setTimeout(function () {
            left.style.flexBasis = "20%";
        }, 400);
        leftNav.style.animation = "leftToggleOn 0.5s";
        left.style.animation = "leftToggleOn2 0.5s";
    }
}

let pomodoro_length = 25;
let short_break_length = 5;
let long_break_length = 15;

let timerAdd = 60000 * pomodoro_length + 1000;
let now = new Date().getTime();
let countDownDate = new Date().getTime() + timerAdd;
let reset = false;
let pause = true;
let playing = false;
let music_volume = 100;
let timer_volume = 0.2;
let youtube_video_id = 'sjkrrmBnpGE'

function selectTimer(active) {
    const pomodoro = document.getElementById('pomodoro');
    const shortBreak = document.getElementById('short-break');
    const longBreak = document.getElementById('long-break');

    if (active === "pomodoro") {
        pomodoro.className = "header-btn-active";
        shortBreak.className = "header-btn";
        longBreak.className = "header-btn";

        timerAdd = 60000 * pomodoro_length + 1000;
        now = new Date().getTime();
        countDownDate = new Date().getTime() + timerAdd;
        reset = true;
        pause = true;

    } else if (active === "short-break") {
        pomodoro.className = "header-btn";
        shortBreak.className = "header-btn-active";
        longBreak.className = "header-btn";

        timerAdd = 60000 * short_break_length + 1000;
        now = new Date().getTime();
        countDownDate = new Date().getTime() + timerAdd;
        reset = true;
        pause = true;
    } else {
        pomodoro.className = "header-btn"
        shortBreak.className = "header-btn"
        longBreak.className = "header-btn-active"

        timerAdd = 60000 * long_break_length + 1000
        now = new Date().getTime();
        countDownDate = new Date().getTime() + timerAdd;
        reset = true;
        pause = true;
    }
}


pause = true
last_distance = countDownDate - now
let player;

function play() {
    const PlayBtn = document.getElementById('PlayBtn');
    const PauseBtn = document.getElementById('PauseBtn');
    pause = !pause
    if (!pause) {
        player.playVideo();

        PlayBtn.style.display = "none";
        PauseBtn.style.display = "block";

    } else {
        player.pauseVideo();
        PlayBtn.style.display = "block";
        PauseBtn.style.display = "none";
    }
}

function resetTime() {
    countDownDate = new Date().getTime() + timerAdd;
    reset = true;
    pause = true;
    player.stopVideo();
}

const x = setInterval(function () {
    let now = new Date().getTime();
    if (!reset) {
        if (pause) {
            countDownDate = new Date().getTime() + last_distance;
        }
    } else {
        reset = false
    }
    var distance = countDownDate - now;
    last_distance = distance
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    if (!pause) {
        document.title = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0') + " - Pomodoro Time Left";
    } else {
        document.title = "Pomodoro - For Productivity";
    }

    if (playing) {
        if (distance > 0) {
            playing = false
        }
    }
    if (distance < 0) {
        if (!playing) {
            playing = true
            const a = new Audio("/static/audio/world_clear.wav");
            a.play();
            play()
            a.volume = timer_volume;
            if (timerAdd >= 60000 * pomodoro_length + 1100) {
                timerAdd = 60000 * short_break_length
                now = new Date().getTime();
                countDownDate = new Date().getTime() + timerAdd;
                reset = true;
                pause = true;
            } else {
                timerAdd = 60000 * pomodoro_length + 1100
                now = new Date().getTime();
                countDownDate = new Date().getTime() + timerAdd;
                reset = true;
                pause = true;
                player.stopVideo();
            }
        }
        document.getElementById("countdown").innerHTML = "00:00";
    }

}, 1000);

let pick_img = 1;
let custom_url;



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleMusicDropdown() {
    document.getElementById("musicDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside it
window.onclick = function (event) {
    if (!event.target.matches('.control-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function play_music(video_id, id_) {
    if (video_id === "none") {
        player.stopVideo();
    } else {
        youtube_video_id = video_id;
        playNewVideo();
    }
    var selected = document.getElementById(id_);
    var musicBnt = document.getElementById("control-btn");
    musicBnt.innerHTML = selected.innerHTML
}


// youtube player

// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390', width: '640', videoId: youtube_video_id, playerVars: {
            'playsinline': 1
        }, events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.pauseVideo();
}

function changeVolume() {
    player.setVolume(music_volume);
}

function stopVideo() {
    player.stopVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function playVideo() {
    player.playVideo();
}

function playNewVideo() {
    player.loadVideoById(youtube_video_id)
    if (pause) {
        player.pauseVideo();
    }

}

let modal;

function defineMusic() {
    if (document.getElementById("custom-music-id").value) {
        youtube_video_id = document.getElementById("custom-music-id").value;
        playNewVideo();
    }
    music_volume = document.getElementById("music-volume").value;
    timer_volume = (document.getElementById("timer-volume").value / 100);
    changeVolume();
}

function defineIntervals() {
    pomodoro_length = document.getElementById("pomodoro-time_input").value;
    short_break_length = document.getElementById("short-break_input").value;
    long_break_length = document.getElementById("long-break_input").value;
}

function uploadBackground() {
    custom_url = document.getElementById("custom-bg-img-url").value;
    next_img(custom_url);
}