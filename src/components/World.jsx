import { useRef } from 'react'
import { registerWorld } from '../lib/registry'
import { Stars, Clouds, Particles } from './art/scenery'
import { ART, wallFor, bodyFor } from '../lib/assets'

const CH1 = ART[1]

export function World() {
  return (
    <div className="world" data-chapter="1" ref={(el) => registerWorld('root', el)} aria-hidden="true">
      <div className="world__walls">
        {/* Exactly one wallpaper. lib/world.js swaps its src per chapter.
            data-cel-wall, not data-layer: this is not a crossfaded layer. */}
        <img className="world__wall" data-cel-wall src={wallFor(1)} alt="" fetchPriority="high" decoding="async" />
      </div>
      <Stars />
      <div className="world__halo" data-layer="halo" />
      <div className="world__celestial" data-celestial>
        <div className="cel__disc">
          {/* Exactly one round body. Chapter 1 is the moon, chapter 2 is the
              mandarin slice, and lib/world.js swaps the src between them. */}
          <img className="cel__art" data-cel-body src={bodyFor(1)} alt="" fetchPriority="high" decoding="async" />
          <img className="cel__art cel__art--lotus" data-cel-lotus alt="" />
        </div>
        <div className="cel__bloom" data-layer="bloom" />
        <div className="cel__rays" data-layer="rays" />
        <div className="cel__ring" data-layer="ring" />
      </div>
      <Clouds />
      <div className="world__bats" data-layer="bats">
        <img className="batimg batimg--far" src={CH1.batWing} alt="" />
        <img className="batimg batimg--mid" src={CH1.batHero} alt="" />
        <img className="batimg batimg--low" src={CH1.batWing} alt="" />
      </div>
      <div className="world__fog" data-layer="fog" />
      <div className="world__dust" data-layer="dust">
        <Particles kind="dust" count={24} />
      </div>
    </div>
  )
}

export function Grain() {
  const ref = useRef(null)
  return <div className="grain" ref={ref} aria-hidden="true" />
}
