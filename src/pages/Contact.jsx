import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { EXTERNAL_LINKS } from '../utils/constants';

const Contact = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            title="Contact Us"
            subtitle="Get in touch with the ICONICS'26 team"
          />

          <div className="grid md:grid-cols-2 gap-12 mb-3 sm:mb-4 sm:mb-6 sm:mb-8 sm:mb-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4 sm:mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <FaMapMarkerAlt className="text-accent-red text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Address</h4>
                    <p className="text-text-secondary">
                      Department of Computer Science & IT<br />
                      NED University of Engineering & Technology<br />
                      University Road, Karachi-75270<br />
                      Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <FaPhone className="text-accent-red text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <a href={EXTERNAL_LINKS.PHONE} className="text-accent-red hover:underline">
                      (+92-21) 99261261 EXT: 2385, 2399
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <FaEnvelope className="text-accent-red text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a href={EXTERNAL_LINKS.EMAIL} className="text-accent-red hover:underline">
                      secretary@nediconics.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-3 sm:mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href={EXTERNAL_LINKS.FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center hover:bg-accent-red transition-colors group"
                  >
                    <FaFacebook className="text-accent-red text-xl group-hover:text-white" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.TWITTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center hover:bg-accent-red transition-colors group"
                  >
                    <FaTwitter className="text-accent-red text-xl group-hover:text-white" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center hover:bg-accent-red transition-colors group"
                  >
                    <FaLinkedin className="text-accent-red text-xl group-hover:text-white" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4 sm:mb-6">Send us a Message</h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-white mb-2 text-sm">Name</label>
                  <input
                    type="text"
                    className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-3 text-white focus:border-accent-red focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-3 text-white focus:border-accent-red focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-3 text-white focus:border-accent-red focus:outline-none transition-colors"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Message</label>
                  <textarea
                    rows="5"
                    className="w-full bg-bg-card border border-border-subtle rounded-lg px-4 py-3 text-white focus:border-accent-red focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 rounded-lg hover:shadow-glow-red transition-all hover:scale-105"
                >
                  Send Message
                </button>

                <p className="text-text-muted text-xs">
                  Note: This form is currently for display purposes. Please use the email address above to contact us directly.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.3076303646874!2d67.02561931500283!3d24.866455584062657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sNED%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2s!4v1645000000000!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="NED University Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
