class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () =>
            Array(10).fill().map(() => ({ ship: null, hit: false, sunk: false }))
        );
        this.ships = [];
    }

    getBoard() {
        return this.board.map(row =>
            row.map(cell => {
                if (cell.sunk) return 'sunk';
                if (cell.hit) return cell.ship ? 'hit' : 'miss';
                return cell.ship || 0;
            })
        );
    }

    placeShip(ship, x, y, direction) {
        if (!this.canPlaceShip(ship, x, y, direction)) return false;
        
        if (direction === 'horizontal') {
            for (let i = 0; i < ship.getLength(); i++) {
                this.board[x][y + i].ship = ship;
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.getLength(); i++) {
                this.board[x + i][y].ship = ship;
            }
        }
        this.ships.push(ship);
        return true;
    }

    receiveAttack(x, y) {
        if(x < 0 || x > 9 || y < 0 || y > 9) return 'out of bounds';
        const cell = this.board[x][y];
        if (cell.hit === true) return 'already attacked';
        
        cell.hit = true;
        
        if (!cell.ship) return 'miss';
        
        cell.ship.hit();
        if (cell.ship.isSunk()) {
            this.markShipAsSunk(cell.ship);
            this.ships = this.ships.filter(s => s !== cell.ship);
            return 'sunk';
        }
        return 'hit';
    }

    markShipAsSunk(ship) {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j].ship === ship) {
                    this.board[i][j].sunk = true;
                }
            }
        }
    }

    canPlaceShip(ship, x, y, direction) {
        if (direction === 'horizontal') {
            if (y + ship.getLength() > 10) return false;
            
            for (let i = 0; i < ship.getLength(); i++) {
                if (this.board[x][y + i].ship) return false;
            }
        } else if (direction === 'vertical') {
            if (x + ship.getLength() > 10) return false;
            
            for (let i = 0; i < ship.getLength(); i++) {
                if (this.board[x + i][y].ship) return false;
            }
        }
        return true;
    }

    allSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    getShips() {
        return this.ships;
    }

}

export default Gameboard;