//main javascript file

import filter_data from './coronavirus_app.js' //when import and export, <script type='module'>
const api_key = 'AIzaSyBfNl1mn143JBKW9uyBbZGqkbf_HFPXoW8';

fetch('http://lab.isaaclin.cn/nCoV/api/area?latest=1')
    .then(res => {
        return res.json() //turns the api data into an json object
    })
    .then(data => {
        return filter_data(data); //return a list with objects {name, count}
    })
    .then(data => {
        const country_location = data.map(async (item) => {
            const geocode_map = `https://maps.googleapis.com/maps/api/geocode/json?address=${item['name']}&key=${api_key}`;
            const promise_return = await fetch(geocode_map)
                .then(res => res.json())
                .then(data => {
                    if (data['results'][0] !== undefined) {
                        return {
                            lat: data['results'][0]['geometry']['location']['lat'],
                            lng: data['results'][0]['geometry']['location']['lng'],
                            size: 1,
                        };
                    }

                });
            return promise_return;
        });
        return country_location;
    })
    .then(async promises => {
        let globe_data = await Promise.all(promises);
        globe_data = globe_data.filter(x => x !== undefined)
        console.log(globe_data);

        const Globe = new ThreeGlobe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .pointsData(globe_data)
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
    });

// Gen random data
const N = 10;
/* const gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random(),
})); */

/* const gData = [{
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
*/
