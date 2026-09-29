import React, { useState } from 'react';
import {
  X,
  Camera,
  Crop,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  FileCode,
  ShieldCheck,
  Info,
  User,
  ExternalLink
} from 'lucide-react';
import { Language, TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/mockData';

interface TeamPhotoStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  memberAvatars: Record<string, string>;
  onTriggerCrop: (memberId: string) => void;
  onResetAvatar: (memberId: string) => void;
  onUpdateAvatarDirect: (memberId: string, base64: string) => void;
}

export const TeamPhotoStudioModal: React.FC<TeamPhotoStudioModalProps> = ({
  isOpen,
  onClose,
  lang,
  memberAvatars,
  onTriggerCrop,
  onResetAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'deploy'>('manage');
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [isSavingToProject, setIsSavingToProject] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveToProject = async () => {
    setIsSavingToProject(true);
    setSaveSuccessMsg(null);
    try {
      const res = await fetch('/api/save-team-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberAvatars)
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccessMsg(
          lang === 'en'
            ? `Successfully saved ${data.saved.length} photos directly to public/images/team/*.jpg! They are now permanent static files ready for GitHub push.`
            : `🎉 成功将 ${data.saved.length} 张照片永久固化到 public/images/team/*.jpg！现在直接 push 到 GitHub 部署，所有访客都会看到这一模一样的照片！`
        );
      } else {
        alert(data.error || 'Failed to save');
      }
    } catch (e) {
      console.error(e);
      alert('保存失败，请重试');
    } finally {
      setIsSavingToProject(false);
    }
  };

  // Helper to trigger download of a single image
  const handleDownloadSingle = (member: TeamMember) => {
    const avatar = memberAvatars[member.id] || member.image || '';
    if (!avatar) return;

    const link = document.createElement('a');
    link.href = avatar;
    link.download = `${member.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccessId(member.id);
    setTimeout(() => setDownloadSuccessId(null), 2000);
  };

  // Generate code snippet to paste into mockData.ts
  const generateExportCode = () => {
    const customizedMembers = TEAM_MEMBERS.map(m => {
      const customImg = memberAvatars[m.id];
      if (customImg) {
        return {
          ...m,
          image: customImg
        };
      }
      return m;
    });

    return `// 将以下数据替换 src/data/mockData.ts 中的 TEAM_MEMBERS 数组
export const TEAM_MEMBERS: TeamMember[] = ${JSON.stringify(customizedMembers, null, 2)};`;
  };

  const handleCopyCode = () => {
    const code = generateExportCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#1b365d] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Camera size={18} className="text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base sm:text-lg">
                  {lang === 'en' ? 'Lab Team Photo Studio & Admin' : '团队成员照片管理后台'}
                </h2>
                <span className="px-2 py-0.5 bg-amber-400 text-[#1b365d] text-[10px] font-bold rounded-full">
                  {lang === 'en' ? 'Admin Only' : '仅管理员可见'}
                </span>
              </div>
              <p className="text-xs text-blue-100">
                {lang === 'en'
                  ? 'Official website visitors will see 100% clean photos with NO upload buttons.'
                  : '正式上线对外展示时，普通访客只看到干净纯粹的高清头像，绝无任何上传/修改入口。'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-50 border-b border-gray-200 px-5 flex items-center justify-between shrink-0">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('manage')}
              className={`py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === 'manage'
                  ? 'border-[#1b365d] text-[#1b365d]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Crop size={15} />
              <span>{lang === 'en' ? '1. Crop & Manage Photos' : '1. 成员照片框选与预览'}</span>
            </button>

            <button
              onClick={() => setActiveTab('deploy')}
              className={`py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === 'deploy'
                  ? 'border-[#1b365d] text-[#1b365d]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <FileCode size={15} />
              <span>{lang === 'en' ? '2. How to Put Online (Deploy)' : '2. 怎么放上去（上线与部署）'}</span>
            </button>
          </div>

          <div className="text-[11px] text-gray-500 hidden sm:flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>{lang === 'en' ? 'Visitor View is Safe & Clean' : '访客端零冗余入口'}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'manage' ? (
            <div className="space-y-6">
              
              {/* Information Notice */}
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#0369a1]">
                <div className="flex items-start gap-3">
                  <Info size={18} className="shrink-0 text-[#0284c7] mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {lang === 'en'
                        ? 'Interactive Crop & Permanent Deployment'
                        : '照片居中框选与永久写入项目'}
                    </p>
                    <p className="text-[#0c4a6e] leading-relaxed">
                      {lang === 'en'
                        ? 'Click "Select & Crop" to adjust centering and zoom. When satisfied, click the button on the right to permanently write all photos to public/images/team/ so they persist when pushed to GitHub!'
                        : '点击任意成员的「选择并框选」，拖动居中后保存。调整满意后，点击右侧按钮即可一键永久写入项目的 public/ 目录，push 到 GitHub 部署后所有人均可见！'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveToProject}
                  disabled={isSavingToProject || Object.keys(memberAvatars).length === 0}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all whitespace-nowrap shrink-0 self-stretch sm:self-auto justify-center"
                >
                  <Sparkles size={14} className="text-emerald-200" />
                  <span>{isSavingToProject ? '正在永久写入...' : '一键永久固化到源码 (Push 准备)'}</span>
                </button>
              </div>

              {/* Success Notification */}
              {saveSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-800 animate-in fade-in">
                  <Check size={18} className="text-emerald-600 shrink-0" />
                  <span className="font-medium">{saveSuccessMsg}</span>
                </div>
              )}

              {/* Members List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEAM_MEMBERS.map((member) => {
                  const currentAvatar =
                    memberAvatars[member.id] ||
                    member.image ||
                    '/images/team/ouyang-jun.jpg';
                  const isCustom = Boolean(memberAvatars[member.id]);

                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs hover:border-[#1b365d] transition-all flex items-center gap-4"
                    >
                      {/* Avatar Preview */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-inner shrink-0 bg-slate-100">
                        <img
                          src={currentAvatar}
                          alt={member.nameZh}
                          className="w-full h-full object-cover object-center"
                        />
                        {isCustom && (
                          <div className="absolute top-1 right-1 bg-emerald-500 text-white p-0.5 rounded-full shadow-xs">
                            <Check size={10} />
                          </div>
                        )}
                      </div>

                      {/* Info & Action Buttons */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#1b365d] truncate">
                              {lang === 'en' ? member.nameEn : member.nameZh}
                            </h4>
                            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-mono rounded">
                              {member.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 truncate">
                            {lang === 'en' ? member.roleEn : member.roleZh}
                          </p>
                        </div>

                        {/* Control buttons */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onTriggerCrop(member.id)}
                            className="px-2.5 py-1 bg-[#1b365d] hover:bg-[#2e476f] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <Crop size={12} className="text-amber-300" />
                            <span>{lang === 'en' ? 'Crop Photo' : '选择并框选'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadSingle(member)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            title={lang === 'en' ? 'Download cropped JPG file' : '下载裁剪好的 JPG 图片文件'}
                          >
                            {downloadSuccessId === member.id ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <Download size={12} />
                            )}
                            <span className="text-[11px]">
                              {downloadSuccessId === member.id ? '已下载' : '下载'}
                            </span>
                          </button>

                          {isCustom && (
                            <button
                              type="button"
                              onClick={() => onResetAvatar(member.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors rounded-lg cursor-pointer"
                              title={lang === 'en' ? 'Reset to default' : '重置为初始默认'}
                            >
                              <RotateCcw size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            /* Tab 2: Deployment & Putting Online Guide */
            <div className="space-y-6 text-sm text-gray-700">
              
              <div className="border border-emerald-200 bg-emerald-50/60 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <ShieldCheck size={18} />
                  <span>正式上线对外的“纯净安全保障”</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  在正式投放上网时，团队主页面上的所有成员照片均属于<strong>纯静态展示元素</strong>，不仅没有任何「更换照片」、「上传/替换」按钮，鼠标悬停也不会出现半透明遮罩和操作菜单。普通用户、学术同行和学校领导看到的都是干干净净、符合国际学术规范的标准主页。
                </p>
              </div>

              {/* Approach 1: Instant Permanent Save */}
              <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-5 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                    <Sparkles size={18} className="text-emerald-600" />
                    <span>方式一：一键永久固化为项目静态文件（最推荐，直接用于 Git Push）</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveToProject}
                    disabled={isSavingToProject || Object.keys(memberAvatars).length === 0}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all whitespace-nowrap justify-center"
                  >
                    <Sparkles size={14} className="text-emerald-200" />
                    <span>{isSavingToProject ? '正在写入...' : '立即永久保存到 public/ 目录'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  点击上方按钮后，系统会将您在 Preview 中裁切并确认的所有照片自动转换并写入项目的 <code className="bg-white border px-1.5 py-0.5 rounded font-mono text-[#1b365d]">public/images/team/*.jpg</code> 物理文件中。写入完成后，该图片就已是项目的永久代码资产，直接 <code className="bg-white border px-1.5 py-0.5 rounded font-mono text-[#1b365d]">git add . && git push</code> 部署后，全世界任何人访问都会看到这些照片！
                </p>
                {saveSuccessMsg && (
                  <div className="bg-white border border-emerald-400 rounded-lg p-2.5 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* Approach 2: Export Code */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#1b365d] font-bold text-base">
                    <FileCode size={18} className="text-[#236869]" />
                    <span>方式二：一键复制完整代码（自主更新 GitHub）</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-[#1b365d] hover:bg-[#2e476f] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {copiedCode ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                    <span>{copiedCode ? '已复制到剪贴板！' : '复制数据代码'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  如果您自己在 GitHub 上维护仓库，点击上方按钮即可复制包含了所有已裁剪照片的数据。将复制的内容粘贴到 <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800 font-mono text-[11px]">src/data/mockData.ts</code> 即可完成更新。
                </p>
              </div>

              {/* Approach 3: Download image files */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-[#1b365d] font-bold text-base">
                  <Download size={18} className="text-blue-600" />
                  <span>方式三：下载裁剪好的正方形图片放到 public 文件夹</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  点击第 1 步里每个成员卡片上的「下载」按钮，可以下载 600×600 标准正方形高品质 JPG 图片（如 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[11px]">gao-fei.jpg</code>）。将其直接保存在项目的 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[11px]">public/team/</code> 目录下即可长期引用。
                </p>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-500">
            {lang === 'en'
              ? 'Changes apply to live preview immediately.'
              : '框选调整后，预览网站将即时刷新同步。'}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#1b365d] hover:bg-[#2e476f] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            {lang === 'en' ? 'Done & Return to Site' : '完成并返回网站浏览'}
          </button>
        </div>

      </div>
    </div>
  );
};
