window.addEventListener("load", () => new Main());

class Main {
  constructor() {
    this.controller = new Controller();
    this._loop = null;
    this.load();

    window.addEventListener("keydown", event => this.controller.keydownFunction(event));
    window.addEventListener("keyup", event => this.controller.keyupFunction(event)) ;
  }

  async load() {
    let urls = [
      "./assets/dino_Run_01.png", 
      "./assets/dino_Run_02.png", 
      "./assets/dino_Stand.png", 
      "./assets/duck1.png", 
      "./assets/duck2.png", 
      "./assets/dead.png"];
    for(let src of urls) this.controller.model.TRex.sprites.push(await this.controller.model.TRex.setSprites(src));
    this.controller.view.drawTRex(this.controller.model); 
    document.body.appendChild(this.controller.view.canvas);
    this.start();
  }

  /**
   * Démarrage du programme avec comme pointeur la fonction loop.
   */
  start() {
    this._loop = window.setInterval(stamp => this.controller.loop(stamp), 100);
  }

   /**
   * Arrêt de l'appelle en boucle de la fonction loop.
   */
  stop() {
    window.clearInterval(this._loop);
  }
}