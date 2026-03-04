import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navLinks } from '../siteData'

function SiteLayout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="page-shell">
      <div className="background-orb background-orb-left" />
      <div className="background-orb background-orb-right" />

      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Beauvia home">
          <img className="brand-logo-image" src="/beauvia-logo.svg" alt="Beauvia" />
        </NavLink>

        <div className="header-actions">
          <NavLink className="header-cta" to="/booking">
            Book Now
          </NavLink>

          <button
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          id="primary-navigation"
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div>
          <NavLink className="brand footer-brand" to="/">
            <img className="brand-logo-image" src="/beauvia-logo.svg" alt="Beauvia" />
          </NavLink>
          <p>Premium mobile barber service for homes, offices, hotels, and event bookings.</p>
        </div>

        <div className="footer-links">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/booking">Book Now</NavLink>
        </div>
      </footer>

      <p className="developer-credit">Developed by BASITH ALI</p>
    </div>
  )
}

export default SiteLayout
