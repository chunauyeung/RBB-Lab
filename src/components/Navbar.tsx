import React, { useState } from 'react';
import { Language } from '../types';
import { Search, Menu, X, Brain, Users, Database, Mail, Home } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenDeployGuide?: () => void;
  onSearchOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onSearchOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelZh: '首页', icon: Home },
    { id: 'research', labelEn: 'Research', labelZh: '研究领域', icon: Brain },
    { id: 'team', labelEn: 'Team', labelZh: '团队成员', icon: Users },
    { id: 'dataset', labelEn: 'Dataset', labelZh: 'FED数据集', icon: Database },
    { id: 'contact', labelEn: 'Contact', labelZh: '联系方式', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e8ee] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Lab Icon Logo */}
            <div className="w-10 h-10 rounded-lg bg-[#1b365d] text-white flex items-center justify-center font-heading font-bold text-lg shadow-sm group-hover:bg-[#236869] transition-colors">
              <Brain size={24} className="text-[#d6e3ff]" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-lg font-extrabold text-[#1b365d] tracking-tight leading-tight group-hover:text-[#236869] transition-colors">
                Reading, Bilingualism, and Brain Lab
              </span>
              <span className="text-xs font-sans text-gray-500 font-medium tracking-wide">
                阅读、双语与大脑实验室
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1b365d] text-white shadow-2xs font-semibold'
                      : 'text-gray-700 hover:text-[#1b365d] hover:bg-[#f1f4f9]'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#87a0cd]' : 'text-gray-400'} />
                  <span>{lang === 'en' ? item.labelEn : item.labelZh}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-gray-600 hover:text-[#1b365d] hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              title={lang === 'en' ? 'Search publications & news' : '搜索论文与动态'}
            >
              <Search size={19} />
            </button>

            {/* Language Switch Toggle */}
            <div className="flex items-center bg-[#f1f4f9] p-0.5 rounded-lg border border-[#e5e8ee]">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  lang === 'en'
                    ? 'bg-white text-[#1b365d] shadow-2xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('zh')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  lang === 'zh'
                    ? 'bg-white text-[#1b365d] shadow-2xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                中
              </button>
            </div>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="px-2.5 py-1 text-xs font-bold bg-[#f1f4f9] rounded-md border border-[#e5e8ee] text-[#1b365d]"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 ${
                  isActive
                    ? 'bg-[#1b365d] text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span>{lang === 'en' ? item.labelEn : item.labelZh}</span>
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={onSearchOpen}
              className="w-full py-2 bg-gray-100 text-gray-800 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search size={15} />
              {lang === 'en' ? 'Search Site' : '搜索内容'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
