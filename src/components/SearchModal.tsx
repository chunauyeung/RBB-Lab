import React, { useState } from 'react';
import { X, Search, BookOpen, Users, Newspaper, ArrowRight } from 'lucide-react';
import { Language, ResearchPaper, TeamMember, NewsItem } from '../types';
import { ALL_PUBLICATIONS, TEAM_MEMBERS, NEWS_ITEMS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectPaper?: (paper: ResearchPaper) => void;
  onNavigateTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredPapers = query.trim()
    ? ALL_PUBLICATIONS.filter(p => 
        p.titleEn.toLowerCase().includes(query.toLowerCase()) ||
        p.titleZh.includes(query) ||
        p.abstractEn.toLowerCase().includes(query.toLowerCase()) ||
        p.authors.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredTeam = query.trim()
    ? TEAM_MEMBERS.filter(m => 
        m.nameEn.toLowerCase().includes(query.toLowerCase()) ||
        m.nameZh.includes(query) ||
        m.roleEn.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredNews = query.trim()
    ? NEWS_ITEMS.filter(n =>
        n.titleEn.toLowerCase().includes(query.toLowerCase()) ||
        n.titleZh.includes(query) ||
        n.summaryEn.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults = filteredPapers.length > 0 || filteredTeam.length > 0 || filteredNews.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl max-w-xl w-full border border-[#e5e8ee] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="text-gray-400" size={20} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search papers, authors, news, team...' : '搜索论文、作者、新闻、团队成员...'}
            className="w-full text-sm font-sans focus:outline-none placeholder:text-gray-400"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={18} />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          {!query.trim() ? (
            <div className="text-center py-8 text-gray-400">
              <p>{lang === 'en' ? 'Type keywords above to search across RBB Lab' : '请输入关键词开始全站检索'}</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-gray-400">
              <p>{lang === 'en' ? 'No matching results found.' : '未找到相关结果。'}</p>
            </div>
          ) : (
            <>
              {/* Papers */}
              {filteredPapers.length > 0 && (
                <div>
                  <h4 className="font-mono text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <BookOpen size={14} /> Publications ({filteredPapers.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredPapers.map(paper => {
                      const paperUrl = paper.url || (paper.doi ? (paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`) : '#');
                      return (
                        <div
                          key={paper.id}
                          onClick={() => {
                            window.open(paperUrl, '_blank');
                            onClose();
                          }}
                          className="p-2.5 bg-[#f8fafd] hover:bg-[#eef3fb] rounded-lg cursor-pointer border border-[#e5e8ee] transition-colors flex justify-between items-center"
                        >
                          <div>
                            <div className="font-semibold text-[#1b365d]">
                              {lang === 'en' ? paper.titleEn : paper.titleZh}
                            </div>
                            <div className="text-[11px] text-gray-500">{paper.authors} ({paper.year})</div>
                          </div>
                          <ArrowRight size={14} className="text-[#236869]" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {filteredTeam.length > 0 && (
                <div>
                  <h4 className="font-mono text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Users size={14} /> Team Members ({filteredTeam.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredTeam.map(member => (
                      <div
                        key={member.id}
                        onClick={() => {
                          onNavigateTab('team');
                          onClose();
                        }}
                        className="p-2 bg-[#f8fafd] hover:bg-[#eef3fb] rounded-lg cursor-pointer border border-[#e5e8ee] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          {member.image ? (
                            <img src={member.image} alt="" className="w-7 h-7 rounded-full object-cover" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#1b365d] text-white text-xs font-bold flex items-center justify-center font-mono">
                              {member.nameZh ? member.nameZh.slice(0, 1) : member.nameEn.slice(0, 1)}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-[#1b365d]">
                              {lang === 'en' ? member.nameEn : member.nameZh}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {lang === 'en' ? member.roleEn : member.roleZh}
                            </div>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-[#236869]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {filteredNews.length > 0 && (
                <div>
                  <h4 className="font-mono text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Newspaper size={14} /> News Archive ({filteredNews.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredNews.map(news => (
                      <div
                        key={news.id}
                        onClick={() => {
                          onNavigateTab('home');
                          onClose();
                        }}
                        className="p-2 bg-[#f8fafd] hover:bg-[#eef3fb] rounded-lg cursor-pointer border border-[#e5e8ee] transition-colors"
                      >
                        <div className="text-[10px] font-mono text-[#236869]">{news.date}</div>
                        <div className="font-semibold text-[#1b365d]">
                          {lang === 'en' ? news.titleEn : news.titleZh}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
