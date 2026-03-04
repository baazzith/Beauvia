import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { processSteps, serviceAreas, services, serviceUseCases } from '../siteData'

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Premium mobile barber services."
        description="Beauvia offers high-end grooming packages for home visits, office appointments, hotels, and multi-person event bookings."
        actions={
          <>
            <Link className="primary-button" to="/booking">
              Book Now
            </Link>
            <Link className="secondary-button" to="/contact">
              Ask a Question
            </Link>
          </>
        }
        aside={
          <div className="hero-note-card">
            <strong>Built for flexible schedules</strong>
            <p>Choose solo grooming, beard work, or custom group bookings.</p>
          </div>
        }
      />

      <Reveal as="section" className="section-frame" variant="up">
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              as="article"
              className="service-tile interactive-card"
              variant={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 80}
            >
              <div className="service-meta">
                <span className="service-price">{service.price}</span>
                <span className="service-duration">{service.duration}</span>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="experience-grid">
          <Reveal as="div" className="experience-panel interactive-card" variant="left" delay={60}>
            <h3>How booking works</h3>
            <div className="step-list">
              {processSteps.map((step) => (
                <article key={step.step} className="step-card">
                  <span>{step.step}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </article>
                ))}
            </div>
          </Reveal>

          <Reveal as="div" className="experience-panel interactive-card" variant="right" delay={140}>
            <h3>Best use cases</h3>
            <div className="cards-grid single-column-grid">
              {serviceUseCases.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="article"
                  className="detail-card interactive-card"
                  variant={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 80}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="section-heading">
          <p className="eyebrow">Coverage</p>
          <h2>Available across high-demand areas for private and professional appointments.</h2>
        </div>

        <div className="pill-list">
          {serviceAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </Reveal>
    </>
  )
}

export default ServicesPage
