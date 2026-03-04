import { useState } from 'react'

const bookingDefaults = {
  name: '',
  phone: '',
  service: 'Signature Fade',
  date: '',
  address: '',
  notes: '',
}

function BookingForm({ services }) {
  const [form, setForm] = useState(bookingDefaults)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('Submit your booking and continue on WhatsApp to confirm it.')
  const [whatsappUrl, setWhatsappUrl] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setStatus('idle')
    setMessage('Submit your booking and continue on WhatsApp to confirm it.')
    setWhatsappUrl('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('Saving your booking...')
    setWhatsappUrl('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const raw = await response.text()
      let data = null

      if (raw) {
        try {
          data = JSON.parse(raw)
        } catch {
          data = null
        }
      }

      if (!response.ok) {
        throw new Error(data?.message || `Unable to save booking. Server responded with ${response.status}.`)
      }

      setStatus('success')
      setMessage(data?.message || 'Booking saved successfully.')
      setWhatsappUrl(data?.whatsappUrl || '')
      setForm(bookingDefaults)
    } catch (error) {
      setStatus('error')
      setMessage(
        error.message ||
          'Unable to save booking. Make sure both backend and frontend are running with npm run dev.',
      )
    }
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
          Phone number
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
          />
        </label>

        <label>
          Service
          <select name="service" value={form.service} onChange={handleChange}>
            {services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Preferred date
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </label>
      </div>

      <label>
        Address or location
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Home, office, hotel, or event address"
          required
        />
      </label>

      <label>
        Extra notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Tell us your preferred style, timing, or group size"
          rows="5"
        />
      </label>

      <button className="primary-button full-width" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit Booking'}
      </button>

      <p className={`form-notice${status === 'success' ? ' success' : ''}${status === 'error' ? ' error' : ''}`}>
        {message}
      </p>

      {whatsappUrl ? (
        <div className="form-followup-actions">
          <a className="secondary-button full-width" href={whatsappUrl} target="_blank" rel="noreferrer">
            Continue on WhatsApp
          </a>
        </div>
      ) : null}
    </form>
  )
}

export default BookingForm
