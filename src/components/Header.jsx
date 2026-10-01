import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PixelDiamond } from './Icons'

const navLinks = [
  { path: '/', label: "It's Me" },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
          }`}>
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              id="header-logo"
            >
              <div className="w-8 h-8 rounded-full bg-ink text-cream flex items-center justify-center text-sm font-bold font-display group-hover:scale-110 group-hover:bg-accent-purple transition-all duration-300">
                R
              </div>
              <div className="flex items-center gap-1.5 font-display font-semibold text-sm tracking-wide">
                <span className="group-hover:text-accent-purple transition-colors duration-300">Rohan</span>
                <PixelDiamond size={12} className="text-accent-purple" />
                <span className="group-hover:text-accent-purple transition-colors duration-300">Dewangan</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-xs font-mono font-medium uppercase tracking-widest rounded-full transition-colors duration-300 ${
                      isActive
                        ? 'text-cream'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {/* Active pill background — animates between links */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-ink rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Hover underline for non-active links */}
                    {!isActive && (
                      <span className="absolute bottom-0.5 left-4 right-4 h-px bg-accent-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Year badge (desktop) */}
            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <span className="text-xs font-mono text-ink-muted tracking-widest px-3 py-1.5 rounded-full border border-ink/10">
                2026
              </span>
            </motion.div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/5 hover:bg-ink/10 transition-colors"
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              <span className="text-xs font-mono font-medium uppercase tracking-widest">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.button
              className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-[280px] bg-cream shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-ink/10">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-full bg-ink text-cream flex items-center justify-center text-sm font-bold font-display">
                    R
                  </div>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full bg-ink/5"
                >
                  Close
                </button>
              </div>
              <nav className="p-6 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-mono uppercase tracking-widest transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'bg-ink text-cream'
                          : 'text-ink-muted hover:bg-ink/5 hover:text-ink'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="absolute bottom-8 left-6 right-6 flex items-center justify-center gap-2 text-ink-muted">
                <PixelDiamond size={10} />
                <span className="text-xs font-mono tracking-widest">CODE</span>
                <PixelDiamond size={10} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
