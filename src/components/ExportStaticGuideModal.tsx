import React, { useState } from 'react';
import { X, Globe, Download, Check, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface ExportStaticGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ExportStaticGuideModal: React.FC<ExportStaticGuideModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'vercel' | 'github' | 'netlify' | 'build'>('build');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const buildCommand = `npm run build`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-[#e5e8ee] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#1b365d] text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Globe className="text-[#87a0cd]" size={22} />
            <div>
              <h3 className="font-heading text-lg font-bold">
                {lang === 'en' ? 'Static Web Site Deployment Guide' : '静态网页一键部署指南'}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'en' ? 'Deploy to Vercel / GitHub Pages / Netlify / Cloud Run' : '部署至 Vercel / GitHub Pages / Netlify / 任意静态服务器'}
              </p>
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
          <div className="bg-[#f8fafd] p-4 rounded-lg border border-[#e5e8ee] flex items-start gap-3">
            <Globe className="text-[#236869] flex-shrink-0 mt-0.5" size={20} />
            <div className="text-xs text-gray-700 leading-relaxed">
              <strong className="text-[#1b365d] text-sm block mb-1">
                {lang === 'en' ? '100% Pure Static SPA Ready' : '已完全构建为 100% 纯静态 Web 网页'}
              </strong>
              {lang === 'en'
                ? 'This website is built with Vite + React + Tailwind CSS. All images, bilingual contents, dataset features, and research listings run client-side without requiring a backend database server!'
                : '本网站基于 React + Vite + Tailwind CSS 构建，所有双语内容、交互式脑图、出版物索引和数据集文档均为纯前端客户端渲染，可以直接生成静态文件部署到互联网任何静态托管服务！'}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('build')}
              className={`px-4 py-2.5 border-b-2 transition-colors ${
                activeTab === 'build'
                  ? 'border-[#1b365d] text-[#1b365d]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {lang === 'en' ? '1. Local Build (dist/)' : '1. 本地打包 (dist/)'}
            </button>
            <button
              onClick={() => setActiveTab('vercel')}
              className={`px-4 py-2.5 border-b-2 transition-colors ${
                activeTab === 'vercel'
                  ? 'border-[#1b365d] text-[#1b365d]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Vercel
            </button>
            <button
              onClick={() => setActiveTab('github')}
              className={`px-4 py-2.5 border-b-2 transition-colors ${
                activeTab === 'github'
                  ? 'border-[#1b365d] text-[#1b365d]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              GitHub Pages
            </button>
            <button
              onClick={() => setActiveTab('netlify')}
              className={`px-4 py-2.5 border-b-2 transition-colors ${
                activeTab === 'netlify'
                  ? 'border-[#1b365d] text-[#1b365d]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Netlify
            </button>
          </div>

          {/* Tab Contents */}
          <div className="space-y-3">
            {activeTab === 'build' && (
              <div className="space-y-3 text-xs text-gray-700">
                <p>
                  {lang === 'en'
                    ? 'Execute the command below in terminal to generate high-performance static HTML/JS bundle in the `dist/` directory:'
                    : '在项目根目录运行以下构建命令，将在 `dist/` 文件夹中生成完整的高性能静态 HTML/JS 部署包：'}
                </p>
                <div className="relative">
                  <pre className="bg-[#181c20] text-emerald-300 p-3.5 rounded-lg font-mono text-xs overflow-x-auto">
                    {buildCommand}
                  </pre>
                  <button
                    onClick={() => handleCopy(buildCommand)}
                    className="absolute right-2 top-2 px-2.5 py-1 bg-gray-700 text-white text-[10px] rounded hover:bg-gray-600 transition-colors flex items-center gap-1"
                  >
                    {copied ? <Check size={12} /> : null}
                    {copied ? (lang === 'en' ? 'Copied' : '已复制') : (lang === 'en' ? 'Copy' : '复制')}
                  </button>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 leading-relaxed">
                  <strong>Dist Folder:</strong> Upload all files inside <code>dist/</code> directly to Nginx, Apache, Caddy, Cloudflare Pages, or AWS S3 static web hosting.
                </div>
              </div>
            )}

            {activeTab === 'vercel' && (
              <div className="space-y-2 text-xs text-gray-700">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>{lang === 'en' ? 'Push this codebase to GitHub.' : '将此代码仓库推送到 GitHub。'}</li>
                  <li>{lang === 'en' ? 'Log in to Vercel and click "Add New Project".' : '登录 Vercel，点击 "Add New Project" 导入 GitHub 仓库。'}</li>
                  <li>
                    {lang === 'en' 
                      ? 'Framework Preset: Select "Vite". Output Directory: "dist".' 
                      : '预设框架选择 "Vite"，输出目录填 "dist"。'}
                  </li>
                  <li>{lang === 'en' ? 'Click "Deploy". Your lab site will be online in 30 seconds!' : '点击 "Deploy"，30秒内即可生成全局 HTTPS 静态网页域名！'}</li>
                </ol>
              </div>
            )}

            {activeTab === 'github' && (
              <div className="space-y-2 text-xs text-gray-700">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>{lang === 'en' ? 'Go to Repository Settings -> Pages.' : '进入仓库 Settings -> Pages。'}</li>
                  <li>{lang === 'en' ? 'Source: Select "GitHub Actions" (Vite deployment workflow).' : 'Source 选择 "GitHub Actions"。'}</li>
                  <li>{lang === 'en' ? 'Your website will be live at `https://<username>.github.io/<repo>`!' : '即可免费发布到 `https://<用户名>.github.io/<仓库名>`！'}</li>
                </ol>
              </div>
            )}

            {activeTab === 'netlify' && (
              <div className="space-y-2 text-xs text-gray-700">
                <p>{lang === 'en' ? 'Drag and drop the `dist/` folder directly onto Netlify Drop page or connect your Git repo:' : '可直接将打包生成的 `dist/` 文件夹拖拽上传至 Netlify Drop，或关联 Git 仓库：'}</p>
                <div className="p-2.5 bg-gray-100 font-mono rounded text-[11px] text-gray-800">
                  Build command: npm run build | Publish directory: dist
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#1b365d] text-white text-sm font-medium rounded-md hover:bg-[#2e476f] transition-colors"
            >
              {lang === 'en' ? 'Got It!' : '知道了，开始部署'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
