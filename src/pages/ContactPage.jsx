import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'
import { contactDetails } from '../siteData'

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, partnerships, private event bookings, or service-area checks. Reach out and Beauvia can handle the next step."
      />

      <Reveal as="section" className="section-frame contact-grid" variant="up">
        <Reveal as="article" className="contact-panel interactive-card" variant="left" delay={60}>
          <h3>Reach Beauvia</h3>
          <div className="contact-list">
            {contactDetails.map((item) => (
              <div key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" variant="right" delay={140}>
          <ContactForm />
        </Reveal>
      </Reveal>
    </>
  )
}

export default ContactPage
