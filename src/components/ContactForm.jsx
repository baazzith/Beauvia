import { useState } from 'react'

const contactDefaults = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function ContactForm() {
  const [form, setForm] = useState(contactDefaults)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setForm(contactDefaults)
  }

  return (
    <form className="glass-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <label>
        Subject
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          required
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your request"
          rows="5"
          required
        />
      </label>

      <button className="primary-button full-width" type="submit">
        Send Message
      </button>

      {submitted ? (
        <p className="form-notice success">
          Message sent in this demo flow. Connect this form to email or a backend next.
        </p>
      ) : (
        <p className="form-notice">Ideal for events, partnerships, and custom requests.</p>
      )}
    </form>
  )
}

export default ContactForm
