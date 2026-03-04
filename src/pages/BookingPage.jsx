import { Link } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { services } from '../siteData'

function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book now"
        title="Book your Beauvia appointment."
        description="Reserve a mobile barber visit for your home, office, hotel, or event location in a few simple details."
        actions={
          <Link className="secondary-button" to="/contact">
            Need a custom request?
          </Link>
        }
      />

      <Reveal as="section" className="section-frame booking-layout" variant="up">
        <div className="form-copy motion-copy">
          <h3>What happens after booking?</h3>
          <p>
            Once you submit your request, we confirm the visit window, stylist availability, and
            service details. You get a clean, direct booking flow without the back and forth.
          </p>

          <div className="info-stack">
            <div>
              <strong>Fast confirmation</strong>
              <span>We respond to booking requests within business hours.</span>
            </div>
            <div>
              <strong>Professional setup</strong>
              <span>Barbers arrive prepared for a clean, efficient service session.</span>
            </div>
            <div>
              <strong>Flexible visits</strong>
              <span>Great for homes, offices, hotels, and group grooming days.</span>
            </div>
          </div>
        </div>

        <Reveal as="div" variant="right" delay={120}>
          <BookingForm services={services} />
        </Reveal>
      </Reveal>
    </>
  )
}

export default BookingPage
