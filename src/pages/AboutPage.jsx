import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { aboutValues, differenceCards, serviceAreas, testimonials } from '../siteData'

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="About Beauvia"
        description="Beauvia was built for people who want the quality of a premium barber visit without the commute, wait time, or friction of a traditional shop visit."
        actions={
          <>
            <Link className="primary-button" to="/booking">
              Book an Appointment
            </Link>
            <Link className="secondary-button" to="/services">
              See Services
            </Link>
          </>
        }
        aside={
          <div className="hero-note-card">
            <strong>Doorstep grooming</strong>
            <p>Designed for homes, offices, hotels, and private events.</p>
          </div>
        }
      />

      <Reveal as="section" className="section-frame" variant="up">
        <div className="story-grid">
          {aboutValues.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              className="story-card interactive-card"
              variant={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 90}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="section-heading">
          <p className="eyebrow">Why clients switch</p>
          <h2>The business is designed to remove the usual friction around grooming appointments.</h2>
        </div>

        <div className="cards-grid">
          {differenceCards.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              className="detail-card interactive-card"
              variant={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 90}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="experience-grid">
          <Reveal as="div" className="experience-panel interactive-card" variant="left" delay={60}>
            <h3>Where Beauvia works best</h3>
            <div className="pill-list">
              {serviceAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </Reveal>

          <Reveal as="div" className="experience-panel interactive-card" variant="right" delay={140}>
            <h3>Client perspective</h3>
            <div className="quote-stack">
              {testimonials.slice(0, 2).map((item) => (
                <article key={item.author} className="mini-quote">
                  <p>"{item.quote}"</p>
                  <strong>{item.author}</strong>
                </article>
                ))}
            </div>
          </Reveal>
        </div>
      </Reveal>
    </>
  )
}

export default AboutPage
