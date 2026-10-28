import React, { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { MagneticElement } from './MagneticElement';
import { useLenis } from '../context/LenisContext';
import { KennyLogo } from './KennyLogo';

export const Footer: React.FC = () => {
  const [calgaryTime, setCalgaryTime] = useState<string>('');
  const { scrollTo } = useLenis();

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Edmonton',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCalgaryTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.4 });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0c0c10] text-zinc-400 py-20 px-6 z-10">
      <ScrollReveal variant="fade-up" duration={650} distance={20}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Brand & Local Time */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <KennyLogo className="w-6 h-auto" fillColor="#ffffff" accentColor="#fbbf24" />
              <p className="text-lg font-display font-medium text-white">Kenny Rios</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>Calgary, AB, Canada</span>
              <span aria-hidden="true" className="text-zinc-700">·</span>
              <span className="tabular-nums text-zinc-300 font-medium">Local Time: {calgaryTime || 'MST'}</span>
            </div>
            <p className="text-xs text-zinc-500 font-light">
              © {new Date().getFullYear()} Kenny Alejandro Rios Avila · AI-Enabled Full-Stack Developer & Digital Solutions.
            </p>
          </div>

          {/* Center: Social / Professional Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a
              href="mailto:kennyrgrafico@gmail.com"
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              kennyrgrafico@gmail.com
            </a>
            <a
              href="https://github.com/kennyrios"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://kennyrios.github.io/portfolio2026/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portfolio 2026</span>
            </a>
            <a
              href="https://kennyrios.github.io/projects/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Archive</span>
            </a>
          </div>

          {/* Right: Back to Top with Magnetic Proximity */}
          <MagneticElement radius={65} strength={0.35}>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-5 py-3 bg-white/[0.05] hover:bg-white text-zinc-300 hover:text-zinc-950 border border-white/10 hover:border-white rounded-full text-xs font-mono transition-all duration-200 cursor-pointer shadow-lg"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </MagneticElement>
        </div>
      </ScrollReveal>
    </footer>
  );
};
