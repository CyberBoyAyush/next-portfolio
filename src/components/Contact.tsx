'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Mail, Send, ArrowRight, MessageSquare, RotateCcw, Phone, Calendar } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";
import '../styles/terminal.css';
import SectionHeading from './SectionHeading';

type CommandType = {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type InputMode = '' | 'name' | 'email' | 'message';

// Typing animation delay in milliseconds
const TYPING_DELAY = 30;

const Contact = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const [commandHistory, setCommandHistory] = useState<CommandType[]>([
    {
      command: '',
      output: (
        <div className="space-y-2 text-gray-300">
          <p className="text-gray-300 font-semibold">Welcome to Ayush's Terminal Contact!</p>
          <p>Follow these steps to send me a message:</p>
          <p className="ml-4">1. <span className="text-green-400">name</span> - Set your name</p>
          <p className="ml-4">2. <span className="text-green-400">email</span> - Set your email</p>
          <p className="ml-4">3. <span className="text-green-400">message</span> - Write your message</p>
          <p className="ml-4">4. <span className="text-green-400">send</span> - Send your message to Ayush</p>
          <p className="ml-4">5. <span className="text-green-400">status</span> - Check current input status</p>
          <p className="ml-4">6. <span className="text-green-400">clear</span> - Clear the terminal</p>
        </div>
      )
    }
  ]);

  const [command, setCommand] = useState('');
  const [inputMode, setInputMode] = useState<InputMode>('');
  const [inputPrompt, setInputPrompt] = useState('');
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [time, setTime] = useState({ date: '', time: '' });
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [simpleForm, setSimpleForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [simpleFormStatus, setSimpleFormStatus] = useState<FormStatus>('idle');

  // This will scroll to the bottom of the terminal when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, typingText]);

  // This will focus the input field whenever the user clicks anywhere in the terminal container
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Simulate typing effect for commands
  const simulateTyping = (text: string, callback?: () => void) => {
    setIsTyping(true);
    setTypingText('');

    let i = 0;
    const interval = setInterval(() => {
      setTypingText(text.substring(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
        setIsTyping(false);
        callback?.();
      }
    }, TYPING_DELAY);

    return () => clearInterval(interval);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputMode) {
        handleInputSubmit();
      } else {
        handleCommand();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();

      // Simple tab completion
      if (!inputMode) {
        const suggestions = ['name', 'email', 'message', 'send', 'status', 'clear', 'help'];
        const match = suggestions.find(cmd => cmd.startsWith(command.toLowerCase()));
        if (match) {
          setCommand(match);
        }
      }
    } else if (e.key === 'ArrowUp') {
      // Navigate command history (get last command)
      e.preventDefault();
      const lastCommand = commandHistory
        .filter(entry => entry.command)
        .map(entry => entry.command)
        .pop();

      if (lastCommand && !inputMode) {
        setCommand(lastCommand);
      }
    }
  };

  const handleInputSubmit = () => {
    if (!command.trim()) return;

    // Process the input based on the current mode
    const newCommand: CommandType = { command: command, output: '' };

    if (inputMode === 'name') {
      if (command.trim().length < 2) {
        newCommand.output = 'Please enter a valid name (at least 2 characters).';
        newCommand.isError = true;
      } else {
        setFormState(prev => ({ ...prev, name: command.trim() }));
        newCommand.output = `Name set to "${command.trim()}".`;
        setInputMode('');
        setInputPrompt('');
        setCurrentStep(Math.max(currentStep, 2));
      }
    } else if (inputMode === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(command.trim())) {
        newCommand.output = 'Please enter a valid email address.';
        newCommand.isError = true;
      } else {
        setFormState(prev => ({ ...prev, email: command.trim() }));
        newCommand.output = `Email set to "${command.trim()}".`;
        setInputMode('');
        setInputPrompt('');
        setCurrentStep(Math.max(currentStep, 3));
      }
    } else if (inputMode === 'message') {
      if (command.trim().length < 5) {
        newCommand.output = 'Please enter a longer message (at least 5 characters).';
        newCommand.isError = true;
      } else {
        setFormState(prev => ({ ...prev, message: command.trim() }));
        newCommand.output = `Message set to "${command.trim()}".`;
        setInputMode('');
        setInputPrompt('');
        setCurrentStep(Math.max(currentStep, 4));
      }
    }

    setCommandHistory(prev => [...prev, newCommand]);
    setCommand('');
  };

  const executeCommand = (cmdText: string) => {
    simulateTyping(cmdText, () => {
      setCommand(cmdText);
      handleCommand(cmdText);
    });
  };

  // Send email function using our API
  const sendEmail = async (data: FormState) => {
    try {
      // Validate required fields
      if (!data.email || !data.message) {
        console.error('Missing required fields:', { email: !!data.email, message: !!data.message });
        return { success: false, error: 'Missing required fields' };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        console.error('Invalid email format:', data.email);
        return { success: false, error: 'Invalid email format' };
      }

      console.log('Sending contact form...');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name?.trim() || '',
          email: data.email.trim(),
          message: data.message.trim(),
        }),
      });

      console.log('Response status:', response.status, response.statusText);

      const result = await response.json();
      console.log('API response:', result);

      if (result.success) {
        console.log('Email sent successfully!');
        return { success: true };
      } else {
        console.error('API error:', result);
        return {
          success: false,
          error: result.error || 'Failed to send message'
        };
      }
    } catch (error) {
      console.error('Exception sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  };

  const handleCommand = (cmdOverride?: string) => {
    if (inputMode || isTyping) return; // Don't process commands while in input mode or typing

    const cmdText = cmdOverride || command;
    if (!cmdText.trim()) return;

    const newCommand: CommandType = { command: cmdText, output: '' };
    const lowerCommand = cmdText.toLowerCase().trim();

    // Process the command
    if (lowerCommand === 'clear') {
      setCommandHistory([]);
      setCommand('');
      return;
    } else if (lowerCommand === 'name') {
      newCommand.output = "Enter your name:";
      setInputMode('name');
      setInputPrompt('Name:');
    } else if (lowerCommand === 'email') {
      newCommand.output = "Enter your email address:";
      setInputMode('email');
      setInputPrompt('Email:');
    } else if (lowerCommand === 'message') {
      newCommand.output = "Enter your message:";
      setInputMode('message');
      setInputPrompt('Message:');
    } else if (lowerCommand === 'send') {
      if (!formState.name || !formState.email || !formState.message) {
        newCommand.output = `Missing required fields. Current status:
Name: ${formState.name ? '✓' : '✗'}
Email: ${formState.email ? '✓' : '✗'}
Message: ${formState.message ? '✓' : '✗'}

Please fill in all fields before sending.`;
        newCommand.isError = true;
      } else {
        setStatus('submitting');
        newCommand.output = 'Sending your message...';

        // Actually send the email with Web3Forms
        sendEmail(formState).then((result) => {
          if (result.success) {
            setCommandHistory(prev => [
              ...prev,
              {
                command: '',
                output: (
                  <div className="space-y-2">
                    <p className="text-green-400">✓ Message sent successfully!</p>
                    <p>Ayush will get back to you soon at {formState.email}.</p>
                    <p className="text-xs text-gray-500 mt-2">Type 'clear' to start a new conversation.</p>
                  </div>
                ),
              }
            ]);
            setStatus('success');
            // Reset form state after successful submission
            setFormState({ name: '', email: '', message: '' });
            setCurrentStep(1);
          } else {
            const errorMessage = result.error || 'Could not deliver your message. Please try again later.';
            setCommandHistory(prev => [
              ...prev,
              {
                command: '',
                output: (
                  <div className="space-y-2">
                    <p className="text-red-400">✗ Error sending message:</p>
                    <p className="text-red-300 text-sm">{errorMessage}</p>
                    <p className="text-xs text-gray-500 mt-2">Please check your connection and try again, or contact Ayush directly at hi@aysh.me</p>
                  </div>
                ),
                isError: true
              }
            ]);
            setStatus('error');
          }
        }).catch((error) => {
          console.error('Unexpected error in sendEmail:', error);
          setCommandHistory(prev => [
            ...prev,
            {
              command: '',
              output: (
                <div className="space-y-2">
                  <p className="text-red-400">✗ Unexpected error occurred:</p>
                  <p className="text-red-300 text-sm">Network connection failed</p>
                  <p className="text-xs text-gray-500 mt-2">Please check your internet connection and try again.</p>
                </div>
              ),
              isError: true
            }
          ]);
          setStatus('error');
        });
      }
    } else if (lowerCommand === 'status') {
      newCommand.output = (
        <div className="space-y-1">
          <p>Current status:</p>
          <p className="ml-2">Name: {formState.name ? <span className="text-green-400">{formState.name} ✓</span> : <span className="text-gray-500">Not set ✗</span>}</p>
          <p className="ml-2">Email: {formState.email ? <span className="text-green-400">{formState.email} ✓</span> : <span className="text-gray-500">Not set ✗</span>}</p>
          <p className="ml-2">Message: {formState.message ? <span className="text-green-400">Set ✓</span> : <span className="text-gray-500">Not set ✗</span>}</p>
        </div>
      );
    } else if (lowerCommand === 'help') {
      newCommand.output = (
        <div className="space-y-2 text-gray-300">
          <p>Available commands:</p>
          <p className="ml-4"><span className="text-green-400">name</span> - Set your name</p>
          <p className="ml-4"><span className="text-green-400">email</span> - Set your email</p>
          <p className="ml-4"><span className="text-green-400">message</span> - Write your message</p>
          <p className="ml-4"><span className="text-green-400">send</span> - Send your message to Ayush</p>
          <p className="ml-4"><span className="text-green-400">status</span> - Check current input status</p>
          <p className="ml-4"><span className="text-green-400">clear</span> - Clear the terminal</p>
          <p className="text-xs text-gray-500 mt-2">Pro tip: Use <span className="text-gray-400">Tab</span> to autocomplete commands and <span className="text-gray-400">↑</span> to recall previous commands</p>
        </div>
      );
    } else {
      newCommand.output = `Command not found: ${cmdText}. Type "help" to see available commands.`;
      newCommand.isError = true;
    }

    setCommandHistory(prev => [...prev, newCommand]);
    setCommand('');
  };

  // Get next suggested command based on what info is missing
  const getNextSuggestedCommand = () => {
    if (!formState.name) return 'name';
    if (!formState.email) return 'email';
    if (!formState.message) return 'message';
    return 'send';
  };

  // Get dynamic prompt based on state
  const getPrompt = () => {
    if (inputMode) return inputPrompt;
    if (status === 'submitting') return 'sending...';
    return 'ayush@portfolio:~$';
  };

  // Handle simple form submission
  const handleSimpleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!simpleForm.name || !simpleForm.email || !simpleForm.message) {
      setSimpleFormStatus('error');
      console.error('Simple form validation failed: missing required fields');
      return;
    }

    setSimpleFormStatus('submitting');

    try {
      const result = await sendEmail(simpleForm);

      if (result.success) {
        setSimpleFormStatus('success');
        setSimpleForm({ name: '', email: '', message: '' });
        console.log('Simple form submitted successfully');
      } else {
        setSimpleFormStatus('error');
        console.error('Simple form submission failed:', result.error);
      }
    } catch (error) {
      setSimpleFormStatus('error');
      console.error('Simple form submission error:', error);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Simplified background - consistent with Hero */}
      <div className="absolute inset-0 -z-10 bg-[#0D1117]">
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-50 blur-[100px]" />
      </div>

      {/* Simplified grid background - consistent with Hero */}
      <div className="absolute inset-0 -z-10 bg-[length:40px_40px] md:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          subtitle="Get In Touch"
          title={isSimpleMode ? "Contact Form" : "Terminal Contact"}
          description={isSimpleMode ? "Send me a message using this simple form" : "Send me a message using simple terminal commands"}
          className="mb-12"
        />

        {/* Toggle Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={() => setIsSimpleMode(!isSimpleMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 px-6 py-3 bg-gray-900/50 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm transition-all duration-300"
          >
            {isSimpleMode ? (
              <>
                <Terminal size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  I'm technically proficient, show me the terminal
                </span>
              </>
            ) : (
              <>
                <MessageSquare size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  I'm technically deprived, need simple form
                </span>
              </>
            )}
            <RotateCcw size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {isSimpleMode ? (
            /* Minimal Simple Form Mode */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 shadow-xl overflow-hidden">
                {/* Simple Header */}
                <div className="bg-gray-800/60 p-4 border-b border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare size={18} className="text-gray-400" />
                    Contact Form
                  </h3>
                </div>

                <form onSubmit={handleSimpleSubmit} className="p-6 space-y-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="simple-name" className="block text-sm font-medium text-gray-300">
                      Name *
                    </label>
                    <input
                      id="simple-name"
                      type="text"
                      value={simpleForm.name}
                      onChange={(e) => setSimpleForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600/50 transition-colors duration-200"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="simple-email" className="block text-sm font-medium text-gray-300">
                      Email *
                    </label>
                    <input
                      id="simple-email"
                      type="email"
                      value={simpleForm.email}
                      onChange={(e) => setSimpleForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600/50 transition-colors duration-200"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="simple-message" className="block text-sm font-medium text-gray-300">
                      Message *
                    </label>
                    <textarea
                      id="simple-message"
                      value={simpleForm.message}
                      onChange={(e) => setSimpleForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600/50 transition-colors duration-200 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={simpleFormStatus === 'submitting'}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    {simpleFormStatus === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {simpleFormStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-sm text-center"
                    >
                      ✓ Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {simpleFormStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-sm text-center"
                    >
                      ✗ Failed to send message. Please try again.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          ) : (
            /* Terminal Mode */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 shadow-xl overflow-hidden">
                {/* Terminal header */}
                <div className="bg-gray-800/60 p-3 flex items-center justify-between">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 bg-red-500 group-hover:cursor-not-allowed"></div>
                    <div className="w-3 h-3 bg-yellow-500"></div>
                    <div className="w-3 h-3 bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-gray-400 text-sm font-mono">Terminal — contact.sh</div>
                  <div className="text-green-400 text-sm font-mono">
                    {time.time || '--:--:-- --'}
                  </div>
                  <Terminal size={18} className="text-gray-400" />
                </div>

                {/* Terminal body */}
                <div
                  ref={terminalRef}
                  className="p-4 h-[450px] overflow-y-auto font-mono text-sm bg-gray-900/80"
                  onClick={focusInput}
                >
                  {/* Intro animation text */}
                  <div className="text-green-400 mb-2">
                    Last login: {time.date} {time.time}</div>
                  <div className="text-gray-300 mb-4 border-b border-gray-800 pb-2">
                    <span className="text-green-500 font-bold">Portfolio Terminal</span> v1.0.0 - Type <span className="text-yellow-400">help</span> for available commands
                  </div>

                  {/* Command history */}
                  {commandHistory.map((entry, index) => (
                    <div key={index} className="mb-4 terminal-fade-in">
                      {entry.command && (
                        <div className="flex items-start group">
                          <span className="text-gray-400 mr-2 font-bold">{getPrompt()}</span>
                          <span className="text-white group-hover:text-gray-300 transition-colors">{entry.command}</span>
                        </div>
                      )}
                      <div className={`ml-4 mt-1 ${entry.isError ? 'text-red-400' : 'text-gray-300'}`}>
                        {entry.output}
                      </div>
                    </div>
                  ))}

                  {/* Typing animation */}
                  {isTyping && (
                    <div className="flex items-start mb-4">
                      <span className="text-gray-400 mr-2 font-bold">{getPrompt()}</span>
                      <div className="relative">
                        <span className="text-white">{typingText}</span>
                        <span className="cursor-blink ml-0.5 inline-block">▌</span>
                      </div>
                    </div>
                  )}

                  {/* Current command line */}
                  {!isTyping && (
                    <div className="flex items-center relative">
                      <span className="text-gray-400 mr-2 font-bold whitespace-nowrap">
                        {getPrompt()}
                      </span>
                      <div className="relative flex-1">
                        <input
                          ref={inputRef}
                          type="text"
                          value={command}
                          onChange={(e) => setCommand(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent outline-none text-white pr-2 caret-transparent"
                          placeholder={inputMode ? "Type your response..." : "Type a command..."}
                          disabled={status === 'submitting' || isTyping}
                        />
                        {/* Blinking cursor - positioned absolutely with dynamic width calculation */}
                        <span
                          className="cursor-blink absolute top-0 left-0 h-full pointer-events-none"
                          style={{
                            transform: `translateX(${command.length * 0.54}rem)`,
                            marginLeft: command.length > 10 ? `-${Math.floor(command.length / 20) * 0.08}rem` : '0'
                          }}
                        >
                          ▌
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Command suggestions and progress - simplified styling */}
              <div className="mt-4 space-y-4">
                {/* Progress indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex-1 relative mt-6 mb-2">
                    <div className="h-2 bg-gray-800/50 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-500 to-gray-400 transition-all duration-500 ease-out absolute left-0 top-0"
                        style={{ width: `${Math.min(100, (currentStep - 1) * 33.33)}%` }}
                      ></div>
                    </div>
                    <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                      <span className={formState.name ? 'text-gray-300 font-medium' : ''}>Name</span>
                      <span className={formState.email ? 'text-gray-300 font-medium' : ''}>Email</span>
                      <span className={formState.message ? 'text-gray-300 font-medium' : ''}>Message</span>
                      <span className={status === 'success' ? 'text-gray-300 font-medium' : ''}>Send</span>
                    </div>
                  </div>
                </div>

                {/* Suggested commands - simplified styling */}
                {!inputMode && status === 'idle' && !isTyping && (
                  <div className="flex flex-wrap gap-2 mt-2 bg-gray-900/30 p-3 border border-gray-800/50">
                    <div className="w-full text-xs text-gray-500 mb-2">Available commands:</div>
                    {!formState.name && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => executeCommand('name')}
                        className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs border border-gray-700/50 transition-colors duration-200 flex items-center gap-1"
                      >
                        <span className="text-gray-400">$</span> name
                      </motion.button>
                    )}
                    {!formState.email && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => executeCommand('email')}
                        className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs border border-gray-700/50 transition-colors duration-200 flex items-center gap-1"
                      >
                        <span className="text-gray-400">$</span> email
                      </motion.button>
                    )}
                    {!formState.message && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => executeCommand('message')}
                        className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs border border-gray-700/50 transition-colors duration-200 flex items-center gap-1"
                      >
                        <span className="text-gray-400">$</span> message
                      </motion.button>
                    )}
                    {formState.name && formState.email && formState.message && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => executeCommand('send')}
                        className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/80 text-white text-xs border border-gray-600/50 transition-colors duration-200 flex items-center gap-1"
                      >
                        <span className="text-green-400">$</span> send
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => executeCommand('status')}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs border border-gray-700/50 transition-colors duration-200 flex items-center gap-1"
                    >
                      <span className="text-gray-400">$</span> status
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => executeCommand('help')}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs border border-gray-700/50 transition-colors duration-200 flex items-center gap-1"
                    >
                      <span className="text-gray-400">$</span> help
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => executeCommand('clear')}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs border border-gray-700/50 transition-colors duration-200 flex items-center gap-1"
                    >
                      <span className="text-gray-400">$</span> clear
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Enhanced Contact Information Sidebar */}
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
                  I&apos;d love to hear from you! Whether you have a question, proposal, or just want to say hello - I&apos;ll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                  <div className="w-10 h-10 bg-gray-800 flex items-center justify-center border border-gray-700">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="text-white font-medium">hi@aysh.me</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                  <div className="w-10 h-10 bg-gray-800 flex items-center justify-center border border-gray-700">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Phone</div>
                    <div className="text-white font-medium">+91 9990969661</div>
                  </div>
                </div>

                <button
                  data-cal-namespace="30min"
                  data-cal-link="cyberboyayush/30min"
                  data-cal-config='{"layout":"month_view","theme":"dark"}'
                  className="flex items-center space-x-3 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer text-left"
                >
                  <div className="w-10 h-10 bg-gray-800 flex items-center justify-center border border-gray-700">
                    <Calendar className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Schedule</div>
                    <div className="text-white font-medium">Schedule 1:1</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Terminal Pro Tips */}
            {!isSimpleMode && (
              <div className="mt-10">
                <div className="bg-gray-900/50 backdrop-blur-sm p-5 border border-gray-800">
                  <h3 className="text-base font-semibold text-white mb-4">Terminal Pro Tips</h3>
                  <div className="space-y-2.5 text-sm text-gray-400">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">↹</span>
                      <p>Press <span className="text-gray-300">Tab</span> to autocomplete commands</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">↑</span>
                      <p>Press <span className="text-gray-300">Up Arrow</span> to recall previous commands</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">!</span>
                      <p>You can also click the command buttons below the terminal</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => executeCommand(getNextSuggestedCommand())}
                    className="mt-4 w-full py-2.5 px-4 bg-white text-gray-900 hover:bg-gray-100 text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    Next step: {getNextSuggestedCommand()} <ArrowRight size={14} className="ml-2" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;