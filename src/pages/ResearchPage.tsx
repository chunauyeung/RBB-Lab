import React from 'react';
import { BookOpen, Database, TrendingUp, GitFork, Activity, MonitorCheck, Code, ExternalLink } from 'lucide-react';
import { Language, ResearchPaper } from '../types';
import { RESEARCH_AREAS, RESEARCH_METHODS, ALL_PUBLICATIONS } from '../data/mockData';

interface ResearchPageProps {
  lang: Language;
  onSelectPaper?: (paper: ResearchPaper) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ lang }) => {
  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen;
      case 'Database': return Database;
      case 'TrendingUp': return TrendingUp;
      case 'GitFork': return GitFork;
      default: return BookOpen;
    }
  };

  const getMethodIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'MonitorCheck': return MonitorCheck;
      case 'Code': return Code;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="border-b border-gray-200 pb-6 space-y-2">
        <span className="text-xs font-mono text-[#236869] uppercase font-bold tracking-wider">
          {lang === 'en' ? 'Core Scientific Domains' : '核心学科方向与主要成果'}
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-[#1b365d]">
          {lang === 'en' ? 'Research Areas & Latest Publications' : '研究领域与最新研究'}
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          {lang === 'en'
            ? 'Our interdisciplinary laboratory investigates the neurological foundation of reading, bilingual language control, and cognitive plasticity.'
            : '实验室跨学科开展阅读加工、双语认知控制与脑可塑性的认知神经科学机制研究。'}
        </p>
      </div>

      {/* Section 1: 主要研究方向 (4 Cards) */}
      <section className="space-y-6">
        <h2 className="font-heading text-xl font-bold text-[#1b365d] border-l-4 border-[#1b365d] pl-3">
          {lang === 'en' ? 'Detailed Research Directions' : '主要研究方向'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_AREAS.map((area) => {
            const Icon = getAreaIcon(area.icon);
            return (
              <div
                key={area.id}
                className="bg-white rounded-xl p-5 border border-[#e5e8ee] shadow-2xs hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f1f4f9] text-[#1b365d] flex items-center justify-center">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-heading text-base font-bold text-[#1b365d]">
                      {lang === 'en' ? area.titleEn : area.titleZh}
                    </h3>
                    <div className="text-xs text-[#236869] font-medium mt-0.5">
                      {lang === 'en' ? area.subTitleEn : area.subTitleZh}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'en' ? area.descEn : area.descZh}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: 研究方法与工具 (3 Cards) */}
      <section className="space-y-6">
        <h2 className="font-heading text-xl font-bold text-[#1b365d] border-l-4 border-[#236869] pl-3">
          {lang === 'en' ? 'Research Methods & Tools' : '研究方法与工具'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_METHODS.map((method) => {
            const Icon = getMethodIcon(method.icon);
            const items = lang === 'en' ? method.itemsEn : method.itemsZh;
            return (
              <div
                key={method.id}
                className="bg-white rounded-xl p-5 border border-[#e5e8ee] shadow-2xs space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#1b365d]">
                    {lang === 'en' ? method.categoryEn : method.categoryZh}
                  </h3>
                </div>

                <ul className="space-y-2 pt-2 border-t border-gray-100">
                  {items.map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-[#236869] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Latest Publications */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="font-heading text-xl font-bold text-[#1b365d] border-l-4 border-[#1b365d] pl-3">
            {lang === 'en' ? 'Latest Publications' : '最新研究'}
          </h2>
        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {ALL_PUBLICATIONS.map((paper) => {
            const paperUrl = paper.url || (paper.doi ? (paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`) : '#');
            return (
              <div
                key={paper.id}
                onClick={() => window.open(paperUrl, '_blank')}
                className="bg-white rounded-r-xl rounded-l-xs p-5 border-y border-r border-[#e5e8ee] border-l-4 border-l-[#1b365d] shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#236869]">
                      {paper.journal} ({paper.year})
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-[#1b365d] group-hover:text-[#236869] transition-colors leading-snug">
                    {lang === 'en' ? paper.titleEn : paper.titleZh}
                  </h3>

                  <div className="text-xs text-gray-600 font-sans">
                    <strong>{lang === 'en' ? 'Authors: ' : '作者: '}</strong>
                    {paper.authors}
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {lang === 'en' ? paper.abstractEn : paper.abstractZh}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 flex items-center gap-2 self-start sm:self-center">
                  <a
                    href={paperUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1.5 bg-[#1b365d] text-white hover:bg-[#236869] text-xs font-mono font-semibold rounded transition-colors flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0"
                  >
                    <ExternalLink size={13} className="shrink-0" />
                    <span className="whitespace-nowrap">{lang === 'en' ? 'READ PAPER' : '阅读论文'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: Open Research Datasets */}
      <section id="datasets" className="space-y-6 pt-4">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="font-heading text-xl font-bold text-[#1b365d] border-l-4 border-[#236869] pl-3">
            {lang === 'en' ? 'Open Research Datasets' : '开放数据集'}
          </h2>
        </div>

        {/* Fudan Emoji Dataset (FED) Card */}
        <div
          onClick={() => window.open('https://osf.io/x643z/', '_blank')}
          className="bg-white rounded-r-xl rounded-l-xs p-5 sm:p-6 border-y border-r border-[#e5e8ee] border-l-4 border-l-[#236869] shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
        >
          <div className="space-y-2.5 max-w-4xl">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#1b365d] group-hover:text-[#236869] transition-colors leading-snug">
              {lang === 'en' ? 'Fudan Emoji Dataset (FED)' : '复旦emoji数据集'}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
              {lang === 'en'
                ? 'Fudan Emoji Dataset (FED), a semantic and affective normative dataset containing 359 commonly used emojis in Chinese context and systematically distinguishing emotion-oriented and meaning-oriented emojis. FED provides subjective ratings on 12 dimensions, description-based vector embeddings and four data-driven uncertainty metrics.'
                : '复旦emoji数据集（Fudan Emoji Dataset, FED）是面向中文语境的语义与情感常模数据集，共收录 359 个中文常用 emoji 表情符号，并系统区分情绪导向与意义导向的 emoji。FED 提供了 12 个维度的主观评定常模、基于文字描述的向量嵌入（Vector Embeddings）以及四项数据驱动的不确定性指标。'}
            </p>
          </div>

          <div className="flex-shrink-0 self-start sm:self-center">
            <a
              href="https://osf.io/x643z/"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-2 bg-[#1b365d] hover:bg-[#236869] text-white text-xs font-mono font-semibold rounded transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0"
            >
              <ExternalLink size={13} className="shrink-0" />
              <span className="whitespace-nowrap">{lang === 'en' ? 'ACCESS DATASET' : '获取数据集'}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
