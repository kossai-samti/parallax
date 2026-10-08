import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/smoothScroll'
import modelUrl from '../assets/Chapter4/monster-center.glb?url'

gsap.registerPlugin(ScrollTrigger)

export function MonsterCan() {
  const hostRef = useRef(null)

  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return

    let disposed = false
    let initialized = false
    let modelRoot
    let spin
    let renderer
    let resizeObserver

    const disposeModel = (root) => {
      root?.traverse((node) => {
        if (!node.isMesh) return
        node.geometry?.dispose()
        const materials = Array.isArray(node.material) ? node.material : [node.material]
        for (const material of materials) {
          for (const value of Object.values(material ?? {})) {
            if (value?.isTexture) value.dispose()
          }
          material?.dispose()
        }
      })
    }

    const initialize = async () => {
      if (initialized || disposed) return
      initialized = true

      try {
        const [threeModule, loaderModule] = await Promise.all([
          import('three'),
          import('three/addons/loaders/GLTFLoader.js'),
        ])
        if (disposed) return
        const THREE = threeModule
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
        camera.position.set(0, 0, 5.6)

        const mobile = window.matchMedia('(max-width: 700px)').matches
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile })
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, mobile ? 1.3 : 1.6),
        )
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.15
        renderer.setClearColor(0x000000, 0)
        host.appendChild(renderer.domElement)

        scene.add(new THREE.HemisphereLight(0xded1ff, 0x13091f, 2.1))

        const key = new THREE.DirectionalLight(0xffffff, 3.2)
        key.position.set(-3, 4, 5)
        scene.add(key)

        const rim = new THREE.DirectionalLight(0xb56cff, 2.4)
        rim.position.set(3, 1, -3)
        scene.add(rim)

        const render = () => renderer.render(scene, camera)
        const resize = () => {
          const width = Math.max(host.clientWidth, 1)
          const height = Math.max(host.clientHeight, 1)
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          render()
        }

        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(host)
        resize()

        new loaderModule.GLTFLoader().load(
          modelUrl,
          (gltf) => {
            if (disposed) {
              disposeModel(gltf.scene)
              return
            }

            const bounds = new THREE.Box3().setFromObject(gltf.scene)
            const center = bounds.getCenter(new THREE.Vector3())
            gltf.scene.position.sub(center)

            modelRoot = new THREE.Group()
            modelRoot.rotation.x = 0.06
            modelRoot.rotation.z = -0.13
            modelRoot.add(gltf.scene)
            scene.add(modelRoot)

            if (!prefersReducedMotion()) {
              const chapter = host.closest('.chapter')
              spin = gsap.timeline({
                scrollTrigger: {
                  trigger: chapter,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                  onUpdate: render,
                },
                onUpdate: render,
              })

              // Three deliberate quarter-turn beats: the can pauses at each view
              // when scrolling pauses, and scrubbing upward reverses the same path.
              spin.to(modelRoot.rotation, { y: Math.PI / 2, duration: 0.34, ease: 'sine.inOut' }, 0)
              spin.to(modelRoot.rotation, { y: Math.PI, duration: 0.33, ease: 'sine.inOut' }, 0.34)
              spin.to(modelRoot.rotation, { y: Math.PI * 1.5, duration: 0.33, ease: 'sine.inOut' }, 0.67)
            }

            render()
            ScrollTrigger.refresh()
          },
          undefined,
          (error) => console.error('Could not load the Monster Mixxd can model.', error),
        )
      } catch (error) {
        if (!disposed) console.error('Could not initialize the Monster Mixxd can.', error)
      }
    }

    const proximityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        proximityObserver.disconnect()
        initialize()
      },
      { rootMargin: '700px 0px' },
    )
    proximityObserver.observe(host)

    return () => {
      disposed = true
      proximityObserver.disconnect()
      resizeObserver?.disconnect()
      spin?.scrollTrigger?.kill()
      spin?.kill()
      disposeModel(modelRoot)
      if (renderer) {
        renderer.dispose()
        renderer.domElement.remove()
      }
    }
  }, [])

  return (
    <div className="ch-can3d" ref={hostRef} aria-hidden="true" />
  )
}
