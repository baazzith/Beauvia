import BarberApplicationForm from '../components/BarberApplicationForm'
import Reveal from '../components/Reveal'

function BarbersPage() {
  return (
    <>
      <section className="section-frame barbers-hero hero-stage">
        <div className="barbers-hero-inner">
          <p className="eyebrow">Join us</p>
          <h1 className="barbers-hero-title">
            Barber <span>Application</span>
          </h1>
          <p className="barbers-hero-text">
            Join the Beauvia mobile barber network. Applications are currently open for Kerala only.
            Share your district, work area, and the type of bookings you want to take.
          </p>
        </div>
      </section>

      <Reveal as="section" className="section-frame barbers-form-section" variant="up">
        <div className="barbers-form-wrap">
          <Reveal as="div" variant="zoom" delay={90}>
            <BarberApplicationForm />
          </Reveal>
        </div>
      </Reveal>
    </>
  )
}

export default BarbersPage
