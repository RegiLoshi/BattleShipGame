import Gameboard from "../classes/Gameboard";
import Ship from "../classes/Ship"
describe('Gameboard', () => {
    let gameboard;
    let ship;
    beforeEach(() => {
        gameboard = new Gameboard();
        ship = new Ship('carrier');
    });

    test('Gameboard has a board', () => {
        expect(gameboard.getBoard()).toEqual(Array.from({ length: 10 }, () => Array(10).fill(0)));
    });

    test('Gameboard can place a ship horizontally', () => {
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        expect(gameboard.getBoard()).toEqual([
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

    test('Gameboard can place a ship vertically', () => {
        gameboard.placeShip(ship, 0, 0, 'vertical');
        expect(gameboard.getBoard()).toEqual([
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    });

    test('Gameboard can receive an attack and return miss', () => {
        gameboard.receiveAttack(0, 0);
        expect(gameboard.getBoard()).toEqual([
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

    test("Gameboard can receive an attack on a horizontal ship and return miss ", () => {
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        gameboard.receiveAttack(0, 5);
        expect(gameboard.getBoard()).toEqual([
            [ship, ship, ship, ship, ship, 'miss', 0, 0, 0, 0],
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

    test("Gameboard can receive an attack on a vertical ship and return miss ", () => {
        gameboard.placeShip(ship, 0, 0, 'vertical');
        gameboard.receiveAttack(5,0);
        expect(gameboard.getBoard()).toEqual([
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['miss', 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    });

    test("Gameboard can receive an attack on a vertical ship and return hit ", () => {
        gameboard.placeShip(ship, 0, 0, 'vertical');
        gameboard.receiveAttack(4,0);
        expect(gameboard.getBoard()).toEqual([
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["hit", 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
        expect(ship.getNumberOfHits()).toBe(1);
    });

    test("Gameboard can receive an attack on a horizontal ship and return hit ", () => {
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        gameboard.receiveAttack(0,4);
        expect(gameboard.getBoard()).toEqual([
            [ship, ship, ship, ship, "hit", 0, 0, 0, 0, 0],
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
        expect(ship.getNumberOfHits()).toBe(1);
    });

    test("Gameboard can receive an attack on a vertical ship and return sunk ", () => {
        gameboard.placeShip(ship, 0, 0, 'vertical');
        gameboard.receiveAttack(0,0);
        gameboard.receiveAttack(1,0);
        gameboard.receiveAttack(2,0);
        gameboard.receiveAttack(3,0);
        gameboard.receiveAttack(4,0);
        expect(gameboard.getBoard()).toEqual([
            ['sunk', 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['sunk', 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['sunk', 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['sunk', 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['sunk', 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);

        expect(ship.getNumberOfHits()).toBe(5);
        expect(gameboard.getShips()).toEqual([]);
    });

    test("Gameboard can receive an attack on a horizontal ship and return sunk ", () => {
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        gameboard.receiveAttack(0,0);
        gameboard.receiveAttack(0,1);
        gameboard.receiveAttack(0,2);
        gameboard.receiveAttack(0,3);
        gameboard.receiveAttack(0,4);
        expect(gameboard.getBoard()).toEqual([
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
        expect(ship.getNumberOfHits()).toBe(5);
        expect(gameboard.getShips()).toEqual([]);
    });

    test("Gameboard can check if all ships are sunk", () => {
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        gameboard.receiveAttack(0,0);
        gameboard.receiveAttack(0,1);
        gameboard.receiveAttack(0,2);
        gameboard.receiveAttack(0,3);
        gameboard.receiveAttack(0,4);
        expect(gameboard.allSunk()).toBe(true);
    });

    test("Gameboard can check if all ships are not sunk", () => {
        gameboard.placeShip(ship, 0, 0, 'horizontal');
        gameboard.receiveAttack(0,0);
        gameboard.receiveAttack(0,1);
        gameboard.receiveAttack(0,2);
        gameboard.receiveAttack(0,3);
        expect(gameboard.allSunk()).toBe(false);
    });


});