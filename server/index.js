import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const dataDir = path.join(__dirname, 'data')
const bookingsFile = path.join(dataDir, 'bookings.json')
const distDir = path.join(rootDir, 'dist')
const shouldServeStatic = process.argv.includes('--serve-static')
const port = Number(process.env.PORT) || 8787
const defaultWhatsappNumber = '7736317618'

const app = express()

app.use(express.json({ limit: '1mb' }))

app.use((error, _req, res, next) => {
  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({
      ok: false,
      message: 'Invalid booking payload. Please refresh and submit the form again.',
    })
  }

  return next(error)
})

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeBooking(body = {}) {
  return {
    name: cleanText(body.name),
    phone: cleanText(body.phone),
    service: cleanText(body.service),
    date: cleanText(body.date),
    address: cleanText(body.address),
    notes: cleanText(body.notes),
  }
}

function validateBooking(booking) {
  const errors = []

  if (!booking.name) errors.push('Full name is required.')
  if (!booking.phone) errors.push('Phone number is required.')
  if (!booking.service) errors.push('Service is required.')
  if (!booking.date) errors.push('Preferred date is required.')
  if (!booking.address) errors.push('Address or location is required.')

  return errors
}

async function ensureBookingsFile() {
  await fs.mkdir(dataDir, { recursive: true })

  if (!existsSync(bookingsFile)) {
    await fs.writeFile(bookingsFile, '[]\n', 'utf8')
  }
}

async function readBookings() {
  await ensureBookingsFile()

  try {
    const content = await fs.readFile(bookingsFile, 'utf8')
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function saveBooking(entry) {
  const current = await readBookings()
  current.unshift(entry)
  await fs.writeFile(bookingsFile, `${JSON.stringify(current, null, 2)}\n`, 'utf8')
}

function buildWhatsAppUrl(booking) {
  const rawWhatsappNumber = cleanText(process.env.WHATSAPP_NUMBER || defaultWhatsappNumber).replace(
    /\D/g,
    '',
  )
  const whatsappNumber =
    rawWhatsappNumber.length === 10 ? `91${rawWhatsappNumber}` : rawWhatsappNumber

  if (!whatsappNumber) {
    return ''
  }

  const lines = [
    'Hello Beauvia, I want to confirm a booking.',
    '',
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Service: ${booking.service}`,
    `Preferred date: ${booking.date}`,
    `Address: ${booking.address}`,
    booking.notes ? `Notes: ${booking.notes}` : '',
  ].filter(Boolean)

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/bookings', async (req, res, next) => {
  try {
    const booking = normalizeBooking(req.body)
    const errors = validateBooking(booking)

    if (errors.length > 0) {
      return res.status(400).json({
        ok: false,
        message: errors[0],
        errors,
      })
    }

    const entry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...booking,
    }

    let bookingSaved = true

    try {
      await saveBooking(entry)
    } catch (saveError) {
      bookingSaved = false
      console.error('Failed to persist booking to disk:', saveError)
    }

    const whatsappUrl = buildWhatsAppUrl(entry)

    if (!bookingSaved && !whatsappUrl) {
      return res.status(500).json({
        ok: false,
        message: 'Unable to save booking right now. Please try again.',
      })
    }

    let message = 'Booking saved successfully.'

    if (whatsappUrl && bookingSaved) {
      message = 'Booking saved. Continue on WhatsApp to send the booking details.'
    } else if (whatsappUrl && !bookingSaved) {
      message = 'Temporary storage issue. Continue on WhatsApp to complete your booking.'
    } else if (!whatsappUrl && bookingSaved) {
      message = 'Booking saved to the backend. Add WHATSAPP_NUMBER in .env to enable WhatsApp handoff.'
    }

    return res.status(201).json({
      ok: true,
      message,
      booking: entry,
      whatsappUrl,
      bookingSaved,
    })
  } catch (error) {
    return next(error)
  }
})

if (shouldServeStatic) {
  app.use(express.static(distDir))

  app.get(/^(?!\/api).*/, (_req, res, next) => {
    const indexFile = path.join(distDir, 'index.html')

    if (!existsSync(indexFile)) {
      return next()
    }

    return res.sendFile(indexFile)
  })
}

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({
    ok: false,
    message: 'Unable to save booking right now. Please try again.',
  })
})

app.listen(port, () => {
  console.log(`Beauvia backend running on http://localhost:${port}`)
})
