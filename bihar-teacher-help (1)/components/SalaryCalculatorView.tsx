import React, { useState, useMemo, useEffect } from 'react';
import { Banknote, Calculator, Info, ArrowDownCircle, ArrowUpCircle, Wallet, Percent, Zap, Edit3, ChevronDown } from 'lucide-react';

type CalcMode = 'manual' | 'auto';

const RECRUITMENT_TYPES = ["BPSC TRE-1", "BPSC TRE-2", "BPSC TRE-3", "HEADMASTER", "HEAD TEACHER"];
const GRADE_LEVELS = ["1-5", "6-8", "9-10", "11-12"];

const SALARY_MATRIX: Record<string, any> = {
  'BPSC TRE-1': { '1-5': 26520, '6-8': 29710, '9-10': 32890, '11-12': 33950 },
  'BPSC TRE-2': { '1-5': 26520, '6-8': 29710, '9-10': 32890, '11-12': 33950 },
  'BPSC TRE-3': { '1-5': 25750, '6-8': 28840, '9-10': 31930, '11-12': 32960 },
  'HEADMASTER': 35000,
  'HEAD TEACHER': 30500
};

export const SalaryCalculatorView: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>('auto');
  const [basicPayStr, setBasicPayStr] = useState<string>('26520');
  const [daPercent, setDaPercent] = useState<number>(58); // Set default to 58%
  const [hraPercent, setHraPercent] = useState<number>(5);
  
  // Auto Mode States
  const [selectedCategory, setSelectedCategory] = useState(RECRUITMENT_TYPES[0]);
  const [selectedLevel, setSelectedLevel] = useState(GRADE_LEVELS[0]);

  const medical = 1000;
  const gis = 30;

  // Handle Auto Calculation of Basic Pay and Fix DA
  useEffect(() => {
    if (mode === 'auto') {
      const categoryData = SALARY_MATRIX[selectedCategory];
      if (typeof categoryData === 'object') {
        setBasicPayStr(categoryData[selectedLevel].toString());
      } else {
        setBasicPayStr(categoryData.toString());
      }
      setDaPercent(58); // Fix DA at 58% in Auto Mode
    }
  }, [selectedCategory, selectedLevel, mode]);

  const calculations = useMemo(() => {
    const basicPay = parseFloat(basicPayStr) || 0;
    const da = Math.round((basicPay * daPercent) / 100);
    const hra = Math.round((basicPay * hraPercent) / 100);
    const nps = Math.round((basicPay + da) * 0.10);
    const gross = basicPay + da + hra + medical;
    const net = gross - (nps + gis);

    return { basicPay, da, hra, nps, gross, net };
  }, [basicPayStr, daPercent, hraPercent]);

  const handleBasicPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const sanitized = val.replace(/^0+(?!$)/, '');
    if (sanitized === '' || /^\d+$/.test(sanitized)) {
      setBasicPayStr(sanitized);
    }
  };

  const isFixedSalary = selectedCategory === "HEADMASTER" || selectedCategory === "HEAD TEACHER";

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-slideUp">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md relative z-10">
            <Calculator size={32} />
          </div>
          <h2 className="text-3xl font-black tracking-tight relative z-10">सैलरी कैलकुलेटर</h2>
          <p className="text-blue-100 font-medium mt-1 relative z-10 uppercase tracking-widest text-[10px]">Bihar Teacher Official Matrix</p>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs Section */}
          <div className="space-y-8">
            {/* Mode Selector */}
            <div className="bg-gray-100 p-1.5 rounded-[2rem] flex items-center shadow-inner">
              <button 
                onClick={() => setMode('auto')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-[1.8rem] text-sm font-black transition-all ${mode === 'auto' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Zap size={16} className="mr-2" /> AUTO
              </button>
              <button 
                onClick={() => setMode('manual')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-[1.8rem] text-sm font-black transition-all ${mode === 'manual' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Edit3 size={16} className="mr-2" /> MANUAL
              </button>
            </div>

            {mode === 'manual' ? (
              <div className="animate-fadeIn">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center ml-2">
                  <Wallet size={14} className="mr-2 text-indigo-500" /> Basic Pay (Manual Entry)
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-6 flex items-center text-gray-300 font-black text-2xl">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={basicPayStr}
                    onChange={handleBasicPayChange}
                    className="w-full pl-14 pr-8 py-6 bg-gray-50 border-2 border-transparent rounded-[2.5rem] text-3xl font-black text-gray-800 focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-inner"
                    placeholder="Enter basic pay"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center">
                    Recruitment Phase <Info size={12} className="ml-1" />
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-6 py-5 bg-indigo-50/50 border-2 border-indigo-100 rounded-[2rem] text-lg font-black text-indigo-900 outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-all"
                    >
                      {RECRUITMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
                  </div>
                </div>

                {!isFixedSalary && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Teacher Grade / Level</label>
                    <div className="relative">
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full px-6 py-5 bg-indigo-50/50 border-2 border-indigo-100 rounded-[2rem] text-lg font-black text-indigo-900 outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-all"
                      >
                        {GRADE_LEVELS.map(lvl => <option key={lvl} value={lvl}>Level: {lvl}</option>)}
                      </select>
                      <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
                    </div>
                  </div>
                )}

                <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 flex flex-col items-center justify-center animate-fadeIn">
                   <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Matrix Basic Pay</span>
                   <span className="text-4xl font-black text-emerald-900">₹{calculations.basicPay.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                  D.A. % (Dearness)
                </label>
                <div className="relative">
                  <select
                    disabled={mode === 'auto'}
                    value={daPercent}
                    onChange={(e) => setDaPercent(Number(e.target.value))}
                    className={`w-full px-6 py-4 border rounded-2xl text-lg font-black outline-none appearance-none shadow-sm transition-colors ${
                      mode === 'auto' 
                        ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed' 
                        : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-500 cursor-pointer'
                    }`}
                  >
                    <option value={46}>46%</option>
                    <option value={50}>50%</option>
                    <option value={53}>53%</option>
                    <option value={55}>55%</option>
                    <option value={58}>58%</option>
                  </select>
                  <ChevronDown size={18} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${mode === 'auto' ? 'text-gray-300' : 'text-gray-400'}`} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                  H.R.A. % (Rent)
                </label>
                <div className="relative">
                  <select
                    value={hraPercent}
                    onChange={(e) => setHraPercent(Number(e.target.value))}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-lg font-black text-gray-800 focus:border-indigo-500 outline-none appearance-none cursor-pointer shadow-sm"
                  >
                    {mode === 'manual' ? (
                      <>
                        <option value={4}>4%</option>
                        <option value={5}>5% (Rural)</option>
                        <option value={6}>6%</option>
                        <option value={7.5}>7.5%</option>
                        <option value={8}>8%</option>
                        <option value={10}>10% (Urban)</option>
                        <option value={16}>16%</option>
                        <option value={20}>20% (Metro)</option>
                      </>
                    ) : (
                      <>
                        <option value={5}>5%</option>
                        <option value={7.5}>7.5%</option>
                        <option value={10}>10%</option>
                        <option value={20}>20%</option>
                      </>
                    )}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-blue-50/50 rounded-[3rem] p-10 border border-blue-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 transition-transform group-hover:scale-110">
                <ArrowUpCircle size={150} className="text-blue-900" />
              </div>
              
              <h4 className="text-blue-800 font-black text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center">
                <ArrowUpCircle size={14} className="mr-2" /> Total Earnings (Gross)
              </h4>
              
              <div className="space-y-5 relative z-10">
                <div className="flex justify-between items-center text-gray-600 font-bold">
                  <span>Basic Pay</span>
                  <span className="text-gray-900">₹{calculations.basicPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 font-bold">
                  <span>D.A. ({daPercent}%)</span>
                  <span className="text-gray-900">₹{calculations.da.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 font-bold">
                  <span>H.R.A. ({hraPercent}%)</span>
                  <span className="text-gray-900">₹{calculations.hra.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 font-bold border-b border-blue-100 pb-4">
                  <span>Medical</span>
                  <span className="text-gray-900">₹{medical.toLocaleString()}</span>
                </div>
                <div className="pt-4 flex justify-between items-center text-blue-900">
                  <span className="text-xl font-black uppercase tracking-tight">Gross Pay</span>
                  <span className="text-4xl font-black">₹{calculations.gross.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50/50 rounded-[2.5rem] p-8 border border-red-100">
              <h4 className="text-red-800 font-black text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center">
                <ArrowDownCircle size={14} className="mr-2" /> Deductions
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm leading-none">N.P.S. (10%)</span>
                    <span className="text-[9px] text-gray-400 mt-1 font-bold">(Basic + DA) × 0.10</span>
                  </div>
                  <span className="font-black text-red-600">₹{calculations.nps.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 border-t border-red-100 pt-4">
                  <span className="font-bold text-sm">GIS State</span>
                  <span className="font-black text-red-600">₹{gis}</span>
                </div>
              </div>
            </div>

            {/* FIXED: Improved Net Salary In Hand Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[3.5rem] p-8 md:p-10 text-white shadow-2xl shadow-emerald-200 flex flex-col justify-center transform transition hover:scale-[1.02] border-b-8 border-emerald-700 min-h-[160px] relative overflow-hidden">
              <div className="flex items-center space-x-5 md:space-x-6 relative z-10">
                <div className="bg-white/20 p-4 md:p-5 rounded-[2rem] backdrop-blur-md shadow-inner border border-white/30 shrink-0">
                  <Banknote size={44} />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-emerald-100 block mb-1">NET SALARY IN HAND</span>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight break-words">
                    ₹{calculations.net.toLocaleString()}
                  </h3>
                </div>
              </div>
              {/* Subtle background decoration to avoid 'empty' or 'half' look */}
              <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none">
                <Banknote size={120} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center mt-12 text-gray-400 font-black text-[10px] uppercase tracking-[0.5em]">
        Verified Official Matrix • Bihar Teacher Help Portal
      </p>
    </div>
  );
};