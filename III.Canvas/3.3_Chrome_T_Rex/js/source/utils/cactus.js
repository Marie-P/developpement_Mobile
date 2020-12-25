class Cactus {
  constructor(posX, posY) {
    this.sprite = new Image();
    this.sprite.src = Math.floor(Math.random() * 2) ? "./assets/cactus1.png" : "./assets/cactus2.png"
    this.posX = posX;
    this.posY = posY;
  }
}