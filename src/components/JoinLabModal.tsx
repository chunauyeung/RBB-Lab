import React, { useState } from 'react';
import { X, Send, CheckCircle2, User, Mail, GraduationCap, FileText } from 'lucide-react';
import { Language } from '../types';

interface JoinLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const JoinLabModal: React.FC<JoinLabModalProps> = ({ isOpen, onClose, lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    role: 'PhD Applicant',
    researchInterest: '',
    cvSummary: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl max-w-lg w-full border border-[#e5e8ee] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="bg-[#1b365d] text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="font-heading text-lg font-semibold">
              {lang === 'en' ? 'Welcome to Join / Collaboration' : '欢迎加入 / 合作交流'}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              {lang === 'en' ? 'Academic Inquiries & Research Exchange' : '学术交流与合作意向提交'}
            </p>
          </div>
          <button 
            onClick={resetAndClose}
            className="text-gray-300 hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-semibold text-[#1b365d]">
                {lang === 'en' ? 'Application Received!' : '申请提交成功！'}
              </h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'Thank you for your interest in joining our lab. Dr. Gao and the recruitment team will review your statement and contact you via email.'
                  : '感谢您关注本实验室。高飞教授及遴选团队将认真审阅您的申请材料并与您取得联系。'}
              </p>
              <button
                onClick={resetAndClose}
                className="mt-4 px-6 py-2.5 bg-[#1b365d] text-white text-sm font-medium rounded-md hover:bg-[#2e476f] transition-colors"
              >
                {lang === 'en' ? 'Close Window' : '关闭窗口'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {lang === 'en' ? 'Full Name' : '姓名'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input
                    required
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g. Dr. Alex Morgan' : '例如：张伟'}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#f8fafd] border border-[#e5e8ee] rounded-md focus:outline-none focus:border-[#1b365d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {lang === 'en' ? 'Email Address' : '电子邮箱'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@university.edu"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#f8fafd] border border-[#e5e8ee] rounded-md focus:outline-none focus:border-[#1b365d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {lang === 'en' ? 'Position of Interest' : '意向申请岗位'}
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#f8fafd] border border-[#e5e8ee] rounded-md focus:outline-none focus:border-[#1b365d] appearance-none"
                  >
                    <option value="Postdoctoral Researcher">{lang === 'en' ? 'Postdoctoral Researcher' : '博士后研究员 (Postdoc)'}</option>
                    <option value="PhD Candidate">{lang === 'en' ? 'Ph.D. Candidate' : '博士研究生 (Ph.D.)'}</option>
                    <option value="Master Student">{lang === 'en' ? 'Master Student' : '硕士研究生 (M.S.)'}</option>
                    <option value="Undergraduate RA">{lang === 'en' ? 'Undergraduate RA' : '本科生研究助理 (RA)'}</option>
                    <option value="Visiting Scholar">{lang === 'en' ? 'Visiting Scholar' : '访问学者 (Visiting Scholar)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {lang === 'en' ? 'Research Statement / Background' : '研究兴趣与个人陈述'}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <textarea
                    required
                    rows={3}
                    value={form.cvSummary}
                    onChange={(e) => setForm({ ...form, cvSummary: e.target.value })}
                    placeholder={lang === 'en' ? 'Briefly describe your experience with fMRI, EEG, or language studies...' : '请简要介绍您的研究背景（如 fMRI/EEG 方法或语言实验）...'}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#f8fafd] border border-[#e5e8ee] rounded-md focus:outline-none focus:border-[#1b365d]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  {lang === 'en' ? 'Cancel' : '取消'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1b365d] text-white text-sm font-medium rounded-md hover:bg-[#2e476f] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send size={15} />
                  {lang === 'en' ? 'Submit Application' : '提交申请'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
