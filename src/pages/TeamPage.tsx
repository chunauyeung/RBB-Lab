import React, { useState, useRef, useEffect } from 'react';
import { Mail, GraduationCap, Award, ExternalLink, User, Camera, ShieldCheck, Lock, X, Check, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TEAM_MEMBERS } from '../data/mockData';
import { ImageCropModal } from '../components/ImageCropModal';
import { TeamPhotoStudioModal } from '../components/TeamPhotoStudioModal';

interface TeamPageProps {
  lang: Language;
  onOpenJoinModal: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ lang }) => {
  const pi = TEAM_MEMBERS.find(m => m.category === 'pi');
  const graduates = TEAM_MEMBERS.filter(m => m.category === 'graduate');
  const undergraduates = TEAM_MEMBERS.filter(m => m.category === 'undergraduate');
  const alumni = TEAM_MEMBERS.filter(m => m.category === 'alumni');

  // Admin Studio visibility mode: Default false for normal visitors
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('admin') || urlParams.has('edit') || urlParams.has('studio')) return true;
        if (window.location.hash.includes('admin')) return true;
        return localStorage.getItem('feigao_admin_mode') === 'true';
      }
    } catch (e) {}
    return false;
  });

  // Admin Photo Studio modal open state
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Keyboard shortcut listener: Press Ctrl + Shift + A (or Cmd + Shift + A) to toggle Admin Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminMode(prev => {
          const next = !prev;
          try {
            if (next) localStorage.setItem('feigao_admin_mode', 'true');
            else localStorage.removeItem('feigao_admin_mode');
          } catch (err) {}
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Crop modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [activeCropMemberId, setActiveCropMemberId] = useState<string | null>(null);

  // Hidden file picker for admin studio
  const filePickerRef = useRef<HTMLInputElement | null>(null);

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

  // Triggered from Studio when user clicks "选择并框选"
  const handleTriggerCrop = (memberId: string) => {
    setActiveCropMemberId(memberId);
    filePickerRef.current?.click();
  };

  const handleStudioFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
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
  };

  const handleResetMemberAvatar = (memberId: string) => {
    setMemberAvatars(prev => {
      const next = { ...prev };
      delete next[memberId];
      return next;
    });
    try {
      localStorage.removeItem(`feigao_avatar_${memberId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateAvatarDirect = (memberId: string, base64: string) => {
    setMemberAvatars(prev => ({ ...prev, [memberId]: base64 }));
    try {
      localStorage.setItem(`feigao_avatar_${memberId}`, base64);
    } catch (e) {
      console.error(e);
    }
  };

  const [isQuickSaving, setIsQuickSaving] = useState(false);
  const [quickSaveMsg, setQuickSaveMsg] = useState<string | null>(null);

  const handleQuickSaveToProject = async () => {
    setIsQuickSaving(true);
    setQuickSaveMsg(null);
    try {
      const res = await fetch('/api/save-team-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberAvatars)
      });
      const data = await res.json();
      if (data.success) {
        setQuickSaveMsg(
          lang === 'en'
            ? `Successfully saved ${data.saved.length} photos into public/images/team/*.jpg! Now push to GitHub and deploy.`
            : `🎉 已成功将 ${data.saved.length} 张照片永久写入项目的 public/images/team/ 物理代码文件中！现在 push 到 GitHub 部署，所有外部访客都将永久看到这些照片！`
        );
      } else {
        alert(data.error || '保存失败');
      }
    } catch (e) {
      console.error(e);
      alert('保存失败，请重试');
    } finally {
      setIsQuickSaving(false);
    }
  };

  // Pure clean avatar presentation for regular visitors (Zero upload UI, zero hover masks)
  const renderMemberAvatar = (memberId: string, defaultImage?: string, sizeClasses = "w-16 h-16 rounded-xl") => {
    const currentAvatar = memberAvatars[memberId] || defaultImage || '/images/team/ouyang-jun.jpg';

    return (
      <div className={`${sizeClasses} overflow-hidden border border-gray-200 shadow-2xs shrink-0 bg-slate-100`}>
        <img
          src={currentAvatar}
          alt="Member Avatar"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  };

  const getActiveMemberName = () => {
    if (!activeCropMemberId) return undefined;
    const member = TEAM_MEMBERS.find(m => m.id === activeCropMemberId);
    if (!member) return undefined;
    return lang === 'en' ? member.nameEn : member.nameZh;
  };

  const hasCustomAvatars = Object.keys(memberAvatars).length > 0;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Hidden file input for Admin Studio */}
      <input
        ref={filePickerRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleStudioFileSelected}
      />

      {/* Header Banner */}
      <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#236869] uppercase font-bold tracking-wider">
            {lang === 'en' ? 'LAB MEMBERS & ALUMNI' : '实验室成员与历届校友'}
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-[#1b365d]">
            {lang === 'en' ? 'Our Team' : '团队成员'}
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsStudioOpen(true)}
            className="px-3 py-1.5 bg-[#1b365d] hover:bg-[#236869] text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title={lang === 'en' ? 'Open Photo Studio to crop and center photos' : '打开团队照片管理后台，进行人脸居中与框选'}
          >
            <Camera size={14} className="text-amber-300" />
            <span>{lang === 'en' ? 'Photo Studio' : '照片管理后台'}</span>
          </button>

          {/* Admin Mode Badge if active */}
          {isAdminMode && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-amber-800 text-xs font-mono">
              <Lock size={11} className="text-amber-600" />
              <span>{lang === 'en' ? 'Admin' : '管理员'}</span>
              <button
                type="button"
                onClick={() => {
                  setIsAdminMode(false);
                  try {
                    localStorage.removeItem('feigao_admin_mode');
                  } catch (e) {}
                }}
                className="ml-1 text-gray-400 hover:text-red-600 cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Instant Action Banner: Shows when there are custom preview photos ready to be saved permanently */}
      {hasCustomAvatars && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950 shadow-2xs animate-in fade-in">
          <div className="flex items-start sm:items-center gap-2.5">
            <Sparkles size={18} className="text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="space-y-0.5">
              <p className="font-bold text-emerald-900">
                {lang === 'en'
                  ? 'Preview photos ready to be permanently deployed:'
                  : '检测到当前 Preview 中有自选/新裁切的照片（如阎承麟）：'}
              </p>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                {lang === 'en'
                  ? 'Click "Save Permanently to Source" to write them directly into public/images/team/*.jpg files, so anyone visiting after your GitHub push sees them!'
                  : '点击右侧按钮，系统会自动将图片永久保存为项目 public/images/team/*.jpg 文件。随后 push 到 GitHub 部署，所有人都能看到这套照片！'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickSaveToProject}
            disabled={isQuickSaving}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center gap-2 cursor-pointer shadow-xs transition-colors whitespace-nowrap justify-center shrink-0 self-stretch sm:self-auto"
          >
            <Sparkles size={14} className="text-emerald-200" />
            <span>{isQuickSaving ? '正在固化到源码...' : '一键永久固化到项目代码 (Push 准备)'}</span>
          </button>
        </div>
      )}

      {/* Success alert */}
      {quickSaveMsg && (
        <div className="bg-white border-2 border-emerald-500 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-800 font-semibold shadow-xs animate-in fade-in">
          <Check size={18} className="text-emerald-600 shrink-0" />
          <span>{quickSaveMsg}</span>
        </div>
      )}

      {/* 1. Principal Investigator */}
      {pi && (
        <section className="bg-white rounded-xl border border-[#e5e8ee] shadow-2xs p-6 lg:p-8 space-y-6">
          <div className="text-[23px] font-heading font-bold text-[#1b365d] uppercase tracking-wider">
            {lang === 'en' ? 'PRINCIPAL INVESTIGATOR' : '实验室负责人 (PI)'}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* PI Photo - Clean Academic Style */}
            <div className="lg:col-span-4 flex flex-col items-center">
              {renderMemberAvatar(pi.id, pi.image, "w-52 h-52 sm:w-64 sm:h-64 rounded-2xl")}
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
                {renderMemberAvatar(member.id, member.image, "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl")}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-heading text-xl font-bold text-[#1b365d]">
                      {lang === 'en' ? member.nameEn : member.nameZh}
                    </h3>
                    <span className="px-3 py-1 bg-[#f4f7f6] text-[#236869] text-xs sm:text-sm font-mono font-semibold rounded-md border border-[#dce3de] flex items-center gap-1.5">
                      <GraduationCap size={15} className="shrink-0" />
                      <span>{lang === 'en' ? member.roleEn : member.roleZh}</span>
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
              {renderMemberAvatar(member.id, member.image, "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl")}
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
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b365d] border-l-4 border-gray-300 pl-3">
          {lang === 'en' ? 'Alumni' : '历届成员'}
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

      {/* Admin Photo Studio Modal */}
      <TeamPhotoStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        lang={lang}
        memberAvatars={memberAvatars}
        onTriggerCrop={handleTriggerCrop}
        onResetAvatar={handleResetMemberAvatar}
        onUpdateAvatarDirect={handleUpdateAvatarDirect}
      />

      {/* Interactive Crop & Framing Modal */}
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
