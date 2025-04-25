'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out to me using the form below or through my social media channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Feel free to reach out to me anytime. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111111] rounded-lg border border-gray-800">
                  <Phone className="text-purple-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Phone</h4>
                  <p className="text-white">+1 (123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111111] rounded-lg border border-gray-800">
                  <Mail className="text-purple-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Email</h4>
                  <p className="text-white">hello@ayushsharma.dev</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111111] rounded-lg border border-gray-800">
                  <MapPin className="text-purple-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Location</h4>
                  <p className="text-white">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Map or Additional Content */}
            <div className="mt-8 p-4 bg-[#111111] border border-gray-800 rounded-lg h-48 flex items-center justify-center">
              <p className="text-gray-400 text-center">
                Map Placeholder<br />
                <span className="text-sm">Map Integration can be added here</span>
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-6 bg-green-900/30 border border-green-700 rounded-lg text-green-400"
                >
                  Your message has been sent successfully. I'll get back to you soon!
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-6 bg-red-900/30 border border-red-700 rounded-lg text-red-400"
                >
                  There was an error sending your message. Please try again.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Hi Ayush, I'd like to discuss a project with you..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-purple-700/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/25'
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
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;