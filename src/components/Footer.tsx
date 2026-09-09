import React from 'react';
import { Language } from '../types';
import { Brain, Mail, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: Language;
  setCurrentTab: (tab: string) => void;
  onOpenDeployGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setCurrentTab, onOpenDeployGuide }) => {
  return (
    <footer className="bg-[#181c20] text-gray-300 pt-12 pb-8 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded bg-[#1b365d] flex items-center justify-center">
                <Brain size={20} className="text-[#87a0cd]" />
              </div>
              <span className="font-heading font-bold text-base">RBB Lab</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {lang === 'en'
                ? 'Reading, Bilingualism, and Brain Lab explores the cognitive and neural mechanisms of language processing, bilingual plasticity, and literacy development.'
                : '阅读、双语与大脑实验室致力于探索语言加工、双语神经可塑性与读写能力发展的认知脑机制。'}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-gray-200">
              {lang === 'en' ? 'Quick Navigation' : '快速导航'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Home' : '首页'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('research')} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Research & Publications' : '研究领域与精选论文'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('team')} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Team Profiles' : '团队成员'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('dataset')} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'FED Open Dataset' : 'FED 开放数据集'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Contact & Join Us' : '联系方式与合作交流'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Networks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-gray-200">
              {lang === 'en' ? 'Open Science & Affiliations' : '开放科学与学术链接'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                <ExternalLink size={12} /> OSF Repository (FED Dataset)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                <ExternalLink size={12} /> Society for Neurobiology of Language
              </li>
              <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                <ExternalLink size={12} /> Cognitive Neuroscience Center
              </li>
            </ul>
          </div>

          {/* Col 4: Address */}
          <div className="space-y-3 text-xs text-gray-400">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-gray-200">
              {lang === 'en' ? 'Lab Office Location' : '实验室办公地址'}
            </h4>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="text-[#87a0cd] flex-shrink-0 mt-0.5" />
              <span>
                {lang === 'en'
                  ? 'Room 244, Environmental Science Bldg 2, Institute of Modern Languages and Linguistics, Fudan University Handan Campus'
                  : '复旦大学邯郸校区现代语言学研究院 环境科学楼2号楼 244室'}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-[#87a0cd] flex-shrink-0" />
              <span>feigao@fudan.edu.cn</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div>
            © {new Date().getFullYear()} Reading, Bilingualism, and Brain Lab (阅读、双语与大脑实验室). All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-gray-300 cursor-pointer">{lang === 'en' ? 'Privacy Policy' : '隐私政策'}</span>
            <span className="hover:text-gray-300 cursor-pointer">{lang === 'en' ? 'Terms of Service' : '使用条款'}</span>
            <span className="hover:text-gray-300 cursor-pointer">{lang === 'en' ? 'Accessibility' : '无障碍声明'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
