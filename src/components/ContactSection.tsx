import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { MagneticElement } from './MagneticElement';
import { SectionParallaxWatermark } from './SectionParallaxWatermark';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack & Web Engineering',
    message: '',
  });

  const email = 'kennyrgrafico@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/kennyrgrafico@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `New Portfolio Inquiry: ${formData.name} · ${formData.service}`,
          _replyto: formData.email,
          _template: 'table',
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (!result || result.success !== 'false')) {
        setFormSubmitted(true);
      } else {
        throw new Error(result?.message || 'Submission could not be completed');
      }
    } catch (err: unknown) {
      console.error('Contact form submission error:', err);
      // If network fails (e.g. offline or ad-blocker), provide a direct mailto fallback
      setSubmitError(
        'The automated service encountered an issue. You can click below to send your note directly via email client to kennyrgrafico@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const directMailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    `Portfolio Inquiry: ${formData.name || 'New Project'} · ${formData.service}`
  )}&body=${encodeURIComponent(
    `${formData.message}\n\n---\nFrom: ${formData.name} (${formData.email})\nService: ${formData.service}`
  )}`;

  return (
    <section id="contact" className="relative py-36 sm:py-44 px-6 sm:px-10 max-w-7xl mx-auto z-10">
      {/* Background Dimensional Parallax Watermark */}
      <SectionParallaxWatermark
        number="03"
        title="DIRECT INQUIRIES & CONTRACTS"
        speedY={-0.12}
        align="right"
        accent="emerald"
      />

      <ScrollReveal variant="fade-up" duration={650}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 sm:mb-24 pb-10 border-b border-white/[0.08]">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-medium mb-2">
              Contact & Inquiries
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white">
              Let’s Build Something Exceptional
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-light">
            Open to senior engineering roles, AI-enabled digital products, architectural contracts, and selected client collaborations.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Direct Contact Card */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal variant="fade-up" delay={120} duration={700} distance={28}>
            <div className="p-8 bg-[#121216]/80 border border-white/[0.08] rounded-3xl space-y-6 shadow-xl backdrop-blur-md">
              {/* Direct Email */}
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  Direct Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-xl sm:text-2xl font-display font-medium text-white hover:text-amber-300 transition-colors block break-all"
                >
                  {email}
                </a>
                <div className="flex flex-wrap gap-2.5 mt-3">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-zinc-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs font-mono rounded-lg transition-colors cursor-pointer"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-400 space-y-2">
                <p>Location: Calgary, AB, Canada (Remote & Hybrid)</p>
                <p className="flex items-center gap-2">
                  <span>Profiles:</span>
                  <a href="https://github.com/kennyrios" target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-white underline underline-offset-2">GitHub</a>
                  <span>·</span>
                  <a href="https://kennyrios.github.io/portfolio2026/" target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-white underline underline-offset-2">Portfolio 2026</a>
                  <span>·</span>
                  <a href="https://kennyrios.github.io/projects/" target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-white underline underline-offset-2">Archive</a>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Working Inquiry Form */}
        <div className="lg:col-span-7">
          <ScrollReveal variant="fade-up" delay={220} duration={700} distance={28}>
            <div className="p-8 sm:p-10 bg-[#121216]/80 border border-white/[0.08] rounded-3xl shadow-xl backdrop-blur-md">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white">Message Successfully Sent</h3>
                  <p className="text-sm text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
                    Your inquiry has been delivered directly to <span className="text-amber-300 font-mono font-medium">kennyrgrafico@gmail.com</span>. Kenny will reply to <span className="text-white font-mono font-medium">{formData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setSubmitError(null);
                        setFormData({ name: '', email: '', service: 'Full-Stack & Web Engineering', message: '' });
                      }}
                      className="px-5 py-2.5 bg-white/[0.06] border border-white/10 text-xs font-mono text-zinc-300 rounded-xl hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-mono text-zinc-400">Direct Message</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Routes directly to kennyrgrafico@gmail.com</span>
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-2.5">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{submitError}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={directMailtoUrl}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-zinc-950 font-mono font-semibold text-[11px] rounded-lg hover:bg-amber-300 transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Open in Email App</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmitError(null)}
                          className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/10 text-zinc-300 font-mono text-[11px] rounded-lg transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-mono text-zinc-400 block mb-2">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="text-xs font-mono text-zinc-400 block mb-2">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="text-xs font-mono text-zinc-400 block mb-2">
                      Engagement Scope
                    </label>
                    <select
                      id="contact-service"
                      disabled={isSubmitting}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#16161b] border border-white/10 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-white/40 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <option value="Full-Stack & Web Engineering">Full-Stack & Web Engineering</option>
                      <option value="AI-Assisted Development & Automation">AI-Assisted Development & Automation</option>
                      <option value="CMS Architecture & Custom Post Systems">CMS Architecture (WordPress, Elementor, JetEngine)</option>
                      <option value="Interactive Mapping & Real Estate Systems">Interactive Mapping (Mapbox) & Real Estate Systems</option>
                      <option value="UI/UX & Product Design System">UI/UX & Design Systems (Figma)</option>
                      <option value="Senior Engineering / Digital Solutions Role">Senior Engineering / Solutions Role</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-mono text-zinc-400 block mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      disabled={isSubmitting}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your initiative, goals, or role..."
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-white hover:bg-zinc-200 disabled:bg-zinc-300 disabled:cursor-not-allowed text-zinc-950 font-semibold font-mono text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending to kennyrgrafico@gmail.com...</span>
                      </>
                    ) : (
                      <>
                        <span>Dispatch Message to Kenny</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
