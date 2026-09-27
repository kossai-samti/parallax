import { Panel } from './Chapter'
import { scrollToEl } from '../lib/smoothScroll'

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
  const loremBlocks = [
    { kicker: 'Lorem ipsum', lines: ['Lorem ipsum dolor sit amet.'], body: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { kicker: 'Lorem ipsum', lines: ['Ut enim ad minim veniam.'], body: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { kicker: 'Lorem ipsum', lines: ['Duis aute irure dolor in reprehenderit.'], body: 'In voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  ]
  // Keep every chapter's story copy in the same Lorem ipsum placeholder state.
  // Chapter headings and labels live in CHAPTERS and remain unchanged.
  const blocks = loremBlocks

  return blocks.map((block, i) => (
    <Panel key={i} kicker={block.kicker} className={className}>
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
