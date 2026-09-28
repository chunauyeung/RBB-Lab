import React, { useState } from 'react';
import { X, Download, FileCode, Check, ShieldCheck, Database } from 'lucide-react';
import { Language } from '../types';
import { DATASET_LIST } from '../data/mockData';

interface DatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'osf' | 'docs';
  lang: Language;
  datasetId?: string;
}

export const DatasetModal: React.FC<DatasetModalProps> = ({
  isOpen,
  onClose,
  mode,
  lang,
  datasetId = 'fed-dataset'
}) => {
  const [downloadRequested, setDownloadRequested] = useState(false);

  if (!isOpen) return null;

  const dataset = DATASET_LIST.find(d => d.id === datasetId) || DATASET_LIST[0];
  const isCST = dataset.id === 'cst-dataset';

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
                  ? (lang === 'en' ? `${dataset.shortName} Access Portal (OSF)` : `${dataset.nameZh} 获取通道 (OSF)`)
                  : (lang === 'en' ? `${dataset.shortName} Technical Documentation` : `${dataset.nameZh} 技术文档说明书`)}
              </h3>
              <p className="text-xs text-blue-200">
                {isCST
                  ? (lang === 'en' ? 'Open Science Psycholinguistic Norms & RT Database' : '开放科学心理语言学常模与反应时数据库')
                  : (lang === 'en' ? 'Open Science Affective Norms & Emotion Database' : '开放科学 Emoji 情绪与情感常模数据库')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
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
                  <span>REPOSITORY: {isCST ? 'OSF.IO/RBB-CST-NORMS' : 'OSF.IO/RBB-FED-EMOJI'}</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">PUBLIC ACCESS</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                  <div><strong>{isCST ? 'Words / Items:' : 'Emoji Stimuli:'}</strong> {isCST ? '3,800+ Compounds' : '1,000+ Unicode Emojis'}</div>
                  <div><strong>{isCST ? 'Cohort:' : 'Participants:'}</strong> {isCST ? '450+ Native Speakers' : '1,200+ Native & Bilinguals'}</div>
                  <div><strong>Volume:</strong> {dataset.totalSize}</div>
                  <div><strong>Format:</strong> CSV, Excel & R Data (.rds / .RData)</div>
                  <div><strong>License:</strong> CC-By 4.0 International</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b365d] mb-2 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#236869]" />
                  {lang === 'en' ? 'Data Usage Terms & Ethics Agreement' : '数据使用准则与学术引用规范'}
                </h4>
                <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-5">
                  <li>
                    {lang === 'en' 
                      ? 'Datasets are licensed under CC-BY 4.0 for non-commercial, scholarly, and computational research purposes.' 
                      : '本常模数据集在 CC-BY 4.0 国际许可协议下向全球学术科研工作者开放。'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? 'Researchers must cite Gao et al. (RBB Lab, Fudan University) in any publication, software, or scientific report utilizing these ratings.'
                      : '在任何利用本数据集开展的学术论文、情感计算分析或衍生研究中，须规范引用复旦大学高飞课题组 (RBB Lab) 研究成果。'}
                  </li>
                </ul>
              </div>

              {downloadRequested ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                  <Check className="mx-auto text-emerald-600" size={28} />
                  <div className="text-sm font-semibold text-emerald-900">
                    {lang === 'en' ? 'Download Link & Manifest Ready!' : '数据下载地址与包清单已生成！'}
                  </div>
                  <p className="text-xs text-emerald-700">
                    {isCST 
                      ? (lang === 'en' ? 'Click below or run the command line to fetch all tidyverse CSV tables and RData packages.' : '您可直接通过命令行同步或下载完整的规范化 CSV 表格与 RData 软件包。')
                      : (lang === 'en' ? 'Click below or run the command line to fetch all 1,000+ Emoji emotional ratings and tidyverse tables.' : '您可直接通过命令行同步或下载 1,000+ Emoji 多维情绪常模 CSV 与 RData 数据包。')}
                  </p>
                  <code className="block p-2 bg-[#181c20] text-emerald-300 rounded text-xs font-mono text-left overflow-x-auto">
                    {isCST ? 'osf -p rbb-cst-norms clone ./cst_transparency_dataset/' : 'osf -p rbb-fed-emoji clone ./fed_emoji_dataset/'}
                  </code>
                </div>
              ) : (
                <button
                  onClick={() => setDownloadRequested(true)}
                  className="w-full py-3 bg-[#1b365d] text-white font-medium text-sm rounded-lg hover:bg-[#2e476f] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Download size={18} />
                  <span>
                    {isCST
                      ? (lang === 'en' ? 'Generate OSF Download Link (CSV & RData)' : '生成 OSF 常模数据包下载链接 (CSV & RData)')
                      : (lang === 'en' ? 'Generate OSF Download Link (Emoji Affective Norms)' : '生成 OSF Emoji 情绪常模数据包下载链接 (CSV & RData)')}
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="space-y-4 text-xs text-gray-700">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-start gap-2">
                <FileCode className="text-[#1b365d] flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="font-bold text-[#1b365d] text-sm mb-1">
                    {isCST 
                      ? (lang === 'en' ? 'CST-Norms Data Dictionary & Codebook' : '语义透明度数据集变量代码表与字段说明')
                      : (lang === 'en' ? 'FED Emoji Norms Data Dictionary & Codebook' : '复旦emoji数据集变量代码表与字段说明')}
                  </div>
                  <p>
                    {isCST 
                      ? (lang === 'en' ? 'Detailed variable definitions for compound word psycholinguistic metrics:' : '心理语言学各主观维度与行为反应时字段定义如下：')
                      : (lang === 'en' ? 'Standardized variable definitions for emoji emotional valence, arousal, and discrete categories:' : 'Emoji 符号多维情绪效价、唤醒度及离散情绪分类字段定义如下：')}
                  </p>
                </div>
              </div>

              {isCST ? (
                <pre className="bg-[#181c20] text-[#87a0cd] p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`cst_transparency_norms/
├── cst_compound_words_full.csv     # 3,800+ 复合词完整常模总表
│   ├── word                        # 目标复合词 (e.g. 黑板, 热狗)
│   ├── pinyin                      # 汉语拼音注音
│   ├── morpheme_1                  # 语素1汉字 (Morpheme 1)
│   ├── morpheme_2                  # 语素2汉字 (Morpheme 2)
│   ├── transparency_m1_mean        # 语素1对整词语义透明度均值 (1-7分)
│   ├── transparency_m2_mean        # 语素2对整词语义透明度均值 (1-7分)
│   ├── transparency_whole_mean     # 整词语义综合透明度均值 (1-7分)
│   ├── familiarity_mean            # 主观词汇熟悉度均值 (1-7分)
│   ├── frequency_subtlex           # SUBTLEX-CH 词频 (Log10)
│   ├── strokes_total               # 全词总笔画数
│   ├── lexical_decision_rt_mean    # 视觉真词决策正确反应时 (毫秒 ms)
│   └── lexical_decision_acc        # 词汇决策正确率 (0.00-1.00)
├── cst_morpheme_family_index.csv   # 语素家族大小与位置相干度表
└── README_codebook.md              # 实验设计与信效度检验报告`}
                </pre>
              ) : (
                <pre className="bg-[#181c20] text-[#87a0cd] p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`fed_emoji_dataset/
├── fed_emoji_norms_master.csv      # 1,000+ Emoji 多维情绪与情感常模总表
│   ├── emoji_char                  # Emoji 原生字符 (e.g. 🥳, 🥺, 😡, 🥰)
│   ├── unicode_hex                 # Unicode 标准编码 (e.g. U+1F973)
│   ├── emoji_name_en               # Unicode CLDR 标准英文名 (e.g. partying face)
│   ├── emoji_name_zh               # 中文通用描述名 (e.g. 欢庆/派对表情)
│   ├── valence_mean                # 情绪效价均值 (1-9分: 1=极度消极, 9=极度积极)
│   ├── valence_sd                  # 情绪效价评分标准差 (SD)
│   ├── arousal_mean                # 情绪唤醒度均值 (1-9分: 1=极度平静, 9=极度激动)
│   ├── arousal_sd                  # 情绪唤醒度评分标准差 (SD)
│   ├── dominant_emotion            # 主导离散情绪类别 (Joy, Sadness, Anger, etc.)
│   ├── emotion_consensus_ratio     # 主导情绪被试分类共识度 (0.00 - 1.00)
│   ├── ambiguity_score             # 情感语义多义性与歧义度指数 (0.00 - 1.00)
│   └── familiarity_mean            # 日常主观使用熟悉度 (1-7分)
├── fed_individual_ratings_raw.csv  # 1,200+ 被试单项原始逐项评分记录
├── fed_bilingual_comparison.csv    # 单语 vs 汉英双语被试群体情绪感知差异对比
└── README_codebook.md              # 实验范式、SAM 评估量表与信效度报告`}
                </pre>
              )}

              <p className="leading-relaxed">
                {isCST
                  ? (lang === 'en'
                    ? 'Normative ratings were acquired with randomized double-blind Latin-square designs across multiple testing batches, ensuring high test-retest reliability (Cronbach alpha > 0.92).'
                    : '常模评定采用双盲随机拉丁方实验设计与多轮次测试，重测信度与内在一致性极高 (Cronbach α > 0.92)。')
                  : (lang === 'en'
                    ? 'All emoji affective ratings were gathered using standardized Self-Assessment Manikin (SAM) scales and forced-choice discrete emotion categorization paradigms, yielding high internal consistency across rater cohorts.'
                    : '本 Emoji 情绪常模基于国际标准自我评估模型（SAM）与离散情绪分类范式进行大规模测定，在单语及汉英双语群体间均表现出优异的重测信度与跨群体内在一致性。')}
              </p>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Close' : '关闭'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
