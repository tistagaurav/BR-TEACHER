
export type TabType = 'home' | 'tre1' | 'tre2' | 'tre3' | 'bpscTre3' | 'exclusive' | 'arrear' | 'salary' | 'brc';

export interface DownloadItem {
  title: string;
  size: string;
  type: 'pdf' | 'doc' | 'link';
  date: string;
}

export interface TreSectionData {
  title: string;
  description: string;
  downloads: DownloadItem[];
  isComingSoon?: boolean;
  customBanner?: {
    text: string;
    subText?: string;
    buttonText: string;
  };
  subCategories?: {
    label: string;
    target: TabType;
  }[];
}

export interface TreData {
  tre1: TreSectionData;
  tre2: TreSectionData;
  tre3: TreSectionData;
  bpscTre3: TreSectionData;
}