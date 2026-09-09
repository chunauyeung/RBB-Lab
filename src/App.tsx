import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ResearchPage } from './pages/ResearchPage';
import { TeamPage } from './pages/TeamPage';
import { DatasetPage } from './pages/DatasetPage';
import { ContactPage } from './pages/ContactPage';
import { JoinLabModal } from './components/JoinLabModal';
import { SearchModal } from './components/SearchModal';
import { ExportStaticGuideModal } from './components/ExportStaticGuideModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#181c20] font-sans selection:bg-[#d6e3ff] selection:text-[#001b3d]">
      
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={setCurrentTab}
            onOpenJoinModal={() => setIsJoinModalOpen(true)}
          />
        )}

        {currentTab === 'research' && (
          <ResearchPage
            lang={lang}
          />
        )}

        {currentTab === 'team' && (
          <TeamPage
            lang={lang}
            onOpenJoinModal={() => setIsJoinModalOpen(true)}
          />
        )}

        {currentTab === 'dataset' && (
          <DatasetPage
            lang={lang}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage
            lang={lang}
            onOpenJoinModal={() => setIsJoinModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        setCurrentTab={setCurrentTab}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Interactive Modals */}
      <JoinLabModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        lang={lang}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onNavigateTab={setCurrentTab}
      />

      <ExportStaticGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        lang={lang}
      />

    </div>
  );
}
