import React from 'react';
import { TECHNICAL_CAPABILITIES_MATRIX } from '../data/portfolioData';
import { Cpu } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TechnicalCapabilitiesMatrix: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal variant="fade-up" duration={650}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Core Competencies</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950">
              Technical Capabilities Matrix
            </h3>
          </div>
          <p className="text-xs font-mono text-zinc-500">
            Agentic AI · Design Systems · Full-Stack Web
          </p>
        </div>
      </ScrollReveal>

      {/* Desktop & Tablet Matrix Table View */}
      <ScrollReveal variant="fade-up" delay={120} duration={750} distance={30}>
        <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 backdrop-blur-xs shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/75 text-xs font-mono uppercase tracking-wider text-zinc-500">
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
            <tbody className="divide-y divide-zinc-200/80 text-sm">
              {TECHNICAL_CAPABILITIES_MATRIX.map((row) => (
                <tr
                  key={row.domain}
                  className="hover:bg-amber-50/20 transition-colors duration-150 group"
                >
                  {/* Domain Column */}
                  <td className="py-6 px-6 align-top">
                    <span className="font-display font-bold text-zinc-950 text-base group-hover:text-amber-800 transition-colors">
                      {row.domain}
                    </span>
                  </td>

                  {/* Focus Column */}
                  <td className="py-6 px-6 align-top text-zinc-600 font-light leading-relaxed text-[13.5px]">
                    {row.focus}
                  </td>

                  {/* Core Toolkit Column */}
                  <td className="py-6 px-6 align-top text-zinc-700 text-[13.5px] leading-relaxed">
                    {row.toolkit.map((item, idx) => (
                      <React.Fragment key={item.text}>
                        {item.isPrimary ? (
                          <strong className="font-semibold text-zinc-950">
                            {item.text}
                          </strong>
                        ) : (
                          <span className="text-zinc-600 font-light">
                            {item.text}
                          </span>
                        )}
                        {idx < row.toolkit.length - 1 && (
                          <span className="text-zinc-400 font-light mr-1.5">, </span>
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
            <div className="p-5 bg-white border border-zinc-200/90 rounded-xl space-y-3.5 shadow-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-semibold block mb-1">
                  Domain
                </span>
                <h4 className="font-display font-bold text-zinc-950 text-base">
                  {row.domain}
                </h4>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium block mb-1">
                  Focus
                </span>
                <p className="text-xs text-zinc-600 font-light leading-relaxed">
                  {row.focus}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium block mb-1">
                  Core Toolkit & Implementation
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {row.toolkit.map((item, idx2) => (
                    <React.Fragment key={item.text}>
                      {item.isPrimary ? (
                        <strong className="font-semibold text-zinc-950">
                          {item.text}
                        </strong>
                      ) : (
                        <span className="text-zinc-600">
                          {item.text}
                        </span>
                      )}
                      {idx2 < row.toolkit.length - 1 && (
                        <span className="text-zinc-400 mr-1.5">, </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};
