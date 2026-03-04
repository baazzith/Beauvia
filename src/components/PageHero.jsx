import Reveal from './Reveal'

function PageHero({ eyebrow, title, description, actions, aside }) {
  return (
    <Reveal as="section" className="page-hero section-frame">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-text">{description}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>

      {aside ? <div className="page-hero-aside">{aside}</div> : null}
    </Reveal>
  )
}

export default PageHero
