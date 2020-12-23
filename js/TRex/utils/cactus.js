class Cactus {
  constructor(posX, posY) {
    this.sprite = new Image();
    this.sprite.src = Math.floor(Math.random() * 2) ? "./assets/3.3_Chrome_T_Rex/cactus1.png" : "./assets/3.3_Chrome_T_Rex/cactus2.png"
    this.posX = posX;
    this.posY = posY;
  }
}