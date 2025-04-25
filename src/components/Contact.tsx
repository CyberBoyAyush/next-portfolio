'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Replace with your actual Formspree endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (formRef.current) formRef.current.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputClasses = "w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200";

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] -bottom-10 right-0 opacity-50" />
      <div className="absolute w-96 h-96 bg-indigo-900/10 rounded-full blur-[120px] -top-20 left-10 opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-purple-400 block mb-1 uppercase tracking-wider">Let's Talk</span>
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out to me using the form below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:col-span-1"
          >
            {/* Contact cards */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-[#111111] border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Phone className="text-purple-400" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">Phone</h4>
                  <p className="text-white">+91 9990969661</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-[#111111] border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Mail className="text-purple-400" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">Email</h4>
                  <p className="text-white">connect@ayush-sharma.in</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-[#111111] border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <MapPin className="text-purple-400" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-1">Location</h4>
                  <p className="text-white">Jaipur, India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="relative bg-[#111111] p-8 rounded-2xl border border-gray-800 shadow-xl shadow-purple-900/5">
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-[#111111] rounded-2xl flex flex-col items-center justify-center p-6 z-20 border border-gray-800"
                >
                  <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-center mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setSubmitStatus(null)}
                    className="px-6 py-2 bg-[#1a1a1a] rounded-full text-white hover:bg-[#222222] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      Your Email
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
                    className={inputClasses}
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
                    className={`${inputClasses} resize-none`}
                    placeholder="Hi Ayush, I'd like to discuss a project with you..."
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
                
                <div className="text-xs text-center text-gray-500 mt-4">
                  Powered by <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 hover:underline">Formspree</a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;