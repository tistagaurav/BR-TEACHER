import React from 'react';
import { Lock, Star, CheckCircle } from 'lucide-react';

export const ExclusiveView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Premium Resources</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock the ultimate preparation kit curated by BPSC toppers and experienced faculty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col opacity-60">
            <h3 className="text-xl font-bold text-gray-400 mb-2">Basic Access</h3>
            <p className="text-3xl font-bold text-gray-900 mb-6">Free</p>
            <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center text-gray-500"><CheckCircle size={18} className="mr-2" /> Public Notifications</li>
                <li className="flex items-center text-gray-500"><CheckCircle size={18} className="mr-2" /> Previous Year Papers</li>
                <li className="flex items-center text-gray-500"><CheckCircle size={18} className="mr-2" /> General News</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-gray-300 text-gray-500 font-medium cursor-not-allowed">Current Plan</button>
        </div>

        {/* Pro Plan (Main Focus) */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-yellow-400 p-8 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Achiever's Batch</h3>
            <div className="flex items-baseline mb-6">
                <p className="text-4xl font-extrabold text-gray-900">₹499</p>
                <p className="text-sm text-gray-500 ml-2">/ one time</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center text-gray-800 font-medium"><Star size={18} className="mr-2 text-yellow-500 fill-yellow-500" /> Exclusive Cut-off Analysis</li>
                <li className="flex items-center text-gray-800 font-medium"><Star size={18} className="mr-2 text-yellow-500 fill-yellow-500" /> 15 Full Length Mock Tests</li>
                <li className="flex items-center text-gray-800 font-medium"><Star size={18} className="mr-2 text-yellow-500 fill-yellow-500" /> Personal Mentorship</li>
                <li className="flex items-center text-gray-800 font-medium"><Star size={18} className="mr-2 text-yellow-500 fill-yellow-500" /> Priority WhatsApp Support</li>
            </ul>
            
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold shadow-lg transition transform hover:scale-105">
                Unlock Now
            </button>
        </div>

         {/* Blurred Content Preview */}
         <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 flex flex-col justify-center items-center relative overflow-hidden">
             {/* Fake Content Behind Blur */}
             <div className="absolute inset-0 p-6 filter blur-sm opacity-50 select-none pointer-events-none">
                 <h4 className="font-bold text-lg mb-2">Secret Strategy for 100+ Marks</h4>
                 <p className="text-sm">Lorem ipsum dolor sit amet...</p>
                 <div className="h-4 bg-gray-200 w-3/4 mt-4 rounded"></div>
                 <div className="h-4 bg-gray-200 w-full mt-2 rounded"></div>
             </div>
             
             <div className="relative z-10 text-center">
                 <div className="bg-white p-4 rounded-full shadow-lg inline-block mb-4">
                     <Lock size={32} className="text-gray-400" />
                 </div>
                 <h3 className="text-lg font-bold text-gray-800 mb-2">Premium Content Locked</h3>
                 <p className="text-sm text-gray-500 mb-4">Join the Achiever's Batch to view this content.</p>
             </div>
         </div>
      </div>
    </div>
  );
};
