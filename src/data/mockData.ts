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

export const ALL_PUBLICATIONS: ResearchPaper[] = [
  {
    id: 'paper-springer-2026',
    titleEn: 'Selective activation of sub-lexical syntactic information during Chinese word recognition',
    titleZh: '汉语词汇识别中亚词汇句法信息的选择性激活',
    abstractEn: 'Investigates the psychological reality and selective activation of sub-lexical syntactic information within the Chinese mental lexicon. Findings support a spreading activation framework where syntactic information contributes to lexical access as a partially independent, interacting component in a distributed lexical network.',
    abstractZh: '探讨中文心理词库中亚词汇句法信息的心理现实性与选择性激活机制，重点分析动词与名词加工差异。结果支持扩散激活模型，表明句法信息作为分布式词汇网络中相对独立又相互作用的组成部分参与词汇通达。',
    category: 'READING',
    linkTextEn: 'READ PAPER',
    linkTextZh: '阅读论文',
    authors: 'Yaxuan Meng, Chun Au-Yeung, Yuxin Hao, Dinghan Dong, Lisha Zhang, Fei Gao*',
    journal: 'Reading and Writing',
    year: 2026,
    volumeIssue: 'Springer (Sep 2026)',
    doi: '10.1007/s11145-026-10906-1',
    url: 'https://link.springer.com/article/10.1007/s11145-026-10906-1',
    featured: true,
    bibtex: `@article{meng2026selective,
  title={Selective activation of sub-lexical syntactic information during Chinese word recognition},
  author={Meng, Yaxuan and Au-Yeung, Chun and Hao, Yuxin and Dong, Dinghan and Zhang, Lisha and Gao, Fei},
  journal={Reading and Writing},
  year={2026},
  publisher={Springer},
  doi={10.1007/s11145-026-10906-1}
}`
  },
  {
    id: 'paper-sage-2026',
    titleEn: 'Multidisciplinary and Global Perspectives on Emoji and Emoticon Research: A Bibliometric Review and Research Agenda',
    titleZh: 'Emoji 与表情符号研究的多学科全球视角：文献计量学综述与未来研究议程',
    abstractEn: 'The use of emojis and emoticons has reshaped modern practices of online language usage and communication. Presents a comprehensive bibliometric review across multidisciplinary and global perspectives, mapping research trends and outlining an agenda for future cognitive and computational investigations.',
    abstractZh: 'Emoji 与网络表情符号深刻重塑了当代在线语言实践与数字交流模式。本研究基于文献计量学方法，系统梳理跨学科与全球视角的 emoji 研究脉络，构建该领域的知识图谱，并提出未来认知神经科学与计算语言学的研究议程。',
    category: 'COMPUTATIONAL',
    linkTextEn: 'READ PAPER',
    linkTextZh: '阅读论文',
    authors: 'Runshan Gui, Zikai Lin, Ke Huang, Guandong Yue, Chengwen Wang, Fei Gao*',
    journal: 'SAGE Open',
    year: 2026,
    volumeIssue: 'SAGE Publishing (Jun 2026)',
    doi: '10.1177/21582440261456453',
    url: 'https://journals.sagepub.com/doi/10.1177/21582440261456453',
    featured: true,
    bibtex: `@article{gui2026multidisciplinary,
  title={Multidisciplinary and Global Perspectives on Emoji and Emoticon Research: A Bibliometric Review and Research Agenda},
  author={Gui, Runshan and Lin, Zikai and Huang, Ke and Yue, Guandong and Wang, Chengwen and Gao, Fei},
  journal={SAGE Open},
  year={2026},
  publisher={SAGE Publications},
  doi={10.1177/21582440261456453}
}`
  },
  {
    id: 'paper-cambridge-2026',
    titleEn: 'The Brain Activity Flow in Language and Cognitive Control Networks Underlying Second Language Proficiency',
    titleZh: '二语熟练度下语言与认知控制脑网络活动流的神经机制',
    abstractEn: 'Investigating how language and cognitive control networks interact to support second language (L2) proficiency in the bilingual brain using gradient network analysis and dynamic causal modeling (DCM). Findings show high-proficiency L2 learners exhibit enhanced inhibitory connectivity from the language network to cognitive control networks.',
    abstractZh: '利用脑网络梯度分析与动态因果模型（DCM），揭示双语者大脑中语言网络与认知控制网络如何相互作用以支撑第二语言（L2）熟练度。高水平二语学习者表现出从语言网络向认知控制网络更强的抑制性连接，印证了二语发展对认知控制系统的重塑机制。',
    category: 'BILINGUALISM',
    linkTextEn: 'READ PAPER',
    linkTextZh: '阅读论文',
    authors: 'Fei Gao*, Yuwen He, Yuwen Lin, Songxiang Tang, Yaoyao Ning, Zhen Yuan',
    journal: 'Bilingualism: Language and Cognition',
    year: 2026,
    volumeIssue: 'Cambridge University Press (Apr 2026)',
    doi: '10.1017/S1366728926101163',
    url: 'https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/brain-activity-flow-in-language-and-cognitive-control-networks-underlying-second-language-proficiency/651F4998B3A59A6603B8743D773560A4',
    featured: true,
    bibtex: `@article{gao2026brainflow,
  title={The brain activity flow in language and cognitive control networks underlying second language proficiency},
  author={Gao, Fei and He, Yuwen and Lin, Yuwen and Tang, Songxiang and Ning, Yaoyao and Yuan, Zhen},
  journal={Bilingualism: Language and Cognition},
  year={2026},
  publisher={Cambridge University Press},
  doi={10.1017/S1366728926101163}
}`
  },
  {
    id: 'paper-nature-2025',
    titleEn: 'Re-examining Second Language Acquisition of English Reflexives: New Evidence for Lexical Learning Driven Process and Against First Language Transfer',
    titleZh: '再探英语反身代词二语习得：词汇学习驱动过程的新证据及对母语迁移说的反思',
    abstractEn: 'Tests L1-Chinese learners of L2 English and native English speakers to show that errors in long-distance reflexive bindings mirror developmental acquisition patterns in native English children rather than L1 transfer. Supports the Lexical Learning Hypothesis over traditional language transfer accounts.',
    abstractZh: '通过对以汉语为母语的英语学习者与英语母语者进行实证实验，证实二语学习者在远距离反身代词指称上的偏误反映了与母语儿童习得相似的认知发展阶段，而非母语迁移所致，有力支持了词汇学习驱动假说。',
    category: 'SLA',
    linkTextEn: 'READ PAPER',
    linkTextZh: '阅读论文',
    authors: 'Li Zeng, Fei Gao*',
    journal: 'Humanities and Social Sciences Communications',
    year: 2025,
    volumeIssue: 'Nature Portfolio, 12(1) (Jul 2025)',
    doi: '10.1057/s41599-025-05466-8',
    url: 'https://www.nature.com/articles/s41599-025-05466-8',
    featured: false,
    bibtex: `@article{zeng2025reflexives,
  title={Re-examining second language acquisition of English reflexives: new evidence for lexical learning driven process and against first language Transfer},
  author={Zeng, Li and Gao, Fei},
  journal={Humanities and Social Sciences Communications},
  volume={12},
  number={1},
  year={2025},
  publisher={Nature Publishing Group},
  doi={10.1057/s41599-025-05466-8}
}`
  }
];

export const FEATURED_RESEARCH: ResearchPaper[] = ALL_PUBLICATIONS.slice(0, 3);

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    date: 'OCT 12, 2024',
    titleEn: 'Associate Researcher Fei Gao presents keynote at SNL 2024',
    titleZh: '高飞副研究员在 2024 神经语言学学会 (SNL) 年会作主旨报告',
    summaryEn: 'Discussing new findings on the bilingual advantage in executive control networks.',
    summaryZh: '围绕“双语经历对执行控制网络的塑造机制”分享最新研究成果。',
    category: 'Keynote',
    contentEn: 'At the Society for the Neurobiology of Language (SNL) Annual Meeting held in Helsinki, Associate Researcher Fei Gao delivered a plenary talk titled "Dynamic Plasticity of the Reading Network in Multi-script Bilinguals". The lecture highlighted recent high-resolution fMRI findings from the FED cohort.',
    contentZh: '在赫尔辛基举行的神经语言学学会（SNL）年会上，高飞副研究员发表了题为“多书写系统双语者阅读网络的动态可塑性”的主题演讲，重点展示了来自 FED 队列的高分辨率 fMRI 最新研究成果。'
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
    roleEn: "ASSOCIATE RESEARCHER / MASTER'S ADVISOR",
    roleZh: '副研究员 / 硕士生导师',
    category: 'pi',
    image: '/images/team/gao-fei.jpg',
    bioEn: 'Associate Researcher Fei Gao directs the Reading, Bilingualism, and Brain Lab. His research focuses on psycholinguistics/neurolinguistics, Chinese reading (lexical processing), SLA & bilingual cognition, and neuroimaging (EEG, fNIRS, fMRI).',
    bioZh: '高飞副研究员主持实验室工作。主要研究方向包括心理/神经语言学、汉语阅读（侧重词汇加工）、第二语言习得与双语认知，以及脑成像技术（EEG, fNIRS, fMRI）。',
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
    roleEn: 'Master Student',
    roleZh: '硕士研究生',
    category: 'graduate',
    image: '/images/team/ouyang-jun.jpg',
    interestsEn: ['Semantic processing mechanisms in bilinguals'],
    interestsZh: ['双语者语义加工机制']
  },
  {
    id: 'yang-qian',
    nameEn: 'Qian Yang',
    nameZh: '杨倩',
    roleEn: 'Master Student',
    roleZh: '硕士研究生',
    category: 'graduate',
    image: '/images/team/yang-qian.jpg',
    interestsEn: ['Semantic processing mechanisms in bilinguals'],
    interestsZh: ['双语者语义加工机制']
  },
  {
    id: 'chen-xingchi',
    nameEn: 'Xingchi Chen',
    nameZh: '陈星池',
    roleEn: 'Master Student',
    roleZh: '硕士研究生',
    category: 'graduate',
    image: '/images/team/chen-xingchi.jpg',
    interestsEn: ['Semantic processing mechanisms in bilinguals'],
    interestsZh: ['双语者语义加工机制']
  },
  {
    id: 'sasahira-ken',
    nameEn: 'Ken Sasahira',
    nameZh: '笹平贤',
    roleEn: 'Master Student',
    roleZh: '硕士研究生',
    category: 'graduate',
    image: '/images/team/sasahira-ken.jpg',
    interestsEn: ['Bilingual cognitive control and neural representations'],
    interestsZh: ['双语认知控制与神经表征机制']
  },
  {
    id: 'yan-chenglin',
    nameEn: 'Chenglin Yan',
    nameZh: '阎承麟',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: '/images/team/yan-chenglin.jpg'
  },
  {
    id: 'han-muru',
    nameEn: 'Muru Han',
    nameZh: '韩穆如',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: '/images/team/han-muru.jpg'
  },
  {
    id: 'gui-runshan',
    nameEn: 'Runshan Gui',
    nameZh: '桂润山',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: '/images/team/gui-runshan.jpg'
  },
  {
    id: 'miao-peida',
    nameEn: 'Peida Miao',
    nameZh: '缪沛达',
    roleEn: 'Undergraduate Student',
    roleZh: '本科生',
    category: 'undergraduate',
    image: '/images/team/miao-peida.jpg'
  },
  {
    id: 'huang-ke',
    nameEn: 'Ke Huang',
    nameZh: '黄可',
    roleEn: 'Alumni',
    roleZh: '历届成员',
    category: 'alumni',
    image: '/images/team/huang-ke.jpg'
  },
  {
    id: 'lin-zikai',
    nameEn: 'Zikai Lin',
    nameZh: '林子开',
    roleEn: 'Alumni',
    roleZh: '历届成员',
    category: 'alumni',
    image: '/images/team/lin-zikai.jpg'
  }
];

export const DATASET_LIST: DatasetItem[] = [
  {
    id: 'fed-dataset',
    name: 'Fudan Emoji Dataset',
    nameEn: 'Fudan Emoji Dataset',
    nameZh: '复旦emoji数据集',
    shortName: 'FED',
    badgeEn: 'SEMANTIC & AFFECTIVE NORMATIVE DATASET',
    badgeZh: '语义与情感常模数据集',
    summaryEn: 'Fudan Emoji Dataset (FED), a semantic and affective normative dataset containing 359 commonly used emojis in Chinese context and systematically distinguishing emotion-oriented and meaning-oriented emojis. FED provides subjective ratings on 12 dimensions, description-based vector embeddings and four data-driven uncertainty metrics.',
    summaryZh: '复旦emoji数据集（Fudan Emoji Dataset, FED）是一个面向中文语境的语义与情感常模数据集，共收录 359 个中文常用 emoji 表情符号，并系统区分情绪导向与意义导向的 emoji。FED 提供了 12 个维度的主观评定常模、基于文字描述的向量嵌入（Vector Embeddings）以及四项数据驱动的不确定性指标。',
    subjectsCount: '359 Emojis',
    itemsCount: '359 Emojis',
    modality: 'Subjective Ratings & Vector Embeddings',
    modalityEn: 'Subjective Ratings on 12 Dimensions & Vector Embeddings',
    modalityZh: '12 维度主观评定常模与描述向量嵌入',
    tasks: [
      'Subjective ratings on 12 dimensions',
      'Distinction between emotion-oriented and meaning-oriented emojis',
      'Description-based vector embeddings',
      'Four data-driven uncertainty metrics'
    ],
    tasksEn: [
      'Subjective ratings on 12 dimensions',
      'Distinction between emotion-oriented and meaning-oriented emojis',
      'Description-based vector embeddings',
      'Four data-driven uncertainty metrics'
    ],
    tasksZh: [
      '12 个维度的主观评定常模',
      '系统区分情绪导向与意义导向的 emoji',
      '基于文字描述的向量嵌入 (Vector Embeddings)',
      '4 项数据驱动的不确定性指标 (Uncertainty Metrics)'
    ],
    totalSize: 'Open Science Framework (OSF)',
    bidsCompliant: false,
    complianceEn: 'Open Science Framework (OSF) / https://osf.io/x643z/',
    complianceZh: '开放科学框架 (OSF) / https://osf.io/x643z/',
    fmriPrepIncluded: false,
    highlightsEn: [
      '359 commonly used emojis in Chinese context',
      'Systematically distinguishing emotion-oriented and meaning-oriented emojis',
      'Subjective ratings on 12 dimensions',
      'Description-based vector embeddings and four data-driven uncertainty metrics'
    ],
    highlightsZh: [
      '中文语境下 359 个常用 emoji 表情符号',
      '系统区分情绪导向与意义导向的 emoji',
      '提供 12 个维度的主观评定常模',
      '包含基于文字描述的向量嵌入与四项数据驱动不确定性指标'
    ]
  }
];

export const DATASET_INFO: DatasetItem = DATASET_LIST[0];
