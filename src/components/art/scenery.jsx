import { useMemo } from 'react'
import { Heart } from './creatures'

const rand = (min, max) => min + Math.random() * (max - min)

export function Stars({ count = 64 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: rand(0, 100),
        y: rand(0, 72),
        s: rand(0.6, 2.4),
        d: rand(2.5, 7),
        t: rand(0, 6),
        o: rand(0.25, 1),
      })),
    [count],
  )

  return (
    <div className="stars" data-layer="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <i
          key={i}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.s}px`,
            height: `${s.s}px`,
            opacity: s.o,
            animationDuration: `${s.d}s`,
            animationDelay: `-${s.t}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Clouds() {
  return (
    <div className="clouds" data-layer="clouds" aria-hidden="true">
      {[
        ['cloud--far', 1],
        ['cloud--mid', 2],
        ['cloud--near', 3],
      ].map(([cls, depth]) => (
        <div className={`cloud-band ${cls}`} key={cls} data-depth={depth}>
          <span className="cloud" style={{ left: '4%', top: '18%', width: 220 }} />
          <span className="cloud" style={{ left: '38%', top: '52%', width: 160 }} />
          <span className="cloud" style={{ left: '66%', top: '8%', width: 260 }} />
          <span className="cloud" style={{ left: '82%', top: '62%', width: 180 }} />
        </div>
      ))}
    </div>
  )
}

const KINDS = {
  dust: 'particle--dust',
  petal: 'particle--petal',
  heart: 'particle--heart',
  spark: 'particle--spark',
}

export function Particles({ kind = 'dust', count = 26, className = '' }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: rand(-2, 100),
        delay: -rand(0, 18),
        dur: rand(10, 24),
        size: rand(5, 16),
        drift: rand(-9, 9),
        rot: rand(-40, 40),
        o: rand(0.2, 0.75),
      })),
    [count],
  )

  return (
    <div className={`particles ${className}`} data-kind={kind} aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          className={`particle ${KINDS[kind]}`}
          style={{
            left: `${b.left}%`,
            '--dur': `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            '--size': `${b.size}px`,
            '--drift': `${b.drift}vw`,
            '--rot': `${b.rot}deg`,
            opacity: b.o,
          }}
        >
          {kind === 'heart' ? <Heart /> : null}
        </span>
      ))}
    </div>
  )
}
