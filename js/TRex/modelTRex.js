class ModelTRex {
  constructor(posX, posY, vitesse) {
    this.keepPlaying = false;
    this.background = new Background(posX, posY);
    this.vitesse = vitesse;
    this.TRex = new TRex(this.background, 0, 20, 0);
    this.bestScore = 0;
    this.score = 0;
  }
}