window.addEventListener("load", event => new Main());

class Main {
  constructor() {
    this.scene = new THREE.Scene(); // initialisation de la scène
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // init camera

    // web gl renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    // to use control first person
    this.cameraControls = new THREE.FirstPersonControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 5;
    this.clock = new THREE.Clock(); 

    this.load();
  }

  load() {
    // create cube geom and material
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    this.cube = new THREE.Mesh( geometry, material );
    // add cube to scene
    this.scene.add( this.cube );
    
    // create circle geom and material
    var geometry = new THREE.CircleBufferGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    this.circle = new THREE.Mesh( geometry, material );
    // add circle to scene
    this.scene.add( this.circle );
    
    // create circle geom and material
    var geometry = new THREE.OctahedronBufferGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    this.octahedron = new THREE.Mesh( geometry, material );
    // add circle to scene
    this.scene.add( this.octahedron );
    
    // create another cube with different with (width, height, depth ) geom and material
    var geometry = new THREE.BoxGeometry(5, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    this.longCube1 = new THREE.Mesh( geometry, material );
    // set longCube positions
    this.longCube1.position.set(2, 3, 0);
    // add another cube to scene
    this.scene.add( this.longCube1 );

    // create another cube with different with (width, height, depth ) geom and material
    var geometry = new THREE.BoxGeometry(5, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    this.longCube2 = new THREE.Mesh( geometry, material );
    // set longCube positions
    this.longCube2.position.set(-2, -3, 0);
    // add another cube to scene
    this.scene.add( this.longCube2 );

    this.loop();
  }

  loop(stamp) {
    this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));
    this.animate();
  }

  // animate loop
  animate() {
    var delta = this.clock.getDelta(); // temps écoulé depuis le dernier "rafraichissement"
    this.cameraControls.update(0.02);
    // move cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    // move circle
    this.circle.rotation.x += 0.01;
    this.circle.rotation.y += 0.01
    // render !
    this.renderer.render( this.scene, this.camera );
  }
}