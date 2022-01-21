const audio = document.querySelector('.audio');
const playStopSwitch = document.querySelector('.play-stop');
const backward = document.querySelector('.switch-backward');
const forward = document.querySelector('.switch-forward');
const progress = document.querySelector('.progress-bar');
let isPlaying = false;
let playNum = 0;
let playList = ["Tom_Odell_-_Cant_Pretend", "Beyonce_-_Don't_Hurt_Yourself", "Dua_Lipa_-_Don'tStart_Now"];

function fullTime() {
    let fullTime = Math.floor(audio.duration);
    let minute = Math.floor(fullTime / 60);
    let seconds = fullTime - minute * 60;
    progress.max = fullTime;

    document.querySelector('.full-time').innerHTML = `${minute}:${seconds}`;
}

setTimeout(fullTime, 1000);

function preloadImages() {
    playList.forEach((name) => {
        let img = new Image;
        let firstName = name.split('_')[0];
        img.src = `./assets/img/${firstName}.png`;
    });
}

preloadImages();

function checkPlay() {
    isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
    document.querySelector('.play-stop').src = './assets/svg/pause.png';
    audio.play();
    isPlaying = true;
    setInterval(currentTime, 1000);
}

function pauseMusic() {
    document.querySelector('.play-stop').src = './assets/svg/play.png';
    isPlaying = false;
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

    audio.src = `./assets/audio/${playList[playNum]}.mp3`;
    changeTheme();
    playMusic();
}

function forwardMusic() {
    if (playList.length > playNum + 1) {
        playNum++;
    }

    audio.src = `./assets/audio/${playList[playNum]}.mp3`;
    changeTheme();
    playMusic();
}

function changeTheme() {
    let mainBackground = document.querySelector('.background');
    let containerBackground = document.querySelector('.container__top_background');
    let changeNameSinger = document.querySelector('.name__singer');
    let changeNameMusic = document.querySelector('.name__music');

    let nameSinger = playList[playNum].split('-').map((name, index) => {
        if (index === 1) return 0;
        return name.split('_')
            .join(' ')
            .trim()
    })
    let nameMusic = playList[playNum].split('-').map((name, index) => {
        if (index === 0) return 0;
        return name.split('_')
            .join(' ')
            .trim()
    })

    changeNameSinger.innerHTML = nameSinger[0]
    changeNameMusic.innerHTML = nameMusic[1]
    mainBackground.src = `./assets/img/${playList[playNum].split('_')[0]}.png`;
    containerBackground.src = `./assets/img/${playList[playNum].split('_')[0]}.png`;
}

playStopSwitch.addEventListener('click', checkPlay);
progress.addEventListener('change', changeProgress);
backward.addEventListener('click', backwardMusic);
forward.addEventListener('click', forwardMusic);


















