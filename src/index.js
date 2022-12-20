import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshPhongMaterial, Mesh, Color, DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
// import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';

// init
const scene = new Scene();
scene.background = new Color('black');
const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.set(0, 10, 20);

// obj loader
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

mtlLoader.load("./models/test.mtl", function(materials) {
  materials.preload();

  objLoader.setMaterials(materials);
  objLoader.load(
    './models/test.obj',
    function ( object ) {
      scene.add(object);
      console.log(object);
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  
    },
    function ( error ) {
      console.log(error);
    }
  );
});

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );

// test cube
const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshPhongMaterial( { color: '#8AC' } );
const cube = new Mesh( geometry, material );
scene.add( cube );
console.log(cube);

// light
const light = new DirectionalLight(0xFFFFFF, 1);
light.position.set(0, 10, 20);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);


// obj json
// const exporter = new OBJExporter();
// const data = exporter.parse( scene );
// console.log(data);

// init
function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
};

animate();