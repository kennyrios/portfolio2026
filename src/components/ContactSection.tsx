import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development & CMS',
    message: '',
  });

  const email = 'kennyrgrafico@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 px-6 max-w-6xl mx-auto z-10">
      <ScrollReveal variant="fade-up" duration={650}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-zinc-200">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold mb-2">
              Contact & Inquiries
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-zinc-950">
              Let’s Build Something Exceptional
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md font-light">
            Open to full-time roles, contract leadership, and select web design & development engagements.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Direct Contact Card */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal variant="fade-up" delay={120} duration={700} distance={28}>
            <div className="p-8 bg-white border border-zinc-200/90 rounded-2xl space-y-6 shadow-xs">
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  Direct Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-xl sm:text-2xl font-display font-bold text-zinc-950 hover:text-amber-700 transition-colors block break-all"
                >
                  {email}
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 text-xs font-mono rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>

              <div className="pt-4 border-t border-zinc-100 text-xs font-mono text-zinc-500 space-y-1">
                <p>Location: Canada (Remote / Hybrid)</p>
                <p>Profiles: <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-800 hover:text-amber-700 underline">GitHub</a> · <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-800 hover:text-amber-700 underline">LinkedIn</a> · <a href="https://kennyrios.github.io/projects/" target="_blank" rel="noreferrer" className="text-zinc-800 hover:text-amber-700 underline">Archive</a></p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Working Inquiry Form */}
        <div className="lg:col-span-7">
          <ScrollReveal variant="fade-up" delay={220} duration={700} distance={28}>
            <div className="p-8 bg-white border border-zinc-200/90 rounded-2xl shadow-xs">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-zinc-950">Thank You, Message Sent</h3>
                  <p className="text-sm text-zinc-600 font-light max-w-sm mx-auto">
                    Kenny has received your message and will reply to <span className="text-amber-800 font-mono font-medium">{formData.email}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', service: 'Web Development & CMS', message: '' });
                    }}
                    className="mt-4 px-4 py-2 bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-800 rounded-lg hover:bg-zinc-200 cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-mono text-zinc-600 block mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="text-xs font-mono text-zinc-600 block mb-1">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="text-xs font-mono text-zinc-600 block mb-1">
                      Area of Interest
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors"
                    >
                      <option value="Web Development & CMS">Web Development & CMS Architecture</option>
                      <option value="UI/UX & Product Design">UI/UX & Product Design System</option>
                      <option value="Brand Identity & Packaging">Brand Identity & Packaging</option>
                      <option value="Full-time Opportunity">Full-time Engineering / Design Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-mono text-zinc-600 block mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, team, or timeline..."
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:translate-y-0.5"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
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
