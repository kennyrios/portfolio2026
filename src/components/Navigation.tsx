import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { KennyLogo } from './KennyLogo';
import { useLenis } from '../context/LenisContext';
import { MagneticElement } from './MagneticElement';

interface NavigationProps {
  onContactClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollTo(targetId, { offset: -30, duration: 1.2 });
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/85 border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark with Kenny's authentic SVG logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0, { duration: 1.2 });
          }}
          className="flex items-center gap-2.5 text-lg font-display font-semibold tracking-tight text-zinc-950 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <KennyLogo className="w-7 h-auto group-hover:scale-105 transition-transform" fillColor="#18181b" accentColor="#d97706" />
          <span>Kenny Rios</span>
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-zinc-600">
          <a
            href="#works"
            onClick={(e) => handleNavClick(e, '#works')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Selected Work
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About & Services
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action button with Magnetic Proximity */}
        <div className="flex items-center gap-4 shrink-0">
          <MagneticElement radius={60} strength={0.35}>
            <button
              type="button"
              onClick={onContactClick}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-medium text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Let’s Talk
            </button>
          </MagneticElement>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-950 focus-visible:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-6 py-4 flex flex-col gap-4 text-xs font-mono uppercase">
          <a
            href="#works"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#works');
            }}
            className="text-zinc-700 hover:text-zinc-950 cursor-pointer"
          >
            Selected Work
          </a>
          <a
            href="#about"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#about');
            }}
            className="text-zinc-700 hover:text-zinc-950 cursor-pointer"
          >
            About & Services
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#contact');
            }}
            className="text-zinc-700 hover:text-zinc-950 cursor-pointer"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className="w-full py-2.5 bg-zinc-950 text-white font-semibold rounded-lg text-center cursor-pointer"
          >
            Let's Talk
          </button>
        </div>
      )}
    </header>
  );
};
