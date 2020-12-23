class MainImageTransition {
  constructor() {
    this._width = document.body.clientWidth;
    this._height = 720;
    this._picWidth = 3840;
    this._picHeight = 2160;
    this._ratio = this._picWidth/this._width;
    this._size = 80;
    this._tileX = this._width/this._size;
    this._tileY = this._height/this._size;

    this._canvas = document.createElement("canvas");
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._ctx = this._canvas.getContext("2d");

    this._loop = null;
    this._frame = 0;
    this._nbPics = 5;
    this._pics = [];
    this._delays = [];
    this._choosenPic = 0;
    this._end = false;
    this._newAnim = false;
    this._init = false;

    this._canvas.addEventListener("click", event => this.onClick(event));
  }
  
  /**
   * Méthode pour le chargement des images.
   */
  async load() {
    let urls = this.setUrls();
    for(let src of urls) 
      this._pics.push(await this.pics(src));
    this.start();
  }

  /**
   * Pour récupérer tous les urls.
   */
  setUrls() {
    let urls = [];
    for (let i = 1; i < 5; i++) 
      urls.push("assets/3.6_image_Transition/"+i+".jpg");
    return urls;
  }

  /**
   * Charger une image à partir du chemin.
   * @param {string} url - chemin de l'image.
   */
  pics(url) {
    return new Promise(resolve => {
      let img = document.createElement("img");
      img.setAttribute("src", url);
      img.onload = () => resolve(img);
    })
  }

  /**
   * Méthode liée au click sur le canvas.
   * @param {MouseEvent} event - représente l'événement de click.
   */
  onClick(event) {
    if(!this._newAnim){
      this._end = false;
      this._newAnim = true;
      
      // Add Delays 
      let ratio = 0.09;
      this._delays = [];

      for (let x = 0; x < this._tileX; x++) {
        for (let y = 0; y < this._tileY; y++) {
          let endX = x * this._size + this._size/2,
              endY = y * this._size + this._size/2;
          let distance = this.calculateDistanceOfPoints(endX, endY, event.clientX, event.clientY);
          this._delays.push(distance * ratio);
        }
      }
      this.start();
    }
  }

  /**
   * Calcule la distance pour chaque coordonnée en fonction de la position du click.
   * @param {Number} x - abscisse final.
   * @param {Number} y - ordonnée final.
   * @param {Number} x0 - abscisse du click.
   * @param {Number} y0 - ordonnée du click.
   */
  calculateDistanceOfPoints(x, y, x0, y0) {
    return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
  }

  /**
   * Pour récupérer l'image avant celle en cours.
   */
  previousImage() {
    return this._choosenPic == 0 ? this._pics.length - 1 : this._choosenPic - 1;
  }

  /**
   * Enregistre le numéro de l'image suivante ou repars de 0.
   */
  nextImage() {
    this._choosenPic = this._choosenPic == this._pics.length - 1 ? 0 : this._choosenPic + 1;
  }

  /**
   * Permet d'arrêter, ou non, l'animation
   * @param {Number} count 
   */
  isItEndTransition(count) {
    if(count >= this._tileX * this._tileY) {
      this.nextImage();
      this._newAnim = false;
      this._frame = 0;
      this._end = true;
    }
  }

  /**
   * Pour réaliser l'animation.
   */
  transition() {
    let count = 0;
    let frequency = .03;
    for (let x = 0; x < this._tileX; x++) {
      for (let y = 0; y < this._tileY; y++) {
        let cSize = this._size * Math.sin(frequency * (this._frame - this._delays[x * this._tileY + y]));

        if(this._frame >= this._delays[x * this._tileY + y]) {
          if(!(frequency * (this._frame - this._delays[x * this._tileY + y]) < Math.PI/2)) {
            count++;
            cSize = this._size;
          }

          let centerX = x * this._size + this._size/2,
              centerY = y * this._size + this._size/2,
              tileX = centerX - cSize/2,
              tileY = centerY - cSize/2;
          
          this._ctx.drawImage(
            this._pics[this._choosenPic],
            tileX * this._ratio, tileY * this._ratio,
            cSize * this._ratio, cSize * this._ratio,
            tileX, tileY,
            cSize, cSize
          )
        }
      }
    }
    return count;
  }

  /**
   * Dessin dans le canvas + vérification de la fin de l'animation.
   */
  draw() {
    this._ctx.drawImage(
      this._pics[this.previousImage()],
      0, 0,
      this._picWidth, this._picHeight,
      0, 0,
      this._width, this._height
    )
    
    if(!this._init) {
      this._init = true;
      this._end = true;
    }
    else {
      let count = this.transition();
      this.isItEndTransition(count);
    }
  }

  /**
   * Démarrage du programme avec comme pointeur la fonction loop.
   */
  start() {
    document.body.appendChild(this._canvas);
    this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));
  }

  /**
   * Arrêt de l'appel en boucle de la fonction loop.
   */
  stop() {
    window.cancelAnimationFrame(this._loop);
  }

  /**
   * Boucle de frame.
   * @param {Number} stamp - pour pointer la fonction.
   */
  loop(stamp) {
    if(this._end)
      stop();
    else {
      this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));
      this._frame++;
      this._ctx.clearRect(0, 0, this._width, this._height);
      this.draw();
    }
  }
}