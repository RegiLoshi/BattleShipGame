import Game from './classes/Game.js';
import Ship from './classes/Ship.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class GameInterface {
    constructor() {
        this.game = null;
        this.ships = [
            'carrier',
            'battleship',
            'cruiser',
            'submarine',
            'destroyer'
        ];
        this.currentShipIndex = 0;
        this.messages = [];  // Array to store game messages
    }

    async start() {
        console.clear();
        console.log('Welcome to Battleship!');
        
        const name = await this.question('Enter your name: ');
        this.game = new Game(name);
        
        await this.placeShips();
        await this.playGame();
    }

    async placeShips() {
        console.log('\nTime to place your ships!');
        
        while (this.currentShipIndex < this.ships.length) {
            const shipType = this.ships[this.currentShipIndex];
            const ship = new Ship(shipType);
            
            console.log('\nCurrent board:');
            this.printBoard(this.game.playerGetBoard());
            
            console.log(`\nPlacing ${shipType} (length: ${ship.getLength()})`);
            
            const x = parseInt(await this.question('Enter row (0-9): '));
            const y = parseInt(await this.question('Enter column (0-9): '));
            const direction = await this.question('Enter direction (horizontal/vertical): ');

            if(direction !== 'horizontal' && direction !== 'vertical'){
                console.log('\nInvalid direction! Try again.');
                continue;
            }
            
            if (this.game.playerPlaceShip(ship, x, y, direction)) {
                this.currentShipIndex++;
            } else {
                console.log('\nInvalid placement! Try again.');
            }
        }
    }

    async playGame() {
        while (true) {
            console.clear();
            
            // Print game messages
            if (this.messages.length > 0) {
                console.log('\nLast turn results:');
                this.messages.forEach(msg => console.log(msg));
                this.messages = []; // Clear messages for next turn
            }
            
            console.log('\nOpponent\'s board:');
            this.printBoard(this.game.aiGetBoard(), true);
            
            console.log('\nYour board:');
            this.printBoard(this.game.playerGetBoard());
            
            // Player's turn
            const x = parseInt(await this.question('Enter attack row (0-9): '));
            const y = parseInt(await this.question('Enter attack column (0-9): '));

            if (x < 0 || x > 9 || y < 0 || y > 9 || isNaN(x) || isNaN(y)){
                console.log('\nInvalid coordinates! Try again.');
                continue;
            }
            
            const result = this.game.playerAttack(x, y);
            this.messages.push(`Your attack at (${x}, ${y}): ${result}`);
            
            if (this.game.aiAllSunk()) {
                console.log('\nCongratulations! You won!');
                break;
            }
            
            // AI's turn
            const aiMove = this.game.aiAttack();
            this.messages.push(`AI attacked position (${aiMove.x}, ${aiMove.y}): ${aiMove.result}`);
            
            if (this.game.playerAllSunk()) {
                console.log('\nGame Over! AI won!');
                break;
            }
            
            await this.question('\nPress Enter to continue...');
        }
        
        rl.close();
    }

    printBoard(board, hideShips = false) {
        console.log('   0 1 2 3 4 5 6 7 8 9');
        console.log('  ---------------------');
        
        board.forEach((row, i) => {
            let rowStr = `${i} |`;
            row.forEach(cell => {
                if (cell === 'hit') rowStr += 'X ';
                else if (cell === 'miss') rowStr += 'O ';
                else if (cell === 'sunk') rowStr += 'S ';
                else if (cell && !hideShips) rowStr += '# ';
                else rowStr += '~ ';
            });
            console.log(rowStr);
        });
    }

    question(query) {
        return new Promise(resolve => rl.question(query, resolve));
    }
}

// Start the game
const gameInterface = new GameInterface();
gameInterface.start();