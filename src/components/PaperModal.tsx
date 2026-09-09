import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, BookOpen, Quote } from 'lucide-react';
import { ResearchPaper, Language } from '../types';

interface PaperModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
  lang: Language;
}

export const PaperModal: React.FC<PaperModalProps> = ({ paper, onClose, lang }) => {
  const [copied, setCopied] = useState(false);

  if (!paper) return null;

  const handleCopyBibtex = () => {
    if (paper.bibtex) {
      navigator.clipboard.writeText(paper.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedCitation = `${paper.authors} (${paper.year}). ${paper.titleEn}. ${paper.journal}, ${paper.volumeIssue}. DOI: ${paper.doi || '10.1016/j.neu'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-[#e5e8ee] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="bg-[#1b365d] text-white px-6 py-4 flex justify-between items-start">
          <div className="pr-4">
            <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#236869] text-white rounded uppercase mb-1">
              {paper.category}
            </span>
            <h3 className="font-heading text-lg font-bold leading-snug">
              {lang === 'en' ? paper.titleEn : paper.titleZh}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Metadata */}
          <div className="bg-[#f8fafd] p-4 rounded-lg border border-[#e5e8ee] space-y-2 text-sm text-[#44474e]">
            <div>
              <strong className="text-[#1b365d] font-semibold">{lang === 'en' ? 'Authors: ' : '作者: '}</strong>
              {paper.authors}
            </div>
            <div>
              <strong className="text-[#1b365d] font-semibold">{lang === 'en' ? 'Journal: ' : '期刊: '}</strong>
              {paper.journal} ({paper.year}), {paper.volumeIssue}
            </div>
            {paper.doi && (
              <div className="font-mono text-xs text-[#236869] flex items-center gap-1">
                <span>DOI: https://doi.org/{paper.doi}</span>
              </div>
            )}
          </div>

          {/* Abstract */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b365d] mb-2 flex items-center gap-1.5">
              <BookOpen size={16} />
              {lang === 'en' ? 'Abstract' : '论文摘要'}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50/80 p-4 rounded-lg border border-gray-100">
              {lang === 'en' ? paper.abstractEn : paper.abstractZh}
            </p>
          </div>

          {/* BibTeX Citation */}
          {paper.bibtex && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b365d] flex items-center gap-1.5">
                  <Quote size={16} />
                  {lang === 'en' ? 'BibTeX Citation' : 'BibTeX 引用格式'}
                </h4>
                <button
                  onClick={handleCopyBibtex}
                  className="text-xs text-[#236869] hover:text-[#1b365d] font-medium flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  {copied ? (lang === 'en' ? 'Copied!' : '已复制') : (lang === 'en' ? 'Copy Citation' : '复制引用')}
                </button>
              </div>
              <pre className="bg-[#181c20] text-emerald-300 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                {paper.bibtex}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex justify-between items-center border-t border-gray-100">
            <span className="text-xs text-gray-400 font-mono">
              RBB Lab Repository # {paper.id}
            </span>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {lang === 'en' ? 'Close' : '关闭'}
              </button>
              <a
                href={paper.url || (paper.doi ? (paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`) : '#')}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#1b365d] text-white text-sm font-medium rounded-md hover:bg-[#2e476f] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ExternalLink size={15} />
                {lang === 'en' ? 'Open Publisher Site' : '前往出版商页面'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
