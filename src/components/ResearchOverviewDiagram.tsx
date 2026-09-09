import React from 'react';
import { BookOpen, Database, TrendingUp, GitFork, Activity, MonitorCheck, Code, CheckCircle2, Cpu } from 'lucide-react';
import { Language } from '../types';

interface ResearchOverviewDiagramProps {
  lang: Language;
}

export const ResearchOverviewDiagram: React.FC<ResearchOverviewDiagramProps> = ({ lang }) => {
  return (
    <div className="w-full bg-[#f8fafd] rounded-2xl border border-[#dce3de] p-5 sm:p-8 shadow-sm space-y-8 font-sans">
      
      {/* Title & Subtitle Header */}
      <div className="text-center space-y-2">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1b365d] tracking-tight">
          {lang === 'en' ? 'Reading & Bilingualism Research' : '阅读和双语研究'}
        </h2>
        <div className="text-xs sm:text-sm text-[#236869] font-medium max-w-xl mx-auto flex items-center justify-center gap-2">
          <span className="hidden sm:inline text-gray-300">——</span>
          <span>
            {lang === 'en'
              ? 'Understanding language processing mechanisms in the brain to advance language learning and intercultural communication'
              : '理解语言在大脑中的加工机制，促进语言学习与跨语言交流'}
          </span>
          <span className="hidden sm:inline text-gray-300">——</span>
        </div>
      </div>

      {/* Main Quadrants Grid with Central Hub */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Central Book Circle Badge (Absolute centered on desktop) */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-[#1b365d] text-white rounded-full border-4 border-white shadow-lg items-center justify-center flex-col p-2 text-center">
          <BookOpen size={28} className="text-blue-200 animate-pulse" />
        </div>

        {/* Quadrant 1: 词汇加工 (Green Theme) */}
        <div className="bg-white rounded-xl p-5 border-2 border-emerald-100 hover:border-emerald-300 shadow-2xs transition-all space-y-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full font-mono uppercase">
                01. {lang === 'en' ? 'Lexical Processing' : '词汇加工'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <BookOpen size={18} />
              </div>
            </div>

            {/* Keyword Mindmap Cluster */}
            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 space-y-2">
              <div className="flex flex-wrap justify-center items-center gap-2 text-[11px] font-mono text-emerald-900 font-semibold">
                <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">root</span>
                <span className="text-emerald-400">—</span>
                <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">morphology</span>
                <span className="text-emerald-400">—</span>
                <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">word</span>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2 text-[11px] font-mono text-emerald-900 font-semibold">
                <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded font-bold">meaning</span>
                <span className="text-emerald-400">—</span>
                <span className="px-2 py-0.5 bg-white rounded border border-emerald-200">form</span>
              </div>
            </div>

            <div className="text-center font-bold text-sm text-[#1b365d]">
              {lang === 'en' ? 'Orthographic, Semantic & Morphological Mechanisms' : '词形、词义与词法加工机制'}
            </div>
          </div>
        </div>

        {/* Quadrant 2: 数据库构建 (Blue Theme) */}
        <div className="bg-white rounded-xl p-5 border-2 border-blue-100 hover:border-blue-300 shadow-2xs transition-all space-y-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full font-mono uppercase">
                02. {lang === 'en' ? 'Database Construction' : '数据库构建'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Database size={18} />
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center justify-center gap-4 text-blue-800">
              <div className="text-center p-2 bg-white rounded border border-blue-200 flex-1">
                <Database size={24} className="mx-auto text-blue-600 mb-1" />
                <span className="text-[10px] font-bold font-mono uppercase">Linguistic DB</span>
              </div>
              <div className="text-center p-2 bg-white rounded border border-blue-200 flex-1">
                <CheckCircle2 size={24} className="mx-auto text-blue-600 mb-1" />
                <span className="text-[10px] font-bold font-mono uppercase">Normative List</span>
              </div>
            </div>

            <div className="text-center font-bold text-sm text-[#1b365d]">
              {lang === 'en' ? 'Normative Data Based on Chinese Language Characteristics' : '基于汉语特征的常模数据'}
            </div>
          </div>
        </div>

        {/* Quadrant 3: 二语习得与学习科学 (Purple Theme) */}
        <div className="bg-white rounded-xl p-5 border-2 border-purple-100 hover:border-purple-300 shadow-2xs transition-all space-y-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full font-mono uppercase">
                03. {lang === 'en' ? 'SLA & Science of Learning' : '二语习得与学习科学'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
            </div>

            <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 flex items-center justify-around">
              <div className="flex items-end gap-1.5 h-12 pt-2">
                <div className="w-3 bg-purple-300 h-4 rounded-t" />
                <div className="w-3 bg-purple-400 h-6 rounded-t" />
                <div className="w-3 bg-purple-500 h-8 rounded-t" />
                <div className="w-3 bg-purple-700 h-11 rounded-t" />
              </div>
              <div className="text-xs font-semibold text-purple-900 leading-tight">
                <div>• {lang === 'en' ? 'Learning Trajectory' : '学习过程'}</div>
                <div>• {lang === 'en' ? 'Brain Plasticity' : '大脑可塑性'}</div>
                <div>• {lang === 'en' ? 'Regulation Mechanism' : '调控机制'}</div>
              </div>
            </div>

            <div className="text-center font-bold text-sm text-[#1b365d]">
              {lang === 'en' ? 'Learning Process, Brain Plasticity & Executive Control' : '学习过程、大脑可塑性与调控机制'}
            </div>
          </div>
        </div>

        {/* Quadrant 4: 双语加工 (Amber/Orange Theme) */}
        <div className="bg-white rounded-xl p-5 border-2 border-amber-100 hover:border-amber-300 shadow-2xs transition-all space-y-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full font-mono uppercase">
                04. {lang === 'en' ? 'Bilingual Processing' : '双语加工'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <GitFork size={18} />
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100 flex items-center justify-center gap-3">
              <div className="px-3 py-1 bg-white border border-amber-200 rounded text-xs font-bold text-amber-900">L1 (汉语)</div>
              <span className="text-amber-500 font-bold">⇄</span>
              <div className="px-3 py-1 bg-white border border-amber-200 rounded text-xs font-bold text-amber-900">L2 (英语)</div>
            </div>

            <div className="text-center font-bold text-sm text-[#1b365d]">
              {lang === 'en' ? 'Code-Switching & Language-Thought Interplay' : '语码转换、语言和思维的关系'}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: 研究方法与工具 (Research Methods & Tools) */}
      <div className="pt-4 border-t border-[#dce3de] space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="h-0.5 bg-[#1b365d]/20 flex-1" />
          <span className="px-4 py-1 bg-[#1b365d] text-white text-xs font-mono font-bold uppercase rounded-full tracking-wider">
            {lang === 'en' ? 'Research Methods & Tools' : '研究方法与工具'}
          </span>
          <div className="h-0.5 bg-[#1b365d]/20 flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Method 1: 脑成像技术 */}
          <div className="bg-white rounded-xl p-4 border border-[#e5e8ee] shadow-2xs space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-[#1b365d] font-bold text-sm">
              <Activity size={18} className="text-[#236869]" />
              <span>{lang === 'en' ? 'Neuroimaging' : '脑成像技术'}</span>
            </div>
            <div className="flex justify-center items-center gap-2 text-xs font-mono font-bold text-gray-700 pt-1">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-900 rounded border border-blue-100">EEG</span>
              <span className="px-2 py-0.5 bg-teal-50 text-teal-900 rounded border border-teal-100">fNIRS</span>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-900 rounded border border-indigo-100">fMRI</span>
            </div>
          </div>

          {/* Method 2: 行为研究 */}
          <div className="bg-white rounded-xl p-4 border border-[#e5e8ee] shadow-2xs space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-[#1b365d] font-bold text-sm">
              <MonitorCheck size={18} className="text-[#236869]" />
              <span>{lang === 'en' ? 'Behavioral Research' : '行为研究'}</span>
            </div>
            <p className="text-xs text-gray-600 font-sans pt-1">
              {lang === 'en' ? 'RT / Accuracy Paradigms & Scales' : '反应时与正确率实验范式 · 问卷量表'}
            </p>
          </div>

          {/* Method 3: 计算建模 */}
          <div className="bg-white rounded-xl p-4 border border-[#e5e8ee] shadow-2xs space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-[#1b365d] font-bold text-sm">
              <Code size={18} className="text-[#236869]" />
              <span>{lang === 'en' ? 'Computational Modeling' : '计算建模'}</span>
            </div>
            <div className="flex justify-center items-center gap-2 text-xs font-mono font-semibold text-gray-700 pt-1">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-900 rounded border border-amber-200">Neural Net</span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-mono font-bold">&lt;/&gt;</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
