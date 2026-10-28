import React from 'react';
import { TECHNICAL_CAPABILITIES_MATRIX } from '../data/portfolioData';
import { Cpu } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TechnicalCapabilitiesMatrix: React.FC = () => {
  return (
    <div id="capabilities" className="space-y-8">
      {/* Header */}
      <ScrollReveal variant="fade-up" duration={650}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-medium mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Core Competencies</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-white">
              Technical Capabilities Matrix
            </h3>
          </div>
          <p className="text-xs font-mono text-zinc-400">
            Full-Stack Engineering · AI-Assisted Workflows · APIs & CMS Architecture
          </p>
        </div>
      </ScrollReveal>

      {/* Desktop & Tablet Matrix Table View */}
      <ScrollReveal variant="fade-up" delay={120} duration={750} distance={30}>
        <div className="hidden md:block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216]/80 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-zinc-400">
                <th scope="col" className="py-4 px-6 font-semibold w-[26%]">
                  Domain
                </th>
                <th scope="col" className="py-4 px-6 font-semibold w-[42%]">
                  Focus
                </th>
                <th scope="col" className="py-4 px-6 font-semibold w-[32%]">
                  Core Toolkit & Implementation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-sm">
              {TECHNICAL_CAPABILITIES_MATRIX.map((row) => (
                <tr
                  key={row.domain}
                  className="hover:bg-white/[0.03] transition-colors duration-150 group"
                >
                  {/* Domain Column */}
                  <td className="py-6 px-6 align-top">
                    <span className="font-display font-medium text-white text-base group-hover:text-amber-300 transition-colors">
                      {row.domain}
                    </span>
                  </td>

                  {/* Focus Column */}
                  <td className="py-6 px-6 align-top text-zinc-400 font-light leading-relaxed text-[13.5px]">
                    {row.focus}
                  </td>

                  {/* Core Toolkit Column */}
                  <td className="py-6 px-6 align-top text-zinc-300 text-[13.5px] leading-relaxed">
                    {row.toolkit.map((item, idx) => (
                      <React.Fragment key={item.text}>
                        {item.isPrimary ? (
                          <strong className="font-semibold text-white">
                            {item.text}
                          </strong>
                        ) : (
                          <span className="text-zinc-400 font-light">
                            {item.text}
                          </span>
                        )}
                        {idx < row.toolkit.length - 1 && (
                          <span className="text-zinc-600 font-light mr-1.5">, </span>
                        )}
                      </React.Fragment>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Mobile Stacked Card View */}
      <div className="md:hidden space-y-4">
        {TECHNICAL_CAPABILITIES_MATRIX.map((row, idx) => (
          <ScrollReveal
            key={row.domain}
            variant="fade-up"
            delay={idx * 80}
            duration={600}
            distance={20}
          >
            <div className="p-6 bg-[#121216] border border-white/[0.08] rounded-2xl space-y-3.5 shadow-md">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-medium block mb-1">
                  Domain
                </span>
                <h4 className="font-display font-medium text-white text-lg">
                  {row.domain}
                </h4>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-medium block mb-1">
                  Focus
                </span>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {row.focus}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-medium block mb-1">
                  Toolkit
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {row.toolkit.map((item) => (
                    <span
                      key={item.text}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                        item.isPrimary
                          ? 'bg-white/10 text-white font-medium border border-white/20'
                          : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06]'
                      }`}
                    >
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};
