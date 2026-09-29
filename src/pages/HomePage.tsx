import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Language, ResearchPaper } from '../types';
import { FEATURED_RESEARCH } from '../data/mockData';

interface HomePageProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onSelectPaper?: (paper: ResearchPaper) => void;
  onOpenJoinModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onSelectPaper
}) => {
  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-4xl space-y-6">

          <div className="space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b365d] tracking-tight leading-[1.15]">
              Reading, Bilingualism, and Brain Lab
            </h1>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#236869]">
              阅读、双语与大脑实验室
            </h2>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-sans">
            {lang === 'en'
              ? 'We explore the neural mechanisms of language processing, focusing on how bilingualism shapes cognitive function and brain plasticity across the lifespan. Using advanced fMRI, EEG, and computational models, our laboratory bridges cognitive science and education.'
              : '我们致力于揭示语言加工背后的神经机制，重点探索双语经验如何重塑全生命周期的大脑结构与功能可塑性。融合高场 fMRI、EEG 脑电技术与计算模型，实验室构建认知神经科学与教育落地的桥梁。'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('research')}
              className="px-6 py-3 bg-[#1b365d] text-white text-sm font-semibold rounded-lg hover:bg-[#2e476f] transition-all flex items-center gap-2 shadow-sm hover:shadow cursor-pointer"
            >
              <span>{lang === 'en' ? 'EXPLORE RESEARCH' : '探索研究领域'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* Featured Research Section */}
      <section className="space-y-6 pt-6">
        <div className="flex justify-between items-end border-b border-gray-200 pb-4">
          <div>
            <h3 className="font-heading text-2xl font-bold text-[#1b365d]">
              {lang === 'en' ? 'Selected Publications' : '实验室代表性研究'}
            </h3>
          </div>

          <button
            onClick={() => onNavigate('research')}
            className="text-xs font-mono font-bold text-[#1b365d] hover:text-[#236869] flex items-center gap-1.5 transition-colors uppercase"
          >
            <span>{lang === 'en' ? 'ALL RESEARCH' : '查看全部研究'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_RESEARCH.map((paper) => {
            const paperUrl = paper.url || (paper.doi ? (paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`) : '#');
            return (
              <div
                key={paper.id}
                onClick={() => window.open(paperUrl, '_blank')}
                className="bg-white rounded-xl p-6 border border-[#e5e8ee] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Title */}
                  <h4 className="font-heading text-base font-bold text-[#1b365d] group-hover:text-[#236869] transition-colors leading-snug">
                    {lang === 'en' ? paper.titleEn : paper.titleZh}
                  </h4>

                  {/* Abstract */}
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {lang === 'en' ? paper.abstractEn : paper.abstractZh}
                  </p>
                </div>

                {/* Card Footer Links */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-gray-500 font-mono leading-tight break-words flex-1 min-w-0">{paper.journal} ({paper.year})</span>
                  <a
                    href={paperUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1.5 bg-[#1b365d] text-white hover:bg-[#236869] text-xs font-mono font-semibold rounded transition-colors flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0"
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

    </div>
  );
};
