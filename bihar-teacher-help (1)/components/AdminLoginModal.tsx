import React, { useState } from 'react';
import { X, Lock, Key, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (status: boolean) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Reset Password State
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials for demonstration
    if (username === 'admin' && password === 'admin123') {
      onLogin(true);
      onClose();
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
        setError('Please enter your email.');
        return;
    }
    // Simulate API call
    setError('');
    setResetMessage(`Password reset link has been sent to ${resetEmail}`);
    
    // Auto return to login after delay
    setTimeout(() => {
        setIsResetMode(false);
        setResetMessage('');
        setResetEmail('');
    }, 3000);
  };

  const toggleMode = () => {
    setIsResetMode(!isResetMode);
    setError('');
    setResetMessage('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform scale-100 transition-all">
        <div className="bg-gray-900 p-6 flex justify-between items-center">
          <h3 className="text-white text-lg font-bold flex items-center">
            <ShieldCheck size={20} className="mr-2 text-orange-500" />
            {isResetMode ? 'Reset Password' : 'Admin Access'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        
        {isResetMode ? (
          <form onSubmit={handleReset} className="p-6">
             {resetMessage ? (
               <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center">
                  <span className="mr-2">✓</span> {resetMessage}
               </div>
             ) : (
               <>
                 <p className="text-sm text-gray-600 mb-4">
                   Enter your registered email address to receive password reset instructions.
                 </p>
                 {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center animate-pulse">
                      <span className="mr-2">⚠️</span> {error}
                    </div>
                  )}
                 <div className="mb-4">
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Mail size={16} className="text-gray-400" />
                     </div>
                     <input
                       type="email"
                       required
                       value={resetEmail}
                       onChange={(e) => setResetEmail(e.target.value)}
                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                       placeholder="your@email.com"
                     />
                   </div>
                 </div>
                 <button 
                   type="submit" 
                   className="w-full bg-orange-600 text-white font-bold py-2.5 rounded-lg hover:bg-orange-700 transition shadow-lg"
                 >
                   Send Reset Link
                 </button>
               </>
             )}
             <button 
                type="button" 
                onClick={toggleMode}
                className="w-full mt-4 text-gray-500 text-sm hover:text-gray-800 flex items-center justify-center font-medium"
            >
                <ArrowLeft size={14} className="mr-1" /> Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center animate-pulse">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                   <label className="block text-sm font-medium text-gray-700">Password</label>
                   <button 
                     type="button"
                     onClick={toggleMode} 
                     className="text-xs text-orange-600 hover:text-orange-800 font-medium hover:underline"
                   >
                     Forgot Password?
                   </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-2.5 rounded-lg hover:from-black hover:to-black transition transform hover:-translate-y-0.5 shadow-lg"
            >
              Login to Dashboard
            </button>
          </form>
        )}
      </div>
    </div>
  );
};