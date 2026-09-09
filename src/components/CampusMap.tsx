import React, { useState, useRef } from 'react';
import { Star, MapPin, Upload, RotateCcw, Camera, Plus, Trash2, Edit3, X, Check } from 'lucide-react';
import { Language } from '../types';

interface CampusMapProps {
  lang: Language;
}

interface Marker {
  id: string;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
  label: string;
}

const DEFAULT_MARKERS: Marker[] = [
  {
    id: 'lab-244',
    xPercent: 45.1,
    yPercent: 21.3,
    label: '⭐ 实验室位置：244室'
  }
];

export const CampusMap: React.FC<CampusMapProps> = ({ lang }) => {
  const [customMapImage, setCustomMapImage] = useState<string | null>(() => {
    const preloaded = typeof window !== 'undefined' ? ((window as any).__PRELOADED_FEIGAO_DATA__ || {}) : {};
    if (preloaded['feigao_custom_map_image']) {
      return preloaded['feigao_custom_map_image'];
    }
    try {
      return localStorage.getItem('feigao_custom_map_image') || null;
    } catch (e) {
      return null;
    }
  });

  // Load custom markers or defaults
  const [markers] = useState<Marker[]>(() => {
    const preloaded = typeof window !== 'undefined' ? ((window as any).__PRELOADED_FEIGAO_DATA__ || {}) : {};
    if (preloaded['feigao_map_markers']) {
      try {
        return JSON.parse(preloaded['feigao_map_markers']);
      } catch (e) {}
    }
    try {
      const saved = localStorage.getItem('feigao_map_markers');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_MARKERS;
  });

  const handleMapUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomMapImage(result);
          localStorage.setItem('feigao_custom_map_image', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetMap = () => {
    setCustomMapImage(null);
    localStorage.removeItem('feigao_custom_map_image');
  };

  // Helper to format marker label and filter out any "marker" or default placeholder text
  const getCleanLabel = (label: string) => {
    if (!label) return '';
    const cleaned = label
      .replace(/new star marker|star marker|marker|新星标位置|星标/gi, '')
      .trim();
    return cleaned;
  };

  return (
    <div className="relative w-full bg-[#f4f7f6] rounded-2xl border border-[#dce3de] shadow-md overflow-hidden flex flex-col font-sans">
      
      {/* Top Map Action Bar */}
      <div className="bg-[#1b365d] text-white px-4 py-2.5 flex flex-wrap justify-between items-center text-xs font-mono gap-2">
        <div className="flex items-center gap-2">
          <Star size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
          <span className="font-semibold tracking-wider uppercase">
            {lang === 'en' ? 'Fudan Handan Campus Map' : '复旦大学邯郸校区 - 导览地图'}
          </span>
        </div>

        {/* Upload & Reset Map controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <label className="px-2.5 py-1 bg-amber-400 text-[#1b365d] hover:bg-amber-300 text-[11px] font-bold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-2xs">
            <Upload size={12} />
            <span>{lang === 'en' ? 'Upload Map' : '上传/替换地图'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleMapUpload} />
          </label>

          {customMapImage && (
            <button
              onClick={handleResetMap}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold rounded transition-colors flex items-center gap-1"
              title={lang === 'en' ? 'Reset Map' : '恢复默认地图'}
            >
              <RotateCcw size={12} />
              <span>{lang === 'en' ? 'Reset' : '恢复默认'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[460px] bg-[#f4f7f6] flex items-center justify-center overflow-hidden select-none group">
        {customMapImage ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={customMapImage}
              alt="Custom Campus Map"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ) : (
          <svg viewBox="0 0 820 540" className="w-full h-full object-contain pointer-events-none">
            <defs>
              <pattern id="campusGrass" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="24" height="24" fill="#dce8dc" />
                <circle cx="12" cy="12" r="1.2" fill="#c7dbc7" />
              </pattern>
            </defs>

            <rect width="820" height="540" fill="url(#campusGrass)" />

            <rect x="10" y="55" width="800" height="30" fill="#fcfce8" stroke="#cbdccb" strokeWidth="1.5" rx="3" />
            <line x1="10" y1="70" x2="810" y2="70" stroke="#ffffff" strokeWidth="4" strokeDasharray="14 8" />
            <text x="410" y="74" fill="#4d7c58" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              漫 步 道
            </text>

            <path d="M 120 440 L 810 440" stroke="#fcfce8" strokeWidth="22" strokeLinecap="round" />
            <path d="M 120 440 L 810 440" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 6" />
            <text x="680" y="435" fill="#588562" fontSize="10" fontFamily="sans-serif" fontWeight="semibold">
              学 北 路
            </text>

            <path d="M 120 0 L 120 540" stroke="#fcfce8" strokeWidth="20" />
            <path d="M 520 0 L 520 540" stroke="#fcfce8" strokeWidth="22" />
            <path d="M 520 0 L 520 540" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 6" />

            <path d="M 120 280 L 520 280" stroke="#fcfce8" strokeWidth="16" />

            <g fill="#f8fafc" stroke="#64748b" strokeWidth="1" fontSize="9" textAnchor="middle" opacity="0.9">
              <rect x="30" y="15" width="36" height="20" rx="2" /><text x="48" y="29">7#</text>
              <rect x="75" y="15" width="36" height="20" rx="2" /><text x="93" y="29">6#</text>
              <rect x="120" y="15" width="36" height="20" rx="2" /><text x="138" y="29">5#</text>
              <rect x="175" y="15" width="36" height="20" rx="2" /><text x="193" y="29">4#</text>
              <rect x="220" y="15" width="36" height="20" rx="2" /><text x="238" y="29">3#</text>
              <rect x="265" y="15" width="36" height="20" rx="2" /><text x="283" y="29">2#</text>
              <rect x="310" y="15" width="36" height="20" rx="2" /><text x="328" y="29">1#</text>

              <rect x="210" y="42" width="35" height="12" fill="#fef08a" stroke="#ca8a04" rx="2" />
              <text x="227" y="51" fill="#854d0e" fontSize="8">花房</text>
            </g>

            <g fill="#65b2a5" stroke="#377268" strokeWidth="1.2">
              <path d="M 550 95 L 680 95 L 680 120 L 650 120 L 650 145 L 550 145 Z" rx="2" />
              <text x="610" y="122" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">遗传楼</text>

              <path d="M 680 140 L 770 140 L 770 170 L 730 170 L 730 200 L 680 200 Z" rx="2" />
              <text x="725" y="172" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">逸夫楼</text>

              <rect x="690" y="10" width="70" height="30" rx="2" />
              <text x="725" y="29" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">跃进楼</text>

              <rect x="730" y="45" width="80" height="35" rx="2" />
              <text x="770" y="67" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">科学楼</text>
            </g>

            <g fill="#65b2a5" stroke="#377268" strokeWidth="1.2">
              <rect x="220" y="165" width="40" height="25" fill="#fef08a" stroke="#ca8a04" rx="2" />
              <text x="240" y="181" fill="#854d0e" fontSize="9" textAnchor="middle">变配电</text>

              <rect x="140" y="195" width="65" height="70" rx="3" />
              <text x="172" y="235" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">仓库</text>

              <path d="M 130 300 L 230 300 L 230 335 L 180 335 L 180 370 L 250 370 L 250 410 L 130 410 Z" />
              <text x="180" y="358" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">外 文 楼</text>
            </g>

            <g fill="#65b2a5" stroke="#377268" strokeWidth="1.2">
              <rect x="290" y="200" width="200" height="38" rx="3" />
              <text x="390" y="224" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">现 代 物 理 研 究 所</text>
            </g>

            <g fill="#65b2a5" stroke="#377268" strokeWidth="1.2">
              <rect x="310" y="270" width="75" height="28" rx="2" />
              <text x="347" y="287" fill="#ffffff" fontSize="10" textAnchor="middle">材料一楼</text>

              <rect x="395" y="260" width="65" height="26" rx="2" />
              <text x="427" y="277" fill="#ffffff" fontSize="10" textAnchor="middle">材料二楼</text>

              <rect x="470" y="255" width="50" height="26" rx="2" />
              <text x="495" y="272" fill="#ffffff" fontSize="10" textAnchor="middle">抹云楼</text>

              <rect x="430" y="325" width="90" height="48" rx="3" />
              <text x="475" y="354" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">逸夫科技楼</text>

              <rect x="550" y="225" width="90" height="42" rx="3" />
              <text x="595" y="250" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">第四教学楼</text>

              <rect x="330" y="315" width="85" height="45" fill="#cce3cc" stroke="#71a871" strokeWidth="1" strokeDasharray="3 2" rx="4" />
              <text x="372" y="336" fill="#2d5e2d" fontSize="9" textAnchor="middle">复旦烈士雕塑</text>
              <text x="372" y="348" fill="#2d5e2d" fontSize="9" textAnchor="middle">纪念广场</text>

              <rect x="270" y="390" width="80" height="35" rx="2" />
              <text x="310" y="412" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">相辉堂</text>

              <rect x="360" y="380" width="60" height="35" rx="2" />
              <text x="390" y="402" fill="#ffffff" fontSize="10" textAnchor="middle">寒冰馆</text>

              <path d="M 360 450 L 430 450 L 430 500 L 360 500 Z" />
              <text x="395" y="478" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">子彬院</text>

              <rect x="510" y="465" width="60" height="30" rx="2" />
              <text x="540" y="484" fill="#ffffff" fontSize="9" textAnchor="middle">电光源楼</text>

              <rect x="580" y="455" width="70" height="32" rx="2" />
              <text x="615" y="475" fill="#ffffff" fontSize="9" textAnchor="middle">兴业光学楼</text>

              <path d="M 690 280 L 780 280 L 780 370 L 740 370 L 740 310 L 690 310 Z" />
              <text x="735" y="330" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">化学楼</text>
            </g>

            <g fill="#eb9d88" stroke="#c0563e" strokeWidth="1.2">
              <rect x="580" y="500" width="90" height="35" rx="3" />
              <text x="625" y="522" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">第一教学楼</text>
            </g>

            {/* TARGET HIGHLIGHTED BUILDING */}
            <g>
              <path
                d="M 280 100 L 440 100 L 440 130 L 400 130 L 400 170 L 460 170 L 460 110 L 485 110 L 485 180 L 280 180 Z"
                fill="#529c90"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              <text x="350" y="122" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                环境科学楼 2号楼
              </text>
              <text x="370" y="160" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                现代语言学研究院
              </text>
            </g>
          </svg>
        )}

        {/* Dynamic Star Markers Overlaid cleanly */}
        {markers.map((marker) => {
          const displayLabel = getCleanLabel(marker.label);
          return (
            <div
              key={marker.id}
              style={{ left: `${marker.xPercent}%`, top: `${marker.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="relative flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-10 h-10 rounded-full bg-amber-400/40 animate-ping" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
                    <Star size={18} className="fill-white text-white" />
                  </div>
                </div>

                {displayLabel && (
                  <div className="mt-1 bg-[#1b365d]/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md border border-amber-400/80 backdrop-blur-xs whitespace-nowrap">
                    <span>{displayLabel}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Info Details Footer */}
      <div className="bg-white p-4 border-t border-[#dce3de] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="font-bold text-[#1b365d] text-sm">
              {lang === 'en'
                ? 'Institute of Modern Languages and Linguistics (Room 244)'
                : '复旦大学现代语言学研究院 · 环境科学楼2号楼 244室'}
            </span>
          </div>
          <p className="text-xs text-gray-600 pl-6">
            {lang === 'en'
              ? '220 Handan Road, Yangpu District, Shanghai (Fudan Handan Campus)'
              : '中国上海市杨浦区邯郸路220号 (复旦大学邯郸校区本部)'}
          </p>
        </div>

        <div className="text-right text-[11px] text-gray-500 hidden sm:block">
          <div className="font-semibold text-gray-700">阅读、双语与大脑实验室</div>
          <div className="text-blue-900 font-mono font-medium">feigao@fudan.edu.cn</div>
        </div>
      </div>

    </div>
  );
};




