import React from 'react';
import { ShieldCheck, FileSpreadsheet, ArrowRight, Building2, UserCircle } from 'lucide-react';

interface BRCViewProps {
  onOpenArrearModal: () => void;
}

export const BRCView: React.FC<BRCViewProps> = ({ onOpenArrearModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-slideUp">
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          Block Resource Centre
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">BRC Resource Portal</h2>
        <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto font-medium">
          Access official BRC portals, login systems, and salary documentation formats for Bihar Teachers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* BRC Login Card */}
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <ShieldCheck size={120} className="text-indigo-900" />
          </div>
          <div className="bg-indigo-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
            <UserCircle size={40} className="text-indigo-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">BRC LOGIN</h3>
          <p className="text-gray-500 mb-8 leading-relaxed font-medium">
            Access the official BRC administration portal for attendance, departmental updates, and reporting.
          </p>
          <button 
            className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center group/btn"
          >
            Go to Login Portal
            <ArrowRight size={22} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Arrear Salary Form Card */}
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <FileSpreadsheet size={120} className="text-orange-900" />
          </div>
          <div className="bg-orange-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
            <FileSpreadsheet size={40} className="text-orange-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">बकाया वेतन प्रपत्र</h3>
          <p className="text-gray-500 mb-8 leading-relaxed font-medium">
            Generate and download your pending salary arrear statement in the official government format.
          </p>
          <button 
            onClick={onOpenArrearModal}
            className="w-full bg-orange-600 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-orange-700 shadow-xl shadow-orange-100 transition-all flex items-center justify-center group/btn"
          >
            ओपन कैलकुलेटर
            <ArrowRight size={22} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      <div className="mt-20 bg-gray-900 rounded-[4rem] p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Building2 size={150} className="text-white" />
        </div>
        <div className="relative z-10">
          <h4 className="text-white text-2xl font-black mb-4">Need help with BRC Portal?</h4>
          <p className="text-gray-400 mb-0 max-w-xl mx-auto">
            If you are facing issues with your credentials or the arrear calculation, please contact your block's MIS coordinator.
          </p>
        </div>
      </div>
    </div>
  );
};