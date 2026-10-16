import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { KennyLogo } from './KennyLogo';
import { useLenis } from '../context/LenisContext';
import { MagneticElement } from './MagneticElement';

interface NavigationProps {
  onContactClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calgaryTime, setCalgaryTime] = useState<string>('');
  const { scrollTo } = useLenis();

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Edmonton', // Calgary Mountain Time
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setCalgaryTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollTo(targetId, { offset: -40, duration: 1.2 });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090b]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-4">
        {/* Zone 1: Authentic Kenny Rios SVG Logo & Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0, { duration: 1.2 });
          }}
          className="flex items-center gap-3 text-lg font-display font-medium tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <KennyLogo className="w-7 h-auto group-hover:scale-105 transition-transform" fillColor="#ffffff" accentColor="#fbbf24" />
          <span className="tracking-tight">Kenny Rios</span>
        </a>

        {/* Zone 2: Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <a
            href="#works"
            onClick={(e) => handleNavClick(e, '#works')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Works
          </a>
          <a
            href="#capabilities"
            onClick={(e) => handleNavClick(e, '#capabilities')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Capabilities
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Live Calgary Time & Availability + Magnetic Action CTA */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Live Calgary Time + Status Dot */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-zinc-300">Calgary, AB</span>
            <span className="text-zinc-600">·</span>
            <span className="tabular-nums font-medium text-white">{calgaryTime || '10:45 AM'}</span>
          </div>

          <MagneticElement radius={60} strength={0.35}>
            <button
              type="button"
              onClick={onContactClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all whitespace-nowrap shrink-0 shadow-lg cursor-pointer"
            >
              <span>Let’s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </MagneticElement>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus-visible:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0c10] px-6 py-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-wider">
          <a
            href="#works"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#works');
            }}
            className="text-zinc-300 hover:text-white cursor-pointer py-1"
          >
            Works
          </a>
          <a
            href="#capabilities"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#capabilities');
            }}
            className="text-zinc-300 hover:text-white cursor-pointer py-1"
          >
            Capabilities
          </a>
          <a
            href="#about"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#about');
            }}
            className="text-zinc-300 hover:text-white cursor-pointer py-1"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#contact');
            }}
            className="text-zinc-300 hover:text-white cursor-pointer py-1"
          >
            Contact
          </a>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-zinc-500">
            <span>Calgary Time:</span>
            <span className="text-zinc-300 tabular-nums">{calgaryTime || '10:45 AM'}</span>
          </div>
        </div>
      )}
    </header>
  );
};
