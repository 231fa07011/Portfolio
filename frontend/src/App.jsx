import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatusBanner from './components/StatusBanner';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';

import { checkBackendHealth, fetchPortfolioData } from './services/api';
import { fallbackPortfolioData } from './data/fallbackPortfolio';
import { RefreshCw } from 'lucide-react';

export default function App() {
  const [portfolio, setPortfolio] = useState(fallbackPortfolioData);
  const [backendStatus, setBackendStatus] = useState({
    online: false,
    checked: false,
    error: null,
  });
  const [loading, setLoading] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  const loadData = useCallback(async () => {
    setIsRetrying(true);
    try {
      const health = await checkBackendHealth();
      setBackendStatus({
        online: health.online,
        checked: true,
        error: health.error,
      });

      const res = await fetchPortfolioData();
      if (res && res.data) {
        setPortfolio(res.data);
      }
    } catch (err) {
      console.warn('Network issue during portfolio sync:', err);
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFBFF] dark:bg-[#0B0F19] text-[#26324A] dark:text-[#F1F5F9] transition-colors duration-300">
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9180D8] to-[#6C83D8] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-[#9180D8]/20 animate-pulse">
            VN
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
            <RefreshCw className="w-3.5 h-3.5 text-[#9180D8] animate-spin" />
          </div>
        </div>
        <p className="text-sm font-bold text-[#26324A] dark:text-[#F1F5F9]">Loading Portfolio...</p>
        <p className="text-xs text-[#707789] dark:text-[#94A3B8] mt-1">Connecting to Production REST API</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBFF] dark:bg-[#0B0F19] text-[#26324A] dark:text-[#F1F5F9] selection:bg-[#EDE7FF] selection:text-[#4c1d95] dark:selection:bg-indigo-900 dark:selection:text-indigo-200 flex flex-col justify-between transition-colors duration-300">
      <div>
        {/* Navigation Bar */}
        <Navbar
          backendStatus={backendStatus}
          onRetryBackend={loadData}
        />

        {/* Offline Banner */}
        <div className="pt-16 sm:pt-20">
          <StatusBanner
            backendStatus={backendStatus}
            onRetry={loadData}
            isRetrying={isRetrying}
          />
        </div>

        {/* Main Content */}
        <main>
          <Hero personal={portfolio.personal} />
          <About personal={portfolio.personal} />
          <Education education={portfolio.education} />
          <Skills skills={portfolio.skills} />
          <Experience experience={portfolio.experience} />
          <Projects projects={portfolio.projects} />
          <Certifications certifications={portfolio.certifications} />
          <Achievements achievements={portfolio.achievements} />
          <Contact personal={portfolio.personal} />
        </main>
      </div>

      {/* Footer */}
      <Footer personal={portfolio.personal} />

      {/* Floating Background Music Player */}
      <AudioPlayer />
    </div>
  );
}
