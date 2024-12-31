import canonLogo from './assets/canon.svg';
import shipLogo from './assets/ship-wreck.svg';
import seaLogo from './assets/sea.svg';
import bs_logo from './assets/bs_logo.png';
import canonHit from './assets/canonHit.mp3';
import winnerPage from './winnerPage.js';

const hitSound = new Audio(canonHit);

async function typeText(element, text, speed = 20) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}


const gamePage = (game) => {
    const gamePage = document.createElement('div');
    gamePage.id = 'gamePage';
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gameContainer';
    const img = document.createElement('img');
    img.src = bs_logo;
    img.alt = 'Battleship Logo';
    img.classList.add('animate__animated', 'animate__slideInUp');
    img.style.setProperty('--animate-duration', '3s');
    gamePage.appendChild(img);

    const moveInfo = document.createElement('div');
    moveInfo.id = 'moveInfo';
    const playerTurn = document.createElement('h2');
    playerTurn.id = 'playerTurn';
    const aiTurn = document.createElement('h2');
    aiTurn.id = 'aiTurn'
    moveInfo.append(playerTurn);
    moveInfo.append(aiTurn);
    gamePage.appendChild(moveInfo);


    const playerBoard = createBoard('playerBoard', game.player.getBoard(), game, true);
    const computerBoard = createBoard('computerBoard', game.ai.getBoard(), game, false);

    const playerBoardDiv = document.createElement('div');
    playerBoardDiv.id = 'playerBoardDiv';
    const playerTitle = document.createElement('h2');
    playerTitle.textContent = game.player.getName();
    playerBoardDiv.appendChild(playerTitle);
    playerBoardDiv.appendChild(playerBoard);

    const computerBoardDiv = document.createElement('div');
    computerBoardDiv.id = 'computerBoardDiv';
    const computerTitle = document.createElement('h2');
    computerTitle.textContent = 'Computer';
    computerBoardDiv.appendChild(computerTitle);
    computerBoardDiv.appendChild(computerBoard);

    const playerShips = createShipsDisplay(game.player.getShips(), 'playerShips');
    const computerShips = createShipsDisplay(game.ai.getShips(), 'computerShips');

    playerBoardDiv.appendChild(playerShips);
    computerBoardDiv.appendChild(computerShips);

    gameContainer.appendChild(playerBoardDiv);
    gameContainer.appendChild(computerBoardDiv);

    gamePage.appendChild(gameContainer);

    return gamePage;
}

function createBoard(id, board, game, isPlayerBoard) {
    const boardElement = document.createElement('div');
    boardElement.id = id;
    boardElement.classList.add('board');

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;

            const cellContent = board[i][j];
            updateCellDisplay(cell, cellContent, isPlayerBoard);

            if (!isPlayerBoard) {
                cell.addEventListener('click', () => handleCellClick(cell, game));
            }

            boardElement.appendChild(cell);
        }
    }

    return boardElement;
}

function createShipsDisplay(ships, id) {
    const shipsElement = document.createElement('div');
    shipsElement.id = id;
    shipsElement.classList.add('ships');

    ships.forEach(ship => {
        const shipElement = document.createElement('div');
        shipElement.textContent = ship.name;
        shipElement.dataset.name = ship.name;
        shipsElement.appendChild(shipElement);
    });

    return shipsElement;
}

function  handleCellClick(cell, game) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if(cell.classList.contains('hit') || cell.classList.contains('miss')) {
        return;
    }
    const playerResult = game.playerAttack(row, col);
    if(playerResult === 'already attacked') {
        return;
    }
    hitSound.play();
    setTimeout(async () => {
        const aiResult = game.aiAttack();
        hitSound.play();
        const playerTurn = document.getElementById('playerTurn');
        playerTurn.textContent = '';
        const aiTurn = document.getElementById('aiTurn');
        aiTurn.textContent = '';
        
        switch (playerResult) {
            case 'miss':
                await typeText(playerTurn,'You missed!');
                break;
            case 'hit':
                await typeText(playerTurn,'You hit a ship!');
                break;
            case 'sunk':
                await typeText(playerTurn,'You sunk a ship!');
                break;
            default:
                playerTurn.textContent = '';
        }
        switch (aiResult.result) {
            case 'miss':
                await typeText(aiTurn,'Computer missed!');
                break;
            case 'hit':
                await typeText(aiTurn,'Computer hit a ship!');
                break;
            case 'sunk':
                await typeText(aiTurn,'Computer sunk a ship!');
                break;
            default:
                aiTurn.textContent += '';
        }

        setTimeout(() => {
            updateGamePage(game);
        }, 500);
    }, 500);
}

function updateGamePage(game) {
    if (game.playerAllSunk()) {
        const body = document.querySelector('body');
        body.innerHTML = '';
        body.appendChild(winnerPage("Computer"));
        return;
    } else if (game.aiAllSunk()) {
        const body = document.querySelector('body');
        body.innerHTML = '';
        body.appendChild(winnerPage(game.player.getName()));
        return; 
    }

    updateBoard('playerBoard', game.player.getBoard(), true);
    updateBoard('computerBoard', game.ai.getBoard(), false);
    updateShips('playerShips', game.player.getShips());
    updateShips('computerShips', game.ai.getShips());
}

function updateBoard(boardId, board, isPlayerBoard) {
    const boardElement = document.getElementById(boardId);
    const cells = boardElement.getElementsByClassName('cell');

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cellIndex = i * 10 + j;
            const cell = cells[cellIndex];
            const cellContent = board[i][j];
            updateCellDisplay(cell, cellContent, isPlayerBoard);
        }
    }
}

function updateCellDisplay(cell, cellContent, isPlayerBoard) {
    cell.className = 'cell';
    cell.innerText = '';

    if (cellContent === 'miss') {
        const img = document.createElement('img');
        img.src = seaLogo;
        img.alt = 'miss';
        img.classList.add('gameIcons');
        cell.appendChild(img);
    } else if (cellContent === 'hit') {
        const img = document.createElement('img');
        img.src = canonLogo;
        img.alt = 'hit';
        img.classList.add('gameIcons');
        cell.appendChild(img);
    } else if (cellContent === 'sunk') {
        const img = document.createElement('img');
        img.src = shipLogo;
        img.alt = 'sunk';
        img.classList.add('gameIcons');
        cell.appendChild(img);
    } else if (isPlayerBoard && cellContent !== null) {
        cell.classList.add('ship');
    }
}

function updateShips(shipsId, ships) {
    const shipsElement = document.getElementById(shipsId);
    ships.forEach(ship => {
        const shipElement = shipsElement.querySelector(`[data-name="${ship.name}"]`);
        if (ship.isSunk()) {
            shipElement.classList.add('sunk');
        }
    });
}

export default gamePage;