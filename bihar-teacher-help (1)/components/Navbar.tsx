import React from 'react';
import { Menu, X, LogIn, LogOut, ShieldCheck, Calculator, Banknote, Building2 } from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType | 'admin';
  setActiveTab: (tab: TabType | 'admin') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isAdminLoggedIn: boolean;
  setShowLoginModal: (show: boolean) => void;
  setIsAdminLoggedIn: (status: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMenuOpen, 
  setIsMenuOpen,
  isAdminLoggedIn,
  setShowLoginModal,
  setIsAdminLoggedIn
}) => {
  const items: { id: TabType; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'tre1', label: 'AREAR', icon: <Calculator size={14} className="mr-1" /> },
    { id: 'tre2', label: 'TDS' },
    { id: 'tre3', label: 'BIHAR TEACHER' },
    { id: 'salary', label: 'अपनी सैलरी जानें', icon: <Banknote size={14} className="mr-1" /> },
    { id: 'brc', label: 'BRC', icon: <Building2 size={14} className="mr-1" /> },
    { id: 'bpscTre3', label: 'ASSET AND LIABILITY' },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center border-2 border-yellow-400 overflow-hidden">
            <span className="text-2xl">🙏</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">BIHAR TEACHER HELP</h1>
            <p className="text-[10px] text-orange-200 mt-1 uppercase tracking-widest">Vishal Gupta</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {items.map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`text-sm font-medium transition flex items-center ${activeTab === item.id ? 'text-yellow-300 font-bold' : 'text-white hover:text-orange-200'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden p-2 hover:bg-white/10 rounded-lg transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-red-800 p-4 space-y-2 animate-fadeIn border-t border-red-700 shadow-2xl">
          {items.map(item => (
            <button 
              key={item.id} 
              onClick={() => {setActiveTab(item.id); setIsMenuOpen(false)}} 
              className={`block w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${activeTab === item.id ? 'bg-red-900/50 text-yellow-300 font-bold' : 'hover:bg-red-700'}`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-red-700 mt-2">
            {!isAdminLoggedIn ? (
              <button 
                onClick={() => {setShowLoginModal(true); setIsMenuOpen(false)}} 
                className="block w-full text-left py-3 px-4 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 flex items-center transition-all"
              >
                <LogIn size={18} className="mr-2 text-orange-400" /> Admin Login
              </button>
            ) : (
              <>
                <button 
                  onClick={() => {setActiveTab('admin'); setIsMenuOpen(false)}} 
                  className={`block w-full text-left py-3 px-4 rounded-lg flex items-center mb-2 ${activeTab === 'admin' ? 'bg-green-900/40 text-green-300 font-bold' : 'hover:bg-red-700'}`}
                >
                  <ShieldCheck size={18} className="mr-2 text-green-400" /> Admin Dashboard
                </button>
                <button 
                  onClick={() => {setIsAdminLoggedIn(false); setIsMenuOpen(false)}} 
                  className="block w-full text-left py-3 px-4 rounded-lg bg-red-900 hover:bg-red-950 text-red-100 flex items-center transition-all border border-red-700"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};