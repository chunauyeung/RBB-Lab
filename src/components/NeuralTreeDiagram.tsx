import React from 'react';
import { Language } from '../types';

interface NeuralTreeDiagramProps {
  lang: Language;
}

export const NeuralTreeDiagram: React.FC<NeuralTreeDiagramProps> = ({ lang }) => {
  return (
    <div className="relative w-full h-[280px] bg-gradient-to-b from-[#f8fafd] to-[#edf2f9] rounded-xl border border-[#e5e8ee] p-4 flex flex-col justify-between overflow-hidden shadow-xs">
      <div className="flex justify-between items-center text-[10px] font-mono text-[#1b365d] uppercase tracking-wider">
        <span className="font-semibold">NEURAL TREE VISUALIZATION</span>
        <span>FED Cohort Connectivity</span>
      </div>

      <div className="relative w-full h-[210px] flex items-center justify-center">
        <svg viewBox="0 0 400 240" className="w-full h-full max-w-[380px]">
          <defs>
            <linearGradient id="trunkGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#1b365d" />
              <stop offset="100%" stopColor="#236869" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#87a0cd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1b365d" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Tree Trunk & Main Branches */}
          <path
            d="M 200,230 L 200,160 M 200,180 C 180,150 140,130 110,100 M 200,180 C 220,150 260,130 290,100 M 200,160 C 170,120 130,80 80,60 M 200,160 C 230,120 270,80 320,60 M 200,140 C 190,100 160,70 140,40 M 200,140 C 210,100 240,70 260,40"
            stroke="url(#trunkGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Secondary Synaptic Branches */}
          <path
            d="M 110,100 C 90,80 60,70 40,50 M 110,100 C 120,80 130,60 120,40 M 290,100 C 310,80 340,70 360,50 M 290,100 C 280,80 270,60 280,40 M 140,40 C 130,30 110,20 100,10 M 260,40 C 270,30 290,20 300,10"
            stroke="#236869"
            strokeWidth="1.5"
            strokeDasharray="2 1"
            fill="none"
            opacity="0.8"
          />

          {/* Connectome Nodes / Data points */}
          {[
            { cx: 200, cy: 180 }, { cx: 200, cy: 160 }, { cx: 200, cy: 140 },
            { cx: 110, cy: 100 }, { cx: 290, cy: 100 }, { cx: 80, cy: 60 },
            { cx: 320, cy: 60 }, { cx: 140, cy: 40 }, { cx: 260, cy: 40 },
            { cx: 40, cy: 50 }, { cx: 120, cy: 40 }, { cx: 360, cy: 50 },
            { cx: 280, cy: 40 }, { cx: 100, cy: 10 }, { cx: 300, cy: 10 },
            { cx: 160, cy: 70 }, { cx: 240, cy: 70 }, { cx: 60, cy: 70 },
            { cx: 340, cy: 70 }
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.cx} cy={pt.cy} r="6" fill="url(#nodeGlow)" />
              <circle cx={pt.cx} cy={pt.cy} r="3" fill={i % 2 === 0 ? "#1b365d" : "#236869"} />
              <circle cx={pt.cx} cy={pt.cy} r="1" fill="#ffffff" />
            </g>
          ))}
        </svg>
      </div>

      <div className="text-center text-[11px] text-[#44474e] font-sans">
        {lang === 'en'
          ? 'Hierarchical fMRI Network Topology & Functional Connectome Tree'
          : '层级化 fMRI 网络拓扑与功能连接组图谱'}
      </div>
    </div>
  );
};
