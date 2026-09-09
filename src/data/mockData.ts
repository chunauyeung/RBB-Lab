import { ResearchPaper, NewsItem, TeamMember, ResearchArea, ResearchMethod, DatasetItem } from '../types';

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'lexical-processing',
    titleEn: 'Lexical Processing',
    titleZh: '词汇加工',
    subTitleEn: 'Orthographic, Phonological & Semantic Access',
    subTitleZh: '词形、词音、词义与词法加工机制',
    descEn: 'Investigating the cognitive and neural mechanisms of word recognition, orthographic-to-phonological mapping, morphological decomposition, and semantic access in reading.',
    descZh: '探究阅读过程中字形（Form）、字音（Sound）、字义（Meaning）提取以及词法分析的认知与神经机制，揭示文字识别与语义理解的底层基础。',
    tags: ['Orthography', 'Phonology', 'Semantics', 'Morphology', 'Word Recognition'],
    icon: 'BookOpen'
  },
  {
    id: 'database-construction',
    titleEn: 'Database Construction',
    titleZh: '数据库构建',
    subTitleEn: 'Large-Scale Normative Databases for Chinese',
    subTitleZh: '基于汉语特征的大规模常模数据库',
    descEn: 'Constructing large-scale behavioral, eye-tracking, and neuroimaging normative datasets tailored to Chinese linguistic properties, establishing open-science benchmarks.',
    descZh: '结合汉语特有的字词与语法特征，构建覆盖行为、眼动与脑成像的大规模常模数据库，为认知神经科学与语言评估提供标准化开放数据平台。',
    tags: ['Chinese Norms', 'Linguistic Database', 'Behavioral Data', 'Open Science'],
    icon: 'Database'
  },
  {
    id: 'sla-learning-science',
    titleEn: 'SLA & Learning Science',
    titleZh: '二语习得与学习科学',
    subTitleEn: 'Learning Dynamics, Plasticity & Control',
    subTitleZh: '语言学习机制、大脑可塑性与认知调控',
    descEn: 'Uncovering the developmental trajectories of L2 acquisition, structural and functional brain plasticity during learning, and executive control mechanisms optimizing language mastery.',
    descZh: '揭示第二语言学习的认知与神经轨迹、学习过程中大脑结构与功能的可塑性变化，以及认知调控与干预机制在高效语言学习中的作用。',
    tags: ['Learning Dynamics', 'Brain Plasticity', 'Cognitive Control', 'L2 Acquisition'],
    icon: 'TrendingUp'
  },
  {
    id: 'bilingual-processing',
    titleEn: 'Bilingual Processing',
    titleZh: '双语加工',
    subTitleEn: 'Bilingual Control, Code-Switching & Thought',
    subTitleZh: '双语控制、语码转换与语言-思维互构',
    descEn: 'Exploring executive control networks during code-switching and bilingual selection, and how dual-language experience alters brain networks and shapes cognitive flexibility.',
    descZh: '探讨双语者在语码转换与双语选择中的神经抑制与激活重构，研究双语经验如何重塑脑网络、增强认知弹性并影响语言与思维的关系。',
    tags: ['Code-Switching', 'Bilingual Control', 'Cognitive Flexibility', 'Language & Thought'],
    icon: 'GitFork'
  }
];

export const RESEARCH_METHODS: ResearchMethod[] = [
  {
    id: 'neuroimaging',
    categoryEn: 'Neuroimaging Techniques',
    categoryZh: '脑成像技术',
    itemsEn: ['High Temporal Resolution EEG/ERP', 'Functional Near-Infrared Spectroscopy (fNIRS)', 'High-field Functional MRI (fMRI)'],
    itemsZh: ['高时间分辨率 EEG / ERP 脑电技术', '近红外脑功能成像技术 (fNIRS)', '高场功能磁共振成像技术 (fMRI)'],
    icon: 'Activity'
  },
  {
    id: 'behavioral',
    categoryEn: 'Behavioral Research',
    categoryZh: '行为研究',
    itemsEn: ['Reaction Time & Accuracy Paradigms', 'Psychometric Scales & Questionnaires'],
    itemsZh: ['反应时与正确率实验范式', '标准化心理量表与问卷调查'],
    icon: 'MonitorCheck'
  },
  {
    id: 'computational',
    categoryEn: 'Computational Modeling',
    categoryZh: '计算建模',
    itemsEn: ['Deep Neural Network Models', 'Algorithmic Simulation & Natural Language Processing'],
    itemsZh: ['深度神经网络模型', '语言加工算法模拟与计算语言学 (</>)'],
    icon: 'Code'
  }
];

export const FEATURED_RESEARCH: ResearchPaper[] = [
  {
    id: 'paper-1',
    titleEn: 'Brain Activity Flow in Language and Cognitive Control Networks Underlying Second Language Proficiency',
    titleZh: '二语熟练度下语言与认知控制脑网络活动流的神经调控机制',
    abstractEn: 'Employing gradient network and dynamic causal modeling (DCM) approaches in Chinese-English bilinguals to reveal how second language proficiency development modulates inhibitory connectivity from the language network to cognitive control networks.',
    abstractZh: '采用梯度网络与动态因果模型（DCM），揭示汉英双语者二语熟练度提升如何调控从语言网络到认知控制网络的抑制性连接，为双语系统的脑网络交互与认知控制提供新见解。',
    category: 'BILINGUALISM',
    linkTextEn: 'READ PAPER',
    linkTextZh: '阅读论文',
    authors: 'Gao, Fei, et al.',
    journal: 'Bilingualism: Language and Cognition',
    year: 2026,
    volumeIssue: 'Cambridge University Press',
    doi: '10.1017/S136672892500012X',
    url: 'https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/brain-activity-flow-in-language-and-cognitive-control-networks-underlying-second-language-proficiency/651F4998B3A59A6603B8743D773560A4',
    featured: true,
    bibtex: `@article{gao2026brainflow,
  title={Brain activity flow in language and cognitive control networks underlying second language proficiency},
  author={Gao, Fei and others},
  journal={Bilingualism: Language and Cognition},
  year={2026},
  publisher={Cambridge University Press}
}`
  },
  {
    id: 'paper-2',
    titleEn: 'Dynamic Brain Reorganization and the Role of Motivation During the Learning of a Foreign Language',
    titleZh: '外语学习过程中脑网络的动态重组与动机的调控作用',
    abstractEn: 'Uncovering how foreign language learning induces dynamic structural-functional brain reorganization and how intrinsic/extrinsic motivation modulates functional network segregation and coupling during language acquisition.',
    abstractZh: '探索外语学习过程中脑网络的动态结构与功能重组，揭示学习动机如何深刻调控功能网络分隔与结构-功能耦合，为语言教育与神经干预策略提供理论支持。',
    category: 'SLA',
    linkTextEn: 'READ PAPER',
    linkTextZh: '阅读论文',
    authors: 'Gao, Fei, Zeng, Xinglin, et al.',
    journal: 'Psychonomic Bulletin & Review',
    year: 2026,
    volumeIssue: 'Springer',
    doi: '10.3758/s13423-026-02916-5',
    url: 'https://link.springer.com/article/10.3758/s13423-026-02916-5',
    featured: true,
    bibtex: `@article{gao2026dynamic,
  title={Dynamic brain reorganization and the role of motivation during the learning of a foreign language},
  author={Gao, Fei and Zeng, Xinglin and others},
  journal={Psychonomic Bulletin \& Review},
  year={2026},
  publisher={Springer},
  doi={10.3758/s13423-026-02916-5}
}`
  },
  {
    id: 'paper-3',
    titleEn: 'Functional Neuroanatomy and Cognitive Mechanisms of Reading in Bilinguals',
    titleZh: '双语阅读的脑功能解剖与认知控制机制研究',
    abstractEn: 'Investigating functional connectivity and neuroanatomical networks during word reading in bilingual populations to uncover cross-linguistic reading pathways and cognitive regulation.',
    abstractZh: '深入分析双语者与单语者在词汇阅读过程中的脑功能连接与神经解剖特征，揭示跨语言阅读网络重构与认知控制的调控机制。',
    category: 'READING',
    linkTextEn: 'READ PAPER',
    linkTextZh: '阅读论文',
    authors: 'Gao, Fei, et al.',
    journal: 'SAGE Open',
    year: 2026,
    volumeIssue: '16(1)',
    doi: '10.1177/21582440261456453',
    url: 'https://journals.sagepub.com/doi/10.1177/21582440261456453?utm_source=researchgate.net&utm_medium=article',
    featured: true,
    bibtex: `@article{gao2026functional,
  title={Functional neuroanatomy and cognitive mechanisms of reading in bilinguals},
  author={Gao, Fei and others},
  journal={SAGE Open},
  year={2026},
  doi={10.1177/21582440261456453}
}`
  }
];

export const ALL_PUBLICATIONS: ResearchPaper[] = [
  ...FEATURED_RESEARCH
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    date: 'OCT 12, 2024',
    titleEn: 'Dr. Gao presents keynote at SNL 2024',
    titleZh: '高飞教授在 2024 神经语言学学会 (SNL) 年会作主旨报告',
    summaryEn: 'Discussing new findings on the bilingual advantage in executive control networks.',
    summaryZh: '围绕“双语经历对执行控制网络的塑造机制”分享最新研究成果。',
    category: 'Keynote',
    contentEn: 'At the Society for the Neurobiology of Language (SNL) Annual Meeting held in Helsinki, Dr. Gao Fei delivered a plenary talk titled "Dynamic Plasticity of the Reading Network in Multi-script Bilinguals". The lecture highlighted recent high-resolution fMRI findings from the FED cohort.',
    contentZh: '在赫尔辛基举行的神经语言学学会（SNL）年会上，高飞教授发表了题为“多书写系统双语者阅读网络的动态可塑性”的主题演讲，重点展示了来自 FED 队列的高分辨率 fMRI 最新研究成果。'
  },
  {
    id: 'news-2',
    date: 'SEP 28, 2024',
    titleEn: 'New paper published in Nature Neuroscience',
    titleZh: '实验室最新研究成果于《Nature Neuroscience》发表',
    summaryEn: 'Our collaborative study on tonal language processing and auditory cortex mapping is now online.',
    summaryZh: '关于声调语言加工与听觉皮层功能重构的合作研究成果正式在线发表。',
    category: 'Publication',
    contentEn: 'In collaboration with international imaging centers, our latest empirical investigation reveals how lexical tone recognition relies on bilateral superior temporal gyrus fine-grained neural tuning in native Mandarin speakers.',
    contentZh: '与国际成像中心合作，实验室关于汉语母语者声调识别如何依赖双侧颞上回精细神经调控机制的实证研究成果正式上线。'
  },
  {
    id: 'news-3',
    date: 'AUG 15, 2024',
    titleEn: 'Welcoming new Post-doctoral researchers',
    titleZh: '热烈欢迎新一期博士后研究人员加盟实验室',
    summaryEn: 'The lab is thrilled to welcome Dr. Chen and Dr. Smith for the upcoming academic year.',
    summaryZh: '实验室热烈欢迎 陈博士 与 Smith 博士 开展新一学年的认知神经科学博士后研究。',
    category: 'Team',
    contentEn: 'We expand our multidisciplinary capabilities with two post-docs joining from Stanford and Oxford, specializing in MEG neural oscillations and computational language modeling.',
    contentZh: '来自斯坦福和牛津的两名新博士后研究人员加盟实验室，分别研究 MEG 脑电振荡和计算语言模型。'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'gao-fei',
    nameEn: 'Fei Gao (高飞)',
    nameZh: '高飞 (Fei Gao)',
    roleEn: 'PRINCIPAL INVESTIGATOR / PH.D.',
    roleZh: '实验室负责人 / 博士生导师',
    category: 'pi',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    bioEn: 'Dr. Gao directs the Reading, Bilingualism, and Brain Lab. His research focuses on psycholinguistics/neurolinguistics, Chinese reading (lexical processing), SLA & bilingual cognition, and neuroimaging (EEG, fNIRS, fMRI).',
    bioZh: '高飞博士主持实验室工作。主要研究方向包括心理/神经语言学、汉语阅读（侧重词汇加工）、第二语言习得与双语认知，以及脑成像技术（EEG, fNIRS, fMRI）。',
    interestsEn: [
      'Psycho / Neurolinguistics',
      'Chinese Reading (Focus on Lexical Processing)',
      'Second Language Acquisition & Bilingual Cognition',
      'Neuroimaging (EEG, fNIRS, fMRI)'
    ],
    interestsZh: [
      '心理/神经语言学',
      '汉语阅读（侧重词汇加工）',
      '第二语言习得与双语认知',
      '脑成像（EEG, fNIRS, fMRI）'
    ],
    email: 'feigao@fudan.edu.cn'
  },
  {
    id: 'ouyang-jun',
    nameEn: 'Chun Au-Yeung',
    nameZh: '欧阳骏',
    roleEn: "Master's Student",
    roleZh: '硕士研究生',
    category: 'graduate',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    interestsEn: ['Semantic processing mechanisms in bilinguals'],
    interestsZh: ['双语者语义加工机制']
  },
  {
    id: 'yang-qian',
    nameEn: 'Qian Yang',
    nameZh: '杨倩',
    roleEn: "Master's Student",
    roleZh: '硕士研究生',
    category: 'graduate',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    interestsEn: ['Semantic processing mechanisms in bilinguals'],
    interestsZh: ['双语者语义加工机制']
  },
  {
    id: 'chen-xingchi',
    nameEn: 'Xingchi Chen',
    nameZh: '陈星池',
    roleEn: "Master's Student",
    roleZh: '硕士研究生',
    category: 'graduate',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
    interestsEn: ['Semantic processing mechanisms in bilinguals'],
    interestsZh: ['双语者语义加工机制']
  },
  {
    id: 'peng-yihong',
    nameEn: 'Yihong Peng',
    nameZh: '彭一洪',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'yan-chenglin',
    nameEn: 'Chenglin Yan',
    nameZh: '阎承麟',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'han-muru',
    nameEn: 'Muru Han',
    nameZh: '韩穆如',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'gui-runshan',
    nameEn: 'Runshan Gui',
    nameZh: '桂润山',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'huang-ke',
    nameEn: 'Ke Huang',
    nameZh: '黄可',
    roleEn: 'Alumni',
    roleZh: '历届成员',
    category: 'alumni',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'lin-zikai',
    nameEn: 'Zikai Lin',
    nameZh: '林子开',
    roleEn: 'Alumni',
    roleZh: '历届成员',
    category: 'alumni',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80'
  }
];

export const DATASET_INFO: DatasetItem = {
  id: 'fed-dataset',
  name: 'FED Dataset (FED数据集)',
  subjectsCount: 120,
  modality: 'fMRI (3T High-resolution functional scans)',
  tasks: ['Semantic Judgment', 'Lexical Decision', 'Resting State', 'Behavioral Batteries'],
  totalSize: '~2.4 TB',
  bidsCompliant: true,
  fmriPrepIncluded: true
};
