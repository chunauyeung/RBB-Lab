import React, { useState } from 'react';
import { Mail, GraduationCap, Award, ExternalLink, User, Upload, Camera, RotateCcw, Crop } from 'lucide-react';
import { Language } from '../types';
import { TEAM_MEMBERS } from '../data/mockData';
import { ImageCropModal } from '../components/ImageCropModal';

interface TeamPageProps {
  lang: Language;
  onOpenJoinModal: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ lang, onOpenJoinModal }) => {
  const pi = TEAM_MEMBERS.find(m => m.category === 'pi');
  const graduates = TEAM_MEMBERS.filter(m => m.category === 'graduate');
  const undergraduates = TEAM_MEMBERS.filter(m => m.category === 'undergraduate');
  const alumni = TEAM_MEMBERS.filter(m => m.category === 'alumni');

  // Crop modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [activeCropMemberId, setActiveCropMemberId] = useState<string | null>(null);

  // Manage avatars for all team members by ID
  const [memberAvatars, setMemberAvatars] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    const preloaded = typeof window !== 'undefined' ? ((window as any).__PRELOADED_FEIGAO_DATA__ || {}) : {};
    TEAM_MEMBERS.forEach(m => {
      const pre = preloaded[`feigao_avatar_${m.id}`];
      if (pre) {
        initial[m.id] = pre;
      } else {
        try {
          const saved = localStorage.getItem(`feigao_avatar_${m.id}`);
          if (saved) initial[m.id] = saved;
        } catch (e) {
          // ignore storage error
        }
      }
    });
    // Legacy PI fallback if present
    const legacyPi = preloaded['feigao_custom_avatar'] || (() => {
      try {
        return localStorage.getItem('feigao_custom_avatar');
      } catch (e) {
        return null;
      }
    })();
    if (legacyPi && !initial['gao-fei']) {
      initial['gao-fei'] = legacyPi;
    }
    return initial;
  });

  // When a photo file is picked, open the crop & framing modal instead of uploading directly
  const handleMemberAvatarChange = (memberId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setActiveCropMemberId(memberId);
          setCropImageSrc(result);
          setCropModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
    // Clear input value so selecting the same file again works
    e.target.value = '';
  };

  // Called when user finishes cropping in the modal
  const handleCropComplete = (croppedBase64: string) => {
    if (!activeCropMemberId) return;
    setMemberAvatars(prev => ({ ...prev, [activeCropMemberId]: croppedBase64 }));
    try {
      localStorage.setItem(`feigao_avatar_${activeCropMemberId}`, croppedBase64);
    } catch (e) {
      console.error(e);
    }
    setCropModalOpen(false);
    setCropImageSrc(null);
    setActiveCropMemberId(null);
  };

  const handleResetMemberAvatar = (memberId: string) => {
    setMemberAvatars(prev => {
      const next = { ...prev };
      delete next[memberId];
      return next;
    });
    localStorage.removeItem(`feigao_avatar_${memberId}`);
  };

  // Helper avatar upload UI renderer
  const renderAvatarUpload = (memberId: string, defaultImage?: string, sizeClasses = "w-16 h-16 rounded-xl") => {
    const currentAvatar = memberAvatars[memberId] || defaultImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80';
    const isCustom = Boolean(memberAvatars[memberId]);

    return (
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div className={`relative ${sizeClasses} overflow-hidden border border-gray-200 shadow-2xs group cursor-pointer`}>
          <img
            src={currentAvatar}
            alt="Member Avatar"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer text-[10px] font-semibold p-1 text-center leading-tight">
            <Crop size={16} className="mb-0.5 text-amber-300" />
            <span>{lang === 'en' ? 'Crop & Upload' : '框选更换照片'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleMemberAvatarChange(memberId, e)}
            />
          </label>
        </div>

        <div className="flex items-center gap-1">
          <label className="px-1.5 py-0.5 bg-[#f1f4f9] hover:bg-[#e2e8f3] text-[#1b365d] text-[10px] font-semibold rounded border border-[#cbe3e4] cursor-pointer transition-colors flex items-center gap-0.5">
            <Upload size={10} />
            <span>{lang === 'en' ? 'Crop & Upload' : '框选上传'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleMemberAvatarChange(memberId, e)}
            />
          </label>
          {isCustom && (
            <button
              onClick={() => handleResetMemberAvatar(memberId)}
              className="p-0.5 text-gray-400 hover:text-red-600 transition-colors rounded cursor-pointer"
              title={lang === 'en' ? 'Reset Avatar' : '恢复默认'}
            >
              <RotateCcw size={11} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const getActiveMemberName = () => {
    if (!activeCropMemberId) return undefined;
    const member = TEAM_MEMBERS.find(m => m.id === activeCropMemberId);
    if (!member) return undefined;
    return lang === 'en' ? member.nameEn : member.nameZh;
  };

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="border-b border-gray-200 pb-6 space-y-2">
        <span className="text-xs font-mono text-[#236869] uppercase font-bold tracking-wider">
          {lang === 'en' ? 'LAB MEMBERS & ALUMNI' : '实验室成员与历届校友'}
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-[#1b365d]">
          {lang === 'en' ? 'Our Team' : '团队成员'}
        </h1>
      </div>

      {/* 1. Principal Investigator */}
      {pi && (
        <section className="bg-white rounded-xl border border-[#e5e8ee] shadow-2xs p-6 lg:p-8 space-y-6">
          <div className="text-xs font-mono font-bold text-[#236869] uppercase tracking-wider">
            {lang === 'en' ? 'PRINCIPAL INVESTIGATOR' : '实验室负责人 (PI)'}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* PI Photo with custom upload option */}
            <div className="lg:col-span-4 flex flex-col items-center space-y-3">
              {renderAvatarUpload(pi.id, pi.image, "w-52 h-52 sm:w-64 sm:h-64 rounded-2xl")}
            </div>

            {/* PI Bio & Details */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1b365d]">
                  {lang === 'en' ? pi.nameEn : pi.nameZh}
                </h2>
                <div className="text-sm font-mono text-[#236869] font-semibold mt-1">
                  {lang === 'en' ? pi.roleEn : pi.roleZh}
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                {lang === 'en' ? pi.bioEn : pi.bioZh}
              </p>

              {/* Research Interests */}
              {pi.interestsEn && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs sm:text-sm font-mono font-bold text-[#1b365d] uppercase">
                    {lang === 'en' ? 'Research Interests / 研究方向:' : '研究方向:'}
                  </div>
                  <ul className="text-xs sm:text-sm text-gray-600 list-disc pl-5 space-y-1">
                    {(lang === 'en' ? pi.interestsEn : pi.interestsZh)?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pi.email && (
                <div className="pt-2 text-xs sm:text-sm font-mono text-[#1b365d] flex items-center gap-2">
                  <Mail size={16} className="text-[#236869]" />
                  <span>Email: {pi.email}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2. Graduate Students */}
      <section className="space-y-6">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b365d] border-l-4 border-[#1b365d] pl-3">
          {lang === 'en' ? 'Graduate Students' : '研究生队伍'}
        </h2>

        <div className="space-y-4 max-w-5xl mx-auto">
          {graduates.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-5 sm:p-6 border border-[#e5e8ee] shadow-2xs hover:border-[#1b365d] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-5 min-w-0 flex-1">
                {renderAvatarUpload(member.id, member.image, "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shrink-0")}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-heading text-xl font-bold text-[#1b365d]">
                      {lang === 'en' ? member.nameEn : member.nameZh}
                    </h3>
                    <span className="px-3 py-1 bg-[#f4f7f6] text-[#236869] text-xs sm:text-sm font-mono font-semibold rounded-md border border-[#dce3de]">
                      {lang === 'en' ? member.roleEn : member.roleZh}
                    </span>
                  </div>

                  {member.interestsEn && (
                    <div className="text-xs sm:text-sm text-gray-600 pt-0.5 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-gray-700">{lang === 'en' ? 'Focus Area:' : '研究重点:'}</span>
                      <span>{(lang === 'en' ? member.interestsEn : member.interestsZh)?.join(' • ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Undergraduate Students */}
      <section className="space-y-6">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b365d] border-l-4 border-[#236869] pl-3">
          {lang === 'en' ? 'Undergraduate Students' : '本科生队伍'}
        </h2>

        <div className="space-y-4 max-w-5xl mx-auto">
          {undergraduates.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-5 sm:p-6 border border-[#e5e8ee] shadow-2xs hover:border-[#236869] transition-all flex items-center gap-5"
            >
              {renderAvatarUpload(member.id, member.image, "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shrink-0")}
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-heading text-xl font-bold text-[#1b365d]">
                    {lang === 'en' ? member.nameEn : member.nameZh}
                  </h3>
                  <span className="px-3 py-1 bg-[#f4f7f6] text-[#236869] text-xs sm:text-sm font-mono font-semibold rounded-md border border-[#dce3de] flex items-center gap-1.5">
                    <GraduationCap size={15} className="shrink-0" />
                    <span>{lang === 'en' ? member.roleEn : member.roleZh}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Alumni */}
      <section className="space-y-6">
        <h2 className="font-heading text-xl font-bold text-[#1b365d] border-l-4 border-[#1b365d] pl-3">
          {lang === 'en' ? 'Alumni' : '历届成员 (Alumni)'}
        </h2>

        <div className="space-y-4 max-w-5xl mx-auto">
          {alumni.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-5 sm:p-6 border border-[#e5e8ee] shadow-2xs hover:border-[#236869] transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-heading text-lg font-bold text-[#1b365d]">
                    {lang === 'en' ? member.nameEn : member.nameZh}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-[#f4f7f6] text-gray-600 text-xs font-mono font-semibold rounded-md border border-[#dce3de]">
                    {lang === 'en' ? member.roleEn : member.roleZh}
                  </span>
                </div>
                {(member.currentRoleEn || member.currentRoleZh) && (
                  <div className="text-xs font-semibold text-[#236869] pt-1">
                    {lang === 'en' ? member.currentRoleEn : member.currentRoleZh}
                  </div>
                )}
              </div>
              <span className="px-3 py-1 bg-[#f4f7f6] text-[#1b365d] text-xs font-mono rounded-md border border-[#dce3de] shrink-0 font-medium">
                {lang === 'en' ? 'Alumni' : '历届成员'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Image Crop & Framing Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={cropImageSrc}
        onClose={() => {
          setCropModalOpen(false);
          setCropImageSrc(null);
          setActiveCropMemberId(null);
        }}
        onCropComplete={handleCropComplete}
        lang={lang}
        memberName={getActiveMemberName()}
      />

    </div>
  );
};
