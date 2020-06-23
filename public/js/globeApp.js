fetch('/data')
    .then(res=>res.json())
    .then(data => {
        console.log("data length"+data.length)
        const Globe = new ThreeGlobe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .pointsData(data)
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

