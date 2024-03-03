// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// function ThreeScene () {
//   var sceneRef = useRef<THREE.WebGLRenderer>(null);
//   // const sceneRef = {current: null};
//   useEffect(() => {
//     if(sceneRef.current == null){
//       return;
//     }
//     // Create a scene
//     var scene = new THREE.Scene();

//     // Create a camera
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;

//     // Create a renderer
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // const sceneRef = useRef(renderer.domElement);
//     (sceneRef['current']).appendChild(renderer.domElement);
//     // sceneRef['current'].

//     // Create a torus geometry
//     const geometry = new THREE.TorusGeometry(2, 1, 32, 100);

//     // Create a material
//     const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

//     // Create a mesh
//     const torus = new THREE.Mesh(geometry, material);

//     // Add the mesh to the scene
//     scene.add(torus);

//     // Animate the torus
//     const animate = function () {
//       requestAnimationFrame(animate);
//       torus.rotation.x += 0.01;
//       torus.rotation.y += 0.01;
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Clean up function
//     return () => {
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={sceneRef} />;
// };

// export default ThreeScene;
