class MainRandomRectangles {
  constructor() {
    this._numberRects = 30;
    this._rects = [];
  }
  
  /**
   * Pour générer des éléments aléatoires.
   * @param {Number} min 
   * @param {Number} max 
   */
  randRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Pour générer une couleur aléatoire.
   */
  randomColor(){
    return "#" + Math.round(Math.random() * 0xFFFFFF).toString(16);
  }

  /**
   * Génère un objet rectangle avec coordonnées et tailles aléatoires.
   */
  randRect = () => {
    let w = this.randRange (30, 100);
    let h = this.randRange (30, 100);
    return {
      w,
      h,
      x : this.randRange (0, document.body.clientWidth - w),
      y : this.randRange (0, document.body.clientHeight - h)
    }; 
  }
  
  /**
   * Vérifie si un rectangle chevauche un autre.
   * @param {Object} r1
   * @param {Object} r2
   * @returns true quand 2 rectangles se touchent, sinon false
   */
  hitTest = (r1, r2) => {
    return (((r1.x + r1.w >= r2.x) && (r1.x <= r2.x + r2.w)) && ((r1.y + r1.h >= r2.y) && (r1.y <= r2.y + r2.h)));
  }

  /**
   * Vérifie la collision entre rect et tous les rectangles déjà sur la page.
   * @param {Object} rect - rectangle qui va être potentiellement ajouté.
   * @returns false si aucun rectangle ne rentre en collision avec rect, sinon true.
   */
  hitTestAll(rect){
    return this._rects.some(e => this.hitTest(rect, e));
  }

  /**
   * Pour créer des rectangles.
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} w 
   * @param {Number} h 
   */
  factory(x, y, w, h) {
    var element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = w + "px";
    element.style.height = h + "px";
    element.style.left = x + "px";
    element.style.top = y + "px";
    element.style.backgroundColor = this.randomColor();
    document.body.appendChild(element);
  }

  clean() {
    while(document.body.childNodes.length) document.body.removeChild(document.body.firstChild);
  }
  
  draw() {
    for(let i = 0; i < this._numberRects; i++) {
      let newRect = this.randRect();
      while(this.hitTestAll(newRect))
        newRect = this.randRect();
      
      this.factory(newRect.x, newRect.y, newRect.w, newRect.h);
      this._rects.push(newRect);
    }
  }
}