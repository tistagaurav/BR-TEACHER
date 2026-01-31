import React, { useState, useRef, useMemo } from 'react';
import { FileText, Download, Building2, User, Landmark, ShieldCheck, Loader2, Calculator, Info, Eye, X, CheckCircle2, RotateCcw, ClipboardCheck, ArrowRight, ArrowLeft, Copy, Percent, Wallet, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';

const BIHAR_DISTRICTS = [
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", 
  "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", 
  "Katihar", "Khagaria", "Kishanjganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", 
  "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", 
  "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
];

const DA_PERCENTAGES = [42, 46, 50, 53, 54, 55, 58];
const HRA_PERCENTAGES = [4, 5, 6, 7.5, 8, 10, 16, 20];

const MONTHS_CONFIG = [
  { label: "Mar", year: "2025" }, { label: "Apr", year: "2025" }, { label: "May", year: "2025" },
  { label: "Jun", year: "2025" }, { label: "Jul", year: "2025" }, { label: "Aug", year: "2025" },
  { label: "Sep", year: "2025" }, { label: "Oct", year: "2025" }, { label: "Nov", year: "2025" },
  { label: "Dec", year: "2025" }, { label: "Jan", year: "2026" }, { label: "Feb", year: "2026" }
];

const initialMonthlyState = () => ({
  basic: 26520,
  daPct: 58,
  daAmount: 15382,
  hraPct: 5,
  hraAmount: 1326,
  medical: 1000,
  nps: 4190,
  gic: 30,
  tds: 0,
  isExpanded: false
});

export const TdsFormView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [monthlyData, setMonthlyData] = useState(MONTHS_CONFIG.map((conf, idx) => ({
    ...initialMonthlyState(),
    isExpanded: idx === 0 
  })));

  const [formData, setFormData] = useState({
    employeeName: '',
    employeePan: '',
    schoolName: '',
    treasuryOffice: 'Patna',
    financialYear: '2025-2026',
    assessmentYear: '2026-2027',
    grossSalary: '0',
    standardDeduction: '75000',
    professionalTax: '2500',
    taxPaid: '0'
  });

  const calculateNetPay = (month: any) => {
    const earnings = month.basic + month.daAmount + month.hraAmount + month.medical;
    const deductions = month.nps + month.gic + month.tds;
    return earnings - deductions;
  };

  const handleMonthlyChange = (idx: number, field: string, value: any) => {
    setMonthlyData(prev => {
      const updated = [...prev];
      const month = { ...updated[idx], [field]: value };
      if (field === 'basic' || field === 'daPct') month.daAmount = Math.round((month.basic * month.daPct) / 100);
      if (field === 'basic' || field === 'hraPct') month.hraAmount = Math.round((month.basic * month.hraPct) / 100);
      if (field === 'basic' || field === 'daPct' || field === 'daAmount') month.nps = Math.round((month.basic + month.daAmount) * 0.10);
      updated[idx] = month;
      return updated;
    });
  };

  const toggleMonth = (idx: number) => setMonthlyData(prev => prev.map((m, i) => i === idx ? { ...m, isExpanded: !m.isExpanded } : m));
  const copyFirstToAll = () => setMonthlyData(prev => prev.map((m, i) => i === 0 ? m : { ...prev[0], isExpanded: false }));
  const sumToAnnual = () => setFormData(prev => ({ ...prev, grossSalary: monthlyData.reduce((acc, m) => acc + (m.basic + m.daAmount + m.hraAmount + m.medical), 0).toString() }));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const generatePDF = async (shouldDownload: boolean = true) => {
    setLoading(true);
    try {
      const { jsPDF } = (window as any).jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');
      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - (margin * 2);

      // --- OFFICIAL HEADER ---
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(234, 88, 12); 
      doc.text("BLOCK EDUCATION OFFICE", pageWidth / 2, 20, { align: "center" });
      doc.setFontSize(13);
      doc.setTextColor(51, 65, 85);
      doc.text("ANNUAL SALARY STATEMENT & INCOME TAX COMPUTATION", pageWidth / 2, 28, { align: "center" });

      // --- EMPLOYEE PROFILE SECTION ---
      doc.setDrawColor(200);
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, 35, contentWidth, 38, 'F');
      doc.rect(margin, 35, contentWidth, 38);
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(`Employee Name : ${formData.employeeName || '____________________'}`, margin + 5, 42);
      doc.text(`PAN Number      : ${formData.employeePan || '____________________'}`, margin + 5, 50);
      doc.text(`School/Unit       : ${formData.schoolName || '____________________'}`, margin + 5, 58);
      doc.text(`Treasury/Office : ${formData.treasuryOffice}`, margin + 5, 66);
      doc.text(`Financial Year  : ${formData.financialYear}`, pageWidth - margin - 50, 42);
      doc.text(`Assessment Year : ${formData.assessmentYear}`, pageWidth - margin - 50, 50);

      // --- MONTHLY DATA TABLE ---
      doc.setFontSize(12);
      doc.setTextColor(234, 88, 12);
      doc.text("MONTHLY BREAKDOWN", margin, 85);
      const tableRows = monthlyData.map((m, i) => [
        MONTHS_CONFIG[i].label,
        m.basic.toLocaleString(),
        m.daAmount.toLocaleString(),
        m.hraAmount.toLocaleString(),
        m.medical.toLocaleString(),
        (m.basic + m.daAmount + m.hraAmount + m.medical).toLocaleString(),
        m.nps.toLocaleString(),
        m.gic.toLocaleString(),
        calculateNetPay(m).toLocaleString()
      ]);
      (doc as any).autoTable({
        startY: 90,
        head: [['Month', 'Basic', 'DA', 'HRA', 'Med.', 'Gross', 'NPS', 'GIS', 'Net']],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [234, 88, 12], textColor: 255, fontSize: 8, halign: 'center' },
        styles: { fontSize: 8, halign: 'center' },
        columnStyles: { 0: { fontStyle: 'bold', halign: 'left' } }
      });

      // --- SUMMARY CALCULATION ---
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      doc.setFontSize(12);
      doc.setTextColor(234, 88, 12);
      doc.text("INCOME TAX COMPUTATION SUMMARY", margin, finalY);
      const grossTotal = parseFloat(formData.grossSalary) || 0;
      const stdDed = parseFloat(formData.standardDeduction) || 75000;
      const pTax = parseFloat(formData.professionalTax) || 0;
      const taxable = Math.max(0, grossTotal - (stdDed + pTax));
      (doc as any).autoTable({
        startY: finalY + 5,
        body: [
          ['1. Total Gross Salary for the year', `Rs. ${grossTotal.toLocaleString()}`],
          ['2. Standard Deduction u/s 16(ia)', `Rs. ${stdDed.toLocaleString()}`],
          ['3. Professional Tax Deduction', `Rs. ${pTax.toLocaleString()}`],
          ['4. Net Taxable Income (1 - 2 - 3)', `Rs. ${taxable.toLocaleString()}`],
          ['5. Income Tax Paid / Deducted', `Rs. ${formData.taxPaid.toLocaleString()}`]
        ],
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', width: 120 } }
      });

      // --- SIGNATURES ---
      const footerY = (doc as any).lastAutoTable.finalY + 30;
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text("________________________", margin, footerY);
      doc.text("Signature of Employee", margin, footerY + 6);
      doc.text("________________________", pageWidth - margin - 45, footerY);
      doc.text("Drawing & Disbursing Officer", pageWidth - margin - 55, footerY + 6);

      const blobUrl = doc.output('bloburl');
      setPdfPreviewUrl(blobUrl);
      if (shouldDownload) doc.save(`TDS_Portal_${formData.employeeName || 'Report'}.pdf`);
      previewRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-slideUp">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden mb-12">
        <div className="bg-gradient-to-br from-orange-600 to-red-700 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Calculator size={140} /></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center space-x-6">
              <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md border border-white/30 shadow-2xl"><FileText size={48} className="text-white" /></div>
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-1 uppercase">TDS Information Portal</h2>
                <p className="text-orange-100 font-bold uppercase text-[10px] tracking-[0.4em]">Official Income Tax & Salary Report</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-2">
              <div className={`px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest ${currentStep === 1 ? 'bg-white text-orange-600 shadow-xl' : 'bg-black/20 text-orange-100'}`}>Basic Info</div>
              <div className={`px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest ${currentStep === 2 ? 'bg-white text-orange-600 shadow-xl' : 'bg-black/20 text-orange-100'}`}>Calculations</div>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-12">
          {currentStep === 1 ? (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center space-x-3 text-indigo-600"><div className="p-2 bg-indigo-50 rounded-lg"><User size={20} /></div><h3 className="text-sm font-black uppercase tracking-widest">Personal & School Details</h3></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Employee Name</label><input name="employeeName" value={formData.employeeName} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold focus:border-orange-500 outline-none" placeholder="Full Name" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PAN Number</label><input name="employeePan" maxLength={10} value={formData.employeePan} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-black tracking-widest focus:border-orange-500 outline-none uppercase" placeholder="ABCDE1234F" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">School Name</label><input name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold focus:border-orange-500 outline-none" placeholder="School Name" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">District Office</label><select name="treasuryOffice" value={formData.treasuryOffice} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold appearance-none cursor-pointer focus:border-orange-500 outline-none">{BIHAR_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              </div>
              <button onClick={() => setCurrentStep(2)} className="w-full py-8 rounded-[3rem] bg-slate-900 hover:bg-black text-white font-black text-2xl shadow-2xl transition-all flex items-center justify-center mt-10">PROCEED TO SALARY INPUTS <ArrowRight className="ml-3" size={28} /></button>
            </div>
          ) : (
            <div className="space-y-12 animate-fadeIn">
              <div className="flex justify-between items-center"><h3 className="text-sm font-black uppercase tracking-widest text-emerald-600">Monthly Salary Inputs</h3><button onClick={copyFirstToAll} className="flex items-center text-[10px] font-black text-blue-600 bg-blue-50 px-5 py-3 rounded-full border border-blue-100 hover:shadow-lg transition-all uppercase tracking-widest"><Copy size={14} className="mr-2" /> Copy 1st Month to All</button></div>
              <div className="grid grid-cols-1 gap-6">
                {monthlyData.map((m, idx) => (
                  <div key={idx} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-xl group">
                     <button onClick={() => toggleMonth(idx)} className={`w-full px-8 py-7 flex items-center justify-between transition-colors ${m.isExpanded ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`}>
                       <div className="flex items-center space-x-6">
                          <span className="bg-orange-600 text-white text-[10px] font-black px-4 py-2 rounded-xl">{MONTHS_CONFIG[idx].label}</span>
                          <span className="text-2xl font-black text-gray-800 tracking-tight">{MONTHS_CONFIG[idx].label} {MONTHS_CONFIG[idx].year}</span>
                          <div className="hidden lg:flex items-center text-gray-400 font-bold text-sm ml-8 border-l pl-8 space-x-4"><span className="text-emerald-600 font-black">₹{calculateNetPay(m).toLocaleString()}</span></div>
                       </div>
                       <div className={`p-2 rounded-full transition-transform ${m.isExpanded ? 'rotate-180 bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}><ChevronDown size={28} /></div>
                     </button>
                     {m.isExpanded && (
                       <div className="p-10 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fadeIn border-t border-orange-100/30">
                          <div className="space-y-6">
                             <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Basic Pay</label><input type="number" value={m.basic} onChange={e => handleMonthlyChange(idx, 'basic', Number(e.target.value))} className="w-full px-6 py-5 bg-yellow-50/50 border border-yellow-200 rounded-3xl font-black text-2xl outline-none" /></div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DA %</label><select value={m.daPct} onChange={e => handleMonthlyChange(idx, 'daPct', Number(e.target.value))} className="w-full px-4 py-5 bg-yellow-50 border border-yellow-100 rounded-2xl font-black outline-none">{DA_PERCENTAGES.map(p => <option key={p} value={p}>{p}%</option>)}</select></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HRA %</label><select value={m.hraPct} onChange={e => handleMonthlyChange(idx, 'hraPct', Number(e.target.value))} className="w-full px-4 py-5 bg-yellow-50 border border-yellow-100 rounded-2xl font-black outline-none">{HRA_PERCENTAGES.map(p => <option key={p} value={p}>{p}%</option>)}</select></div>
                             </div>
                          </div>
                          <div className="bg-emerald-50 p-10 rounded-[3.5rem] border border-emerald-100 flex flex-col items-center justify-center shadow-inner relative overflow-hidden"><span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4">MONTHLY NET</span><span className="text-6xl font-black text-emerald-950">₹{calculateNetPay(m).toLocaleString()}</span></div>
                       </div>
                     )}
                  </div>
                ))}
              </div>
              <div className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden text-white"><div className="space-y-10 relative z-10"><div className="flex justify-between items-center"><h4 className="text-xl font-black uppercase tracking-widest flex items-center"><ShieldCheck size={24} className="mr-3 text-orange-500" /> Annual Summary</h4><button onClick={sumToAnnual} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all">Calculate Annual Total</button></div><div className="grid grid-cols-1 md:grid-cols-2 gap-10"><div><label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Gross Salary</label><div className="text-5xl font-black text-white mt-2">₹{parseFloat(formData.grossSalary).toLocaleString()}</div></div><div className="space-y-4"><div className="flex justify-between items-center"><span>Standard Deduction</span><span className="font-bold">₹{parseFloat(formData.standardDeduction).toLocaleString()}</span></div><div className="flex justify-between items-center text-emerald-400 pt-4 border-t border-white/10 font-black text-2xl uppercase"><span>Taxable Amount</span><span>₹{Math.max(0, parseFloat(formData.grossSalary) - parseFloat(formData.standardDeduction)).toLocaleString()}</span></div></div></div></div></div>
              <div className="flex flex-col md:flex-row gap-6 mt-10"><button onClick={() => setCurrentStep(1)} className="flex-1 py-8 rounded-[3rem] bg-white border-2 border-slate-100 text-slate-500 font-black text-xl flex items-center justify-center shadow-md active:scale-95"><ArrowLeft className="mr-3" /> GO BACK</button><button onClick={() => generatePDF(true)} disabled={loading} className="flex-[2] py-8 rounded-[3.5rem] bg-gradient-to-r from-orange-600 to-red-600 text-white font-black text-3xl shadow-2xl transition-all flex items-center justify-center transform active:scale-[0.97]">{loading ? <Loader2 className="animate-spin mr-5" /> : <Download className="mr-5" size={36} />} DOWNLOAD PDF REPORT</button></div>
            </div>
          )}
        </div>
      </div>
      {pdfPreviewUrl && (
        <div ref={previewRef} className="animate-slideUp scroll-mt-28">
          <div className="bg-white rounded-[4rem] shadow-2xl border-4 border-slate-100 overflow-hidden">
            <div className="bg-slate-900 p-10 text-white flex justify-between items-center"><h3 className="text-3xl font-black tracking-tight uppercase">Custom PDF Generated</h3><button onClick={() => setPdfPreviewUrl(null)} className="bg-red-500/10 p-5 rounded-full text-red-500 hover:bg-red-500/20 transition-all"><X size={36} /></button></div>
            <div className="p-8 md:p-12 bg-slate-100"><iframe src={pdfPreviewUrl} className="w-full h-[950px] border-none rounded-[3rem] bg-white shadow-inner"></iframe></div>
          </div>
        </div>
      )}
    </div>
  );
};
