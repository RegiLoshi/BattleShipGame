

const chooseShipPage = () => {
    const div = document.createElement('div');
    div.id = 'chooseShipPage';
    const title = document.createElement('h1');
    title.textContent = 'Place Your Ships';
    div.appendChild(title);
    const shipToBeChosen = document.createElement('div');
    shipToBeChosen.id = 'shipToBeChosen';
    const directionChoose = document.createElement('select');
    directionChoose.id = 'directionChoose';

    const optionHorizontal = document.createElement('option');
    optionHorizontal.value = 'horizontal';
    optionHorizontal.textContent = 'Horizontal';
    directionChoose.appendChild(optionHorizontal);

    const optionVertical = document.createElement('option');
    optionVertical.value = 'vertical';
    optionVertical.textContent = 'Vertical';
    directionChoose.appendChild(optionVertical);

    div.appendChild(directionChoose);
    const userGrid = document.createElement('div');
    userGrid.id = 'userGrid';
    userGrid.classList.add('grid');
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;
        userGrid.appendChild(cell);
    }
    div.appendChild(shipToBeChosen);
    div.appendChild(userGrid);
    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'buttonDiv';
    const startGame = document.createElement('button');
    startGame.id = 'startGame';
    startGame.textContent = 'Start Game';
    const resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.textContent = 'Reset';
    buttonDiv.appendChild(startGame);
    buttonDiv.appendChild(resetButton);
    div.appendChild(buttonDiv);
    return div;
}



export default chooseShipPage;