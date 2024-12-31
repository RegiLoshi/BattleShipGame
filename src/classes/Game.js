
import Player from "./Player.js";
import Ai from "./Ai.js";

class Game{
    constructor(name){
        this.player = new Player(name || 'Player');
        this.ai = new Ai();
        this.ai.placeShips();
    }

    getPlayer(){
        return this.player;
    }

    getAi(){
        return this.ai;
    }

    playerAttack(x, y){
        return this.player.attack(this.ai, x, y);
    }

    aiAttack(){
        return this.ai.attack(this.player);
    }

    playerAllSunk(){
        return this.player.allSunk();
    }

    aiAllSunk(){
        return this.ai.allSunk();
    }

    playerPlaceShip(ship, x, y, direction){
        return this.player.placeShip(ship, x, y, direction);
    }

    aiPlaceShip(){
        return this.ai.gameboard.placeShips();
    }

    playerGetBoard(){
        return this.player.getBoard();
    }

    aiGetBoard(){
        return this.ai.getBoard();
    }

    playerGetShips(){
        return this.player.getShips();
    }

    aiGetShips(){
        return this.ai.getShips();
    }

    playerGetName(){
        return this.player.getName();
    }

    aiGetName(){
        return this.ai.getName();
    }

    playerGetBoard(){
        return this.player.getBoard();
    }

    aiGetBoard(){
        return this.ai.getBoard();
    }
}

export default Game;