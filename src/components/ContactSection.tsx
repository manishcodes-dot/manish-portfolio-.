import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Github, Linkedin, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'contract',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<null | {
    id: string;
    timestamp: string;
    name: string;
    email: string;
  }>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedReceipt({
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toUTCString(),
        name: formData.name,
        email: formData.email
      });
    }, 600);
  };

  const openDirectEmail = () => {
    const subject = encodeURIComponent(`Inquiry from ${formData.name || 'Developer'} [${formData.projectType}]`);
    const body = encodeURIComponent(formData.message || 'Hi Manish,\n\nI came across your portfolio and would like to discuss...');
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 border-t border-zinc-200/80 dark:border-zinc-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2 font-medium">
            <span>05 // INITIATE TRANSMISSION</span>
            <span className="w-12 h-px bg-emerald-500/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Let's Build Something Exceptional
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            Have a project in mind, an engineering challenge to solve, or an open senior role? Drop a message or send an email directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xs">
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">Direct Communication Channel:</div>
              <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 mb-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 hover:underline font-medium truncate"
                  title="Click to email directly"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded hover:bg-zinc-200/70 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  title="Copy email to clipboard"
                  id="contact-copy-email-btn"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Turnaround: Typically &lt; 12 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                  <span>PGP Verified Identity Available</span>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                <span>CURRENT CAPACITY & AVAILABILITY</span>
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                Open to senior engineering contracts, distributed architecture consulting, and high-growth full-time opportunities.
              </p>
            </div>

            {/* Social Channels */}
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xs">
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3">Network & Code Registries:</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xs">
              {submittedReceipt ? (
                <div className="space-y-4 font-mono text-xs animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>TRANSMISSION DISPATCHED SUCCESSFULLY</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-sans">
                    Thank you, <strong className="text-zinc-950 dark:text-zinc-200">{submittedReceipt.name}</strong>. Your message receipt has been staged. You will receive a direct reply to <strong className="text-zinc-950 dark:text-zinc-200">{submittedReceipt.email}</strong> shortly.
                  </p>

                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 space-y-1.5 font-mono text-[11px]">
                    <div className="text-zinc-500">// DISPATCH RECEIPT</div>
                    <div>Receipt ID: <span className="text-emerald-700 dark:text-emerald-400 font-bold">{submittedReceipt.id}</span></div>
                    <div>Timestamp: {submittedReceipt.timestamp}</div>
                    <div>Status: <span className="text-emerald-700 dark:text-emerald-400">QUEUED_FOR_REVIEW</span></div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={openDirectEmail}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition-colors shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Launch in Default Mail Client</span>
                    </button>
                    <button
                      onClick={() => setSubmittedReceipt(null)}
                      className="px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-xs transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Your Name <span className="text-emerald-600 dark:text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 focus:bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Your Email <span className="text-emerald-600 dark:text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.io"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 focus:bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Nature of Engagement
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      {[
                        { id: 'contract', label: 'Contract' },
                        { id: 'fulltime', label: 'Full-Time' },
                        { id: 'advisory', label: 'Advisory' },
                        { id: 'chat', label: 'Say Hello' }
                      ].map(item => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setFormData({ ...formData, projectType: item.id })}
                          className={`py-2 px-2 rounded-lg text-center transition-all ${
                            formData.projectType === item.id
                              ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white border border-zinc-900 dark:border-emerald-500/60 font-medium shadow-xs'
                              : 'bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-zinc-950'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Message & System Requirements <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your technical goals, timeline, or scope..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 focus:bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors resize-none shadow-2xs"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <span className="text-[11px] font-mono text-zinc-400">
                      // All transmissions encrypted locally
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-mono text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
