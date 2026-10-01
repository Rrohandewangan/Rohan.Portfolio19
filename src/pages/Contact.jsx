import { useState } from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { PixelDiamond, GitHubIcon, LinkedInIcon, EmailIcon, PhoneIcon } from '../components/Icons'

const contactLinks = [
  {
    icon: EmailIcon,
    label: 'Email',
    value: 'dewanganrohan126@gmail.com',
    href: 'mailto:dewanganrohan126@gmail.com',
    color: 'group-hover:text-accent-purple',
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+91 95164 88589',
    href: 'tel:+919516488589',
    color: 'group-hover:text-accent-green',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'Rrohandewangan',
    href: 'https://github.com/Rrohandewangan',
    color: 'group-hover:text-ink',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'rohan-dewangan-a43627270',
    href: 'https://linkedin.com/in/rohan-dewangan-a43627270',
    color: 'group-hover:text-accent-blue',
  },
]

export default function Contact() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        setError(result.message || 'Something went wrong. Please try again later.')
      }
    } catch (err) {
      setError('Failed to send message. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Page Header */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-4">
            <PixelDiamond size={12} className="text-accent-purple" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Say Hello</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            Contact
          </h1>
          <p className="mt-6 text-ink-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            Have a project in mind, want to collaborate, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <SpotlightCard className="bg-ink text-cream border-ink/5" spotlightColor="rgba(139, 92, 246, 0.15)">
              <div className="p-8 md:p-10 relative z-10">
                <h2 className="font-display text-2xl font-bold mb-8">Send a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-accent-green/10 border border-accent-green/20 rounded-2xl text-accent-green text-sm font-medium flex items-center gap-3">
                    <span className="text-lg">✓</span>
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium flex items-center gap-3">
                    <span className="text-lg">⚠</span>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/10 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/10 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/10 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white/10 text-white font-display font-semibold text-sm rounded-xl hover:bg-accent-purple hover:text-white transition-all duration-300 group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    id="contact-submit"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                  </button>
                </form>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <div className="space-y-4 mb-8">
              {contactLinks.map((link, i) => {
                const Icon = link.icon
                return (
                  <a
                    key={i}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block group"
                    id={`contact-link-${link.label.toLowerCase()}`}
                  >
                    <SpotlightCard className="flex items-center gap-5 p-5 bg-ink text-cream border-ink/5 hover:border-accent-purple/20 transition-all duration-300" spotlightColor="rgba(236, 72, 153, 0.15)">
                      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-colors duration-300 ${link.color} relative z-10`}>
                        <Icon size={20} />
                      </div>
                      <div className="relative z-10">
                        <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                          {link.label}
                        </span>
                        <span className="block text-sm font-medium text-white mt-0.5 group-hover:text-accent-pink transition-colors duration-300">
                          {link.value}
                        </span>
                      </div>
                    </SpotlightCard>
                  </a>
                )
              })}
            </div>

            {/* Availability badge */}
            <div className="bg-ink rounded-3xl p-8 text-cream relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-green/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green"></span>
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-green">
                    Available for Opportunities
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">
                  Currently seeking SWE internships
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  I'm actively looking for software engineering internship opportunities where I can contribute to impactful projects and grow as a developer.
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-4">
              <SpotlightCard className="bg-ink text-cream border-ink/5" spotlightColor="rgba(16, 185, 129, 0.15)">
                <div className="p-6 relative z-10 flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                      Based in
                    </span>
                    <span className="block text-sm font-medium text-white mt-0.5">Bhilai, Chhattisgarh, India</span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
