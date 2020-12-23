class ControllerTRex {
  constructor() {
    this.model = new ModelTRex(0, 200, 20);
    this.view = new ViewTRex();
  }

  keydownFunction(e) {
    switch(e.code) {
      case "Space":
        this.spaceEffect();
        break;
      case "ArrowDown":
        this.model.TRex.down = true;
        break;
    }
  }

  /**
   * Méthode exécutée lorsque qu'une touche est relâchée.
   */
  keyupFunction(e) {
    this.model.TRex.down = false;
    this.down = false;
  }

  reset() {
    this.model.background.cactusSet = []
    this.model.background.birds = []
    this.model.background.xToMoveGround = 0;
    this.model.TRex.jumpCounter = 0;
    this.model.TRex.jump = false;
    this.model.TRex.down = false;
    this.model.TRex.posY = this.model.background.posY;
  }

  spaceEffect() {
    if(!this.model.keepPlaying){
      if(!this.model.TRex.isDead)
        this.model.TRex.isDead = true;
      this.model.keepPlaying = true;
      this.reset();
    }
    else
      this.model.TRex.jump = true;
  }

  toJump() {
    if(this.model.TRex.jumpCounter == 9) {
      this.model.TRex.posY += this.model.TRex.jumpHight;
      this.model.TRex.jumpCounter = 0;
      this.model.TRex.jump = false;
    } else {
      this.model.TRex.jumpCounter++;
      this.model.TRex.posY = this.model.TRex.jumpCounter <= 5 ? 
                              this.model.TRex.posY - this.model.TRex.jumpHight : this.model.TRex.posY + this.model.TRex.jumpHight;
    }
  }

  addSet() {
    if(Math.floor(Math.random() * 10) == 1) 
      this.model.background.addCloud(this.view.canvas.width);
    if(Math.floor(Math.random() * 2) == 1)  
      this.model.background.addBird(this.view.canvas.width);
    else if(Math.floor(Math.random() * 2) == 1)  
      this.model.background.addCactus(this.view.canvas.width);
    
  }

  testCollision(TRexX, TRexY, object, sprite) {
    return TRexY >=  object.posY && (TRexX >= object.posX) && (TRexX <= (object.posX +  sprite.width));
  }

  isInCollision() {
    let bool = false;
    this.model.background.cactusSet.forEach(cactus => {
      if(this.testCollision(this.model.TRex.posX, this.model.TRex.posY, cactus, cactus.sprite))
      bool = true;
    });

    this.model.background.birds.forEach(bird => {
      if(this.model.TRex.down) {
        if(this.testCollision(this.model.TRex.posX, this.model.TRex.posY - 100, bird, bird.sprites[0]))
          bool = true;
      } else {
        if(this.testCollision(this.model.TRex.posX, this.model.TRex.posY, bird, bird.sprites[0]))
          bool = true;
      }
    });
    return bool;
  }

  canBeIncrease(){
    let score = this.model.score;
    while(score >= 10) {
      let unit = score % 10; 
      score  = (score - unit) / 10;
    }
    return this.model.score/100 == score ? true : false;
  }

  increaseSpead() {
    this.model.vitesse += 10;
  }

  /**
   * Boucle de frame.
   * @param {Number} stamp - pour pointer la fonction.
   */
  loop(stamp) {
    if(this.model.keepPlaying){
      this.view.draw(this.model);
      this.addSet();
      if(this.model.TRex.jump)
        this.toJump();
      this.model.score++;

      if(this.canBeIncrease())
        this.increaseSpead();
    }
    else{
      this.model.score = 0;
      this.model.vitesse = 20;
    }
    if(this.isInCollision() && this.model.keepPlaying){
      this.model.keepPlaying = false;
      if(this.model.bestScore < this.model.score)
        this.model.bestScore = this.model.score;
      this.view.draw(this.model);
    }
  }
}