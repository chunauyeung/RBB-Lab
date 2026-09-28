import React, { useState, useEffect } from 'react';
import { Database, Download, FileText, CheckCircle2, ShieldCheck, Layers, Server, Table, Sparkles, Smile, FileSpreadsheet, Heart, Flame, MessageSquare, BarChart3, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { DATASET_LIST } from '../data/mockData';
import { DatasetModal } from '../components/DatasetModal';

interface DatasetPageProps {
  lang: Language;
  selectedDatasetId?: string;
  onSelectDataset?: (id: string) => void;
}

export const DatasetPage: React.FC<DatasetPageProps> = ({
  lang,
  selectedDatasetId = 'fed-dataset',
  onSelectDataset
}) => {
  const [activeId, setActiveId] = useState<string>(selectedDatasetId);
  const [modalMode, setModalMode] = useState<'osf' | 'docs' | null>(null);

  // Synchronize with external prop if changed
  useEffect(() => {
    if (selectedDatasetId) {
      setActiveId(selectedDatasetId);
    }
  }, [selectedDatasetId]);

  const handleTabChange = (id: string) => {
    setActiveId(id);
    onSelectDataset?.(id);
  };

  const activeDataset = DATASET_LIST.find(d => d.id === activeId) || DATASET_LIST[0];

  // Interactive sample emojis for FED dataset
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState(0);
  const sampleEmojis = [
    {
      emoji: '🥰',
      unicode: 'U+1F970',
      nameEn: 'Smiling Face with Hearts',
      nameZh: '微笑带心 / 爱意满满',
      valence: 8.42,
      arousal: 5.40,
      dominantEmotion: lang === 'en' ? 'Love / Joy (爱意与喜悦)' : '爱意 / 喜悦',
      dominantColor: 'text-rose-600 bg-rose-50 border-rose-200',
      consensus: '94.2%',
      familiarity: '6.85 / 7.0',
      note: lang === 'en'
        ? 'High positive valence with moderate arousal, universally conveying warm affection and happiness.'
        : '极高正向效价伴随中等唤醒度，被试一致认为其传递温暖、爱意与强烈喜悦情感。'
    },
    {
      emoji: '🥳',
      unicode: 'U+1F973',
      nameEn: 'Partying Face',
      nameZh: '欢庆 / 派对表情',
      valence: 8.15,
      arousal: 7.85,
      dominantEmotion: lang === 'en' ? 'Joy / Excitement (狂欢与兴奋)' : '狂欢 / 兴奋',
      dominantColor: 'text-amber-600 bg-amber-50 border-amber-200',
      consensus: '91.8%',
      familiarity: '6.72 / 7.0',
      note: lang === 'en'
        ? 'High positive valence and very high arousal, ideal for celebration, achievement, and jubilation.'
        : '极高正向效价与极高情绪唤醒度，典型表征庆祝、达成目标与狂欢情绪。'
    },
    {
      emoji: '🤔',
      unicode: 'U+1F914',
      nameEn: 'Thinking Face',
      nameZh: '沉思 / 思考疑惑',
      valence: 5.12,
      arousal: 4.10,
      dominantEmotion: lang === 'en' ? 'Contemplation / Doubt (沉思与疑虑)' : '沉思 / 疑虑',
      dominantColor: 'text-blue-600 bg-blue-50 border-blue-200',
      consensus: '88.5%',
      familiarity: '6.90 / 7.0',
      note: lang === 'en'
        ? 'Neutral-balanced valence with low-moderate arousal, indexing cognitive processing and mild skepticism.'
        : '中性效价偏微正，伴随较低生理唤醒，体现认知加工、深思与轻度揣摩。'
    },
    {
      emoji: '🥺',
      unicode: 'U+1F97A',
      nameEn: 'Pleading Face',
      nameZh: '恳求 / 楚楚可怜',
      valence: 4.35,
      arousal: 5.60,
      dominantEmotion: lang === 'en' ? 'Tenderness / Sadness (依恋与委屈)' : '依恋 / 委屈',
      dominantColor: 'text-purple-600 bg-purple-50 border-purple-200',
      consensus: '83.4%',
      familiarity: '6.78 / 7.0',
      note: lang === 'en'
        ? 'Slight negative-neutral valence, evoking strong interpersonal empathy, appeal for affection, or vulnerability.'
        : '略偏消极至中性，具中等唤醒度，容易激发人际共情、依赖与楚楚可怜的情感回应。'
    },
    {
      emoji: '😭',
      unicode: 'U+1F62D',
      nameEn: 'Loudly Crying Face',
      nameZh: '放声大哭 / 情感宣泄',
      valence: 2.45,
      arousal: 7.60,
      dominantEmotion: lang === 'en' ? 'Sadness / Catharsis (悲伤或极端宣泄)' : '悲痛 / 强烈宣泄',
      dominantColor: 'text-sky-600 bg-sky-50 border-sky-200',
      consensus: '86.1%',
      familiarity: '6.95 / 7.0',
      note: lang === 'en'
        ? 'Low valence with high arousal. In online communication, it is widely utilized for exaggerated despair or overwhelming delight.'
        : '低效价高唤醒。在网络社交中表现出一定语义多义性，既表达悲伤痛哭，也常用作情绪极度宣泄或“笑哭/感动哭”。'
    },
    {
      emoji: '😡',
      unicode: 'U+1F621',
      nameEn: 'Pouting Face / Enraged',
      nameZh: '愤怒 / 怒不可遏',
      valence: 1.78,
      arousal: 8.32,
      dominantEmotion: lang === 'en' ? 'Anger / Disgust (愤怒与厌恶)' : '愤怒 / 敌对',
      dominantColor: 'text-red-600 bg-red-50 border-red-200',
      consensus: '96.5%',
      familiarity: '6.82 / 7.0',
      note: lang === 'en'
        ? 'Extremely low valence and extreme physiological arousal, with the highest consensus rating for anger.'
        : '极度消极效价与极高唤醒度，被试一致性识别率高达96.5%，表征强烈愤怒与抗议情绪。'
    }
  ];

  // Interactive sample words for CST dataset
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const sampleWords = [
    {
      word: '黑板',
      pinyin: 'hēi bǎn',
      type: lang === 'en' ? 'Transparent (全透明)' : '全透明复合词',
      typeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      m1: '黑 (Black)',
      m2: '板 (Board)',
      transparencyM1: '6.85 / 7.0',
      transparencyM2: '6.78 / 7.0',
      wholeTransparency: '6.82 / 7.0',
      familiarity: '6.90 / 7.0',
      rt: '512 ms',
      explanation: lang === 'en'
        ? 'Both "黑" (black) and "板" (board) contribute directly and transparently to the composite meaning of "blackboard".'
        : '语素“黑”（黑色的）与“板”（板状物）均直接且清晰地指向整词“黑板”的含义，语义透明度极高。'
    },
    {
      word: '白菜',
      pinyin: 'bái cài',
      type: lang === 'en' ? 'Semi-Transparent (半透明)' : '半透明复合词',
      typeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      m1: '白 (White)',
      m2: '菜 (Vegetable)',
      transparencyM1: '4.60 / 7.0',
      transparencyM2: '6.80 / 7.0',
      wholeTransparency: '5.70 / 7.0',
      familiarity: '6.88 / 7.0',
      rt: '530 ms',
      explanation: lang === 'en'
        ? '"菜" (vegetable) is central and transparent, whereas "白" (white) provides an approximate modifier property.'
        : '中心语素“菜”与整词语义直接相关，修饰语素“白”呈部分字面关联，属于典型的偏正半透明结构。'
    },
    {
      word: '东西',
      pinyin: 'dōng xī',
      type: lang === 'en' ? 'Opaque (不透明/隐喻)' : '不透明/隐喻复合词',
      typeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      m1: '东 (East)',
      m2: '西 (West)',
      transparencyM1: '1.20 / 7.0',
      transparencyM2: '1.10 / 7.0',
      wholeTransparency: '1.15 / 7.0',
      familiarity: '6.95 / 7.0',
      rt: '498 ms',
      explanation: lang === 'en'
        ? 'The constituent morphemes "East" and "West" have lexicalized metaphorically to mean "object/thing", yielding low morphemic transparency.'
        : '构成语素“东”与“西”在历史演化中高度隐喻化，字面义与整词“物品”无直接推导关系，属于高度不透明复合词。'
    }
  ];

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-300">
      
      {/* Top Dataset Switcher Header */}
      <div className="bg-white rounded-xl p-5 border border-[#e5e8ee] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1b365d]">
            {lang === 'en' ? 'Scientific Datasets & Corpora' : '实验室学术数据集'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'en'
              ? 'Empirical benchmarks for affective computing, psycholinguistics, and cognitive science'
              : '面向情感计算、心理语言学与认知科学的开放规范常模'}
          </p>
        </div>

        {/* Tab Buttons for the two datasets */}
        <div className="inline-flex p-1 bg-[#f1f4f9] rounded-xl border border-[#e5e8ee] self-start md:self-auto">
          <button
            onClick={() => handleTabChange('fed-dataset')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeId === 'fed-dataset'
                ? 'bg-[#1b365d] text-white shadow-2xs'
                : 'text-gray-600 hover:text-[#1b365d]'
            }`}
          >
            <Smile size={16} />
            <span>{lang === 'en' ? 'Fudan Emoji Dataset (FED)' : '复旦emoji数据集 (FED)'}</span>
          </button>

          <button
            onClick={() => handleTabChange('cst-dataset')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeId === 'cst-dataset'
                ? 'bg-[#1b365d] text-white shadow-2xs'
                : 'text-gray-600 hover:text-[#1b365d]'
            }`}
          >
            <FileSpreadsheet size={16} />
            <span>{lang === 'en' ? 'Semantic Transparency' : '语义透明度数据集'}</span>
          </button>
        </div>
      </div>

      {/* DATASET 1: FUDAN EMOJI DATASET (FED) */}
      {activeId === 'fed-dataset' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Hero Banner */}
          <div className="bg-white rounded-xl p-6 lg:p-8 border border-[#e5e8ee] shadow-2xs space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-bold rounded-full uppercase">
                  <Smile size={14} className="text-amber-600" />
                  <span>{lang === 'en' ? activeDataset.badgeEn : activeDataset.badgeZh}</span>
                </div>

                <h2 className="font-heading text-3xl font-extrabold text-[#1b365d]">
                  {lang === 'en' ? activeDataset.nameEn : activeDataset.nameZh}
                </h2>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  {lang === 'en' ? activeDataset.summaryEn : activeDataset.summaryZh}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 text-xs text-gray-600 pt-1">
                  {(lang === 'en' ? activeDataset.highlightsEn : activeDataset.highlightsZh)?.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-[#236869] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => setModalMode('osf')}
                    className="px-5 py-2.5 bg-[#1b365d] text-white text-xs font-semibold rounded-lg hover:bg-[#2e476f] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Download size={15} />
                    <span>{lang === 'en' ? 'Download Norms (CSV & RData)' : '在 OSF 获取常模表 (CSV & RData)'}</span>
                  </button>

                  <button
                    onClick={() => setModalMode('docs')}
                    className="px-5 py-2.5 bg-[#f1f4f9] text-[#1b365d] border border-[#e5e8ee] text-xs font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>{lang === 'en' ? 'View Variable Codebook' : '查看情绪维度变量代码表'}</span>
                  </button>
                </div>
              </div>

              {/* Right: Interactive Emoji Affective Space Inspector */}
              <div className="lg:col-span-5 bg-[#f8fafd] rounded-xl border border-[#e5e8ee] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1b365d]">
                    <Sparkles size={15} className="text-amber-600" />
                    <span>{lang === 'en' ? 'Emoji Affective Space Inspector' : 'Emoji 符号多维情绪实证演示'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">Interactive</span>
                </div>

                {/* Emoji Selector Grid */}
                <div className="grid grid-cols-6 gap-2">
                  {sampleEmojis.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedEmojiIndex(idx)}
                      className={`text-2xl p-2 rounded-xl border transition-all flex flex-col items-center justify-center cursor-pointer ${
                        selectedEmojiIndex === idx
                          ? 'bg-white border-[#1b365d] shadow-md scale-105 ring-2 ring-[#1b365d]/20'
                          : 'bg-white border-gray-200 hover:bg-gray-100 hover:scale-102'
                      }`}
                      title={item.nameZh}
                    >
                      <span>{item.emoji}</span>
                    </button>
                  ))}
                </div>

                {/* Active Emoji Details Card */}
                {sampleEmojis[selectedEmojiIndex] && (
                  <div className="bg-white rounded-lg p-4 border border-[#e5e8ee] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{sampleEmojis[selectedEmojiIndex].emoji}</span>
                        <div>
                          <div className="font-heading font-extrabold text-[#1b365d] text-sm leading-tight">
                            {lang === 'en' ? sampleEmojis[selectedEmojiIndex].nameEn : sampleEmojis[selectedEmojiIndex].nameZh}
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {sampleEmojis[selectedEmojiIndex].unicode}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${sampleEmojis[selectedEmojiIndex].dominantColor}`}>
                        {sampleEmojis[selectedEmojiIndex].dominantEmotion}
                      </span>
                    </div>

                    {/* Progress bars for Valence & Arousal */}
                    <div className="space-y-2.5 bg-[#f8fafd] p-3 rounded-lg text-xs">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600 font-medium flex items-center gap-1">
                            <Heart size={12} className="text-rose-500" />
                            {lang === 'en' ? 'Emotional Valence (1-9)' : '情绪效价 (1=消极, 9=积极)'}
                          </span>
                          <span className="font-mono font-bold text-[#1b365d]">
                            {sampleEmojis[selectedEmojiIndex].valence.toFixed(2)} / 9.0
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 transition-all duration-300"
                            style={{ width: `${(sampleEmojis[selectedEmojiIndex].valence / 9) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600 font-medium flex items-center gap-1">
                            <Flame size={12} className="text-amber-500" />
                            {lang === 'en' ? 'Arousal / Activation (1-9)' : '情绪唤醒度 (1=平静, 9=激动)'}
                          </span>
                          <span className="font-mono font-bold text-[#1b365d]">
                            {sampleEmojis[selectedEmojiIndex].arousal.toFixed(2)} / 9.0
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-500 transition-all duration-300"
                            style={{ width: `${(sampleEmojis[selectedEmojiIndex].arousal / 9) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 bg-gray-50 rounded border border-gray-100">
                        <span className="text-[10px] text-gray-400 block font-mono">分类一致性 (Consensus)</span>
                        <span className="font-bold text-emerald-700 text-xs font-mono">{sampleEmojis[selectedEmojiIndex].consensus}</span>
                      </div>
                      <div className="p-2 bg-gray-50 rounded border border-gray-100">
                        <span className="text-[10px] text-gray-400 block font-mono">主观熟悉度 (Familiarity)</span>
                        <span className="font-bold text-[#1b365d] text-xs font-mono">{sampleEmojis[selectedEmojiIndex].familiarity}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-normal italic border-t border-gray-100 pt-2">
                      {sampleEmojis[selectedEmojiIndex].note}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Overview Grid */}
          <section className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#1b365d] border-l-4 border-amber-500 pl-3">
              {lang === 'en' ? 'FED Dataset Overview' : '复旦emoji数据集概览与架构'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700 uppercase">EMOJI STIMULI</div>
                <div className="text-2xl font-heading font-extrabold text-[#1b365d]">1,000+</div>
                <div className="text-xs text-gray-500">{lang === 'en' ? 'Standardized Unicode symbols' : 'Unicode 标准化常用表情符号'}</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700 uppercase">RATERS</div>
                <div className="text-2xl font-heading font-extrabold text-[#1b365d]">1,200+</div>
                <div className="text-xs text-gray-500">{lang === 'en' ? 'Native & bilingual participants' : '单语及汉英双语评定队列'}</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700 uppercase">DIMENSIONS</div>
                <div className="text-lg font-heading font-bold text-[#1b365d]">Valence & Arousal</div>
                <div className="text-xs text-gray-500">{lang === 'en' ? 'SAM scales & discrete categories' : '效价、唤醒度与离散情绪归类'}</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700 uppercase">DATA FORMAT</div>
                <div className="text-lg font-heading font-bold text-[#1b365d]">CSV & RData</div>
                <div className="text-xs text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={13} /> {lang === 'en' ? 'Tidyverse ready' : '开源科研数据包规范'}
                </div>
              </div>
            </div>
          </section>

          {/* Sample Data Table Preview */}
          <section className="bg-white rounded-xl border border-[#e5e8ee] shadow-2xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <h4 className="font-heading text-base font-bold text-[#1b365d] flex items-center gap-2">
                <Table className="text-amber-600" size={18} />
                <span>{lang === 'en' ? 'FED Emoji Norms Sample Table' : '复旦emoji数据集样本预览 (Sample Entries)'}</span>
              </h4>
              <span className="text-xs text-gray-500 font-mono">
                {lang === 'en' ? 'Showing 6 of 1,000+ emoji ratings' : '展示 6 条代表性 Emoji 常模（共计 1,000+ 符号）'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#f1f4f9] text-[#1b365d] font-bold border-b border-[#e5e8ee]">
                    <th className="p-3">表情 (Emoji)</th>
                    <th className="p-3">Unicode 编码</th>
                    <th className="p-3">描述名称</th>
                    <th className="p-3">情绪效价 (Valence 1-9)</th>
                    <th className="p-3">情绪唤醒度 (Arousal 1-9)</th>
                    <th className="p-3">主导情绪类别</th>
                    <th className="p-3">共识度</th>
                    <th className="p-3">日常熟悉度 (1-7)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  {sampleEmojis.map((e, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3 text-xl font-bold">{e.emoji}</td>
                      <td className="p-3 font-mono text-gray-500">{e.unicode}</td>
                      <td className="p-3 font-semibold text-[#1b365d]">{lang === 'en' ? e.nameEn : e.nameZh}</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">{e.valence.toFixed(2)}</td>
                      <td className="p-3 font-mono font-bold text-amber-700">{e.arousal.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${e.dominantColor}`}>
                          {e.dominantEmotion}
                        </span>
                      </td>
                      <td className="p-3 font-mono">{e.consensus}</td>
                      <td className="p-3 font-mono text-gray-600">{e.familiarity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Included Tasks & Applications */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-4">
              <h4 className="font-heading text-base font-bold text-[#1b365d] flex items-center gap-2">
                <Layers className="text-[#236869]" size={18} />
                <span>{lang === 'en' ? 'Norm Dimensions & Experimental Design' : '常模测定维度与实验设计'}</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-700">
                {(lang === 'en' ? activeDataset.tasksEn : activeDataset.tasksZh)?.map((task, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 p-2.5 bg-[#f8fafd] rounded-lg border border-gray-100">
                    <span className="w-5 h-5 rounded-full bg-[#1b365d] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-semibold text-[#1b365d]">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-4">
              <h4 className="font-heading text-base font-bold text-[#1b365d] flex items-center gap-2">
                <BarChart3 className="text-[#236869]" size={18} />
                <span>{lang === 'en' ? 'Applications in NLP & Sentiment Analysis' : '情感计算与认知科学科研应用'}</span>
              </h4>
              <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-sans">
                <p>
                  {lang === 'en'
                    ? 'The dataset is widely applicable for sentiment analysis, social media NLP algorithms, conversational agent dialogue tone modeling, and psychological stimulus selection in affective experimental paradigms.'
                    : '本常模数据集广泛适用于社交网络文本情感分析、大语言模型情感色彩微调、对话智能体（Chatbot）情绪反馈调优，以及心理学情绪诱发实验材料的精准匹配。'}
                </p>
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg flex items-center gap-2 font-mono text-[11px]">
                  <ShieldCheck size={18} className="text-emerald-700 shrink-0" />
                  <span>Licensed under CC-BY 4.0 for global scientific and computational research.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* DATASET 2: CHINESE SEMANTIC TRANSPARENCY DATASET */}
      {activeId === 'cst-dataset' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Hero Banner */}
          <div className="bg-white rounded-xl p-6 lg:p-8 border border-[#e5e8ee] shadow-2xs space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#236869] text-xs font-mono font-bold rounded-full uppercase">
                  <FileSpreadsheet size={14} className="text-[#236869]" />
                  <span>{lang === 'en' ? activeDataset.badgeEn : activeDataset.badgeZh}</span>
                </div>

                <h2 className="font-heading text-3xl font-extrabold text-[#1b365d]">
                  {lang === 'en' ? activeDataset.nameEn : activeDataset.nameZh}
                </h2>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  {lang === 'en' ? activeDataset.summaryEn : activeDataset.summaryZh}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 text-xs text-gray-600 pt-1">
                  {(lang === 'en' ? activeDataset.highlightsEn : activeDataset.highlightsZh)?.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-[#236869] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => setModalMode('osf')}
                    className="px-5 py-2.5 bg-[#1b365d] text-white text-xs font-semibold rounded-lg hover:bg-[#2e476f] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Download size={15} />
                    <span>{lang === 'en' ? 'Download Norms (CSV & RData)' : '在 OSF 下载常模表 (CSV & RData)'}</span>
                  </button>

                  <button
                    onClick={() => setModalMode('docs')}
                    className="px-5 py-2.5 bg-[#f1f4f9] text-[#1b365d] border border-[#e5e8ee] text-xs font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>{lang === 'en' ? 'View Variable Codebook' : '查看词条变量代码表与字段说明'}</span>
                  </button>
                </div>
              </div>

              {/* Right: Interactive Semantic Transparency Inspector */}
              <div className="lg:col-span-5 bg-[#f8fafd] rounded-xl border border-[#e5e8ee] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1b365d]">
                    <Sparkles size={15} className="text-[#236869]" />
                    <span>{lang === 'en' ? 'Compound Word Transparency Inspector' : '复合词语素透明度实证演示'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">Interactive</span>
                </div>

                {/* Sample selector buttons */}
                <div className="flex gap-2">
                  {sampleWords.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedWordIndex(idx)}
                      className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedWordIndex === idx
                          ? 'bg-[#1b365d] text-white border-[#1b365d] shadow-2xs'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {item.word}
                    </button>
                  ))}
                </div>

                {/* Selected word breakdown card */}
                {sampleWords[selectedWordIndex] && (
                  <div className="bg-white rounded-lg p-4 border border-[#e5e8ee] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-heading font-extrabold text-[#1b365d]">
                          {sampleWords[selectedWordIndex].word}
                        </span>
                        <span className="text-xs text-gray-500 font-mono ml-2">
                          ({sampleWords[selectedWordIndex].pinyin})
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sampleWords[selectedWordIndex].typeColor}`}>
                        {sampleWords[selectedWordIndex].type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#f8fafd] p-2.5 rounded-md">
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-mono">语素1 (M1)</span>
                        <span className="font-semibold text-gray-800">{sampleWords[selectedWordIndex].m1}</span>
                        <span className="text-[10px] text-[#236869] block font-mono">{sampleWords[selectedWordIndex].transparencyM1}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-mono">语素2 (M2)</span>
                        <span className="font-semibold text-gray-800">{sampleWords[selectedWordIndex].m2}</span>
                        <span className="text-[10px] text-[#236869] block font-mono">{sampleWords[selectedWordIndex].transparencyM2}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                      <div className="p-1.5 bg-gray-50 rounded">
                        <span className="text-[10px] text-gray-400 block font-mono">整词透明度</span>
                        <span className="font-bold text-[#1b365d] text-xs">{sampleWords[selectedWordIndex].wholeTransparency}</span>
                      </div>
                      <div className="p-1.5 bg-gray-50 rounded">
                        <span className="text-[10px] text-gray-400 block font-mono">主观熟悉度</span>
                        <span className="font-bold text-[#1b365d] text-xs">{sampleWords[selectedWordIndex].familiarity}</span>
                      </div>
                      <div className="p-1.5 bg-gray-50 rounded">
                        <span className="text-[10px] text-gray-400 block font-mono">真词决策RT</span>
                        <span className="font-bold text-emerald-700 text-xs font-mono">{sampleWords[selectedWordIndex].rt}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-normal italic border-t border-gray-100 pt-2">
                      {sampleWords[selectedWordIndex].explanation}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Overview Grid */}
          <section className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#1b365d] border-l-4 border-[#236869] pl-3">
              {lang === 'en' ? 'CST-Norms Dataset Overview' : '语义透明度数据集概览与架构'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-[#236869] uppercase">ITEMS / WORDS</div>
                <div className="text-2xl font-heading font-extrabold text-[#1b365d]">3,800+</div>
                <div className="text-xs text-gray-500">{lang === 'en' ? 'Modern Chinese compound words' : '现代汉语双字及多字复合词'}</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-[#236869] uppercase">COHORT</div>
                <div className="text-2xl font-heading font-extrabold text-[#1b365d]">450+</div>
                <div className="text-xs text-gray-500">{lang === 'en' ? 'Native speaker normative cohort' : '母语受试常模标定与反应时群体'}</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-[#236869] uppercase">MODALITY</div>
                <div className="text-lg font-heading font-bold text-[#1b365d]">RT + Norms</div>
                <div className="text-xs text-gray-500">{lang === 'en' ? 'Lexical decision latencies & ratings' : '高精度词汇决策反应时与多维常模'}</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-2">
                <div className="text-xs font-mono font-bold text-[#236869] uppercase">DATA FORMAT</div>
                <div className="text-lg font-heading font-bold text-[#1b365d]">CSV & RData</div>
                <div className="text-xs text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={13} /> {lang === 'en' ? 'Tidyverse ready' : '标准化开源数据格式'}
                </div>
              </div>
            </div>
          </section>

          {/* Sample Data Table Preview */}
          <section className="bg-white rounded-xl border border-[#e5e8ee] shadow-2xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <h4 className="font-heading text-base font-bold text-[#1b365d] flex items-center gap-2">
                <Table className="text-[#236869]" size={18} />
                <span>{lang === 'en' ? 'CST-Norms Data Sample Preview' : '常模数据集样本预览 (Sample Entries)'}</span>
              </h4>
              <span className="text-xs text-gray-500 font-mono">
                {lang === 'en' ? 'Showing 5 of 3,800+ words' : '展示 5 条示例样本（共计 3,800+ 词条）'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#f1f4f9] text-[#1b365d] font-bold border-b border-[#e5e8ee]">
                    <th className="p-3">词汇 (Word)</th>
                    <th className="p-3">拼音 (Pinyin)</th>
                    <th className="p-3">语素1 (M1)</th>
                    <th className="p-3">语素2 (M2)</th>
                    <th className="p-3">语素1透明度 (1-7)</th>
                    <th className="p-3">语素2透明度 (1-7)</th>
                    <th className="p-3">整词透明度均值</th>
                    <th className="p-3">主观熟悉度</th>
                    <th className="p-3">词汇决策 RT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-[#1b365d]">黑板</td>
                    <td className="p-3 font-mono text-gray-500">hēi bǎn</td>
                    <td className="p-3">黑</td>
                    <td className="p-3">板</td>
                    <td className="p-3 font-mono">6.85</td>
                    <td className="p-3 font-mono">6.78</td>
                    <td className="p-3 font-mono font-bold text-emerald-700">6.82</td>
                    <td className="p-3 font-mono">6.90</td>
                    <td className="p-3 font-mono text-[#1b365d]">512 ms</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-[#1b365d]">牙刷</td>
                    <td className="p-3 font-mono text-gray-500">yá shuā</td>
                    <td className="p-3">牙</td>
                    <td className="p-3">刷</td>
                    <td className="p-3 font-mono">6.70</td>
                    <td className="p-3 font-mono">6.58</td>
                    <td className="p-3 font-mono font-bold text-emerald-700">6.64</td>
                    <td className="p-3 font-mono">6.85</td>
                    <td className="p-3 font-mono text-[#1b365d]">528 ms</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-[#1b365d]">白菜</td>
                    <td className="p-3 font-mono text-gray-500">bái cài</td>
                    <td className="p-3">白</td>
                    <td className="p-3">菜</td>
                    <td className="p-3 font-mono">4.60</td>
                    <td className="p-3 font-mono">6.80</td>
                    <td className="p-3 font-mono font-bold text-amber-700">5.70</td>
                    <td className="p-3 font-mono">6.88</td>
                    <td className="p-3 font-mono text-[#1b365d]">530 ms</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-[#1b365d]">热狗</td>
                    <td className="p-3 font-mono text-gray-500">rè gǒu</td>
                    <td className="p-3">热</td>
                    <td className="p-3">狗</td>
                    <td className="p-3 font-mono">2.80</td>
                    <td className="p-3 font-mono">3.10</td>
                    <td className="p-3 font-mono font-bold text-amber-700">2.95</td>
                    <td className="p-3 font-mono">6.40</td>
                    <td className="p-3 font-mono text-[#1b365d]">584 ms</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-[#1b365d]">东西</td>
                    <td className="p-3 font-mono text-gray-500">dōng xī</td>
                    <td className="p-3">东</td>
                    <td className="p-3">西</td>
                    <td className="p-3 font-mono">1.20</td>
                    <td className="p-3 font-mono">1.10</td>
                    <td className="p-3 font-mono font-bold text-rose-700">1.15</td>
                    <td className="p-3 font-mono">6.95</td>
                    <td className="p-3 font-mono text-[#1b365d]">498 ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Included Tasks & Preprocessing */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-4">
              <h4 className="font-heading text-base font-bold text-[#1b365d] flex items-center gap-2">
                <Layers className="text-[#236869]" size={18} />
                <span>{lang === 'en' ? 'Norm Dimensions & Experimental Tasks' : '常模测定维度与实验范式'}</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-700">
                {(lang === 'en' ? activeDataset.tasksEn : activeDataset.tasksZh)?.map((task, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 p-2.5 bg-[#f8fafd] rounded-lg border border-gray-100">
                    <span className="w-5 h-5 rounded-full bg-[#236869] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-semibold text-[#1b365d]">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e8ee] shadow-2xs space-y-4">
              <h4 className="font-heading text-base font-bold text-[#1b365d] flex items-center gap-2">
                <ShieldCheck className="text-[#236869]" size={18} />
                <span>{lang === 'en' ? 'Citation & Licensing Guidelines' : '学术引用与数据共享准则'}</span>
              </h4>
              <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-sans">
                <p>
                  {lang === 'en'
                    ? 'The dataset is distributed under CC-BY 4.0 International license. Users may freely analyze, subset, or integrate the norms into computational psycholinguistic models with appropriate scholarly attribution.'
                    : '本常模数据集在知识共享 CC-BY 4.0 国际许可协议下公开发布。学术界可自由下载、检索、子集提取并整合至计算心理语言学模型中，使用时请规范注明出处。'}
                </p>
                <div className="p-3 bg-blue-50 text-[#1b365d] border border-blue-200 rounded-lg flex items-center gap-2 font-mono text-[11px]">
                  <ShieldCheck size={18} className="text-[#1b365d] shrink-0" />
                  <span>Double-blind Latin-square design with Cronbach α &gt; 0.92 reliability.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Dataset Modal for OSF Access and Documentation */}
      {modalMode && (
        <DatasetModal
          isOpen={true}
          mode={modalMode}
          onClose={() => setModalMode(null)}
          lang={lang}
          datasetId={activeId}
        />
      )}

    </div>
  );
};
