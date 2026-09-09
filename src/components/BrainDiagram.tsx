import React from 'react';
import { Language } from '../types';

interface BrainDiagramProps {
  lang?: Language;
}

export const BrainDiagram: React.FC<BrainDiagramProps> = () => {
  return (
    <div className="relative w-full bg-[#0d1b2a] text-white rounded-2xl p-6 border border-[#1b365d] shadow-xl overflow-hidden">
      {/* Background Scientific Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #415a77 1px, transparent 1px),
            linear-gradient(to bottom, #415a77 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header Info Specs */}
      <div className="relative z-10 flex justify-between items-center text-[11px] font-mono tracking-wider text-slate-400 border-b border-slate-800/80 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
          <span className="text-slate-200 font-semibold uppercase">3T fMRI Cortical & Tractography Model</span>
        </div>
        <div className="hidden sm:flex gap-4 text-slate-400">
          <span>MNI152 Standard Space</span>
          <span>Resolution: 1.5mm³</span>
        </div>
      </div>

      {/* Vector Brain Graphics Stage */}
      <div className="relative w-full h-[320px] flex items-center justify-center">
        <svg viewBox="0 0 520 340" className="w-full h-full max-w-[500px]">
          <defs>
            {/* Soft Ambient Radial Glow */}
            <radialGradient id="brainCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#0f172a" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0d1b2a" stopOpacity="0" />
            </radialGradient>

            {/* Neural Fiber Gradients */}
            <linearGradient id="tractArcuate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            <linearGradient id="tractVwfa" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="cortexFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </linearGradient>

            <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Ambient Radial Glow */}
          <ellipse cx="260" cy="170" rx="180" ry="120" fill="url(#brainCoreGlow)" />

          {/* Outer Brain Contour Envelope */}
          <path
            d="M 140 180 C 110 140 120 80 190 55 C 250 35 340 35 400 70 C 450 100 460 160 425 205 C 390 245 340 255 290 255 C 240 255 190 245 155 220 C 135 205 130 195 140 180 Z"
            fill="url(#cortexFill)"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Anatomical Structural Sulci & Gyri Lines */}
          <path
            d="M 190 55 Q 220 110 180 150 T 210 200"
            fill="none" stroke="#475569" strokeWidth="1.5" opacity="0.6"
          />
          <path
            d="M 250 40 Q 270 105 230 155 T 270 220"
            fill="none" stroke="#475569" strokeWidth="1.5" opacity="0.6"
          />
          <path
            d="M 320 45 Q 340 110 300 165 T 340 230"
            fill="none" stroke="#475569" strokeWidth="1.5" opacity="0.6"
          />
          <path
            d="M 150 140 Q 210 130 270 150 T 380 140"
            fill="none" stroke="#475569" strokeWidth="1.5" opacity="0.7"
          />

          {/* Cerebellum & Brainstem outline */}
          <path
            d="M 320 235 C 360 235 410 235 415 270 C 415 295 380 310 340 310 C 310 310 300 280 295 255 Z"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="1.5"
          />
          <path
            d="M 285 255 C 285 285 280 315 270 330 L 245 330 C 255 305 260 280 260 255 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
          />

          {/* Neural Tract 1: Arcuate Fasciculus (Frontal to Temporal Language Loop) */}
          <path
            d="M 180 130 C 210 70 330 70 360 150 C 370 180 320 220 260 200"
            fill="none"
            stroke="url(#tractArcuate)"
            strokeWidth="3"
            filter="url(#subtleGlow)"
            opacity="0.9"
          />

          {/* Neural Tract 2: Ventral Occipito-Temporal Stream (VWFA Pathway) */}
          <path
            d="M 180 180 Q 250 170 320 185 T 410 160"
            fill="none"
            stroke="url(#tractVwfa)"
            strokeWidth="2.5"
            filter="url(#subtleGlow)"
            opacity="0.85"
          />

          {/* Neural Network Nodes & Connectome Links */}
          {/* Fiber Mesh Connections */}
          <line x1="180" y1="130" x2="260" y2="120" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <line x1="260" y1="120" x2="360" y2="150" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <line x1="180" y1="130" x2="180" y2="180" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          <line x1="260" y1="200" x2="320" y2="185" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
          <line x1="260" y1="120" x2="260" y2="200" stroke="#c084fc" strokeWidth="1" opacity="0.3" />

          {/* Node Hub 1: Broca's Area (Frontal) */}
          <g transform="translate(180, 130)">
            <circle r="7" fill="#0284c7" fillOpacity="0.3" />
            <circle r="4" fill="#38bdf8" />
            <circle r="1.5" fill="#ffffff" />
          </g>

          {/* Node Hub 2: Wernicke's Area (Temporal) */}
          <g transform="translate(360, 150)">
            <circle r="7" fill="#6366f1" fillOpacity="0.3" />
            <circle r="4" fill="#818cf8" />
            <circle r="1.5" fill="#ffffff" />
          </g>

          {/* Node Hub 3: Visual Word Form Area (VWFA) */}
          <g transform="translate(320, 185)">
            <circle r="7" fill="#0d9488" fillOpacity="0.3" />
            <circle r="4" fill="#2dd4bf" />
            <circle r="1.5" fill="#ffffff" />
          </g>

          {/* Node Hub 4: Executive Control (DLPFC) */}
          <g transform="translate(260, 120)">
            <circle r="6" fill="#9333ea" fillOpacity="0.3" />
            <circle r="3.5" fill="#c084fc" />
            <circle r="1.5" fill="#ffffff" />
          </g>

          {/* Scientific Callout Lines & Precision Labels */}
          {/* Callout 1: Frontal Lobe */}
          <g>
            <line x1="180" y1="130" x2="120" y2="80" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
            <line x1="120" y1="80" x2="70" y2="80" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
            <circle cx="70" cy="80" r="2" fill="#38bdf8" />
            <text x="65" y="73" fill="#e2e8f0" fontSize="10" fontFamily="monospace" textAnchor="end" fontWeight="600">
              FRONTO-PARIETAL NETWORK
            </text>
            <text x="65" y="93" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="end">
              Syntax & Lexical Selection
            </text>
          </g>

          {/* Callout 2: Arcuate Fasciculus */}
          <g>
            <line x1="270" y1="82" x2="320" y2="40" stroke="#818cf8" strokeWidth="1" opacity="0.6" />
            <line x1="320" y1="40" x2="380" y2="40" stroke="#818cf8" strokeWidth="1" opacity="0.6" />
            <circle cx="380" cy="40" r="2" fill="#818cf8" />
            <text x="385" y="36" fill="#e2e8f0" fontSize="10" fontFamily="monospace" textAnchor="start" fontWeight="600">
              ARCUATE TRACT
            </text>
            <text x="385" y="52" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="start">
              Dorsal Phonological Stream
            </text>
          </g>

          {/* Callout 3: VWFA / Ventral Stream */}
          <g>
            <line x1="320" y1="185" x2="370" y2="245" stroke="#2dd4bf" strokeWidth="1" opacity="0.6" />
            <line x1="370" y1="245" x2="440" y2="245" stroke="#2dd4bf" strokeWidth="1" opacity="0.6" />
            <circle cx="440" cy="245" r="2" fill="#2dd4bf" />
            <text x="445" y="241" fill="#e2e8f0" fontSize="10" fontFamily="monospace" textAnchor="start" fontWeight="600">
              VWFA PATHWAY
            </text>
            <text x="445" y="257" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="start">
              Visual Orthographic Parsing
            </text>
          </g>

          {/* Coordinate Scale Ticks */}
          <g stroke="#334155" strokeWidth="1">
            <line x1="50" y1="300" x2="150" y2="300" />
            <line x1="50" y1="296" x2="50" y2="304" />
            <line x1="100" y1="297" x2="100" y2="303" />
            <line x1="150" y1="296" x2="150" y2="304" />
            <text x="100" y="315" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
              SCALE: 50 mm
            </text>
          </g>
        </svg>
      </div>

      {/* Legend & Specifications Footer */}
      <div className="mt-2 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-[#38bdf8]"></span>
          <span>Dorsal Stream</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-[#2dd4bf]"></span>
          <span>Ventral Stream</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end text-slate-400">
          <span>fMRI Signal: BOLD</span>
        </div>
      </div>
    </div>
  );
};


