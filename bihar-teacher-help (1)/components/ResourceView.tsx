import React from 'react';
import { Banknote, ChevronRight, FolderOpen, Calculator, Clock, FileText, Download, Calendar, ExternalLink } from 'lucide-react';
import { TreSectionData, TabType } from '../types';

interface ResourceViewProps {
  data: TreSectionData;
  setTab?: (tab: TabType) => void;
  onBannerClick?: () => void;
}

export const ResourceView: React.FC<ResourceViewProps> = ({ data, setTab, onBannerClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-slideUp">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-b from-gray-50 to-white p-10 border-b border-gray-100">
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">{data.title}</h2>
            <p className="text-xl text-gray-500 font-medium max-w-3xl">{data.description}</p>
        </div>
        
        <div className="p-10">
            {/* Custom Banner (e.g., AREAR bar) */}
            {data.customBanner && (
              <div 
                onClick={onBannerClick}
                className="mb-10 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between transform transition hover:scale-[1.01] cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Banknote size={120} />
                </div>
                <div className="flex items-center space-x-6 mb-6 md:mb-0 relative z-10">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30">
                    <Banknote size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight">{data.customBanner.text}</h3>
                    {data.customBanner.subText && (
                      <p className="text-emerald-100 text-base mt-1 font-medium">{data.customBanner.subText}</p>
                    )}
                  </div>
                </div>
                <button className="px-10 py-4 bg-white text-emerald-700 rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-50 transition flex items-center whitespace-nowrap relative z-10">
                  {data.customBanner.buttonText}
                  <ChevronRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}

            {/* Coming Soon Board */}
            {data.isComingSoon && (
              <div className="py-20 px-10 border-4 border-dashed border-orange-100 rounded-[4rem] text-center flex flex-col items-center bg-orange-50/30">
                <div className="bg-orange-600 p-8 rounded-[2rem] mb-8 shadow-2xl shadow-orange-200 animate-bounce-slow">
                    <Clock size={64} className="text-white" />
                </div>
                <h3 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">
                   COMMING SOOONNN.. 😉
                </h3>
                <p className="text-gray-500 text-xl font-bold max-w-lg leading-relaxed">
                  हम इस सेक्शन को अपडेट कर रहे हैं। जल्द ही यहाँ सभी जरूरी फॉर्म्स और जानकारी उपलब्ध होगी। 
                  <br/>
                  <span className="text-orange-600 mt-4 block">Vishal Gupta के साथ बने रहें!</span>
                </p>
                
                <div className="mt-12 flex space-x-4">
                   <div className="w-3 h-3 bg-orange-200 rounded-full animate-pulse"></div>
                   <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-75"></div>
                   <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            )}

            {/* Downloads Section */}
            {data.downloads && data.downloads.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <Download className="mr-3 text-orange-600" /> Important Resources & Downloads
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {data.downloads.map((file, idx) => (
                    <div 
                      key={idx}
                      className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-orange-200 hover:shadow-lg rounded-2xl p-5 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-white p-3 rounded-xl border border-gray-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 leading-tight">{file.title}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{file.type}</span>
                            <span className="text-[10px] font-bold text-gray-400 flex items-center"><Calendar size={10} className="mr-1" /> {file.date}</span>
                            <span className="text-[10px] font-bold text-gray-400">{file.size}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-white group-hover:bg-orange-600 group-hover:text-white text-gray-400 p-3 rounded-xl border border-gray-100 group-hover:border-orange-600 transition-all shadow-sm">
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub Categories Navigation Bars */}
            {data.subCategories && data.subCategories.length > 0 && setTab && (
              <div>
                <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <ExternalLink className="mr-3 text-orange-600" /> Quick Access Portals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.subCategories.map((sub, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (onBannerClick && data.title.includes("Arrear")) {
                          onBannerClick();
                        } else {
                          setTab(sub.target);
                        }
                      }}
                      className="w-full bg-white hover:bg-gray-50 border-2 border-gray-100 hover:border-orange-200 rounded-[2rem] p-8 text-left flex items-center justify-between transition-all duration-300 transform hover:-translate-y-2 shadow-sm hover:shadow-2xl group"
                    >
                      <div className="flex items-center space-x-5">
                        <div className="bg-orange-50 p-4 rounded-2xl shadow-inner border border-orange-100 group-hover:bg-orange-600 transition-colors">
                          {sub.label.includes("Arrear") ? (
                            <Calculator size={32} className="text-orange-600 group-hover:text-white transition-colors" />
                          ) : (
                            <FolderOpen size={32} className="text-orange-600 group-hover:text-white transition-colors" />
                          )}
                        </div>
                        <span className="text-2xl font-black text-gray-800 group-hover:text-orange-600 transition-colors tracking-tight">
                          {sub.label}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-full text-gray-400 group-hover:text-orange-600 group-hover:bg-orange-50 transition-all">
                        <ChevronRight size={28} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};