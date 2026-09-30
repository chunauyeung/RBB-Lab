import React from 'react';
import { Mail, MapPin, Users, Send, Building2 } from 'lucide-react';
import { Language } from '../types';
import { CampusMap } from '../components/CampusMap';

interface ContactPageProps {
  lang: Language;
  onOpenJoinModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onOpenJoinModal }) => {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="border-b border-gray-200 pb-6 space-y-2">
        <span className="text-xs font-mono text-[#236869] uppercase font-bold tracking-wider">
          {lang === 'en' ? 'CONNECT & COLLABORATE' : '学术交流与合作'}
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-[#1b365d]">
          {lang === 'en' ? 'Contact & Join Us' : '联系方式与合作交流'}
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          {lang === 'en'
            ? 'We welcome inquiries regarding research collaboration, academic exchange, and joining the lab.'
            : '欢迎对语言认知神经科学方向感兴趣的学者与同学开展学术交流与合作。'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: 欢迎加入 / 合作交流 */}
          <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1b365d] text-white flex items-center justify-center flex-shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-[#1b365d]">
                  {lang === 'en' ? 'Welcome to Join / Collaboration' : '欢迎加入 / 合作交流'}
                </h3>
                <div className="text-xs text-[#236869] font-medium">
                  {lang === 'en' ? 'Academic Inquiries & Research Exchange' : '跨学科研究与学术交流'}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              {lang === 'en'
                ? 'We welcome researchers, students, and interdisciplinary collaborators interested in cognitive neuroscience of language to get in touch.'
                : '欢迎对语言认知神经科学、心理学、语言学及交叉学科方向感兴趣的学者、同学与合作者联系交流。'}
            </p>

            <div className="pt-1">
              <a
                href="mailto:feigao@fudan.edu.cn?subject=Academic%20Exchange%20Inquiry"
                className="w-full py-3 bg-[#1b365d] text-white text-xs font-semibold rounded-lg hover:bg-[#2e476f] transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Mail size={16} />
                <span>Email: feigao@fudan.edu.cn</span>
              </a>
            </div>
          </div>

          {/* Card 2: Physical Address */}
          <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-3">
            <h3 className="font-heading text-sm font-bold text-[#1b365d] flex items-center gap-2">
              <Building2 size={18} className="text-[#236869]" />
              <span>{lang === 'en' ? 'Physical Address' : '实验室物理地址'}</span>
            </h3>

            <div className="text-xs text-gray-700 space-y-2 font-sans leading-relaxed">
              <div className="p-3 bg-[#f8fafd] rounded-lg border border-[#e5e8ee]">
                <p className="font-bold text-[#1b365d] text-sm mb-1">
                  {lang === 'en' ? 'Institute of Modern Languages and Linguistics' : '复旦大学邯郸校区现代语言学研究院'}
                </p>
                <p className="font-semibold text-[#236869]">
                  {lang === 'en' ? 'Room 244, Environmental Science Building No. 2' : '环境科学楼2号楼244室'}
                </p>
              </div>

              <div className="text-gray-500 text-[11px] flex items-start gap-1.5 pt-1">
                <MapPin size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <span>
                  {lang === 'en'
                    ? '220 Handan Road, Yangpu District, Shanghai, China (Handan Campus)'
                    : '中国上海市杨浦区邯郸路220号 (复旦大学邯郸校区本部)'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Campus Map */}
        <div className="lg:col-span-7 space-y-3">
          <div className="hidden">
            <div className="text-xs font-mono font-bold text-[#1b365d] uppercase tracking-wider">
              {lang === 'en' ? 'Campus Location' : '实验室地理位置'}
            </div>
            <span className="text-[11px] text-[#236869] font-mono">
              {lang === 'en' ? 'Building 2, Rm 244' : '环境科学楼2号楼 244室'}
            </span>
          </div>
          <CampusMap lang={lang} />
        </div>

      </div>

    </div>
  );
};

