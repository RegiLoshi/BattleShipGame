import bs_logo from './assets/bs_logo.png';
const winnerPage = (winner) => {
    const winnerPage = document.createElement('div');
    winnerPage.id = 'winnerPage';
    const winnerContainer = document.createElement('div');
    winnerContainer.id = 'winnerContainer';
    const img = document.createElement('img');
    img.src = bs_logo;
    img.alt = 'Battleship Logo';
    img.classList.add('animate__animated', 'animate__slideInUp');
    img.style.setProperty('--animate-duration', '3s');
    winnerPage.appendChild(img);

    const winnerText = document.createElement('h2');
    winnerText.id = 'winnerText';
    winnerText.textContent = `${winner} Wins!`;
    winnerText.classList.add('animate__animated', 'animate__fadeIn');

    const playAgainButton = document.createElement('button');
    playAgainButton.id = 'playAgainButton';
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        window.location.reload();
    });
    winnerContainer.appendChild(winnerText);
    winnerContainer.appendChild(playAgainButton);
    winnerPage.appendChild(winnerContainer);

    return winnerPage;
}

export default winnerPage;