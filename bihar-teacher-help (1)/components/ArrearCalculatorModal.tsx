import React, { useState, useEffect } from 'react';
import { X, FileDown, Calculator, Loader2, User, DollarSign, RefreshCw, ChevronDown, ChevronUp, Copy, Briefcase, Building, Fingerprint, MapPin, Globe, GraduationCap, ChevronRight, ArrowRight, ArrowLeft, Zap, Edit3 } from 'lucide-react';

interface ArrearCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MonthlyData {
  month: string;
  monthLabel: string;
  basic: string;
  da: string;
  daPercent: string;
  hra: string;
  hraPercent: string;
  medical: string;
  nps: string;
  gic: string;
  tds: string;
  isExpanded: boolean;
}

const DA_RATES = [
    // 2023
    { month: '2023-06', rate: 46 }, { month: '2023-07', rate: 46 }, { month: '2023-08', rate: 46 }, { month: '2023-09', rate: 46 },
    { month: '2023-10', rate: 46 }, { month: '2023-11', rate: 46 }, { month: '2023-12', rate: 46 },
    // 2024
    { month: '2024-01', rate: 50 }, { month: '2024-02', rate: 50 }, { month: '2024-03', rate: 50 },
    { month: '2024-04', rate: 50 }, { month: '2024-05', rate: 50 }, { month: '2024-06', rate: 50 },
    { month: '2024-07', rate: 53 }, { month: '2024-08', rate: 53 }, { month: '2024-09', rate: 53 },
    { month: '2024-10', rate: 53 }, { month: '2024-11', rate: 53 }, { month: '2024-12', rate: 53 },
    // 2025
    { month: '2025-01', rate: 55 }, { month: '2025-02', rate: 55 }, { month: '2025-03', rate: 55 },
    { month: '2025-04', rate: 55 }, { month: '2025-05', rate: 55 }, { month: '2025-06', rate: 55 },
    { month: '2025-07', rate: 58 }, { month: '2025-08', rate: 58 }, { month: '2025-09', rate: 58 },
    { month: '2025-10', rate: 58 }, { month: '2025-11', rate: 58 }, { month: '2025-12', rate: 58 }
];

const DA_OPTIONS = [46, 50, 53, 55, 58];
const HRA_OPTIONS = [4, 5, 6, 7.5, 8, 10, 16, 20];
const RECRUITMENT_PHASES = ["BPSC TRE-1", "BPSC TRE-2", "BPSC TRE-3", "HEADMASTER", "HEAD TEACHER", "EXCLUSIVE", "ASSISTANT TEACHER(NIYOJIT)"];
const GRADE_LEVELS = ["1-5", "6-8", "9-10", "11-12"];

export const ArrearCalculatorModal: React.FC<ArrearCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [claimedPayMode, setClaimedPayMode] = useState<'auto' | 'manual'>('auto');
  const [selectedPhase, setSelectedPhase] = useState(RECRUITMENT_PHASES[0]);
  const [selectedGrade, setSelectedGrade] = useState(GRADE_LEVELS[0]);

  const [tName, setTName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [pranNo, setPranNo] = useState('');
  const [subject, setSubject] = useState('');
  const [startDate, setStartDate] = useState('2024-01');
  const [endDate, setEndDate] = useState('2024-06');
  
  const [monthlyDue, setMonthlyDue] = useState<MonthlyData[]>([]);
  const [monthlyDrawn, setMonthlyDrawn] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(false);

  const getAutoBasicValue = (phase: string, grade: string, dateKey: string) => {
    if (phase === "HEADMASTER") return "35000";
    if (phase === "HEAD TEACHER") return "31500";
    if (phase === "EXCLUSIVE" || phase === "ASSISTANT TEACHER(NIYOJIT)") return "";

    const [year, month] = dateKey.split('-').map(Number);
    const dateNum = year * 100 + month;

    if (phase === "BPSC TRE-1") {
      if (grade === "1-5") {
        if (dateNum <= 202406) return "25000";
        if (dateNum <= 202506) return "25750";
        return "26520";
      }
      if (grade === "6-8") {
        if (dateNum <= 202406) return "28000";
        if (dateNum <= 202506) return "28840";
        return "29710";
      }
      if (grade === "9-10") {
        if (dateNum <= 202406) return "31000";
        if (dateNum <= 202506) return "31930";
        return "32890";
      }
      if (grade === "11-12") {
        if (dateNum <= 202406) return "32000";
        if (dateNum <= 202506) return "32960";
        return "33950";
      }
    }

    if (phase === "BPSC TRE-2") {
      if (grade === "1-5") {
        if (dateNum <= 202412) return "25000";
        if (dateNum <= 202512) return "25750";
        return "26520";
      }
      if (grade === "6-8") {
        if (dateNum <= 202412) return "28000";
        if (dateNum <= 202512) return "28840";
        return "29710";
      }
      if (grade === "9-10") {
        if (dateNum <= 202412) return "31000";
        if (dateNum <= 202512) return "31930";
        return "32890";
      }
      if (grade === "11-12") {
        if (dateNum <= 202412) return "32000";
        if (dateNum <= 202512) return "32960";
        return "33950";
      }
    }

    if (phase === "BPSC TRE-3") {
      if (grade === "1-5") {
        if (dateNum <= 202512) return "25000";
        return "25750";
      }
      if (grade === "6-8") {
        if (dateNum <= 202512) return "28000";
        return "28840";
      }
      if (grade === "9-10") {
        if (dateNum <= 202512) return "31000";
        return "31930";
      }
      if (grade === "11-12") {
        if (dateNum <= 202512) return "32000";
        return "32960";
      }
    }

    return "";
  };

  const getDARateForMonth = (dateStr: string) => {
    const found = DA_RATES.find(d => d.month === dateStr);
    return found ? found.rate : 58; 
  };

  useEffect(() => {
    const start = new Date(startDate + "-01");
    const end = new Date(endDate + "-01");
    if (end < start) return;

    const generateMonthlyData = (existingData: MonthlyData[], isDue: boolean) => {
      const newData: MonthlyData[] = [];
      let current = new Date(start);
      while (current <= end) {
        const dateKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        const monthLabel = current.toLocaleString('default', { month: 'short', year: 'numeric' });
        
        const existing = existingData.find(d => d.month === dateKey);
        
        if (existing) {
          if (isDue && claimedPayMode === 'auto') {
            const autoBasic = getAutoBasicValue(selectedPhase, selectedGrade, dateKey);
            const daRate = getDARateForMonth(dateKey);
            const basicNum = parseFloat(autoBasic) || 0;
            const daNum = Math.round((basicNum * daRate) / 100);
            const hraNum = Math.round((basicNum * parseFloat(existing.hraPercent)) / 100);
            const npsNum = Math.round((basicNum + daNum) * 0.10);

            newData.push({
              ...existing,
              basic: autoBasic,
              da: daNum.toString(),
              daPercent: daRate.toString(),
              hra: hraNum.toString(),
              nps: npsNum.toString()
            });
          } else {
            newData.push(existing);
          }
        } else {
          const daRate = getDARateForMonth(dateKey);
          let defaultBasic = isDue ? (claimedPayMode === 'auto' ? getAutoBasicValue(selectedPhase, selectedGrade, dateKey) : '26500') : '25000';
          let defaultHra = isDue ? '5' : '4';
          
          const basicNum = parseFloat(defaultBasic) || 0;
          const daNum = Math.round((basicNum * daRate) / 100);
          const hraNum = Math.round((basicNum * parseFloat(defaultHra)) / 100);
          const npsNum = Math.round((basicNum + daNum) * 0.10);
          
          newData.push({
            month: dateKey,
            monthLabel: monthLabel,
            basic: defaultBasic,
            daPercent: daRate.toString(),
            da: daNum.toString(),
            hraPercent: defaultHra,
            hra: hraNum.toString(),
            medical: '1000',
            nps: npsNum.toString(),
            gic: '30',
            tds: '0',
            isExpanded: newData.length === 0 
          });
        }
        current.setMonth(current.getMonth() + 1);
      }
      return newData;
    };

    setMonthlyDue(prev => generateMonthlyData(prev, true));
    setMonthlyDrawn(prev => generateMonthlyData(prev, false));
  }, [startDate, endDate, claimedPayMode, selectedPhase, selectedGrade]);

  const updateMonth = (type: 'due' | 'drawn', index: number, field: keyof MonthlyData, value: any) => {
    const state = type === 'due' ? monthlyDue : monthlyDrawn;
    const setState = type === 'due' ? setMonthlyDue : setMonthlyDrawn;
    
    const updated = [...state];
    updated[index] = { ...updated[index], [field]: value };

    if (field === 'basic' || field === 'daPercent' || field === 'hraPercent') {
      const b = parseFloat(updated[index].basic) || 0;
      const dp = parseFloat(updated[index].daPercent) || 0;
      const hp = parseFloat(updated[index].hraPercent) || 0;
      
      updated[index].da = Math.round((b * dp) / 100).toString();
      updated[index].hra = Math.round((b * hp) / 100).toString();
      updated[index].nps = Math.round((b + (parseFloat(updated[index].da) || 0)) * 0.10).toString();
    }

    setState(updated);
  };

  const calculateNetPay = (m: MonthlyData) => {
    const earnings = (parseFloat(m.basic) || 0) + (parseFloat(m.da) || 0) + (parseFloat(m.hra) || 0) + (parseFloat(m.medical) || 0);
    const deductions = (parseFloat(m.nps) || 0) + (parseFloat(m.gic) || 0) + (parseFloat(m.tds) || 0);
    return earnings - deductions;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { jsPDF } = (window as any).jspdf;
      const doc = new jsPDF('l', 'mm', 'a4');
      
      doc.setFontSize(22);
      doc.setTextColor(234, 88, 12); 
      doc.text("BLOCK EDUCATION OFFICE", 148, 15, { align: "center" });
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Name: ${tName}`, 14, 25);
      doc.text(`School: ${schoolName}`, 14, 30);
      doc.text(`PRAN: ${pranNo}   |   Subject: ${subject}`, 14, 35);
      doc.text(`Type: ${selectedPhase}   |   Period: ${startDate} to ${endDate}`, 14, 40);

      const tableRows = monthlyDue.map((mDue, idx) => {
        const mDrawn = monthlyDrawn[idx];
        const dBasic = parseFloat(mDue.basic) || 0;
        const dDA = parseFloat(mDue.da) || 0;
        const dHra = parseFloat(mDue.hra) || 0;
        const totalDue = dBasic + dDA + dHra;
        const drBasic = parseFloat(mDrawn.basic) || 0;
        const drDA = parseFloat(mDrawn.da) || 0;
        const drHra = parseFloat(mDrawn.hra) || 0;
        const totalDrawn = drBasic + drDA + drHra;
        const dNps = parseFloat(mDue.nps) || 0;
        const drNps = parseFloat(mDrawn.nps) || 0;
        const netPayable = (totalDue - totalDrawn) - (dNps - drNps);

        return [
          mDue.monthLabel,
          dBasic.toLocaleString(), `${dDA} (${mDue.daPercent}%)`, `${dHra} (${mDue.hraPercent}%)`, totalDue.toLocaleString(),
          drBasic.toLocaleString(), drDA.toLocaleString(), drHra.toLocaleString(), totalDrawn.toLocaleString(),
          (dBasic - drBasic).toLocaleString(), (dDA - drDA).toLocaleString(), (dHra - drHra).toLocaleString(),
          (totalDue - totalDrawn).toLocaleString(), netPayable.toLocaleString()
        ];
      });

      (doc as any).autoTable({
        startY: 45,
        head: [['Month', 'Due Basic', 'Due DA', 'Due HRA', 'Due Total', 'Paid Basic', 'Paid DA', 'Paid HRA', 'Paid Total', 'B.Diff', 'D.Diff', 'H.Diff', 'Gross Diff', 'Net Payable']],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillStyle: '#ea580c' },
        styles: { fontSize: 7 }
      });

      doc.save(`Arrear_${tName || 'Report'}.pdf`);
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const renderMonthList = (type: 'due' | 'drawn') => {
    const data = type === 'due' ? monthlyDue : monthlyDrawn;
    const title = type === 'due' ? "CLAIMED AMOUNT" : "PAYMENT INFO (DRAWN PER MONTH)";
    const icon = type === 'due' ? <Calculator size={28} /> : <DollarSign size={28} />;

    return (
      <div className="space-y-10 animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 gap-6">
           <div className="flex items-center space-x-6 w-full sm:w-auto">
              <div className="bg-orange-100/80 p-5 rounded-[1.5rem] text-orange-600 shadow-sm">{icon}</div>
              <div>
                <h4 className="text-3xl font-black text-gray-900 tracking-tight leading-none uppercase">{title}</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{type === 'due' ? "जितना सैलरी आपको मिलना चाहिए था वो भरे" : "आपने जो सैलरी पाई है उसकी जानकारियाँ भरें"}</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {data.map((m, idx) => (
            <div key={m.month} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-xl group">
               <button type="button" onClick={() => updateMonth(type, idx, 'isExpanded', !m.isExpanded)} className={`w-full px-8 py-7 flex items-center justify-between transition-colors ${m.isExpanded ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`}>
                 <div className="flex items-center space-x-6">
                    <span className="bg-orange-600 text-white text-[11px] font-black px-4 py-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">{m.month.split('-')[0]}</span>
                    <span className="text-2xl font-black text-gray-800 tracking-tight">{m.monthLabel}</span>
                    <div className="hidden sm:flex items-center text-gray-400 font-bold text-sm ml-8 border-l pl-8 space-x-2">
                       <span className="uppercase text-[10px] tracking-widest opacity-60">{type === 'due' ? 'Claimed:' : 'Net Received:'}</span>
                       <span className="text-emerald-600 font-black">₹{calculateNetPay(m).toLocaleString()}</span>
                    </div>
                 </div>
                 <div className={`p-2 rounded-full transition-transform ${m.isExpanded ? 'rotate-180 bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                   <ChevronDown size={28} />
                 </div>
               </button>

               {m.isExpanded && (
                 <div className="p-10 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fadeIn border-t border-orange-100/30">
                    <div className="space-y-6">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Basic Pay ({type === 'due' ? 'Expected' : 'Drawn'})</label>
                         <input type="number" disabled={type === 'due' && claimedPayMode === 'auto'} value={m.basic} onChange={e => updateMonth(type, idx, 'basic', e.target.value)} className={`w-full px-6 py-5 border-2 border-transparent rounded-3xl font-black text-2xl shadow-inner outline-none transition-all ${type === 'due' && claimedPayMode === 'auto' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-yellow-50 focus:border-yellow-400'}`} />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">D.A. %</label>
                            <div className="relative">
                              <select disabled={type === 'due' && claimedPayMode === 'auto'} value={m.daPercent} onChange={e => updateMonth(type, idx, 'daPercent', e.target.value)} className={`w-full px-4 py-5 border rounded-2xl font-black outline-none appearance-none cursor-pointer ${type === 'due' && claimedPayMode === 'auto' ? 'bg-gray-100 text-gray-500 border-gray-100' : 'bg-yellow-50 border-yellow-100 focus:border-yellow-400'}`}>
                                {DA_OPTIONS.map(rate => <option key={rate} value={rate}>{rate}%</option>)}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-yellow-600"><ChevronDown size={18} /></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">H.R.A. %</label>
                            <div className="relative">
                              <select value={m.hraPercent} onChange={e => updateMonth(type, idx, 'hraPercent', e.target.value)} className="w-full px-4 py-5 bg-yellow-50 border border-yellow-100 rounded-2xl font-black outline-none appearance-none cursor-pointer">
                                {(type === 'due' && claimedPayMode === 'auto' ? [5, 7.5, 10, 20] : HRA_OPTIONS).map(o => <option key={o} value={o}>{o}%</option>)}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-yellow-600"><ChevronDown size={18} /></div>
                            </div>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="bg-emerald-50 p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-emerald-100 flex flex-col items-center justify-center shadow-inner relative overflow-hidden group/net text-center">
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/net:scale-110 transition-transform"><DollarSign size={100} className="text-emerald-900" /></div>
                          <span className="text-[10px] sm:text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2 sm:mb-4 relative z-10">{type === 'due' ? 'CLAIMED AMOUNT' : 'Total Net Received'}</span>
                          <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 relative z-10 break-all">₹{calculateNetPay(m).toLocaleString()}</span>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-6xl overflow-hidden relative border border-gray-100 flex flex-col h-[95vh]">
        <div className="bg-gradient-to-br from-orange-600 to-red-700 p-8 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Calculator size={120} className="text-white" /></div>
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center space-x-6">
              <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md border border-white/30 shadow-2xl"><Calculator size={36} className="text-white" /></div>
              <div>
                <h3 className="text-white text-3xl font-black uppercase tracking-tight">AREAR CALCULATOR</h3>
                <p className="text-orange-100 font-bold mt-1 uppercase text-[10px] tracking-[0.4em]">Bihar Teacher Official Format</p>
              </div>
            </div>
            <button onClick={onClose} className="bg-red-500/20 hover:bg-red-500/30 text-white p-4 rounded-full transition-all group active:scale-90"><X size={28} className="group-hover:rotate-90 transition-transform" /></button>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 md:p-10 no-scrollbar bg-gray-50/50">
          <form onSubmit={handleGenerate} className="max-w-5xl mx-auto">
            {currentStep === 1 ? (
              <div className="space-y-12 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><User size={16} className="mr-2 text-orange-500" /> TEACHER PROFILE & MODE</h4>
                    <div className="bg-gray-100 p-1 rounded-[1.8rem] flex items-center shadow-inner">
                      <button type="button" onClick={() => setClaimedPayMode('auto')} className={`flex-1 flex items-center justify-center py-3 px-4 rounded-[1.6rem] text-sm font-black transition-all ${claimedPayMode === 'auto' ? 'bg-white text-orange-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}><Zap size={14} className="mr-2" /> AUTO PAY</button>
                      <button type="button" onClick={() => setClaimedPayMode('manual')} className={`flex-1 flex items-center justify-center py-3 px-4 rounded-[1.6rem] text-sm font-black transition-all ${claimedPayMode === 'manual' ? 'bg-white text-orange-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}><Edit3 size={14} className="mr-2" /> MANUAL</button>
                    </div>
                    <div className="space-y-5">
                      <input type="text" value={tName} onChange={e => setTName(e.target.value)} placeholder="Full Name of Teacher" className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500 focus:bg-white font-bold transition-all shadow-inner" />
                      
                      <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} placeholder="School Name" className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500 focus:bg-white font-bold transition-all shadow-inner" />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" value={pranNo} onChange={e => setPranNo(e.target.value)} placeholder="PRAN No." className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500 focus:bg-white font-bold transition-all shadow-inner" />
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500 focus:bg-white font-bold transition-all shadow-inner" />
                      </div>

                      {claimedPayMode === 'auto' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Recruitment Phase</label>
                             <div className="relative">
                               <select value={selectedPhase} onChange={e => setSelectedPhase(e.target.value)} className="w-full px-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500 focus:bg-white font-bold appearance-none cursor-pointer shadow-inner">
                                 {RECRUITMENT_PHASES.map(phase => <option key={phase} value={phase}>{phase}</option>)}
                               </select>
                               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"><ChevronDown size={16} /></div>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Grade Level</label>
                             <div className="relative">
                               <select disabled={selectedPhase === "HEADMASTER" || selectedPhase === "HEAD TEACHER"} value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)} className={`w-full px-6 py-4 border-2 border-transparent rounded-2xl outline-none font-bold appearance-none cursor-pointer shadow-inner ${selectedPhase === "HEADMASTER" || selectedPhase === "HEAD TEACHER" ? 'bg-gray-100 text-gray-400' : 'bg-gray-50/50 focus:border-orange-500 focus:bg-white'}`}>
                                 {GRADE_LEVELS.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                               </select>
                               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"><ChevronDown size={16} /></div>
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5 block flex items-center"><Calculator size={14} className="mr-2" /> Arrear Period Range</label>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">From</span>
                        <input type="month" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl font-bold outline-none shadow-inner" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">To</span>
                        <input type="month" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl font-bold outline-none shadow-inner" />
                      </div>
                    </div>
                  </div>
                </div>
                {renderMonthList('due')}
                <div className="flex justify-end pt-10">
                  <button type="button" onClick={() => setCurrentStep(2)} className="bg-slate-900 hover:bg-black text-white px-16 py-7 rounded-[3rem] font-black text-2xl shadow-2xl transition-all flex items-center group">PROCEED TO RECEIVED DATA <ChevronRight size={32} className="ml-3 group-hover:translate-x-2 transition-transform" /></button>
                </div>
              </div>
            ) : (
              <div className="space-y-12 animate-fadeIn">
                {renderMonthList('drawn')}
                <div className="flex flex-col md:flex-row gap-6 pt-10">
                  <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 py-8 rounded-[3rem] bg-white border-2 border-slate-100 text-slate-500 font-black text-xl flex items-center justify-center transition-all shadow-md active:scale-95"><ArrowLeft className="mr-3" /> GO BACK</button>
                  <button disabled={loading} type="submit" className={`flex-[2] py-8 rounded-[3.5rem] text-white font-black text-3xl shadow-2xl transition-all flex items-center justify-center transform active:scale-[0.97] hover:-translate-y-2 ${loading ? 'bg-gray-300' : 'bg-gradient-to-r from-orange-600 to-red-600'}`}>
                    {loading ? <Loader2 className="animate-spin mr-5" /> : <FileDown className="mr-5" size={36} />} GENERATE ARREAR PDF
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};