'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Mail, Send, ArrowRight } from 'lucide-react';

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

// Web3Forms API Key
// Get your access key from https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = '0d328fdf-f462-44c9-ad9b-3b0df1fc64ad'; // Replace with your Access Key

const Contact = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  
  const [commandHistory, setCommandHistory] = useState<CommandType[]>([
    { 
      command: '', 
      output: (
        <div className="space-y-2 text-gray-300">
          <p className="text-purple-400 font-semibold">Welcome to Ayush's Terminal Contact!</p>
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
  
  // This will scroll to the bottom of the terminal when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // This will focus the input field whenever the user clicks anywhere in the terminal container
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputMode) {
        handleInputSubmit();
      } else {
        handleCommand();
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
    setCommand(cmdText);
    handleCommand(cmdText);
  };
  
  // Send email function using Web3Forms
  const sendEmail = async (data: FormState) => {
    try {
      const formData = new FormData();
      
      // Required fields
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      
      // Optional fields for better organization
      formData.append('subject', `New message from ${data.name} via Terminal Contact`);
      formData.append('from_name', 'Terminal Contact Form');
      formData.append('replyto', data.email);
      
      // Additional metadata
      formData.append('botcheck', '');
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Email sent successfully:', result);
        return { success: true };
      } else {
        console.error('Error sending email:', result);
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error('Exception sending email:', error);
      return { success: false, error };
    }
  };

  const handleCommand = (cmdOverride?: string) => {
    if (inputMode) return; // Don't process commands while in input mode
    
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
                    <p className="text-green-400">Message sent successfully!</p>
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
            setCommandHistory(prev => [
              ...prev,
              { 
                command: '', 
                output: 'Error: Could not deliver your message. Please try again later.', 
                isError: true 
              }
            ]);
            setStatus('error');
          }
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
              Terminal Contact
            </span>
          </h2>
          <p className="mt-2 text-gray-400 text-sm max-w-2xl mx-auto">
            Send me a message using simple terminal commands
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-gray-900/70 backdrop-blur-md rounded-lg border border-gray-800 shadow-xl overflow-hidden">
              {/* Terminal header */}
              <div className="bg-gray-800 p-3 flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-gray-400 text-sm font-mono">ayush@portfolio ~ contact</div>
                <Terminal size={18} className="text-gray-400" />
              </div>
              
              {/* Terminal body */}
              <div 
                ref={terminalRef}
                className="p-4 h-[400px] overflow-y-auto font-mono text-sm"
                onClick={focusInput}
              >
                {/* Command history */}
                {commandHistory.map((entry, index) => (
                  <div key={index} className="mb-4">
                    {entry.command && (
                      <div className="flex items-start">
                        <span className="text-green-400 mr-2">$</span>
                        <span className="text-white">{entry.command}</span>
                      </div>
                    )}
                    <div className={`ml-4 mt-1 ${entry.isError ? 'text-red-400' : 'text-gray-300'}`}>
                      {entry.output}
                    </div>
                  </div>
                ))}
                
                {/* Current command line */}
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">
                    {inputMode ? inputPrompt : '$'}
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-white caret-purple-400"
                    autoFocus
                    placeholder={inputMode ? "Type your response..." : "Type a command..."}
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>
            </div>
            
            {/* Command suggestions and progress */}
            <div className="mt-4 space-y-4">
              {/* Progress indicator */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
                      style={{ width: `${Math.min(100, (currentStep - 1) * 33.33)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 text-xs text-gray-400">
                  {formState.name ? '✓' : '•'} {formState.email ? '✓' : '•'} {formState.message ? '✓' : '•'} {status === 'success' ? '✓' : '•'}
                </div>
              </div>
              
              {/* Suggested commands */}
              {!inputMode && status === 'idle' && (
                <div className="flex flex-wrap gap-2">
                  {!formState.name && (
                    <button 
                      onClick={() => executeCommand('name')}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs rounded-md border border-gray-700 transition-colors"
                    >
                      name
                    </button>
                  )}
                  {!formState.email && (
                    <button 
                      onClick={() => executeCommand('email')}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs rounded-md border border-gray-700 transition-colors"
                    >
                      email
                    </button>
                  )}
                  {!formState.message && (
                    <button 
                      onClick={() => executeCommand('message')}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs rounded-md border border-gray-700 transition-colors"
                    >
                      message
                    </button>
                  )}
                  {formState.name && formState.email && formState.message && (
                    <button 
                      onClick={() => executeCommand('send')}
                      className="px-3 py-1.5 bg-purple-900/50 hover:bg-purple-800/50 text-gray-200 text-xs rounded-md border border-purple-700/50 transition-colors"
                    >
                      send
                    </button>
                  )}
                  <button 
                    onClick={() => executeCommand('status')}
                    className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs rounded-md border border-gray-700 transition-colors"
                  >
                    status
                  </button>
                  <button 
                    onClick={() => executeCommand('help')}
                    className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs rounded-md border border-gray-700 transition-colors"
                  >
                    help
                  </button>
                  <button 
                    onClick={() => executeCommand('clear')}
                    className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 text-xs rounded-md border border-gray-700 transition-colors"
                  >
                    clear
                  </button>
                </div>
              )}
            </div>
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
                  I&apos;d love to hear from you! Whether you have a question, proposal, or just want to say hello - I&apos;ll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800/70 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white">connect@ayush-sharma.in</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Command instructions */}
            <div className="mt-10">
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-6 rounded-xl border border-gray-800/80 backdrop-blur-md">
                <h3 className="text-lg font-medium text-white mb-2">How It Works</h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-900/50 text-purple-400 mr-2 text-xs flex-shrink-0 mt-0.5">1</div>
                    <p>Type <span className="text-purple-400">name</span> and enter your name</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-900/50 text-purple-400 mr-2 text-xs flex-shrink-0 mt-0.5">2</div>
                    <p>Type <span className="text-purple-400">email</span> and enter your contact address</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-900/50 text-purple-400 mr-2 text-xs flex-shrink-0 mt-0.5">3</div>
                    <p>Type <span className="text-purple-400">message</span> and write your message</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-900/50 text-purple-400 mr-2 text-xs flex-shrink-0 mt-0.5">4</div>
                    <p>Type <span className="text-purple-400">send</span> to deliver your message</p>
                  </div>
                </div>
                
                <button
                  onClick={() => executeCommand(getNextSuggestedCommand())}
                  className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                >
                  Next step: {getNextSuggestedCommand()} <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;