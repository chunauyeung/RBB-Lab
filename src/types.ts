export type Language = 'en' | 'zh';

export interface ResearchPaper {
  id: string;
  titleEn: string;
  titleZh: string;
  abstractEn: string;
  abstractZh: string;
  category: string;
  tags?: string[];
  linkTextEn: string;
  linkTextZh: string;
  authors: string;
  journal: string;
  year: number;
  volumeIssue?: string;
  doi?: string;
  url?: string;
  bibtex?: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  date: string;
  titleEn: string;
  titleZh: string;
  summaryEn: string;
  summaryZh: string;
  contentEn?: string;
  contentZh?: string;
  category: 'Keynote' | 'Publication' | 'Team' | 'Event';
}

export interface TeamMember {
  id: string;
  nameEn: string;
  nameZh: string;
  roleEn: string;
  roleZh: string;
  category: 'pi' | 'graduate' | 'undergraduate' | 'alumni';
  image?: string;
  bioEn?: string;
  bioZh?: string;
  interestsEn?: string[];
  interestsZh?: string[];
  yearInfo?: string;
  currentRoleEn?: string;
  currentRoleZh?: string;
  email?: string;
}

export interface ResearchArea {
  id: string;
  titleEn: string;
  titleZh: string;
  subTitleEn: string;
  subTitleZh: string;
  descEn: string;
  descZh: string;
  tags: string[];
  icon: string;
}

export interface ResearchMethod {
  id: string;
  categoryEn: string;
  categoryZh: string;
  itemsEn: string[];
  itemsZh: string[];
  icon: string;
}

export interface DatasetItem {
  id: string;
  name: string;
  subjectsCount: number;
  modality: string;
  tasks: string[];
  totalSize: string;
  bidsCompliant: boolean;
  fmriPrepIncluded: boolean;
}
