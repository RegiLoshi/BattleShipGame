import Gameboard from "./Gameboard.js";

class Player {
    constructor(name) {
        this.gameboard = new Gameboard();
        this.name = name;
    }

    placeShip(ship, x, y, direction) {
        return this.gameboard.placeShip(ship, x, y, direction);
    }

    receiveAttack(x, y) {
        return this.gameboard.receiveAttack(x, y);
    }

    attack(ai, x, y) {
        return ai.receiveAttack(x, y);
    }

    getShips() {
        return this.gameboard.getShips();
    }

    allSunk() {
        return this.gameboard.allSunk();
    }

    getBoard() {
        return this.gameboard.getBoard();
    }

    getName() {
        return this.name;
    }
}

export default Player;