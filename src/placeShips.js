import Ship from './classes/Ship.js';
import Game from './classes/Game.js';
let game;

const ships = [
    {
        name: 'Carrier',
        length: 5
    },
    {
        name: 'Battleship',
        length: 4
    },
    {
        name: 'Cruiser',
        length: 3
    },
    {
        name: 'Submarine',
        length: 3
    },
    {
        name: 'Destroyer',
        length: 2
    }
];


async function placeShips(shipToBeChosen, name) {
    game = new Game(name);
    for (const ship of ships) {
        const shipObj = new Ship(ship.name);
        shipToBeChosen.innerHTML = '';
        await waitForGridClick(shipObj, shipToBeChosen);
        const cell = document.getElementsByClassName('cell');
        for (const c of cell) {
            c.classList.remove('invalid');
        }
    }
    const shipDiv = document.getElementsByClassName('ship-div')[0];
    shipDiv.innerHTML = '';
    return game;
}

function waitForGridClick(ship, shipToBeChosen) {
    return new Promise((resolve) => {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('ship-div');
        const shipName = document.createElement('p');
        shipName.textContent = ship.getTypeOfShip().toUpperCase();
        const shipLength = document.createElement('p');
        shipLength.textContent = ship.getLength();
        shipDiv.appendChild(shipName);
        shipDiv.appendChild(shipLength);
        shipDiv.classList.add('ship');
        shipToBeChosen.appendChild(shipDiv);

        const cells = document.getElementsByClassName('cell');
        const handleClick = (event) => {
            const directionChoose = document.getElementById('directionChoose').value;
            event.preventDefault();
            
            const id = parseInt(event.target.id, 10);
            const gridWidth = 10;
            const row = Math.floor(id / gridWidth);
            const col = id % gridWidth;

            if(!game.player.gameboard.canPlaceShip(ship, row, col, directionChoose)){
                cells[id].classList.add('invalid');
            }

            if (game.playerPlaceShip(ship, row, col, directionChoose)) {
                for (let i = 0; i < ship.length; i++) {
                    if (directionChoose === 'horizontal') {
                        cells[id + i].classList.add('ship-placed');
                    } else if (directionChoose === 'vertical') {
                        cells[id + i * gridWidth].classList.add('ship-placed');
                    }
                }
                for (const cell of cells) {
                    cell.removeEventListener('click', handleClick);
                }
                resolve();
            }
        };

        

        for (const cell of cells) {
            cell.addEventListener('click', handleClick);
        }
    });
}



export default placeShips;