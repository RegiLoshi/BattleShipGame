import bs_logo from './assets/bs_logo.png';
import soundOn_logo from './assets/soundOn.svg';
const createLandingPage = () => {
    const landingPage = document.createElement('div');
    landingPage.classList.add('landing-page');
    
    const img = document.createElement('img');
    img.src = bs_logo;
    img.alt = 'Battleship Logo';
    img.classList.add('animate__animated', 'animate__slideInUp');
    img.style.setProperty('--animate-duration', '3s');
    landingPage.appendChild(img);

    const nameForm = document.createElement('form');
    nameForm.classList.add('fade-in');
    const nameLabel = document.createElement('label');
    nameLabel.for = 'name';
    nameLabel.textContent = 'Enter your name:';
    nameForm.appendChild(nameLabel);
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true;
    nameForm.appendChild(nameInput);
    const submitButton = document.createElement('button');
    submitButton.id = 'nameSubmit';
    submitButton.type = 'submit';
    submitButton.textContent = 'Start Game';
    const soundIcon = document.createElement('img');
    soundIcon.id = 'soundToggle';
    soundIcon.src = soundOn_logo;
    soundIcon.alt = 'Sound Icon';

    nameForm.appendChild(submitButton);
    nameForm.appendChild(soundIcon);
    nameForm.classList.add('name-form');
    landingPage.appendChild(nameForm);

    
    return landingPage;
    }

export default createLandingPage;