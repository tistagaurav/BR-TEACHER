import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition p-1 bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
        
        <div className="bg-[#25D366] p-6 text-center">
          <MessageCircle size={48} className="text-white mx-auto mb-2" />
          <h3 className="text-white text-xl font-bold">Join Our Teacher Community</h3>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            Get instant updates on BPSC TRE, cut-off predictions, and free study materials directly on your WhatsApp!
          </p>
          
          <button 
            onClick={() => {
              // Mock action
              alert("Redirecting to WhatsApp Group...");
              onClose();
            }}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition transform hover:scale-105 shadow-lg"
          >
            <MessageCircle size={20} />
            <span>Join WhatsApp Group</span>
          </button>
          
          <p className="mt-4 text-xs text-gray-400">
            Join 50,000+ other aspirants. No spam, only updates.
          </p>
        </div>
      </div>
    </div>
  );
};