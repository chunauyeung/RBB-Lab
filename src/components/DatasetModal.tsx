import React, { useState } from 'react';
import { X, Download, FileCode, Check, ShieldCheck, Database } from 'lucide-react';
import { Language } from '../types';
import { DATASET_INFO } from '../data/mockData';

interface DatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'osf' | 'docs';
  lang: Language;
}

export const DatasetModal: React.FC<DatasetModalProps> = ({ isOpen, onClose, mode, lang }) => {
  const [downloadRequested, setDownloadRequested] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-[#e5e8ee] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#1b365d] text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Database className="text-[#87a0cd]" size={20} />
            <div>
              <h3 className="font-heading text-lg font-bold">
                {mode === 'osf' 
                  ? (lang === 'en' ? 'FED Dataset Access (OSF Portal)' : 'FED 数据集获取 (OSF 开放通道)')
                  : (lang === 'en' ? 'FED Dataset Technical Documentation' : 'FED 数据集技术文档说明书')}
              </h3>
              <p className="text-xs text-blue-200">Open-Access Neuroimaging Repository</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {mode === 'osf' ? (
            <>
              <div className="bg-[#f8fafd] p-4 rounded-lg border border-[#e5e8ee] space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-[#1b365d]">
                  <span>REPOSITORY: OSF.IO/RBB-FED-2024</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">PUBLIC ACCESS</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                  <div><strong>Subjects:</strong> N=120 (Monolingual + Bilinguals)</div>
                  <div><strong>Volume:</strong> ~2.4 TB BIDS Format</div>
                  <div><strong>Scanner:</strong> Siemens Prisma 3T fMRI</div>
                  <div><strong>License:</strong> CC-By 4.0 International</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b365d] mb-2 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#236869]" />
                  {lang === 'en' ? 'Data Usage Terms & Ethics Agreement' : '数据使用准则与伦理协议'}
                </h4>
                <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-5">
                  <li>
                    {lang === 'en' 
                      ? 'Datasets are fully anonymized according to HIPAA / GDPR neuroethics guidelines.' 
                      : '数据集已按照 HIPAA / GDPR 神经伦理准则完成全流程去标识化处理。'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? 'Researchers must cite Gao et al. (2024) in any academic work utilizing this repository.'
                      : '任何使用本数据集的学术成果须明确引用 Gao et al. (2024)。'}
                  </li>
                </ul>
              </div>

              {downloadRequested ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                  <Check className="mx-auto text-emerald-600" size={28} />
                  <div className="text-sm font-semibold text-emerald-900">
                    {lang === 'en' ? 'Download Manifest Generated!' : '数据下载清单已生成！'}
                  </div>
                  <p className="text-xs text-emerald-700">
                    {lang === 'en' 
                      ? 'Use OSF CLI or AWS S3 sync command below to retrieve the 2.4TB dataset.' 
                      : '请使用 OSF CLI 工具或 AWS S3 同步命令行下载完整 2.4TB 数据。'}
                  </p>
                  <code className="block p-2 bg-[#181c20] text-emerald-300 rounded text-xs font-mono text-left overflow-x-auto">
                    osf -p rbb-fed-2024 clone ./fed_dataset/
                  </code>
                </div>
              ) : (
                <button
                  onClick={() => setDownloadRequested(true)}
                  className="w-full py-3 bg-[#1b365d] text-white font-medium text-sm rounded-lg hover:bg-[#2e476f] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download size={18} />
                  {lang === 'en' ? 'Generate OSF Download Link & Manifest' : '生成 OSF 数据集下载与 Command Manifest'}
                </button>
              )}
            </>
          ) : (
            <div className="space-y-4 text-xs text-gray-700">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-start gap-2">
                <FileCode className="text-[#1b365d] flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="font-bold text-[#1b365d] text-sm mb-1">
                    {lang === 'en' ? 'BIDS Directory Structure Specification' : 'BIDS 规范目录树结构说明'}
                  </div>
                  <p>Brain Imaging Data Structure (v1.6.0) layout description:</p>
                </div>
              </div>

              <pre className="bg-[#181c20] text-[#87a0cd] p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`fed_dataset/
├── dataset_description.json
├── participants.tsv
├── sub-001/
│   ├── anat/
│   │   └── sub-001_T1w.nii.gz
│   └── func/
│       ├── sub-001_task-semantic_bold.nii.gz
│       ├── sub-001_task-lexical_bold.nii.gz
│       └── sub-001_task-rest_bold.nii.gz
└── derivatives/
    └── fmriprep-20.2.7/
        └── sub-001/ ... (Preprocessed T1w & BOLD)`}
              </pre>

              <p className="leading-relaxed">
                {lang === 'en'
                  ? 'All resting-state and task-based BOLD fMRI files have been aligned to MNI152NLin2009cAsym standard space with motion artifact correction, spatial smoothing (6mm FWHM), and high-pass filtering.'
                  : '所有静息态与任务态 BOLD fMRI 数据均已配准至 MNI152NLin2009cAsym 标准空间，并完成头动矫正、空间平滑 (6mm FWHM) 以及高通滤波预处理。'}
              </p>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              {lang === 'en' ? 'Close' : '关闭'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
