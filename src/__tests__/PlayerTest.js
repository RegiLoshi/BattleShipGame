import Gameboard from "../classes/Gameboard";
import Ship from "../classes/Ship";
import Player from "../classes/Player";

describe('Player', () => {
    let player;
    let ship;
    beforeEach(() => {
        player = new Player('player1');
        ship = new Ship('carrier');
    });

    test('Player can place a ship', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        expect(player.getBoard()).toEqual([
            [ship, ship, ship, ship, ship, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    });

    test('Player can receive an attack and return miss', () => {
        player.receiveAttack(0, 0);
        expect(player.getBoard()).toEqual([
            ['miss', 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    });

    test('Player can receive an attack and return hit', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        player.receiveAttack(0, 0);
        expect(player.getBoard()).toEqual([
            ['hit', ship, ship, ship, ship, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    });

    test('Player can receive an attack and return sunk', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        player.receiveAttack(0, 0);
        player.receiveAttack(0, 1);
        player.receiveAttack(0, 2);
        player.receiveAttack(0, 3);
        player.receiveAttack(0, 4);
        expect(player.getBoard()).toEqual([
            ['sunk', 'sunk', 'sunk', 'sunk', 'sunk', 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    });

    test('Player can check if all ships are sunk', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        player.receiveAttack(0, 0);
        player.receiveAttack(0, 1);
        player.receiveAttack(0, 2);
        player.receiveAttack(0, 3);
        player.receiveAttack(0, 4);
        expect(player.allSunk()).toBe(true);
    });

    test('Player can check if all ships are not sunk', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        player.receiveAttack(0, 0);
        player.receiveAttack(0, 1);
        player.receiveAttack(0, 2);
        expect(player.allSunk()).toBe(false);
    });

});
