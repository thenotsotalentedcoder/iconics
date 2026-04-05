import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { EXTERNAL_LINKS } from '../utils/constants';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';
const DARK   = '#0F4C5C';
const MID    = '#2F7C7A';

const glass = {
  background: 'rgba(255,255,255,0.65)',
  border: '1px solid rgba(62,139,135,0.14)',
  backdropFilter: 'blur(12px)',
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.70)',
  border: '1px solid rgba(62,139,135,0.18)',
  borderRadius: '10px',
  padding: '12px 16px',
  fontSize: '14px',
  color: DARK,
  outline: 'none',
  transition: 'border-color 0.2s',
};

const ContactInfoItem = ({ Icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `rgba(62,139,135,0.10)`, border: '1px solid rgba(62,139,135,0.18)' }}>
      <Icon style={{ color: TEAL, fontSize: '17px' }} />
    </div>
    <div>
      <h4 className="font-semibold mb-1 text-sm" style={{ color: DARK }}>{title}</h4>
      {children}
    </div>
  </div>
);

const Contact = () => (
  <PageTransition>
    <div
      className="relative min-h-screen"
      style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}
    >
      <PageBackground />

      <div className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">

          <SectionHeading title="Contact Us" subtitle="Get in touch with the ICONICS'26 team" />

          <div className="flex justify-center mb-12">
            <div className="h-px w-24 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)` }} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">

            {/* Contact Info */}
            <motion.div className="rounded-2xl p-7" style={glass}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

              <div className="flex items-center gap-2 mb-7">
                <span className="w-1 h-5 rounded-full" style={{ background: TEAL }} />
                <h3 className="text-lg font-bold" style={{ color: DARK }}>Contact Information</h3>
              </div>

              <div className="space-y-6">
                <ContactInfoItem Icon={FaMapMarkerAlt} title="Address">
                  <p className="text-sm leading-relaxed" style={{ color: MID }}>
                    Department of Computer Science & IT<br />
                    NED University of Engineering & Technology<br />
                    University Road, Karachi-75270, Pakistan
                  </p>
                </ContactInfoItem>

                <ContactInfoItem Icon={FaPhone} title="Phone">
                  <a href={EXTERNAL_LINKS.PHONE} className="text-sm transition-colors"
                    style={{ color: TEAL }}
                    onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                    onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}>
                    (+92-21) 99261261 EXT: 2385, 2399
                  </a>
                </ContactInfoItem>

                <ContactInfoItem Icon={FaEnvelope} title="Email">
                  <a href={EXTERNAL_LINKS.EMAIL} className="text-sm transition-colors"
                    style={{ color: TEAL }}
                    onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                    onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}>
                    secretary@nediconics.com
                  </a>
                </ContactInfoItem>
              </div>

              {/* Social */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(62,139,135,0.12)' }}>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: TEAL_L }}>Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { href: EXTERNAL_LINKS.FACEBOOK, Icon: FaFacebook, label: 'Facebook' },
                    { href: EXTERNAL_LINKS.TWITTER,  Icon: FaTwitter,  label: 'Twitter'  },
                    { href: EXTERNAL_LINKS.LINKEDIN, Icon: FaLinkedin, label: 'LinkedIn' },
                  ].map(({ href, Icon, label }) => (
                    <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                      style={{ background: 'rgba(62,139,135,0.08)', border: '1px solid rgba(62,139,135,0.18)', color: TEAL }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      onHoverStart={e => { e.target.style.background = TEAL; e.target.style.color = '#fff'; e.target.style.boxShadow = '0 4px 14px rgba(62,139,135,0.30)'; }}
                      onHoverEnd={e => { e.target.style.background = 'rgba(62,139,135,0.08)'; e.target.style.color = TEAL; e.target.style.boxShadow = 'none'; }}>
                      <Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="rounded-2xl p-7" style={glass}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

              <div className="flex items-center gap-2 mb-7">
                <span className="w-1 h-5 rounded-full" style={{ background: TEAL }} />
                <h3 className="text-lg font-bold" style={{ color: DARK }}>Send a Message</h3>
              </div>

              <form className="space-y-4">
                {[
                  { label: 'Name',    type: 'text',  placeholder: 'Your name'           },
                  { label: 'Email',   type: 'email', placeholder: 'your@email.com'      },
                  { label: 'Subject', type: 'text',  placeholder: 'Subject'             },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold tracking-wide uppercase mb-1.5" style={{ color: TEAL_L }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = TEAL; e.target.style.boxShadow = `0 0 0 3px rgba(62,139,135,0.10)`; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.18)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase mb-1.5" style={{ color: TEAL_L }}>Message</label>
                  <textarea rows={4} placeholder="Your message..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => { e.target.style.borderColor = TEAL; e.target.style.boxShadow = `0 0 0 3px rgba(62,139,135,0.10)`; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.18)'; e.target.style.boxShadow = 'none'; }} />
                </div>
                <motion.button type="submit"
                  className="w-full py-3 text-white text-sm font-semibold rounded-xl transition-all duration-200"
                  style={{ background: `linear-gradient(135deg, ${TEAL} 0%, #2D6E6A 100%)`, boxShadow: '0 4px 14px rgba(62,139,135,0.28)' }}
                  whileHover={{ boxShadow: '0 6px 22px rgba(62,139,135,0.40)' }}
                  whileTap={{ scale: 0.98 }}>
                  Send Message
                </motion.button>
                <p className="text-xs" style={{ color: '#5AA8A3' }}>
                  Note: This form is for display purposes. Please email us directly at <a href={EXTERNAL_LINKS.EMAIL} style={{ color: TEAL }}>secretary@nediconics.com</a>.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(62,139,135,0.14)', boxShadow: '0 4px 24px rgba(62,139,135,0.08)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.3076303646874!2d67.02561931500283!3d24.866455584062657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sNED%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2s!4v1645000000000!5m2!1sen!2s"
              width="100%" height="380" style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy" title="NED University Location" />
          </motion.div>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default Contact;