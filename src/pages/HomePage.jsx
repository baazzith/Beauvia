import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  differenceCards,
  highlights,
  previewPages,
  processSteps,
  serviceAreas,
  services,
  testimonials,
} from '../siteData'

const scrollEase = [0.22, 1, 0.36, 1]
const MotionSection = motion.section
const MotionArticle = motion.article
const MotionSpan = motion.span

const journeyItems = [
  ...processSteps.map((step) => ({
    ...step,
    tag: 'Service step',
    highlights: [],
  })),
  {
    step: '04',
    title: 'Coverage zones',
    description:
      'Downtown, Midtown, Business District, hotels, homes, and event spaces are covered in one route-ready flow.',
    tag: 'Coverage',
    highlights: ['Downtown', 'Midtown', 'Business District', 'Hotels', 'Private Homes', 'Events'],
  },
]

function ScrollytellSection({ eyebrow, title, className = '', children }) {
  const reducedMotion = useReducedMotion()

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 70, scale: 0.965 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: false, amount: 0.24 },
        transition: { duration: 0.84, ease: scrollEase },
      }

  return (
    <MotionSection className={`section-frame scrollytell-section ${className}`.trim()} {...motionProps}>
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </MotionSection>
  )
}

function ScrollytellCard({ className = '', index = 0, children }) {
  const reducedMotion = useReducedMotion()
  const tiltFrom = index % 2 === 0 ? -9 : 9

  const cardProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 66, scale: 0.93, rotateX: 11, rotateY: tiltFrom },
        whileInView: { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 },
        viewport: { once: false, amount: 0.3 },
        transition: { duration: 0.72, delay: index * 0.08, ease: scrollEase },
      }

  return (
    <MotionArticle
      className={`${className} scrollytell-card interactive-card`.trim()}
      style={{ transformPerspective: 1200 }}
      {...cardProps}
    >
      {children}
    </MotionArticle>
  )
}

function JourneyCard({ item, index, total, progress, isActive }) {
  const reducedMotion = useReducedMotion()

  const start = index / total
  const midpoint = (index + 0.52) / total
  const end = (index + 1) / total
  const tiltFrom = index % 2 === 0 ? -8 : 8
  const tiltTo = index % 2 === 0 ? 3 : -3

  const opacity = useTransform(progress, [start, midpoint, end], [0.36, 1, 0.48])
  const y = useTransform(progress, [start, midpoint, end], [72, 0, -48])
  const scale = useTransform(progress, [start, midpoint, end], [0.92, 1, 0.96])
  const rotateX = useTransform(progress, [start, midpoint, end], [12, 0, -8])
  const rotateY = useTransform(progress, [start, midpoint, end], [tiltFrom, 0, tiltTo])

  const motionStyle = reducedMotion
    ? { transformPerspective: 1200 }
    : { opacity, y, scale, rotateX, rotateY, transformPerspective: 1200 }

  return (
    <MotionArticle className={`journey-card interactive-card${isActive ? ' is-active' : ''}`} style={motionStyle}>
      <div className="journey-card-meta">
        <span className="journey-step">{item.step}</span>
        <span className="journey-tag">{item.tag}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>

      {item.highlights.length ? (
        <div className="journey-inline-pills">
          {item.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      ) : null}
    </MotionArticle>
  )
}

function StickyJourneySection() {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const total = journeyItems.length

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.28,
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(total - 1, Math.max(0, Math.floor(latest * total)))
    setActiveIndex(nextIndex)
  })

  const activeItem = journeyItems[activeIndex] ?? journeyItems[0]
  const progressLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`

  return (
    <section ref={sectionRef} className="section-frame scrolly-journey">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2>Scroll through the booking journey and coverage flow.</h2>
      </div>

      <div className="scrolly-journey-layout">
        <aside className="journey-sticky-panel">
          <div className="journey-progress-head">
            <p>Journey progress</p>
            <strong>{progressLabel}</strong>
          </div>

          <div className="journey-progress-track" aria-hidden="true">
            <MotionSpan
              className="journey-progress-fill"
              style={reducedMotion ? { scaleY: 1 } : { scaleY: smoothProgress }}
            />
          </div>

          <div className="journey-active-card">
            <span className="journey-step">{activeItem.step}</span>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
          </div>

          <div className="journey-coverage-pills">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </aside>

        <div className="journey-scroll-stack">
          {journeyItems.map((item, index) => (
            <JourneyCard
              key={`${item.step}-${item.title}`}
              item={item}
              index={index}
              total={total}
              progress={smoothProgress}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(heroProgress, [0, 1], [0, -70])
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.45])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.965])

  const heroStyle = reducedMotion ? undefined : { y: heroY, opacity: heroOpacity, scale: heroScale }

  return (
    <>
      <MotionSection
        ref={heroRef}
        className="hero-section hero-single section-frame hero-stage scrollytell-hero"
        style={heroStyle}
      >
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
            {highlights.map((item, index) => (
              <ScrollytellCard key={item.label} className="stat-card" index={index}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </ScrollytellCard>
            ))}
          </div>
        </div>
      </MotionSection>

      <ScrollytellSection
        eyebrow="Explore Beauvia"
        title="Move through the site page by page in a smooth, scroll-led flow."
      >
        <div className="preview-grid scrollytell-grid">
          {previewPages.map((item, index) => (
            <ScrollytellCard key={item.title} className="story-card" index={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link className="inline-link" to={item.to}>
                {item.action}
              </Link>
            </ScrollytellCard>
          ))}
        </div>
      </ScrollytellSection>

      <ScrollytellSection eyebrow="Featured services" title="Choose the grooming experience that fits your day.">
        <div className="services-grid compact-grid scrollytell-grid">
          {services.slice(0, 3).map((service, index) => (
            <ScrollytellCard key={service.title} className="service-tile" index={index}>
              <div className="service-meta">
                <span className="service-price">{service.price}</span>
                <span className="service-duration">{service.duration}</span>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </ScrollytellCard>
          ))}
        </div>

        <div className="section-actions">
          <Link className="secondary-button" to="/services">
            View All Services
          </Link>
        </div>
      </ScrollytellSection>

      <ScrollytellSection eyebrow="Why Beauvia" title="A premium service model built around time and trust.">
        <div className="cards-grid scrollytell-grid">
          {differenceCards.map((item, index) => (
            <ScrollytellCard key={item.title} className="detail-card" index={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </ScrollytellCard>
          ))}
        </div>
      </ScrollytellSection>

      <StickyJourneySection />

      <ScrollytellSection eyebrow="Client feedback" title="Trusted by clients who want grooming without interruption.">
        <div className="testimonials-grid scrollytell-grid">
          {testimonials.map((item, index) => (
            <ScrollytellCard key={item.author} className="testimonial-card" index={index}>
              <p>"{item.quote}"</p>
              <strong>{item.author}</strong>
              <span>{item.role}</span>
            </ScrollytellCard>
          ))}
        </div>
      </ScrollytellSection>

      <ScrollytellSection eyebrow="Next move" title="Book a visit or join the barber network." className="cta-banner">
        <div className="hero-actions">
          <Link className="primary-button" to="/booking">
            Book Now
          </Link>
          <Link className="secondary-button" to="/barbers">
            Join as a Barber
          </Link>
        </div>
      </ScrollytellSection>
    </>
  )
}

export default HomePage
