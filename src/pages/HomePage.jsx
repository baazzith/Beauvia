import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import {
  differenceCards,
  highlights,
  previewPages,
  processSteps,
  serviceAreas,
  services,
  testimonials,
} from '../siteData'

function HomePage() {
  return (
    <>
      <section className="hero-section section-frame hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">Mobile barber booking</p>
          <h1>
            Sharp cuts,
            <span> delivered to your door.</span>
          </h1>
          <p className="hero-text">
            Beauvia brings premium barber service to homes, hotels, offices, and event spaces.
            Book a fade, beard trim, or full grooming session without waiting in line.
          </p>

          <div className="hero-actions">
            <Link className="primary-button" to="/booking">
              Book a Visit
            </Link>
            <Link className="secondary-button" to="/services">
              Explore Services
            </Link>
          </div>

          <div className="hero-stats">
            {highlights.map((item) => (
              <article key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="showcase-card showcase-main">
            <div className="showcase-topline">
              <span className="status-pill">Now booking</span>
              <span>Doorstep grooming</span>
            </div>

            <div className="showcase-screen">
              <div className="screen-badge">Premium mobile barber</div>
              <div className="screen-title">
                Your chair.
                <br />
                Our craft.
              </div>
              <div className="screen-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="showcase-card floating-card appointment-card">
            <p>Next arrival</p>
            <strong>Today, 6:30 PM</strong>
            <span>Haircut + Beard at Midtown</span>
          </div>

          <div className="showcase-card floating-card service-card">
            <p>Most booked</p>
            <strong>Signature Fade</strong>
            <span>Clean taper, lineup, style finish</span>
          </div>
        </div>
      </section>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="section-heading">
          <p className="eyebrow">Explore Beauvia</p>
          <h2>Move through the site page by page, just like the reference you shared.</h2>
        </div>

        <div className="preview-grid">
          {previewPages.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              className="story-card interactive-card"
              variant={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 90}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link className="inline-link" to={item.to}>
                {item.action}
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="section-heading">
          <p className="eyebrow">Featured services</p>
          <h2>Choose the grooming experience that fits your day.</h2>
        </div>

        <div className="services-grid compact-grid">
          {services.slice(0, 3).map((service, index) => (
            <Reveal
              key={service.title}
              as="article"
              className="service-tile interactive-card"
              variant={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 90}
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

        <div className="section-actions">
          <Link className="secondary-button" to="/services">
            View All Services
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="section-heading">
          <p className="eyebrow">Why Beauvia</p>
          <h2>A premium service model built around time, trust, and consistent results.</h2>
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
            <h3>How it works</h3>
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
            <h3>Service areas</h3>
            <p className="panel-copy">
              Beauvia is designed for busy schedules and private spaces. We currently focus on:
            </p>
            <div className="pill-list">
              {serviceAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
            <div className="route-card">
              <strong>Hours</strong>
              <p>Monday to Sunday</p>
              <p>9:00 AM to 10:00 PM</p>
            </div>
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" className="section-frame" variant="up">
        <div className="section-heading">
          <p className="eyebrow">Client feedback</p>
          <h2>Trusted by clients who want grooming without interruption.</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.author}
              as="article"
              className="testimonial-card interactive-card"
              variant={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 90}
            >
              <p>"{item.quote}"</p>
              <strong>{item.author}</strong>
              <span>{item.role}</span>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="cta-banner section-frame" variant="zoom">
        <div>
          <p className="eyebrow">Next move</p>
          <h2>Book a visit or join the barber network.</h2>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" to="/booking">
            Book Now
          </Link>
          <Link className="secondary-button" to="/barbers">
            Join as a Barber
          </Link>
        </div>
      </Reveal>
    </>
  )
}

export default HomePage
