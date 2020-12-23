class MainArtGallery {
	constructor() {
    this._canvas = document.createElement("canvas");
    this._canvas.width = document.body.clientWidth;
    this._canvas.height = document.body.clientHeight;
    this._ctx = this._canvas.getContext("2d");

    this._pics = [];
    this._nbPics = 30;
    this._frame = 0;
    this._speed = 0.2;
    this._frequency = 0.005;

    this._loop = null;
	}

  /**
   * Méthode pour le chargement des images.
   */
	async load() {
    let urls = this.setUrls();
		for(let src of urls) {
      let pic = await this.pics(src);
      this._pics.push(this.setImage(pic));
    }
		this.start();
  }

  /**
   * Pour récupérer tous les urls.
   */
  setUrls(){
    let urls = [];
    for (let i = 1; i <= this._nbPics; i++) 
      urls.push("assets/3.2_Galerie_Images/"+i+".jpg");
		return urls;
  }
  
  /**
   * Pour associer des coordonnées à une image.
   * @param {Image} pic - source de l'image.
   */
  setImage(pic){
    return {
      image : pic, 
      x : this.randRange(0, document.body.clientWidth), 
      y : this.randRange(0, document.body.clientHeight), 
      yOrigin : this.randRange(0, document.body.clientHeight),
      amplitude : this.randRange(20, 50)
    }
  }

  /**
   * Charger une image à partir du chemin.
   * @param {string} url - chemin de l'image.
   */
	pics(url) {
		return new Promise (resolve => {
			let img = document.createElement("img");
			img.setAttribute("src", url);
			img.onload = () => resolve(img);
		})
  }
  
  /**
   * Permet de générer des éléments aléatoires.
   * @param {Number} min 
   * @param {Number} max 
   */
  randRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Les images avancent le long de l'abscisse en faisant une courbe sinusoïdale en y.
   */
  move() {
    for (let i = 0; i < this._pics.length; i++) {
      let yOriginCenter = this._pics[i].yOrigin/2;
      let newY = this._pics[i].amplitude * Math.sin(this._frequency * this._frame - yOriginCenter);
      this._pics[i].y = yOriginCenter - newY;
      this._pics[i].x = this._pics[i].x >= document.body.clientWidth - this._speed ? 0 : this._pics[i].x + this._speed;
    }
  }

  /**
   * Permet de dessiner l'image en fonction de ses coordonnées.
   * @param {Object} pic - image créer au préalable avec image et coordonnées.
   * @param {Number} sx - pour récupérer l'image à partir de la coordonnée en haut à gauche.
   * @param {Number} dx - pour placer le coin supérieur gauche.
   */
  drawImage(pic, sx, dx) {
    this._ctx.drawImage(
      pic.image,
      sx, 0,
      pic.image.width, pic.image.height,
      dx, pic.y,
      pic.image.width, pic.image.height
    );
  }

  /**
   * Pour dessiner toutes les images dans le canvas.
   */
	draw() {
    for (let i = 0; i < this._pics.length; i++) {
      if(this._pics[i].x + this._pics[i].image.width > document.body.clientWidth){
        let diffX = (this._pics[i].x + this._pics[i].image.width) - document.body.clientWidth;
        this.drawImage(this._pics[i], this._pics[i].image.width - diffX, 0);
      }
      this.drawImage(this._pics[i], 0, this._pics[i].x);
    }
  }
  
  /**
   * Boucle de frame.
   * @param {Number} stamp - pour pointer la fonction.
   */
	loop(stamp) {
    this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));
    this._frame++; 
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this.draw();
    this.move();
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
}