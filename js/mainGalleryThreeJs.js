class MainGalleryThreeJs {
  constructor() { 
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.texture = new THREE.TextureLoader();
    this.mesh;
    this.meshes = [];
    this._nbPics = 7;
    this._choosenPic = 0;
    this._loop = null;
    this._spead = 0.1;

    this._scrollLeft = false;
    this._scrollRight = false;

    window.addEventListener("keydown", event => this.keydownFunction(event));
    window.addEventListener("click", event => this.onclick(event));
  }

  keydownFunction(event) {
    switch(event.code) {
      case "ArrowLeft":
        this._scrollLeft = true;
        break;
      case "ArrowRight":
        this._scrollRight = true;
        break;
    }
  }

  onclick(event) {
    if(event.clientX < 400)
      this._scrollLeft= true;
    else if(event.clientX > 600)
      this._scrollRight = true;
  }

  load() {
    this.scene = new THREE.Scene();
    this.camera.position.z = 2.5;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    let urls = this.setUrls();
    this.loadImages(urls);

    let light = new THREE.PointLight( 0xffffff, 1, 0);
    light.position.set(1, 1, 100);

    this.scene.add(light)

    this.start();
  }

  setUrls() {
    let urls = [];
    for (let i = 1; i <= this._nbPics; i++) 
      urls.push("./assets/2.4_Gallery_Three_Js/"+i+".jpg");
    return urls;
  }

  loadImages(urls) {
    for (let i = 0; i < urls.length; i++) {
      let material = new THREE.MeshLambertMaterial({
        map: this.texture.load(urls[i])
      });
      let geometry = new THREE.PlaneGeometry(5, 5*.75);
      let mesh = new THREE.Mesh(geometry, material);
      let x = i == 0 ? 0 : 10;
      let z = i == 0 ? 0 : 100;
      mesh.position.set(x,0,z);
      this.meshes.push(mesh);
      this.scene.add(this.meshes[i]);
    }
  }

  previousImage() {
    return this._choosenPic == 1 ? this._nbPics - 1 : this._choosenPic == 0 ? this._nbPics - 1 : this._choosenPic - 1;
  }

  nextImage() {
    return this._choosenPic == this._nbPics - 1 ? 1 : this._choosenPic + 1;
  }

  scrollLeft(){
    let mesh1 = this.meshes[this._choosenPic], 
        mesh2 = this.meshes[this.previousImage()];
    mesh2.position.z = -10;
    // Pour faire la transition entre la première et la dernière image 
    if(mesh1.position.x < mesh2.position.x) {
      mesh2.position.x = -10;
    }
    if(mesh2.position.x < 0) {
      mesh1.position.x += this._spead;
      mesh2.position.x += this._spead;
      mesh1.position.z += this._spead;
      mesh2.position.z += this._spead;
    } else {
      this._choosenPic = this.previousImage();
      this._scrollLeft = false;
    }
  }

  scrollRight(){
    let mesh1 = this.meshes[this._choosenPic], 
        mesh2 = this.meshes[this.nextImage()];
    mesh2.position.z = -10;
    // Pour faire la transition entre la dernière image et la première
    if(mesh1.position.x > mesh2.position.x) {
      mesh2.position.x = 10;
    }
    if(mesh2.position.x > 0) {
      mesh1.position.x -= this._spead;
      mesh2.position.x -= this._spead;
      mesh1.position.z += this._spead;
      mesh2.position.z += this._spead;
    } else {
      this._choosenPic = this.nextImage();
      this._scrollRight = false;
    }
  }

  start() {
    this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));
  }

   /**
     * Arrêt de l'appel en boucle de la fonction loop.
     */
    stop() {
      window.cancelAnimationFrame(this._loop);
    }

  loop(stamp) {
    this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));
    this.renderer.render( this.scene, this.camera );
    if(this._scrollLeft)
      this.scrollLeft();
    else if(this._scrollRight)
    this.scrollRight();
  }
}