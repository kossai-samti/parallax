import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import petalUrl from "../assets/Chapter7/petal.glb?url";

const PETAL_COUNT = 28;

export function PetalRain() {
  const hostRef = useRef(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let disposed = false;
    let animationFrame = 0;
    const petals = [];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffdce8, 0x3a1026, 2.4));
    const key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(-2, 4, 4);
    scene.add(key);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const clock = new THREE.Clock();
    const render = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.04);
      petals.forEach((petal) => {
        petal.position.y -= petal.speed * delta;
        petal.position.x +=
          Math.sin(petal.phase + petal.position.y * 0.8) * delta * 0.18;
        petal.rotation.x += petal.spin.x * delta;
        petal.rotation.y += petal.spin.y * delta;
        petal.rotation.z += petal.spin.z * delta;
        if (petal.position.y < -4.8) {
          petal.position.y = 4.8 + Math.random() * 1.6;
          petal.position.x = THREE.MathUtils.randFloatSpread(7.5);
        }
      });
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    new GLTFLoader().load(
      petalUrl,
      (gltf) => {
        if (disposed) return;
        const source = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(source);
        const size = bounds.getSize(new THREE.Vector3());
        const scale = 0.16 / Math.max(size.x, size.y, size.z, 0.01);
        for (let i = 0; i < PETAL_COUNT; i += 1) {
          const petal = source.clone(true);
          petal.scale.setScalar(scale * THREE.MathUtils.randFloat(0.72, 1.35));
          petal.position.set(
            THREE.MathUtils.randFloatSpread(7.5),
            THREE.MathUtils.randFloat(-4.6, 5.2),
            THREE.MathUtils.randFloat(-1.5, 1.5),
          );
          petal.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI,
          );
          petals.push({
            object: petal,
            position: petal.position,
            rotation: petal.rotation,
            speed: THREE.MathUtils.randFloat(0.38, 0.85),
            phase: Math.random() * Math.PI * 2,
            spin: new THREE.Vector3(
              THREE.MathUtils.randFloat(-2.2, 2.2),
              THREE.MathUtils.randFloat(-2.8, 2.8),
              THREE.MathUtils.randFloat(-1.7, 1.7),
            ),
          });
          scene.add(petal);
        }
        render();
      },
      undefined,
      (error) =>
        console.error("Could not load the Chapter 7 petal model.", error),
    );

    render();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      petals.forEach(({ object }) => {
        object.traverse((node) => {
          if (!node.isMesh) return;
          node.geometry?.dispose();
          const materials = Array.isArray(node.material)
            ? node.material
            : [node.material];
          materials.forEach((material) => material?.dispose());
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="ch-petal-rain" ref={hostRef} aria-hidden="true" />;
}
