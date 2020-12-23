class MainTRex {
  constructor() {
    this.controller = new ControllerTRex();
    this._loop = null;
    
    window.addEventListener("keydown", event => this.controller.keydownFunction(event));
    window.addEventListener("keyup", event => this.controller.keyupFunction(event)) ;
  }

  async load() {
    let urls = [
      "./assets/3.3_Chrome_T_Rex/dino_Run_01.png", 
      "./assets/3.3_Chrome_T_Rex/dino_Run_02.png", 
      "./assets/3.3_Chrome_T_Rex/dino_Stand.png", 
      "./assets/3.3_Chrome_T_Rex/duck1.png", 
      "./assets/3.3_Chrome_T_Rex/duck2.png", 
      "./assets/3.3_Chrome_T_Rex/dead.png"];
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