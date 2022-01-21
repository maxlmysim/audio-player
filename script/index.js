const audio = document.querySelector('.audio');
const playStopSwitch = document.querySelector('.play-stop');
const backward = document.querySelector('.switch-backward');
const forward = document.querySelector('.switch-forward');
const progress = document.querySelector('.progress-bar');
let isPlaying = false;
let playNum = 0;
let playList = ["Tom_Odell_-_Cant_Pretend.mp3", "Beyonce_-_Don't_Hurt_Yourself.mp3", "Dua_Lipa_-_Don'tStart_Now.mp3"];


function fullTime() {
    let fullTime = Math.floor(audio.duration);
    let minute = Math.floor(fullTime / 60);
    let seconds = fullTime - minute * 60;
    progress.max = fullTime;

    document.querySelector('.full-time').innerHTML = `${minute}:${seconds}`;
}

function checkPlay() {
    isPlaying ? pauseMusic() : playMusic();
    isPlaying = !isPlaying;
}

function playMusic() {
    document.querySelector('.play-stop').src = './assets/svg/play.png';
    audio.src = `./assets/audio/${playList[playNum]}`;
    audio.play();
    setInterval(currentTime, 1000);
}

function pauseMusic() {
    document.querySelector('.play-stop').src = './assets/svg/pause.png';
    audio.pause();
}

function changeProgress() {
    audio.currentTime = progress.value;
}

function currentTime() {
    progress.value = audio.currentTime;

    let currentMinute = Math.floor(audio.currentTime / 60);
    let currentSecond = Math.floor(audio.currentTime - currentMinute * 60);

    if (currentSecond <= 9) currentSecond = '0' + currentSecond;

    document.querySelector('.current-time').innerHTML = `${currentMinute}:${currentSecond}`;
}

function backwardMusic() {
    if (playNum > 0) {
        playNum--;
    }

    changeTheme();
    playMusic();

}

function forwardMusic() {
    if (playList.length > playNum + 1) {
        playNum++;
    }

    changeTheme();
    playMusic();
}

function changeTheme() {
    let mainBackground = document.querySelector('.background');
    let containerBackground = document.querySelector('.container__top');

    mainBackground.src = `./assets/img/${playList[playNum].split('_')[0]}.png`;
    containerBackground.style.backgroundImage = `url(../assets/img/${playList[playNum].split('_')[0]}.png)`;
}

setTimeout(fullTime, 500);
playStopSwitch.addEventListener('click', checkPlay);
progress.addEventListener('change', changeProgress);
backward.addEventListener('click', backwardMusic);
forward.addEventListener('click', forwardMusic);


















