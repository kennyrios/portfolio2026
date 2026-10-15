import React, { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { MagneticElement } from './MagneticElement';
import { useLenis } from '../context/LenisContext';

export const Footer: React.FC = () => {
  const [sfTime, setSfTime] = useState<string>('');
  const { scrollTo } = useLenis();

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Vancouver',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setSfTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.4 });
  };

  return (
    <footer className="relative border-t border-zinc-200 bg-zinc-50 text-zinc-600 py-16 px-6 z-10">
      <ScrollReveal variant="fade-up" duration={650} distance={20}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Brand & Local Time */}
          <div className="space-y-2">
            <p className="text-lg font-display font-bold text-zinc-950">Kenny Rios</p>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span>Canada</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span className="tabular-nums text-zinc-700 font-medium">Local Time: {sfTime || 'PST'}</span>
            </div>
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Kenny Rios. Web Engineering, Systems & Tactile Digital Products.
            </p>
          </div>

          {/* Center: Social / Professional Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a
              href="mailto:kennyrgrafico@gmail.com"
              className="text-amber-800 hover:text-amber-950 font-medium transition-colors"
            >
              kennyrgrafico@gmail.com
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://kennyrios.github.io/projects/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 transition-colors"
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
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-mono text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer shadow-xs hover:shadow-md"
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
