class TRex {
  constructor(background, state, jumpHight, jumpCounter) {
    this.sprites = [];
    this.state = state;
    this.isDead = false;
    this.jump = false;
    this.jumpCounter = jumpCounter;
    this.jumpHight = jumpHight;
    this.down = false;
    this.posX = background.posX;
    this.posY = background.posY;
  }

  /**
   * Mise en place des sprites du dino.
   * @param {string} url - chemins des images.
   */
  setSprites(url) {
    return new Promise(resolve => {
      let sprite = document.createElement("img");
      sprite.setAttribute("src", url);
      sprite.onload = () => resolve(sprite);
    });
  }

  /**
   * Pour mettre la patte avant droite devant ou la patte avant gauche.
   */
  walk() {
    this.state = this.state ? 0 : 1;
    return this.state ? 1 : 0;
  }

  duck() {
    this.state = this.state == 3 ? 4 : 3;
    return this.state == 3 ? 3 : 4;
  }

  /**
   * Retourne le sprite du TRex sans mouvement.
   */
  stand() {
    return 2;
  }

  dead() {
    this.isDead = true;
    return 5;
  }
}