import React, { useState } from 'react';
import { Database, Download, FileText, CheckCircle2, ShieldCheck, Layers, Server, HardDrive } from 'lucide-react';
import { Language } from '../types';
import { DATASET_INFO } from '../data/mockData';
import { NeuralTreeDiagram } from '../components/NeuralTreeDiagram';
import { DatasetModal } from '../components/DatasetModal';

interface DatasetPageProps {
  lang: Language;
}

export const DatasetPage: React.FC<DatasetPageProps> = ({ lang }) => {
  const [modalMode, setModalMode] = useState<'osf' | 'docs' | null>(null);

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner Hero */}
      <div className="bg-white rounded-xl p-6 lg:p-8 border border-[#e5e8ee] shadow-2xs space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#1b365d] text-xs font-mono font-bold rounded-full uppercase">
              <Database size={14} />
              <span>OPEN ACCESS NEUROIMAGING REPOSITORY</span>
            </div>

            <h1 className="font-heading text-3xl font-extrabold text-[#1b365d]">
              {lang === 'en' ? 'FED Dataset (FED数据集)' : 'FED 数据集 (FED Dataset)'}
            </h1>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
              {lang === 'en'
                ? 'The Functional and Educational Neuroimaging Dataset (FED) is a comprehensive open-access 3T fMRI repository capturing longitudinal brain activation during reading and bilingual tasks.'
                : '功能与教育神经成像数据集 (FED Dataset) 是一个涵盖纵向 3T fMRI 高分辨率脑成像与认知行为测验的开放数据集，全面支持全球读写与双语研究。'}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setModalMode('osf')}
                className="px-5 py-2.5 bg-[#1b365d] text-white text-xs font-semibold rounded-lg hover:bg-[#2e476f] transition-all flex items-center gap-2 shadow-sm"
              >
                <Download size={15} />
                <span>{lang === 'en' ? 'Access Data on OSF' : '在 OSF 访问并获取数据集'}</span>
              </button>

              <button
                onClick={() => setModalMode('docs')}
                className="px-5 py-2.5 bg-[#f1f4f9] text-[#1b365d] border border-[#e5e8ee] text-xs font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <FileText size={15} />
                <span>{lang === 'en' ? 'Read Documentation' : '查看技术文档说明'}</span>
              </button>
            </div>
          </div>

          {/* Right Neural Tree Diagram */}
          <div className="lg:col-span-5">
            <NeuralTreeDiagram lang={lang} />
          </div>

        </div>
      </div>

      {/* Dataset Overview Grid */}
      <section className="space-y-6">
        <h2 className="font-heading text-xl font-bold text-[#1b365d] border-l-4 border-[#1b365d] pl-3">
          {lang === 'en' ? 'Dataset Overview' : '数据集概览与架构'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
            <div className="text-xs font-mono font-bold text-[#236869] uppercase">SUBJECTS</div>
            <div className="text-2xl font-heading font-extrabold text-[#1b365d]">N = {DATASET_INFO.subjectsCount}</div>
            <div className="text-xs text-gray-500">{lang === 'en' ? 'Monolingual & Bilingual cohorts' : '单语与双语对比组'}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
            <div className="text-xs font-mono font-bold text-[#236869] uppercase">MODALITY</div>
            <div className="text-lg font-heading font-bold text-[#1b365d]">3T fMRI</div>
            <div className="text-xs text-gray-500">{lang === 'en' ? 'High-resolution functional scans' : '高场强 3T 扫描数据'}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
            <div className="text-xs font-mono font-bold text-[#236869] uppercase">VOLUME</div>
            <div className="text-2xl font-heading font-extrabold text-[#1b365d]">{DATASET_INFO.totalSize}</div>
            <div className="text-xs text-gray-500">{lang === 'en' ? 'Raw & fMRIPrep derivatives' : '原始与预处理衍生数据'}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
            <div className="text-xs font-mono font-bold text-[#236869] uppercase">COMPLIANCE</div>
            <div className="text-lg font-heading font-bold text-[#1b365d]">BIDS v1.6</div>
            <div className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle2 size={13} /> {lang === 'en' ? 'Standardized structure' : '国际标准结构'}
            </div>
          </div>
        </div>
      </section>

      {/* Included Tasks & Formats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tasks */}
        <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-4">
          <h3 className="font-heading text-lg font-bold text-[#1b365d] flex items-center gap-2">
            <Layers className="text-[#236869]" size={20} />
            <span>{lang === 'en' ? 'Tasks Included in Cohort' : '数据集包含的具体范式与任务'}</span>
          </h3>
          <ul className="space-y-3 text-xs text-gray-700">
            {DATASET_INFO.tasks.map((task, idx) => (
              <li key={idx} className="flex items-center gap-2.5 p-2.5 bg-[#f8fafd] rounded-lg border border-gray-100 font-sans">
                <span className="w-6 h-6 rounded-full bg-[#1b365d] text-white flex items-center justify-center font-mono text-[10px] font-bold">
                  0{idx + 1}
                </span>
                <span className="font-semibold text-[#1b365d]">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preprocessed Formats */}
        <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-4">
          <h3 className="font-heading text-lg font-bold text-[#1b365d] flex items-center gap-2">
            <Server className="text-[#236869]" size={20} />
            <span>{lang === 'en' ? 'Preprocessed & Raw Formats' : '预处理衍生数据与规范'}</span>
          </h3>
          <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-sans">
            <p>
              {lang === 'en'
                ? 'Dataset derivatives include fMRIPrep anatomical and functional pipelines, surface maps, and ROI signal extraction matrices ready for immediate statistical analysis in SPM, FSL, or Nilearn.'
                : '预处理包含 fMRIPrep 标准图谱校正、解剖/功能皮层拟合、区域 ROI 信号提取矩阵，可直接在 SPM、FSL 或 Nilearn 中进行组级别统计建模。'}
            </p>
            <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg flex items-center gap-2 font-mono text-[11px]">
              <ShieldCheck size={18} className="text-emerald-700 flex-shrink-0" />
              <span>Fully anonymized under Institutional Review Board (IRB) ethics approval.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Modal */}
      {modalMode && (
        <DatasetModal
          isOpen={true}
          mode={modalMode}
          onClose={() => setModalMode(null)}
          lang={lang}
        />
      )}

    </div>
  );
};
