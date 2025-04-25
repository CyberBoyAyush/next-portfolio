'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('submitting');
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmissionMessage('Your message has been sent successfully!');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
        setSubmissionMessage('');
      }, 5000);
    } catch {
      setSubmissionMessage('There was an error sending your message. Please try again.');
      setStatus('error');
      
      setTimeout(() => {
        setStatus('idle');
        setSubmissionMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Input styling
  const inputClasses = "w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/40 focus:outline-none text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300";

  return (
    <section id="contact" ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/10 to-transparent opacity-70 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-900/10 to-transparent opacity-70 blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium text-purple-400 block mb-1 uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl font-bold">
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
              Contact Me
            </span>
          </h2>
          <p className="mt-2 text-gray-400 text-sm max-w-2xl mx-auto">
            Let&apos;s discuss your project or just say hello!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${inputClasses} resize-none`}
                  placeholder="Hi Ayush, I&apos;d like to discuss a project with you..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-purple-700/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </motion.button>

              {/* Form status message */}
              {status !== 'idle' && (
                <div
                  className={`text-center p-3 rounded-lg text-sm ${
                    status === 'success'
                      ? 'bg-green-900/30 text-green-300 border border-green-800'
                      : 'bg-red-900/30 text-red-300 border border-red-800'
                  }`}
                >
                  {submissionMessage}
                </div>
              )}

              <p className="text-xs text-gray-400 text-center mt-4">
                This form is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                <p className="text-gray-400 mb-6">
                  I&apos;d love to hear from you! Whether you have a question, proposal, or just want to say hello - I&apos;ll try my best to get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800/70 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <div className="text-white">+91 9990969661</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800/70 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white">connect@ayush-sharma.in</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800/70 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Location</div>
                    <div className="text-white">Jaipur, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional section - Follow or schedule */}
            <div className="mt-10">
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-6 rounded-xl border border-gray-800/80 backdrop-blur-md">
                <h3 className="text-lg font-medium text-white mb-2">Need more ways to reach out?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  You can also connect with me on social media or schedule a call directly.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Schedule a call <ArrowRight size={16} className="ml-1" />
                </a>
                <div className="mt-6 text-xs text-gray-500">
                  Powered by <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 hover:underline">Formspree</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;