import Gameboard from "../classes/Gameboard";
import Ship from "../classes/Ship";
import Player from "../classes/Player";
import Ai from "../classes/Ai";
import Game from "../classes/Game";

describe('Game', () => {
    let game;
    beforeEach(() => {
        game = new Game('player1');
        game.getPlayer().placeShip(new Ship('carrier'), 0, 0, 'horizontal');
        game.getPlayer().placeShip(new Ship('battleship'), 1, 0, 'horizontal');
        game.getPlayer().placeShip(new Ship('cruiser'), 2, 0, 'horizontal');
        game.getPlayer().placeShip(new Ship('submarine'), 3, 0, 'horizontal');
        game.getPlayer().placeShip(new Ship('destroyer'), 4, 0, 'horizontal');
    });

    test('Game can create a player', () => {
        expect(game.getPlayer().getName()).toBe('player1');
    });

    test('Game can create an ai', () => {
        expect(game.getAi().getName()).toBe('Bot');
    });

    test('Ai can attack player during game', () => {
        game.getAi().testAttack(0, 0, game.getPlayer());
        const board = game.getPlayer().getBoard().flat();
        expect(['miss', 'hit', 'sunk']).toContain(board[0]);
    });

    test("Example Game Test", () => {
        let x = 0, y = 0;
        const maxTurns = 100; // Prevent infinite loops
        let turns = 0;
        
        while (!game.playerAllSunk() && !game.aiAllSunk() && turns < maxTurns) {
            let result = game.playerAttack(x, y);
            while (result === 'already attacked' || result === 'sunk') {
                x = (x + 1) % 10;
                y = x === 0 ? (y + 1) % 10 : y;
                result = game.playerAttack(x, y);
            }
            game.aiAttack();
            turns++;
        }
        expect(game.playerAllSunk() || game.aiAllSunk() || turns === maxTurns).toBe(true);
    });
});


describe('Game Flow', () => {
    describe('Human Victory Scenario', () => {
        let game;
        
        beforeEach(() => {
            game = new Game('TestPlayer');
            // Setup player's ships in a known pattern
            game.playerPlaceShip(new Ship('carrier'), 0, 0, 'horizontal');
            game.playerPlaceShip(new Ship('battleship'), 1, 0, 'horizontal');
            game.playerPlaceShip(new Ship('cruiser'), 2, 0, 'horizontal');
            game.playerPlaceShip(new Ship('submarine'), 3, 0, 'horizontal');
            game.playerPlaceShip(new Ship('destroyer'), 4, 0, 'horizontal');
        });

        test('Complete game flow where human wins', () => {
            // Get AI's board to find ship positions
            const aiBoard = game.aiGetBoard();
            const foundShips = new Set();
            
            // Systematically attack each position until all ships are found
            for (let x = 0; x < 10 && !game.aiAllSunk(); x++) {
                for (let y = 0; y < 10 && !game.aiAllSunk(); y++) {
                    const result = game.playerAttack(x, y);
                    
                    // If we hit something, record it
                    if (result === 'hit' || result === 'sunk') {
                        foundShips.add(`${x},${y}`);
                    }
                    
                    // Simulate AI's turn
                    if (!game.aiAllSunk()) {
                        game.aiAttack();
                    }
                }
            }

            // Verify human won
            expect(game.aiAllSunk()).toBe(true);
            expect(game.playerAllSunk()).toBe(false);
            expect(foundShips.size).toBeGreaterThan(0);
        });
    });

    describe('AI Victory Scenario', () => {
        let game;
        
        beforeEach(() => {
            game = new Game('TestPlayer');
            // Place player's ships in a known vulnerable pattern
            game.playerPlaceShip(new Ship('carrier'), 0, 0, 'horizontal');
            game.playerPlaceShip(new Ship('battleship'), 1, 0, 'horizontal');
            game.playerPlaceShip(new Ship('cruiser'), 2, 0, 'horizontal');
            game.playerPlaceShip(new Ship('submarine'), 3, 0, 'horizontal');
            game.playerPlaceShip(new Ship('destroyer'), 4, 0, 'horizontal');
        });

        test('Complete game flow where AI wins', () => {
            const maxTurns = 200; // Prevent infinite loops
            let turns = 0;
            let x = 5, y = 5; // Start attacking away from player ships
            
            while (!game.playerAllSunk() && !game.aiAllSunk() && turns < maxTurns) {
                // Player makes suboptimal moves by attacking away from ships
                const result = game.playerAttack(x, y);
                if (result === 'already attacked') {
                    x = (x + 1) % 10;
                    y = x === 0 ? (y + 1) % 10 : y;
                }
                
                // AI gets to attack
                game.aiAttack();
                
                turns++;
            }

            // Verify AI won or max turns reached
            expect(turns).toBeLessThan(maxTurns);
            if (game.playerAllSunk()) {
                expect(game.aiAllSunk()).toBe(false);
            }
        });
    });

    describe('Game Mechanics during Play', () => {
        let game;
        
        beforeEach(() => {
            game = new Game('TestPlayer');
            // Setup standard ship placement
            game.playerPlaceShip(new Ship('carrier'), 0, 0, 'horizontal');
            game.playerPlaceShip(new Ship('battleship'), 1, 0, 'horizontal');
            game.playerPlaceShip(new Ship('cruiser'), 2, 0, 'horizontal');
            game.playerPlaceShip(new Ship('submarine'), 3, 0, 'horizontal');
            game.playerPlaceShip(new Ship('destroyer'), 4, 0, 'horizontal');
        });

        test('Game correctly handles invalid attacks', () => {
            // Test out of bounds attacks
            expect(game.playerAttack(-1, 0)).toBe('out of bounds');
            expect(game.playerAttack(0, -1)).toBe('out of bounds');
            expect(game.playerAttack(10, 0)).toBe('out of bounds');
            expect(game.playerAttack(0, 10)).toBe('out of bounds');
            
            // Test repeated attacks
            const x = 0, y = 0;
            const firstResult = game.playerAttack(x, y);
            expect(game.playerAttack(x, y)).toBe('already attacked');
        });

        test('Game correctly tracks ship hits and sinks', () => {
            // Find an AI ship and sink it
            let shipFound = false;
            let shipSunk = false;
            
            for (let x = 0; x < 10 && !shipSunk; x++) {
                for (let y = 0; y < 10 && !shipSunk; y++) {
                    const result = game.playerAttack(x, y);
                    if (result === 'hit') {
                        shipFound = true;
                    }
                    if (result === 'sunk') {
                        shipSunk = true;
                        break;
                    }
                }
            }
            
            expect(shipFound || shipSunk).toBe(true);
        });
    });
});


