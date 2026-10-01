import { Link } from 'react-router-dom'
import { PixelDiamond, GitHubIcon, LinkedInIcon, EmailIcon } from './Icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top section */}
        <div className="py-16 md:py-24 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* CTA */}
            <div className="md:col-span-7">
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
                Let's build<br />
                <span className="text-accent-purple">something great</span>
              </h2>
              <p className="text-white/50 max-w-md text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-white text-ink font-display font-semibold rounded-full hover:bg-accent-purple hover:text-white transition-all duration-300 group"
                id="footer-cta"
              >
                Get in Touch
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>

            {/* Links */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">Navigate</h3>
              <ul className="space-y-3">
                {[
                  { to: '/', label: "It's Me" },
                  { to: '/projects', label: 'Projects' },
                  { to: '/experience', label: 'Experience' },
                  { to: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/Rrohandewangan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    <GitHubIcon size={16} className="group-hover:scale-110 transition-transform" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/rohan-dewangan-a43627270"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    <LinkedInIcon size={16} className="group-hover:scale-110 transition-transform" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:dewanganrohan126@gmail.com"
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    <EmailIcon size={16} className="group-hover:scale-110 transition-transform" />
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/30 text-xs font-mono tracking-widest">
            <PixelDiamond size={10} />
            <span>R.O.H.A.N</span>
            <PixelDiamond size={10} />
            <span>c0de</span>
            <PixelDiamond size={10} />
          </div>
          <p className="text-white/30 text-xs font-mono tracking-wider">
            © {currentYear} Rohan Dewangan. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  )
}
