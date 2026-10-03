import { Panel } from './Chapter'
import { scrollToEl } from '../lib/smoothScroll'
import { STORY } from '../content/story'

function Jump({ to, label }) {
  return (
    <button
      type="button"
      className="linkbtn"
      onClick={() => scrollToEl(document.getElementById(to))}
    >
      <span>{label}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v14m0 0l-6-6m6 6l6-6" />
      </svg>
    </button>
  )
}

export function StoryPanels({ id, className = '' }) {
  const blocks = STORY[id] ?? []

  return blocks.map((block, i) => (
    <Panel key={i} kicker={block.kicker} className={`${className} ${i === 0 ? 'panel--first' : ''}`}>
      {block.lines.map((line, j) => (
        <h2 className="panel__line" key={j}>
          {line}
        </h2>
      ))}
      {block.body ? <p className="panel__body">{block.body}</p> : null}
      {block.cta ? <Jump to={block.cta.to} label={block.cta.label} /> : null}
    </Panel>
  ))
}
