import { useState } from 'react'

const keralaDistricts = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod',
]

const routes = ['North route', 'South route', 'Town route', 'Hill/rural route']
const workTypes = ['Fades & tapers', 'Haircut + beard', 'House calls', 'Event grooming']
const barberToolsOptions = [
  'Basic tools (trimmer, scissor, comb, razor)',
  'Basic tools + grooming products',
  'Basic tools + Facial products',
  'Basic tools + Grooming + Facial products',
]

const districtAreas = {
  Thiruvananthapuram: ['Kazhakkoottam', 'Neyyattinkara', 'Attingal', 'Pattom'],
  Kollam: ['Kollam Town', 'Karunagappally', 'Punalur', 'Paravur'],
  Pathanamthitta: ['Adoor', 'Thiruvalla', 'Konni', 'Ranni'],
  Alappuzha: ['Alappuzha Town', 'Cherthala', 'Kayamkulam', 'Haripad'],
  Kottayam: ['Kottayam Town', 'Pala', 'Changanassery', 'Ettumanoor'],
  Idukki: ['Thodupuzha', 'Munnar', 'Kattappana', 'Nedumkandam'],
  Ernakulam: ['Kochi', 'Aluva', 'Perumbavoor', 'Thripunithura'],
  Thrissur: ['Thrissur Town', 'Guruvayur', 'Kodungallur', 'Irinjalakuda'],
  Palakkad: ['Palakkad Town', 'Ottapalam', 'Pattambi', 'Mannarkkad'],
  Malappuram: ['Manjeri', 'Perinthalmanna', 'Tirur', 'Kottakkal'],
  Kozhikode: ['Kozhikode City', 'Vadakara', 'Koyilandy', 'Ramanattukara'],
  Wayanad: ['Kalpetta', 'Sulthan Bathery', 'Mananthavady', 'Meenangadi'],
  Kannur: ['Kannur Town', 'Thalassery', 'Payyanur', 'Mattannur'],
  Kasaragod: ['Kasaragod Town', 'Kanhangad', 'Nileshwaram', 'Uppala'],
}

const applicationDefaults = {
  name: '',
  email: '',
  phone: '',
  state: 'Kerala',
  district: '',
  route: '',
  area: '',
  setup: '',
  portfolio: '',
  socials: '',
  workType: '',
}

function BarberApplicationForm() {
  const [form, setForm] = useState(applicationDefaults)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => {
      if (name === 'name' || name === 'email' || name === 'phone') {
        const nextForm = { ...current, [name]: value }
        const hasBaseDetails =
          nextForm.name.trim() !== '' && nextForm.email.trim() !== '' && nextForm.phone.trim() !== ''

        if (!hasBaseDetails) {
          return {
            ...nextForm,
            district: '',
            route: '',
            area: '',
          }
        }

        return nextForm
      }

      if (name === 'district') {
        return {
          ...current,
          district: value,
          route: '',
          area: '',
        }
      }

      return { ...current, [name]: value }
    })
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setForm(applicationDefaults)
  }

  const areaOptions = form.district ? districtAreas[form.district] ?? [] : []
  const hasBaseDetails =
    form.name.trim() !== '' && form.email.trim() !== '' && form.phone.trim() !== ''

  return (
    <form className="glass-form barber-form-card" onSubmit={handleSubmit}>
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
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
          />
        </label>

        <label>
          State
          <input name="state" value={form.state} readOnly aria-readonly="true" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          District
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            required
            disabled={!hasBaseDetails}
          >
            <option value="" disabled>
              Select Kerala district
            </option>
            {keralaDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Service route
        <select
          name="route"
          value={form.route}
          onChange={handleChange}
          required
          disabled={!form.district}
        >
          <option value="" disabled>
            Select route
          </option>
          {routes.map((route) => (
            <option key={route} value={route}>
              {route}
            </option>
          ))}
        </select>
      </label>

      <label>
        Area
        <select
          name="area"
          value={form.area}
          onChange={handleChange}
          required
          disabled={!form.district}
        >
          <option value="" disabled>
            Select area
          </option>
          {areaOptions.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <div className="form-grid">
        <label>
          Barber tools
          <select
            name="setup"
            value={form.setup}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select barber tools
            </option>
            {barberToolsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Portfolio link
          <input
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Social media profiles
          <input
            name="socials"
            value={form.socials}
            onChange={handleChange}
            placeholder="Instagram, TikTok, etc."
            required
          />
        </label>

        <label>
          Type of work
          <select name="workType" value={form.workType} onChange={handleChange} required>
            <option value="" disabled>
              Select type
            </option>
            {workTypes.map((workType) => (
              <option key={workType} value={workType}>
                {workType}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button className="primary-button full-width" type="submit">
        Apply Now
      </button>

      {submitted ? (
        <p className="form-notice success">
          Application received. Follow up with your review process once a backend is connected.
        </p>
      ) : (
        <p className="form-notice">This page is ready for freelance barber applications.</p>
      )}
    </form>
  )
}

export default BarberApplicationForm
