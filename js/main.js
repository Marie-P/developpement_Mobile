window.addEventListener("load", () => new Main());

class Main {
  constructor(){
    this.controller = new Controller();
    this.controller.mainMenu();
  }
}

class Model {
  constructor(canvas, context) {
    this.btns = [];

    // Panolens
    this.panolens = new MainPanolens();

    // Three Js
    this.firstPersonControls = new MainFirstPersonControls();
    this.galleryThreeJs = new MainGalleryThreeJs();

    // Canvas
    this.artGallery = new MainArtGallery();
    this.trexGame = new MainTRex();
    this.randomRectangles = new MainRandomRectangles();
    this.imagesTransition = new MainImageTransition();
  }
}

class View {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.context = this.canvas.getContext("2d");
  }
}

class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model(this.view.canvas, this.view.context);
  }

  mainMenu() {
    let btns = [], 
        sectionNames = ["PANOLENS", "THREE JS", "CANVAS"],
        sectionFunction = [this.panolens, this.threejs, this.canvas];
    for (let i = 0; i < 3; i++) {
      let btn = this.mainMenuButtons(sectionNames[i], sectionFunction[i]);
      btns.push(btn);
    }
    this.model.btns = btns;
  }

  mainMenuButtons(sectionNames, sectionFunction) {
    let btn = document.createElement("button");
    btn.className = "mainThemes";

    let text = document.createTextNode(sectionNames);
    btn.appendChild(text);

    btn.addEventListener("click", sectionFunction.bind(this));
    document.body.appendChild(btn);
    return btn;
  }

  removeButtons() {
    this.model.btns.forEach(btn => {
      document.body.removeChild(btn);
    });

    this.model.btns = [];
  }

  panolens() {
    this.removeButtons();

    let btnsAttribute = [
      {sectionName:"Panolens.", function: this.launchPanolens}, 
      {sectionName:"Retour au menu principal.", function: this.backToMainMenu}
    ];

    this.addButtons(2, btnsAttribute);
  }

  threejs() {
    this.removeButtons();

    let btnsAttribute = [
      {sectionName:"First Person Controls.", function: this.launchFirstPersonControls}, 
      {sectionName:"Gallerie avec Three Js", function: this.launchMainGalleryThreeJs}, 
      {sectionName:"Retour au menu principal.", function: this.backToMainMenu}
    ];

    this.addButtons(3, btnsAttribute);
  }

  canvas() {
    this.removeButtons();

    let btnsAttribute = [
      {sectionName:"Galerie d'image.", function: this.launchImageGallery}, 
      {sectionName:"TRex Game.", function: this.launchTRexGame},
      {sectionName:"Rectangles aléatoires.", function: this.launchRandomRectangles}, 
      {sectionName:"Transition d'images.", function: this.launchImagesTransition},
      {sectionName:"Retour au menu principal.", function: this.backToMainMenu}
    ];

    this.addButtons(5, btnsAttribute);
  }

  addButtons(nbBtns, btnsAttribute) {
    for (let i = 0; i < nbBtns; i++) {
      let btn = document.createElement("button");
      btn.className = "exercices";
      let text = document.createTextNode(btnsAttribute[i].sectionName);
      btn.appendChild(text);
      this.model.btns.push(btn);
      btn.addEventListener("click", btnsAttribute[i].function.bind(this));
      document.body.appendChild(btn);
    }
  }

  backToMainMenu() {
    this.removeButtons();
    this.mainMenu();
  }

  backToExercicesMenu (exercicesMenu){
    this.removeButtons();
    this.model.firstPersonControls.stop();
    this.model.trexGame.stop();
    this.model.galleryThreeJs.stop();
    this.model.artGallery.stop();
    this.model.randomRectangles.clean();
    switch(exercicesMenu){
      case "panolens":
        this.panolens();
        break;
      case "threejs":
        this.threejs();
        break;
      case "canvas":
        this.canvas();
        break;
    } 
  }

  /**
   * Pour enlever les boutons liés aux exercices et ajouter la flèche de retour.
   */
  initLauchTools(exercicesMenu) {
    this.removeButtons();

    let backArrowBtn = document.createElement("button");
    let backArrow = new Image();
    backArrow.src = "./assets/arrow_left.png";

    backArrowBtn.appendChild(backArrow);

    this.model.btns.push(backArrowBtn);

    backArrowBtn.addEventListener("click", event => this.backToExercicesMenu(exercicesMenu));
    document.body.appendChild(backArrowBtn);
  }

  launchPanolens(){
    this.initLauchTools("panolens");
    this.model.panolens.start();
  }

  launchFirstPersonControls() {
    this.initLauchTools("threejs");
    this.model.firstPersonControls.load();
  }
  
  launchMainGalleryThreeJs() {
    this.initLauchTools("threejs");
    this.model.galleryThreeJs.load();
  }

  launchImageGallery() {
    this.initLauchTools("canvas");
    this.model.artGallery.load();
  }

  launchTRexGame() {
    this.initLauchTools("canvas");
    this.model.trexGame.load();
  }

  launchRandomRectangles() {
    this.initLauchTools("canvas");
    this.model.randomRectangles.draw();
  }

  launchImagesTransition() { 
    this.initLauchTools("canvas");
    this.model.imagesTransition.load();
  }
}