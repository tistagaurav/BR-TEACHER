import { TreData } from './types';

export const TRE_DATA: TreData = {
  tre1: {
    title: "Arrear Calculator Center",
    description: "Calculate pending dues and differences for various teaching grades and recruitment phases in Bihar.",
    customBanner: {
      text: "BPSC TRE 1 AREAR",
      subText: "Calculate your pending dues and check payment status",
      buttonText: "Check AREAR"
    },
    subCategories: [
      { label: "BPSC TRE-1 Arrear", target: 'tre1' },
      { label: "BPSC TRE-2 Arrear", target: 'tre1' },
      { label: "BPSC TRE-3 Arrear", target: 'tre1' },
      { label: "EXCLUSIVE TEACHER Arrear", target: 'tre1' },
      { label: "HEADMASTER Arrear", target: 'tre1' },
      { label: "HEAD TEACHER Arrear", target: 'tre1' }
    ],
    downloads: []
  },
  tre2: {
    title: "TDS & Income Tax Center",
    description: "Income Tax, TDS calculation forms, and professional guidance for Bihar Teachers.",
    isComingSoon: false,
    downloads: [
      { title: "Income Tax Slab 2024-25", size: "0.5 MB", type: "pdf", date: "2024-04-01" },
      { title: "Standard Deduction Guide", size: "0.3 MB", type: "pdf", date: "2024-04-10" }
    ]
  },
  tre3: {
    title: "Bihar Teacher Hub",
    description: "Access official service rules, salary matrix, and departmental notifications for Bihar Government Teachers.",
    downloads: [
      { title: "BPSC Teacher Service Rules 2024", size: "1.2 MB", type: "pdf", date: "2024-06-15" },
      { title: "Salary Matrix (7th Pay Commission)", size: "0.8 MB", type: "pdf", date: "2024-05-20" },
      { title: "Leave Rules & Applications Format", size: "2.1 MB", type: "doc", date: "2024-07-01" },
      { title: "Promotion & Seniority Guidelines", size: "1.5 MB", type: "pdf", date: "2024-08-10" }
    ],
    subCategories: [
      { label: "Arrear Calculator", target: 'tre1' },
      { label: "Income Tax & TDS", target: 'tre2' },
      { label: "Asset & Liability Forms", target: 'bpscTre3' }
    ]
  },
  bpscTre3: {
    title: "ASSET AND LIABILITY",
    description: "Download property declaration forms (चल-अचल संपत्ति घोषणा), liability statements, and official formats for Bihar Government employees.",
    isComingSoon: true,
    downloads: []
  }
};