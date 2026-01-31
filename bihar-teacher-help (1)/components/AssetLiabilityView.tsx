import React, { useState } from 'react';
import { FileText, User, BookOpen, Printer, Download, Building2, CreditCard, Briefcase, GraduationCap } from 'lucide-react';

export const AssetLiabilityView: React.FC = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    subject: '',
    teacherType: 'HEADMASTER',
    pranNo: '',
    schoolName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const generatePDF = () => {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    // 1. HEADER SECTION
    const pageWidth = doc.internal.pageSize.width;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("BLOCK EDUCATION OFFICE, GOPALGANJ", pageWidth / 2, 15, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // 2. PERSONAL INFO SECTION
    let startY = 25;
    let leftMargin = 14;

    // Line 1
    doc.text(`Teacher Name - ${formData.teacherName || '__________________'}`, leftMargin, startY);
    doc.text(`Teacher Type - ${formData.teacherType}`, pageWidth / 2, startY);

    // Line 2
    doc.text(`PRAN NO. - ${formData.pranNo || '__________________'}`, leftMargin, startY + 6);
    doc.text(`Subject - ${formData.subject || '__________________'}`, pageWidth / 2, startY + 6);

    // Line 3
    doc.text(`School - ${formData.schoolName || '__________________'}`, leftMargin, startY + 12);

    // 3. TABLE SECTION (Replicating exact structure provided)
    const tableBody = [
        ["Jul-25", "7903", "4584", "790", "13277", "7903", "3952", "316", "12171", "0", "632", "1106", "63", "1043", ""],
        ["Aug-25", "35000", "20300", "3500", "58800", "35000", "17500", "1400", "53900", "0", "2800", "4900", "280", "4620", ""],
        ["Sep-25", "35000", "20300", "3500", "58800", "35000", "17500", "1400", "53900", "0", "2800", "4900", "280", "4620", ""],
        ["Oct-25", "35000", "20300", "3500", "58800", "35000", "17500", "1400", "53900", "0", "2800", "4900", "280", "4620", ""],
        ["Nov-25", "35000", "20300", "3500", "58800", "35000", "17500", "2800", "55300", "0", "2800", "3500", "280", "3220", ""],
        ["Dec-25", "35000", "20300", "3500", "58800", "35000", "20300", "3500", "58800", "0", "0", "0", "0", "0", ""],
        // TOTAL ROW
        [{content: 'TOTAL', styles: {fontStyle: 'bold'}}, "182903", "106084", "18290", "307277", "182903", "94252", "10816", "287971", "0", "11832", "19306", "1183", "18123", ""]
    ];

    (doc as any).autoTable({
      startY: startY + 18,
      theme: 'grid',
      headStyles: { halign: 'center', valign: 'middle', fontSize: 8, cellPadding: 1, fillColor: [22, 163, 74] }, // Green header
      bodyStyles: { fontSize: 8, cellPadding: 1 },
      head: [
        [
          { content: 'Period', rowSpan: 2, styles: { valign: 'middle' } },
          { content: 'CLAIMED AMOUNT', colSpan: 4 },
          { content: 'DRAWN AMOUNT', colSpan: 4 },
          { content: 'DIFFERENCE PAYABLE', colSpan: 6 }
        ],
        [
          // Claimed Cols
          'PAY', 'D.A.', 'H.R.A.', 'TOTAL',
          // Drawn Cols
          'PAY', 'D.A.', 'H.R.A.', 'TOTAL',
          // Difference Cols
          'PAY', 'D.A.', 'GROSS\nAMT', 'NPS\nDED.', 'NET PAY', 'REMARKS'
        ]
      ],
      body: tableBody,
    });

    // 4. FOOTER / CERTIFICATION
    let finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(9);
    doc.text("Note: Certified that the amount of this bill has not been paid previously.", leftMargin, finalY);

    // Signatures Layout
    let sigY = finalY + 25;
    doc.text("Teacher Signature", leftMargin, sigY);
    doc.text("Headmaster Signature\n& Seal", pageWidth / 2, sigY, { align: 'center' });
    doc.text("Block Education Officer\nSignature & Seal", pageWidth - leftMargin, sigY, { align: 'right' });

    // Save PDF
    doc.save("Arrear_Bill_Format.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-slideUp">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <FileText size={120} />
          </div>
          <div className="relative z-10 flex items-center space-x-6">
             <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
               <FileText size={40} className="text-white" />
             </div>
             <div>
               <h2 className="text-3xl font-black tracking-tight text-white">ASSET & LIABILITY</h2>
               <p className="text-emerald-200 font-bold uppercase text-[10px] tracking-[0.4em] mt-1">Official Arrear Bill Format</p>
             </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-12 space-y-10">
            <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center justify-center">
               <p className="text-emerald-800 text-sm font-bold text-center">
                 Fill in your details below to generate the "Arrear Bill / Asset Declaration" in the official Block Education Office format.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Teacher Name */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center">
                  <User size={14} className="mr-1" /> Teacher Name
                </label>
                <div className="relative group">
                  <input 
                    name="teacherName"
                    type="text"
                    value={formData.teacherName}
                    onChange={handleChange}
                    placeholder="e.g. Manoj Kumar"
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2.5rem] font-bold text-gray-800 focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-inner text-lg placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Teacher Type */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center">
                  <GraduationCap size={14} className="mr-1" /> Teacher Type
                </label>
                <div className="relative group">
                  <select 
                    name="teacherType"
                    value={formData.teacherType}
                    onChange={handleChange}
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2.5rem] font-bold text-gray-800 focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-inner text-lg appearance-none cursor-pointer"
                  >
                    <option value="HEADMASTER">HEADMASTER</option>
                    <option value="ASSISTANT TEACHER">ASSISTANT TEACHER</option>
                    <option value="HEAD TEACHER">HEAD TEACHER</option>
                    <option value="NIYOJIT TEACHER">NIYOJIT TEACHER</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center">
                  <BookOpen size={14} className="mr-1" /> Subject
                </label>
                <div className="relative group">
                   <input 
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Geography"
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2.5rem] font-bold text-gray-800 focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-inner text-lg placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* PRAN NO */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center">
                  <CreditCard size={14} className="mr-1" /> PRAN Number
                </label>
                <div className="relative group">
                   <input 
                    name="pranNo"
                    type="text"
                    value={formData.pranNo}
                    onChange={handleChange}
                    placeholder="e.g. 110212756672"
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2.5rem] font-bold text-gray-800 focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-inner text-lg placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* School Name */}
              <div className="space-y-3 md:col-span-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center">
                  <Building2 size={14} className="mr-1" /> School Name
                </label>
                <div className="relative group">
                   <input 
                    name="schoolName"
                    type="text"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. High School Katgharwa"
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2.5rem] font-bold text-gray-800 focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-inner text-lg placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <button 
                onClick={generatePDF}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-xl shadow-emerald-100 transition-all flex items-center justify-center group active:scale-[0.98] transform hover:-translate-y-1"
              >
                <Download className="mr-4 group-hover:scale-110 transition-transform" size={28} />
                DOWNLOAD PDF REPORT
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};