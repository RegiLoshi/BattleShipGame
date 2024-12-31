import Gameboard from "../classes/Gameboard";
import Ship from "../classes/Ship";
import Player from "../classes/Player";
import Ai from "../classes/Ai";

describe('Ai', () => {
    let ai;
    let player;
    let ship;
    beforeEach(() => {
        ai = new Ai();
        player = new Player('player1');
        ship = new Ship('carrier');
    });

    test('Ai can place ships', () => {
        ai.placeShips();
        expect(ai.getShips().length).toBe(5);
    });

    test('Ai can attack player', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        ai.attack(player);
        expect(player.getBoard().flat()).toContain('miss' || 'hit' || 'sunk');
    });

    test('Ai can attack player and hit', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        ai.testAttack(0, 0, player);
        expect(player.getBoard().flat()).toContain('hit');
    });

    test("Ai can't attack the same spot twice", () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        ai.testAttack(0, 0, player);
        expect(ai.testAttack(0, 0, player)).toBe('already attacked');
    });

    test('Ai can attack player and sink ship', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        ai.testAttack(0, 0, player);
        expect(player.getBoard().flat()).toContain('sunk');
    });



    test('Ai can test attack', () => {
        player.placeShip(ship, 0, 0, 'horizontal');
        expect(ai.testAttack(0, 0, player)).toBe('hit');
    });

    test('Ai can return its name', () => {
        expect(ai.getName()).toBe('Bot');
    });

    test('Ai can check if all ships are sunk', () => {
        ai.placeShips();
        ai.getShips().forEach(ship => {
            ship.hit();
            ship.hit();
            ship.hit();
            ship.hit();
            ship.hit();
        });
        expect(ai.allSunk()).toBe(true);
    });

    test('Ai can return its board', () => {
        ai.placeShips();
        expect(ai.getBoard().length).toBe(10);
    });

    test('Ai can return its ships', () => {
        ai.placeShips();
        expect(ai.getShips().length).toBe(5);
    });
});