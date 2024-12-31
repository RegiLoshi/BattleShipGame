import Ship from '../classes/Ship'

describe('Ship class', () => {
    let ship;
    
    beforeEach(() => {
        ship = new Ship('battleship');
    });
    
    test('Ship class should be defined', () => {
        expect(ship).toBeDefined();
    });
    
    test('Ship class should have a length property', () => {
        expect(ship.length).toBe(4);
    });
    
    test('Ship class should have a typeOfShip property', () => {
        expect(ship.typeOfShip).toBe('battleship');
    });
    
    test('Ship class should have a numberOfHits property', () => {
        expect(ship.numberOfHits).toBe(0);
    });
    
    test('Ship class should have a hit method', () => {
        ship.hit();
        expect(ship.numberOfHits).toBe(1);
    });
    
    test('Ship class should have a isSunk method', () => {
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
    
    test('Ship class should have a getTypeOfShip method', () => {
        expect(ship.getTypeOfShip()).toBe('battleship');
    });
    
    test('Ship class should have a getLength method', () => {
        expect(ship.getLength()).toBe(4);
    });
    
    test('Ship class should have a getNumberOfHits method', () => {
        expect(ship.getNumberOfHits()).toBe(0);
    });
    });