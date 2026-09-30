import React from 'react';
import { Mail, GraduationCap } from 'lucide-react';
import { Language } from '../types';
import { TEAM_MEMBERS } from '../data/mockData';

interface TeamPageProps {
  lang: Language;
  onOpenJoinModal: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ lang }) => {
  const pi = TEAM_MEMBERS.find((member) => member.category === 'pi');
  const graduates = TEAM_MEMBERS.filter((member) => member.category === 'graduate');
  const undergraduates = TEAM_MEMBERS.filter((member) => member.category === 'undergraduate');
  const alumni = TEAM_MEMBERS.filter((member) => member.category === 'alumni');

  const renderMemberAvatar = (image: string | undefined, sizeClasses: string) => (
    <div className={`${sizeClasses} overflow-hidden border border-gray-200 shadow-2xs shrink-0 bg-slate-100`}>
      <img src={image || '/images/team/ouyang-jun.jpg'} alt="Team member" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
    </div>
  );

  const renderRole = (roleEn: string, roleZh: string) => (
    <span className="px-3 py-1 bg-[#f4f7f6] text-[#236869] text-xs sm:text-sm font-mono font-semibold rounded-md border border-[#dce3de] flex items-center gap-1.5">
      <GraduationCap size={15} />{lang === 'en' ? roleEn : roleZh}
    </span>
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="border-b border-gray-200 pb-6 space-y-2">
        <span className="text-xs font-mono text-[#236869] uppercase font-bold tracking-wider">{lang === 'en' ? 'LAB MEMBERS & ALUMNI' : '实验室成员与历届校友'}</span>
        <h1 className="font-heading text-3xl font-extrabold text-[#1b365d]">{lang === 'en' ? 'Our Team' : '团队成员'}</h1>
      </div>

      {pi && (
        <section className="bg-white rounded-xl border border-[#e5e8ee] shadow-2xs p-6 lg:p-8 space-y-6">
          <div className="text-[23px] font-heading font-bold text-[#1b365d] uppercase tracking-wider">{lang === 'en' ? 'PRINCIPAL INVESTIGATOR' : '实验室负责人 (PI)'}</div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center">{renderMemberAvatar(pi.image, 'w-52 h-52 sm:w-64 sm:h-64 rounded-2xl')}</div>
            <div className="lg:col-span-8 space-y-4">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1b365d]">{lang === 'en' ? pi.nameEn : pi.nameZh}</h2>
                <div className="text-sm font-mono text-[#236869] font-semibold mt-1">{lang === 'en' ? pi.roleEn : pi.roleZh}</div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">{lang === 'en' ? pi.bioEn : pi.bioZh}</p>
              {pi.interestsEn && <div className="space-y-1.5 pt-2"><div className="text-xs sm:text-sm font-mono font-bold text-[#1b365d] uppercase">{lang === 'en' ? 'Research Interests' : '研究方向'}</div><ul className="text-xs sm:text-sm text-gray-600 list-disc pl-5 space-y-1">{(lang === 'en' ? pi.interestsEn : pi.interestsZh)?.map((item, index) => <li key={index}>{item}</li>)}</ul></div>}
              {pi.email && <div className="pt-2 text-xs sm:text-sm font-mono text-[#1b365d] flex items-center gap-2"><Mail size={16} className="text-[#236869]" /><span>Email: {pi.email}</span></div>}
            </div>
          </div>
        </section>
      )}

      <section className="space-y-6">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b365d] border-l-4 border-[#1b365d] pl-3">{lang === 'en' ? 'Graduate Students' : '研究生队伍'}</h2>
        <div className="space-y-4 max-w-5xl mx-auto">{graduates.map((member) => <div key={member.id} className="bg-white rounded-xl p-5 sm:p-6 border border-[#e5e8ee] shadow-2xs hover:border-[#1b365d] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"><div className="flex items-center gap-5 min-w-0 flex-1">{renderMemberAvatar(member.image, 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl')}<div className="space-y-2 min-w-0 flex-1"><div className="flex items-center gap-3 flex-wrap"><h3 className="font-heading text-xl font-bold text-[#1b365d]">{lang === 'en' ? member.nameEn : member.nameZh}</h3>{renderRole(member.roleEn, member.roleZh)}</div>{member.interestsEn && <div className="text-xs sm:text-sm text-gray-600 pt-0.5"><span className="font-semibold text-gray-700">{lang === 'en' ? 'Focus Area: ' : '研究重点：'}</span>{(lang === 'en' ? member.interestsEn : member.interestsZh)?.join(' · ')}</div>}</div></div></div>)}</div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b365d] border-l-4 border-[#236869] pl-3">{lang === 'en' ? 'Undergraduate Students' : '本科生队伍'}</h2>
        <div className="space-y-4 max-w-5xl mx-auto">{undergraduates.map((member) => <div key={member.id} className="bg-white rounded-xl p-5 sm:p-6 border border-[#e5e8ee] shadow-2xs hover:border-[#236869] transition-all flex items-center gap-5">{renderMemberAvatar(member.image, 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl')}<div className="space-y-1.5 min-w-0 flex-1"><div className="flex items-center gap-3 flex-wrap"><h3 className="font-heading text-xl font-bold text-[#1b365d]">{lang === 'en' ? member.nameEn : member.nameZh}</h3>{renderRole(member.roleEn, member.roleZh)}</div></div></div>)}</div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b365d] border-l-4 border-gray-300 pl-3">{lang === 'en' ? 'Alumni' : '历届成员'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">{alumni.map((member) => <div key={member.id} className="bg-white rounded-xl p-5 sm:p-6 border border-[#e5e8ee] shadow-2xs hover:border-[#1b365d] transition-all flex items-center gap-5">{renderMemberAvatar(member.image, 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl')}<div className="space-y-2 min-w-0 flex-1"><h3 className="font-heading text-lg sm:text-xl font-bold text-[#1b365d] truncate">{lang === 'en' ? member.nameEn : member.nameZh}</h3>{renderRole(member.roleEn, member.roleZh)}{(member.currentRoleEn || member.currentRoleZh) && <div className="text-xs sm:text-sm font-medium text-gray-600 truncate">{lang === 'en' ? member.currentRoleEn : member.currentRoleZh}</div>}</div></div>)}</div>
      </section>
    </div>
  );
};
