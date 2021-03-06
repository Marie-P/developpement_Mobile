class MainPanolens {
  constructor() {
    this.loaderContainer = null;
    this.loader = null;
    this.loaderFunction();
  }

  loaderFunction() {
    this.loaderContainer = document.createElement("div");
    this.loaderContainer.className = "loader-container";
    this.loader = document.createElement("div")
    this.loader.className = "loader";
    this.loaderContainer.appendChild(this.loader);
    document.body.appendChild(this.loaderContainer);
    this.load();

  }

  async load() {
    this.panoramaLivingRoom = new PANOLENS.ImagePanorama("./assets/1.1_Panolens/pano1.jpeg");
    this.panoramaBedroom = new PANOLENS.ImagePanorama("./assets/1.1_Panolens/pano2.jpeg");
    this.panorama_video = new PANOLENS.VideoPanorama( "./assets/1.1_Panolens/ashley-tisdale-gives-a-tour-of-her-closet-in-180-glamour.mp4", {muted: false}, { autoplay: true } );
    this.panoramaLivingRoom.link( this.panoramaBedroom, new THREE.Vector3(-4756.41, -818.27, -5000.00), 400);
    this.panoramaBedroom.link( this.panoramaLivingRoom, new THREE.Vector3(-2453.59, -434.58, 5000.00), 400);
    this.panoramaBedroom.link( this.panorama_video, new THREE.Vector3(1137.73, -803.30, 5000.00), 400);
    this.panorama_video.link( this.panoramaBedroom, new THREE.Vector3(1007.63, -253.72, 5000.00), 800);
    this.listener = new THREE.AudioListener();
    this.audioLoader = new THREE.AudioLoader();
    this.sound = new THREE.Audio( this.listener );
    await this.audioLoader.load( "./assets/1.1_Panolens/Le_Petit_Negre.wav", event = ( buffer ) => {
      this.sound.setBuffer( buffer );
      this.sound.setLoop( true );
      this.sound.setVolume( 1 );
    });
    this.infospots = [];
    this.nbInfospots = 6;
    this.setInfospot();

    if(this.loaderContainer){
      document.body.removeChild(this.loaderContainer);
      this.loaderContainer = null;
      this.loader = null;
    }
  }

  setInfospot(){
    let positions = [
      {x:-1411.26, y:-756.03, z:-5000.00}, 
      {x: 619.43, y: 349.68, z: -5000.00}, 
      {x: -177.96, y: -2690.45, z: 5000.00}, 
      {x: -5000.00, y: -147.93, z: 655.67}, 
      {x: 5000.00, y: -190.47, z: -36.01}, 
      {x: 4354.50, y: -2166.61, z: 5000.00}];
    for (let i = 2; i < this.nbInfospots; i++) {
      this.infospots[i] = new PANOLENS.Infospot();
      this.infospots[i].position.set(positions[i].x, positions[i].y, positions[i].z);
      this.panoramaBedroom.add( this.infospots[i] );
      this.infospots[i].addEventListener("click", event => this.infospots[i].focus());
    }
    this.infospots[0] = new PANOLENS.Infospot(300, "./assets/1.1_Panolens/note.png");
    this.infospots[0].position.set(positions[0].x, positions[0].y, positions[0].z);
    this.panoramaLivingRoom.add( this.infospots[0] );
    this.infospots[0].addEventListener("click", this.addSound);

    let image = new Image();
    image.width = 250;
    image.src = "./assets/1.1_Panolens/feuillage_tropique.png";

    this.infospots[1] = new PANOLENS.Infospot(700, "./assets/1.1_Panolens/feuillage_tropique.png");
    this.infospots[1].addHoverElement(image);
    this.infospots[1].position.set(positions[1].x, positions[1].y, positions[1].z);
    this.panoramaLivingRoom.add( this.infospots[1] );
    this.infospots[1].addEventListener("click", this.addSound);
  }

  addSound = (event) => {
    if(!this.sound.isPlaying) 
      this.sound.play();  
    else 
      this.sound.pause();
  }

  start() {
    this.viewer = new PANOLENS.Viewer( { output: "console" } );
    this.viewer.add( this.panoramaLivingRoom, this.panoramaBedroom, this.panorama_video );
  }
}