import Ship from "./Ship.js";
import Player from "./Player.js";

class Ai extends Player {
    constructor() {
        super("Bot");
        this.lastHit = null;
        this.successfulHits = [];
        this.potentialTargets = [];
        this.huntMode = false;
    }

    placeShips() {
        const ships = [
            new Ship('carrier', 5),
            new Ship('battleship', 4),
            new Ship('cruiser', 3),
            new Ship('submarine', 3),
            new Ship('destroyer', 2)
        ];

        ships.forEach(ship => {
            let x, y, direction;
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            } while (!this.gameboard.canPlaceShip(ship, x, y, direction));

            this.gameboard.placeShip(ship, x, y, direction);
        });
    }

    getAdjacentSquares(x, y) {
        const adjacent = [
            { x: x-1, y: y },
            { x: x+1, y: y },
            { x: x, y: y-1 },
            { x: x, y: y+1 }
        ];
        
        return adjacent.filter(pos => 
            pos.x >= 0 && pos.x < 10 && 
            pos.y >= 0 && pos.y < 10 &&
            !this.isAlreadyTried(pos.x, pos.y)
        );
    }

    isAlreadyTried(x, y) {
        const cell = this.opponent.gameboard.board[x][y];
        return cell.hit;
    }

    updatePotentialTargets(x, y) {
        const adjacent = this.getAdjacentSquares(x, y);
        this.potentialTargets.push(...adjacent);
    }

    attack(player) {
        this.opponent = player;
        let x, y;
        let result;

        if (this.huntMode && this.potentialTargets.length > 0) {
            const target = this.potentialTargets.shift();
            x = target.x;
            y = target.y;
            
            result = player.gameboard.receiveAttack(x, y);
            
            if (result === 'hit' || result === 'sunk') {
                this.successfulHits.push({ x, y });
                this.updatePotentialTargets(x, y);
            }
            
            if (result === 'sunk') {
                this.huntMode = false;
                this.potentialTargets = [];
                this.successfulHits = [];
            }
        } else {
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                
                if (!this.isAlreadyTried(x, y)) {
                    result = player.gameboard.receiveAttack(x, y);
                    
                    if (result === 'hit') {
                        this.huntMode = true;
                        this.successfulHits.push({ x, y });
                        this.updatePotentialTargets(x, y);
                    }
                    break;
                }
            } while (true);
        }

        return { x, y, result };
    }

    receiveAttack(x, y) {
        return this.gameboard.receiveAttack(x, y);
    }

    testAttack(x, y, player) { // for testing purposes only not used in the production code
        return player.gameboard.receiveAttack(x, y);
    }

    getShips() {
        return this.gameboard.getShips();
    }

    getBoard() {
        return this.gameboard.getBoard();
    }

    getName() {
        return this.name;
    }

    allSunk() {
        return this.gameboard.allSunk();
    }
}

export default Ai;