
import React from 'react';
import { Users, Calculator, FileText, CheckCircle2, DollarSign, BookOpen, Star, ArrowRight, Github, Heart, MapPin } from 'lucide-react';
import { TabType } from '../types';

interface HomeViewProps {
  setTab: (tab: TabType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setTab }) => {
  return (
    <div className="animate-fadeIn w-full overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-orange-50 to-white relative py-16 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-400 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-400 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center bg-white border border-orange-200 text-orange-700 px-5 py-2 rounded-full text-xs font-bold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              BIHAR TEACHER HELP PORTAL
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter">
              आप सभी <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500">TEACHER</span> <br /> 
              का स्वागत है।
            </h2>
            
            <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-2xl mb-12 font-medium leading-relaxed">
              <span className="text-orange-600 font-black mr-2">FREE 🆓</span>
              बिहार शिक्षक सहायता पोर्टल — आपकी सेवा, वेतन गणना और आधिकारिक संसाधनों के लिए एक मात्र विश्वसनीय स्थान।
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center items-center">
              <button 
                onClick={() => setTab('tre1')} 
                className="group w-full sm:w-auto bg-orange-600 text-white px-12 py-5 rounded-[2.5rem] font-black text-xl hover:bg-orange-700 shadow-2xl shadow-orange-200 transition-all transform hover:-translate-y-2 flex items-center justify-center"
              >
                <Calculator size={24} className="mr-3" />
                Arrear Calculator खोलें
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => setTab('tre3')} 
                className="w-full sm:w-auto bg-white text-gray-900 px-12 py-5 rounded-[2.5rem] font-black text-xl hover:bg-gray-50 shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1"
              >
                महत्वपूर्ण फॉर्म्स
              </button>
            </div>
        </div>
      </div>

      {/* WE THE PEOPLE OF BIHAR BANNER */}
      <div className="w-full bg-slate-950 py-12 md:py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-white to-green-600 opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-6 flex items-center justify-center space-x-2">
               <div className="h-[1px] w-12 bg-orange-600"></div>
               <MapPin size={16} className="text-orange-600 animate-bounce" />
               <div className="h-[1px] w-12 bg-orange-600"></div>
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] text-white uppercase italic">
              WE THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">PEOPLE</span> OF BIHAR
            </h2>
            <div className="mt-6 text-orange-200/50 font-black tracking-[0.5em] text-[10px] md:text-xs uppercase">
              In Solidarity with the Teaching Community
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section for Teachers */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">प्रमुख सुविधाएं</h3>
          <div className="w-24 h-2 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Arrear Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
            <div className="bg-orange-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Calculator size={40} className="text-orange-600" />
            </div>
            <h4 className="text-2xl font-black text-gray-900 mb-4">Arrear Calculator</h4>
            <p className="text-gray-500 mb-6 leading-relaxed">
              BPSC और नियोजित शिक्षकों के लिए विशेष रूप से डिज़ाइन किया गया। अपने बेसिक पे और भत्तों के अंतर की सटीक गणना करें।
            </p>
            <button onClick={() => setTab('tre1')} className="text-orange-600 font-black flex items-center hover:underline">
              गणना शुरू करें <ArrowRight size={18} className="ml-1" />
            </button>
          </div>

          {/* TDS Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
            <div className="bg-blue-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <DollarSign size={40} className="text-blue-600" />
            </div>
            <h4 className="text-2xl font-black text-gray-900 mb-4">TDS & Income Tax</h4>
            <p className="text-gray-500 mb-6 leading-relaxed">
              शिक्षकों के लिए आयकर गणना और TDS फॉर्म्स का संग्रह। अपनी बचत और टैक्स की जानकारी यहाँ पायें।
            </p>
            <button onClick={() => setTab('tre2')} className="text-blue-600 font-black flex items-center hover:underline">
              संसाधन देखें <ArrowRight size={18} className="ml-1" />
            </button>
          </div>

          {/* Rules Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
            <div className="bg-emerald-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <BookOpen size={40} className="text-emerald-600" />
            </div>
            <h4 className="text-2xl font-black text-gray-900 mb-4">सेवा नियमावली</h4>
            <p className="text-gray-500 mb-6 leading-relaxed">
              बिहार शिक्षक सेवा नियमावली 2024, अवकाश नियम और अन्य विभागीय अधिसूचनाओं की आधिकारिक प्रतियां डाउनलोड करें।
            </p>
            <button onClick={() => setTab('tre3')} className="text-emerald-600 font-black flex items-center hover:underline">
              नियम पढ़ें <ArrowRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats/Trust Bar */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-orange-500 mb-2">10K+</div>
              <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">Active Teachers</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">50+</div>
              <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">Official Forms</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">100%</div>
              <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">Verified Data</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">FREE</div>
              <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">For Community</div>
            </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Users size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Community Driven</h4>
              <p className="text-xs text-gray-400">Managed with ❤️ by Vishal Gupta</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-xs font-bold flex items-center">
              <CheckCircle2 size={14} className="mr-2" /> Bihar Govt verified formats
            </div>
            <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-bold">Updated weekly</div>
          </div>
        </div>
      </div>
    </div>
  );
};
