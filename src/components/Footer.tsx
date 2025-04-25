'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@ayushsharma.dev', label: 'Email' },
  ];

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#portfolio' },
    { name: 'Stats', href: '#stats' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050505] border-t border-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col space-y-4">
            <Link href="#home" className="flex items-center gap-2">
              <span className="font-bold text-2xl">
                <span className="gradient-text">Ayush</span>
                <span className="text-white">.dev</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Full Stack Developer specializing in building exceptional digital experiences. 
              Let's turn your ideas into reality.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 border border-gray-800 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
                    whileHover={{ y: -3 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="text-gray-400">San Francisco, CA</p>
            <p className="text-gray-400">hello@ayushsharma.dev</p>
            <p className="text-gray-400">+1 (123) 456-7890</p>

            <div className="pt-4">
              <Link
                href="#contact"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 inline-block"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Ayush Sharma. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;