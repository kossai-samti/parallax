import { useLayoutEffect, useRef } from "react";
import petalUrl from "../assets/Chapter7/petal.glb?url";

export function PetalRain() {
  const hostRef = useRef(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let disposed = false;
    let initialized = false;
    let inView = false;
    let modelLoaded = false;
    let animationFrame = 0;
    let renderer;
    let scene;
    let camera;
    let clock;
    let modelRoot;
    let resizeObserver;
    let THREERef;
    const petals = [];

    const stop = () => {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const disposeModel = (root) => {
      root?.traverse((node) => {
        if (!node.isMesh) return;
        node.geometry?.dispose();
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        materials.forEach((material) => {
          for (const value of Object.values(material ?? {})) {
            if (value?.isTexture) value.dispose();
          }
          material?.dispose();
        });
      });
    };

    const render = () => {
      if (disposed || !inView || document.hidden || !modelLoaded) {
        animationFrame = 0;
        return;
      }
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
          petal.position.x = THREERef.MathUtils.randFloatSpread(7.5);
        }
      });
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (renderer && modelLoaded && inView && !document.hidden && !animationFrame) {
        clock.getDelta();
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const initialize = async () => {
      if (initialized || disposed) return;
      initialized = true;

      try {
        const [threeModule, loaderModule] = await Promise.all([
          import("three"),
          import("three/addons/loaders/GLTFLoader.js"),
        ]);
        if (disposed) return;
        const THREE = threeModule;
        THREERef = THREE;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.z = 7;
        const mobile = window.matchMedia("(max-width: 700px)").matches;
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: !mobile,
        });
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.35),
        );
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
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();
        clock = new THREE.Clock();

        new loaderModule.GLTFLoader().load(
          petalUrl,
          (gltf) => {
            if (disposed) {
              disposeModel(gltf.scene);
              return;
            }
            modelRoot = gltf.scene;
            const bounds = new THREE.Box3().setFromObject(modelRoot);
            const size = bounds.getSize(new THREE.Vector3());
            const scale = 0.16 / Math.max(size.x, size.y, size.z, 0.01);
            const count = mobile ? 12 : 18;
            for (let i = 0; i < count; i += 1) {
              const petal = modelRoot.clone(true);
              petal.scale.setScalar(
                scale * THREE.MathUtils.randFloat(0.72, 1.35),
              );
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
            modelLoaded = true;
            start();
          },
          undefined,
          (error) =>
            console.error("Could not load the Chapter 7 petal model.", error),
        );
      } catch (error) {
        if (!disposed) console.error("Could not initialize Chapter 7 petals.", error);
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          initialize();
          start();
        } else {
          stop();
        }
      },
      { rootMargin: "400px 0px" },
    );
    intersectionObserver.observe(host);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      stop();
      intersectionObserver.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      disposeModel(modelRoot);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return <div className="ch-petal-rain" ref={hostRef} aria-hidden="true" />;
}
