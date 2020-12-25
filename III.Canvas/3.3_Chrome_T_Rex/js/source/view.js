class View {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 1000;
    this.canvas.height = 400;
  }

  /**
   * Permet de dessiner l'image en fonction de ses coordonnées.
   * @param {Object} pic - image créer au préalable avec image et coordonnées.
   * @param {Number} sx - pour récupérer l'image à partir de la coordonnée en haut à gauche.
   * @param {Number} dx - à partir d'où le sol va être déssiné.
   */
  toDrawGround(model, sx, dx) {
    this.context.drawImage(
      model.background.ground,
      sx, 0,
      this.canvas.width, model.background.ground.height,
      dx, (model.background.posY - 20) + model.TRex.sprites[0].height,
      this.canvas.width, model.background.ground.height
    );
  }

  /**
   * Transition entre la fin et le début de l'image du sol.
   * @param {Model} model 
   */
  resetGround(model) {
    let diff = ((model.background.xToMoveGround + model.vitesse) - model.background.ground.width),
          x = diff < 0 ?  (- 20 + model.background.posX) - diff : model.background.posX;
    this.toDrawGround(model, model.background.posX, x);
    model.background.xToMoveGround = x != model.background.posX ? model.background.xToMoveGround + model.vitesse : model.background.posX;
  }

  /**
   * 
   * @param {Model} model 
   */
  drawGround(model) {
    this.toDrawGround(model, model.background.xToMoveGround, model.background.posX);
    if(model.background.xToMoveGround >= model.background.ground.width - this.canvas.width ){
      this.resetGround(model);
    }
    else{
      model.background.xToMoveGround += model.vitesse;
    }
  }

  drawCactusSet(model) {
    for (let i = 0; i < model.background.cactusSet.length; i++) {
      let posY = model.background.cactusSet[i].sprite.height < 99 ? model.background.cactusSet[i].posY + 30 : model.background.cactusSet[i].posY;
      if(model.background.cactusSet[i].posX >= model.background.posX)
        this.context.drawImage(model.background.cactusSet[i].sprite, model.background.cactusSet[i].posX, posY);
      model.background.cactusSet[i].posX -= model.vitesse;
      if(model.background.cactusSet[i].posX < model.background.cactusSet[i].posX - (this.canvas.width * 2))
        model.background.cactusSet.splice(i, 1);
    }
  }

  drawABird(bird) {
    let sprite = bird.fly();
    this.context.drawImage(bird.sprites[sprite], bird.posX, bird.posY + 50);
  }

  drawBirds(model){
    for (let i = 0; i < model.background.birds.length; i++) {
      if(model.background.birds[i].posX >= model.background.posX)
        this.drawABird(model.background.birds[i])
      model.background.birds[i].posX -= model.vitesse + model.vitesse;
      if(model.background.birds[i].posX < model.background.birds[i].posX - (this.canvas.width * 2))
        model.background.birds.splice(i, 1);
    }
  }

  drawCloud(model) {
    for (let i = 0; i < model.background.clouds.length; i++) {
      this.context.drawImage(model.background.clouds[i].sprite, model.background.clouds[i].posX, model.background.clouds[i].posY);
      model.background.clouds[i].posX -= model.vitesse;
      if(model.background.clouds[i].posX < model.background.clouds[i].posX -  (this.canvas.width * 2))
        model.background.clouds.splice(i, 1);
    }
  }

  /**
   * Dessine le TRex en fonction de son état.
   * @param {Model} model 
   */
  drawTRex(model){ 
    let sprite;
    if(!model.keepPlaying && model.TRex.isDead) 
      sprite = model.TRex.dead();
    else
      sprite = model.TRex.down ? 
              model.TRex.duck() : model.TRex.jump ? 
                                  model.TRex.stand() : model.keepPlaying ? 
                                                        model.TRex.walk() : model.TRex.stand();
    if(model.TRex.down)
      this.context.drawImage(model.TRex.sprites[sprite], model.TRex.posX, model.TRex.posY + 40);
    else
      this.context.drawImage(model.TRex.sprites[sprite], model.TRex.posX, model.TRex.posY);
  }

  drawScore(model){
    this.context.font = '12px serif';
    this.context.fillText(model.score, this.canvas.width - 100, 100);
  
    if(model.bestScore){
      this.context.fillText("HI " + model.bestScore, this.canvas.width - 200, 100);
    }
  }

  draw(model){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawCloud(model);
    this.drawCactusSet(model);
    this.drawBirds(model);
    this.drawGround(model);
    this.drawTRex(model);
    this.drawScore(model);
  }
}