import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WhatsAppModal } from './components/WhatsAppModal';
import { FeedbackModal } from './components/FeedbackModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ArrearCalculatorModal } from './components/ArrearCalculatorModal';
import { AdminDashboard } from './components/AdminDashboard';
import { HomeView } from './components/HomeView';
import { ResourceView } from './components/ResourceView';
import { ExclusiveView } from './components/ExclusiveView';
import { SalaryCalculatorView } from './components/SalaryCalculatorView';
import { TdsFormView } from './components/TdsFormView';
import { BRCView } from './components/BRCView';
import { AssetLiabilityView } from './components/AssetLiabilityView';
import { TabType, TreData } from './types';
import { TRE_DATA } from './constants';
import { LogOut, LayoutDashboard, Heart, Calculator, ArrowRight, Banknote, Clock } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType | 'admin'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isArrearModalOpen, setIsArrearModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [resourceData, setResourceData] = useState<TreData>(TRE_DATA);

  useEffect(() => {
    const timer = setTimeout(() => setIsWhatsAppOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleBannerClick = () => {
    setIsArrearModalOpen(true);
  };

  const renderContent = () => {
    if (activeTab === 'admin') {
      return isAdminLoggedIn 
        ? <AdminDashboard data={resourceData} onUpdate={setResourceData} /> 
        : <HomeView setTab={setActiveTab as any} />;
    }
    switch (activeTab) {
      case 'home': return <HomeView setTab={setActiveTab as any} />;
      case 'salary': return <SalaryCalculatorView />;
      case 'tre2': return <TdsFormView />;
      case 'brc': return <BRCView onOpenArrearModal={() => setIsArrearModalOpen(true)} />;
      case 'arrear': return (
        <div className="max-w-4xl mx-auto px-6 py-20 animate-slideUp text-center">
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-orange-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Calculator size={150} />
            </div>
            <div className="relative z-10">
              <div className="bg-orange-600 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-200">
                <Calculator size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Arrear Calculator (BPSC TRE)</h2>
              <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
                BPSC TRE-1.0 शिक्षकों के लिए विशेष एरियर कैलकुलेटर। अपना बेसिक पे, डी.ए. और एच.आर.ए. के अंतर की गणना करें और प्रोफेशनल PDF रिपोर्ट डाउनलोड करें।
              </p>
              <button 
                onClick={() => setIsArrearModalOpen(true)}
                className="bg-orange-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-orange-700 shadow-2xl shadow-orange-200 transition-all transform hover:-translate-y-2 flex items-center justify-center mx-auto"
              >
                Launch Calculator
                <ArrowRight size={24} className="ml-3" />
              </button>
              <p className="mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
                Trusted by 10,000+ Bihar Teachers
              </p>
            </div>
          </div>
        </div>
      );
      case 'tre1': return <ResourceView data={resourceData.tre1} setTab={setActiveTab as any} onBannerClick={handleBannerClick} />;
      case 'tre3': return <ResourceView data={resourceData.tre3} setTab={setActiveTab as any} />;
      case 'bpscTre3': return <AssetLiabilityView />;
      case 'exclusive': return <ExclusiveView />;
      default: return <HomeView setTab={setActiveTab as any} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        isAdminLoggedIn={isAdminLoggedIn}
        setShowLoginModal={setShowLoginModal}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />

      {isAdminLoggedIn && (
        <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center text-sm sticky top-20 z-[49] shadow-xl border-b border-gray-800">
          <span className="font-semibold flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Admin Active
          </span>
          <div className="flex space-x-6">
             <button onClick={() => setActiveTab('admin')} className={`hover:text-orange-300 transition flex items-center ${activeTab === 'admin' ? 'text-orange-400 font-bold' : ''}`}>
               <LayoutDashboard size={16} className="mr-1.5" /> Dashboard
             </button>
             <button onClick={() => setIsAdminLoggedIn(false)} className="hover:text-red-300 transition flex items-center">
               <LogOut size={16} className="mr-1.5" /> Logout
             </button>
          </div>
        </div>
      )}

      <main className="flex-grow">{renderContent()}</main>

      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">About Portal</h4>
              <p className="text-sm leading-relaxed">
                Dedicated to Bihar's teaching community. Providing accurate calculators, forms, and updates for BPSC TRE and Niyojit teachers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveTab('tre1')} className="hover:text-orange-500">Arrear Calculator</button></li>
                <li><button onClick={() => setActiveTab('tre2')} className="hover:text-orange-500">TDS & Tax</button></li>
                <li><button onClick={() => setActiveTab('salary')} className="hover:text-orange-500">Salary Check</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact & Support</h4>
              <p className="text-sm mb-2">Developed by <span className="text-orange-500 font-bold">Vishal Gupta</span></p>
              <button onClick={() => setIsFeedbackOpen(true)} className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition mt-2">
                Send Feedback / Report Issue
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
             <p>&copy; 2024 Bihar Teacher Help Portal. All rights reserved.</p>
             <div className="flex space-x-4 mt-4 md:mt-0">
               <span>Privacy Policy</span>
               <span>Terms of Service</span>
             </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      <AdminLoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={(status) => { setIsAdminLoggedIn(status); if(status) setActiveTab('admin'); }} />
      <ArrearCalculatorModal isOpen={isArrearModalOpen} onClose={() => setIsArrearModalOpen(false)} />
    </div>
  );
};

export default App;