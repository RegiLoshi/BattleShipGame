class Ship {
    constructor(typeOfShip) {
      this.typeOfShip = typeOfShip.toLowerCase();
      switch (typeOfShip.toLowerCase()) {
        case "carrier":
          this.length = 5;
          break;
        case "battleship":
          this.length = 4;
          break;
        case "cruiser":
          this.length = 3;
          break;
        case "submarine":
          this.length = 3;
          break;
        case "destroyer":
          this.length = 2;
          break;
        default:
          this.length = 0;
      }
      this.numberOfHits = 0;
    }
  
    hit() {
      this.numberOfHits++;
    }
  
    isSunk() {
      return this.numberOfHits >= this.length;
    }
  
    getTypeOfShip() {
      return this.typeOfShip;
    }
  
    getLength() {
      return this.length;
    }

    getNumberOfHits() {
      return this.numberOfHits;
    }
  }

export default Ship;