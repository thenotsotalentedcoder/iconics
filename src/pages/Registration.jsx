import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { registrationTypes } from '../data/registration';
import { EXTERNAL_LINKS } from '../utils/constants';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const Registration = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <SectionHeading
            title="Registration"
            subtitle="Secure your spot at ICONICS'26"
          />

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:p-6 mb-3 sm:mb-4 sm:mb-6 sm:mb-8 sm:mb-12 sm:mb-16">
            {registrationTypes.map((regType, index) => (
              <motion.div
                key={index}
                className={`bg-bg-card border rounded-lg p-4 sm:p-6 ${
                  regType.recommended
                    ? 'border-accent-red shadow-glow-red'
                    : 'border-border-subtle'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {regType.recommended && (
                  <div className="bg-accent-red text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-3 sm:mb-4">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                  {regType.type}
                </h3>
                <p className="text-text-muted text-sm mb-3 sm:mb-4">
                  Until {regType.deadline}
                </p>

                {/* Prices */}
                <div className="mb-3 sm:mb-4 sm:mb-6 space-y-2">
                  {regType.prices.international && (
                    <div>
                      <span className="text-accent-red font-bold text-2xl">
                        {regType.prices.international}
                      </span>
                      <span className="text-text-muted text-sm ml-2">International</span>
                    </div>
                  )}
                  {regType.prices.national && (
                    <div>
                      <span className="text-white font-bold text-xl">
                        {regType.prices.national}
                      </span>
                      <span className="text-text-muted text-sm ml-2">National</span>
                    </div>
                  )}
                  {regType.prices.student && (
                    <div>
                      <span className="text-white font-bold text-xl">
                        {regType.prices.student}
                      </span>
                      <span className="text-text-muted text-sm ml-2">Student</span>
                    </div>
                  )}
                  {regType.prices.all && (
                    <div>
                      <span className="text-accent-red font-bold text-2xl">
                        {regType.prices.all}
                      </span>
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <ul className="space-y-2 mb-3 sm:mb-4 sm:mb-6">
                  {regType.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-text-secondary text-sm">
                      <FaCheck className="text-accent-red mr-2 mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Registration Process */}
          <div className="bg-bg-card border border-border-subtle rounded-lg p-5 sm:p-4 sm:p-6 md:p-8 mb-3 sm:mb-4 sm:mb-6 sm:mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4 sm:mb-6">Registration Process</h3>
            <div className="grid md:grid-cols-5 gap-4 sm:p-6">
              {[
                { step: 1, title: "Choose Type", desc: "Select your registration category" },
                { step: 2, title: "Fill Form", desc: "Complete the Google Form" },
                { step: 3, title: "Payment", desc: "Transfer fee to provided account" },
                { step: 4, title: "Receipt", desc: "Upload payment receipt" },
                { step: 5, title: "Confirmation", desc: "Receive email confirmation" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-accent-red text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-bg-card border border-border-subtle rounded-lg p-5 sm:p-4 sm:p-6 md:p-8 mb-3 sm:mb-4 sm:mb-6 sm:mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4 sm:mb-6">Payment Information</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:p-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Bank Details</h4>
                <div className="space-y-2 text-text-secondary">
                  <p><strong className="text-white">Bank Name:</strong> National Bank of Pakistan</p>
                  <p><strong className="text-white">Account Title:</strong> ICONICS Conference</p>
                  <p><strong className="text-white">Account Number:</strong> 1234567890</p>
                  <p><strong className="text-white">IBAN:</strong> PK12NBPA1234567890123456</p>
                </div>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">International Transfers</h4>
                <div className="space-y-2 text-text-secondary">
                  <p><strong className="text-white">SWIFT Code:</strong> NBPAPKKA</p>
                  <p><strong className="text-white">Branch Code:</strong> 0123</p>
                  <p className="text-sm text-text-muted mt-4">
                    *International participants can also pay via credit card (link will be provided upon registration)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              href={EXTERNAL_LINKS.GOOGLE_FORM}
              external
            >
              Register Now via Google Forms
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Registration;
