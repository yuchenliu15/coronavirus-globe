//main javascript file

import filter_data from './coronavirus_app.js' //when import and export, <script type='module'>
fetch('http://lab.isaaclin.cn/nCoV/api/area?latest=0')
    .then(res => {
        return res.json() //turns the api data into an json object
    })
    .then(data => {
        return filter_data(data); //return a list with objects {name, count}
    })
    .then(data => {
        console.log(data); //pass array to google api
    });

// Gen random data
const N = 10;
/* const gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random(),
})); */

const gData = [{
    lat: 51,
    lng: 10,
    size: Math.random(),
},
{
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random(),
},
];

const Globe = new ThreeGlobe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .pointsData(gData)
    .pointAltitude('size')
    .pointColor(() => '#2980b9');


// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globeViz').appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xbbbbbb));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 500;

// Add camera controls
const tbControls = new TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 101;
tbControls.rotateSpeed = 5;
tbControls.zoomSpeed = 0.8;

// Kick-off renderer
(function animate() { // IIFE
    // Frame cycle
    tbControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();