import { useId } from 'react'

export function Bat({ className = '' }) {
  return (
    <svg className={`bat ${className}`} viewBox="0 0 120 62" aria-hidden="true">
      <g className="bat__wing bat__wing--left">
        <path d="M55 30C42 11 22 6 6 13c12 7 16 15 24 22 8 7 17 6 24 1z" />
      </g>
      <g className="bat__wing bat__wing--right">
        <path d="M65 30c13-19 33-24 49-17-12 7-16 15-24 22-8 7-17 6-24 1z" />
      </g>
      <ellipse className="bat__body" cx="60" cy="34" rx="7" ry="9" />
      <path className="bat__ear" d="M55 27l-3-8 6 4zM65 27l3-8-6 4z" />
      <circle className="bat__eye" cx="57.5" cy="25" r="1.9" />
      <circle className="bat__eye" cx="62.5" cy="25" r="1.9" />
      <path className="bat__grin" d="M57 30q3 4 6 0" />
    </svg>
  )
}

export function Mandarin({ className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg className={`mandarin ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={`mg-${uid}`} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#ffe1ad" />
          <stop offset="0.45" stopColor="#ffa63f" />
          <stop offset="1" stopColor="#d9540b" />
        </radialGradient>
      </defs>
      <g className="mandarin__peel">
        <path
          className="mandarin__peel-strip"
          d="M100 26a74 74 0 0 1 62 34"
          fill="none"
          stroke="#ffd08a"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          className="mandarin__peel-strip mandarin__peel-strip--2"
          d="M162 60a74 74 0 0 1 6 44"
          fill="none"
          stroke="#ffc46a"
          strokeWidth="13"
          strokeLinecap="round"
        />
      </g>
      <circle className="mandarin__body" cx="100" cy="100" r="74" fill={`url(#mg-${uid})`} />
      <g className="mandarin__speck">
        <circle cx="76" cy="82" r="2.4" />
        <circle cx="118" cy="70" r="1.8" />
        <circle cx="132" cy="116" r="2.1" />
        <circle cx="88" cy="132" r="1.7" />
        <circle cx="108" cy="102" r="1.5" />
      </g>
      <path className="mandarin__leaf" d="M100 27c14-16 34-14 44-6-12 15-30 17-44 6z" />
      <path className="mandarin__stem" d="M100 27c-2-6-6-9-12-11" />
    </svg>
  )
}

export function Frog({ className = '' }) {
  return (
    <svg className={`frog ${className}`} viewBox="0 0 170 140" aria-hidden="true">
      <ellipse className="frog__shadow" cx="85" cy="130" rx="52" ry="7" />
      <g className="frog__leg frog__leg--back">
        <path d="M128 108c14 0 20 8 20 16" />
        <path d="M138 124h16M146 124v8M154 124l6 6" />
      </g>
      <g className="frog__leg frog__leg--back frog__leg--back-left">
        <path d="M42 108c-14 0-20 8-20 16" />
        <path d="M32 124H16M24 124v8M16 124l-6 6" />
      </g>
      <g className="frog__body">
        <ellipse cx="85" cy="92" rx="50" ry="36" />
        <ellipse className="frog__belly" cx="85" cy="100" rx="33" ry="22" />
        <g className="frog__eye">
          <circle cx="58" cy="56" r="17" />
          <circle className="frog__pupil" cx="60" cy="58" r="7.5" />
          <circle className="frog__glint" cx="55" cy="52" r="3" />
        </g>
        <g className="frog__eye">
          <circle cx="112" cy="56" r="17" />
          <circle className="frog__pupil" cx="114" cy="58" r="7.5" />
          <circle className="frog__glint" cx="109" cy="52" r="3" />
        </g>
        <ellipse className="frog__blush" cx="46" cy="84" rx="9" ry="5.5" />
        <ellipse className="frog__blush" cx="124" cy="84" rx="9" ry="5.5" />
        <path className="frog__mouth" d="M62 86q23 22 46 0" />
      </g>
    </svg>
  )
}

export function Cat({ className = '', tone = 'white' }) {
  return (
    <svg className={`cat cat--${tone} ${className}`} viewBox="0 0 190 120" aria-hidden="true">
      <ellipse className="cat__body" cx="100" cy="80" rx="62" ry="31" />
      <path className="cat__ear" d="M50 56l-3-22 19 12z" />
      <path className="cat__ear" d="M80 54l7-21-19 9z" />
      <circle className="cat__head" cx="62" cy="68" r="24" />
      <path className="cat__eye" d="M50 66q6 6 12 0" />
      <path className="cat__eye" d="M68 66q6 6 12 0" />
      <path className="cat__nose" d="M60 76h6l-3 4z" />
      <g className="cat__stripe">
        <path d="M104 52c4 8 4 16 0 24" />
        <path d="M122 56c4 8 4 16 0 24" />
        <path d="M140 62c3 6 3 12 0 18" />
      </g>
      <path className="cat__tail" d="M158 88c26 6 30-16 22-24-6-6-16-2-14 6" />
    </svg>
  )
}

export function Monster({ className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg className={`monster ${className}`} viewBox="0 0 200 190" aria-hidden="true">
      <defs>
        <radialGradient id={`mo-${uid}`} cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="#e9c9ff" />
          <stop offset="0.5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#3b0d63" />
        </radialGradient>
        <filter id={`mglow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path className="monster__horn" d="M62 44L44 8l34 22zM138 44l18-36-34 22z" />
      <path
        className="monster__body"
        d="M100 28c42 0 66 26 66 62 0 40-30 66-66 66s-66-26-66-66c0-36 24-62 66-62z"
        fill={`url(#mo-${uid})`}
      />
      <g filter={`url(#mglow-${uid})`}>
        <ellipse className="monster__eye" cx="76" cy="92" rx="15" ry="18" />
        <ellipse className="monster__eye" cx="124" cy="92" rx="15" ry="18" />
        <circle className="monster__pupil" cx="78" cy="94" r="6" />
        <circle className="monster__pupil" cx="126" cy="94" r="6" />
      </g>
      <path className="monster__mouth" d="M62 128q38 30 76 0-12 26-38 26t-38-26z" />
      <path className="monster__tooth" d="M78 132l6 16 6-14zM110 132l6 14 6-16z" />
    </svg>
  )
}

export function Heart({ className = '' }) {
  return (
    <svg className={`heart ${className}`} viewBox="0 0 100 92" aria-hidden="true">
      <path d="M50 88C20 66 4 48 4 30 4 14 16 6 28 6c10 0 18 6 22 14 4-8 12-14 22-14 12 0 24 8 24 24 0 18-16 36-46 58z" />
    </svg>
  )
}
