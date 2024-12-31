import './style.css'
import createLandingPage from './landingPage.js';
import soundOn from './assets/soundOn.svg';
import soundOff from './assets/soundOff.svg';
import soundtrack from './assets/soundtrack.mp3';
import chooseShipPage from './chooseShipPage.js';
import placeShips from './placeShips.js';
import gamePage from './gamePage.js';
let name;
let game;
function initWebsite() {
    const landingPage = createLandingPage();
    const body = document.querySelector('body');
    const sound = document.createElement('audio');
    sound.src = soundtrack;
    sound.id = 'soundtrack';
    sound.loop = true;
    sound.autoplay = true;
    body.appendChild(sound);
    body.appendChild(landingPage);
    addEventListeners()
}

function addEventListeners() {
    const nameSubmit = document.getElementById('nameSubmit');
    const nameInput = document.getElementById('name');
    const soundToggle = document.getElementById('soundToggle');
    nameSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        name = nameInput.value;
        const body = document.querySelector('body');
        body.innerHTML = '';
        body.appendChild(chooseShipPage());
        addResetListener();
        game = await placeShips(document.getElementById('shipToBeChosen'), name);
        addStartButtonListener();
    });
    soundToggle.addEventListener('click', () => {
        const soundIcon = document.getElementById('soundToggle');
        const sound = document.getElementById('soundtrack');
        if (sound.paused) {
            sound.play();
            soundIcon.src = soundOn;
        } else {
            sound.pause();
            soundIcon.src = soundOff;
        }
    });
}

function addStartButtonListener() {
        const startGame = document.getElementById('startGame');
        startGame.addEventListener('click', () => {
            console.log('start');
            const body = document.querySelector('body');
            body.innerHTML = '';
            body.appendChild(gamePage(game));
        });
}

function addResetListener() {
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        window.location.reload();
    });
}

initWebsite();


