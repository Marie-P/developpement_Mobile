class Bird {
  constructor(posX, posY) {
    this.sprites = [];
    this.state = 0;
    this.setSprites();
    this.posX = posX;
    this.posY = posY - 20;
  }

  setSprites(){
    let sprite1 = new Image(), sprite2 = new Image();
    sprite1.src = "./assets/bird1.png";
    sprite2.src = "./assets/bird2.png";
    this.sprites.push(sprite1, sprite2);
  }

  fly(){
    this.state = this.state ? 0 : 1;
    return this.state ? 1 : 0;
  }
}