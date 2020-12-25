class Background {
  constructor(posX, posY) {
    this.ground = new Image();
    this.ground.src = "./assets/ground.png";
    this.cactusSet = [];
    this.birds = [];
    this.clouds = [];
    this.posX = posX;
    this.posY = posY;
    this.xToMoveGround = posX;
  }

  addCactus(width) {
    if(this.cactusSet.length == 0 || this.cactusSet[this.cactusSet.length - 1].posX < 0){
      let cactus = new Cactus(width, this.posY);
      this.cactusSet.push(cactus);
    }
  }

  addBird(width){
    if(this.cactusSet.length == 0 || this.cactusSet[this.cactusSet.length - 1].posX < 0){
      if(this.birds.length == 0 || this.birds[this.birds.length - 1].posX < 0) {
        let bird = new Bird(width, this.posY - 70);
        this.birds.push(bird);
      }
    }
  }

  addCloud(width){
    let cloud = new Cloud(width, this.posY - 90);
    if(this.clouds.length == 0 || this.clouds[this.clouds.length - 1].posX <= width - cloud.sprite.width)
      this.clouds.push(cloud); 
  }
}