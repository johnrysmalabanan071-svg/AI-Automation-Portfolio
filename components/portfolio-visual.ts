// Styling only: scoped Tailwind v4 utilities override the legacy unlayered CSS.
// The ! suffix is intentional; no markup, content, or event handlers are changed.
export const portfolioVisual = `
  [--bg:#0a0a0a] [--panel:rgba(24,24,24,0.82)] [--panel-solid:#141414]
  [--panel-strong:rgba(20,20,20,0.96)] [--soft:#1c1c1c]
  [--text:#f5f5f5] [--muted:#a3a3a3] [--border:#303030] [--nav:rgba(16,16,16,0.88)]
  selection:bg-emerald-300/25 selection:text-white
  [&_:focus-visible]:outline-emerald-300!
  [&_h1]:font-medium! [&_h2]:font-medium! [&_h3]:font-medium!
  [&_.section-pad]:py-20! md:[&_.section-pad]:py-28!
  [&_.section-title]:text-[clamp(2.25rem,4.2vw,3.75rem)]!
  [&_.section-title]:leading-[1.12]! [&_.section-title]:tracking-[-0.035em]!
  [&_.section-copy]:text-base! [&_.section-copy]:leading-[1.8]! [&_.section-copy]:text-neutral-400!
  [&_.eyebrow]:font-sans! [&_.eyebrow]:text-xs! [&_.eyebrow]:font-medium!
  [&_.eyebrow]:tracking-[0.12em]! [&_.eyebrow]:text-emerald-300!
  [&_svg]:text-neutral-300!
  [&_.nav-capsule]:rounded-2xl! [&_.nav-capsule]:border-white/10!
  [&_.nav-capsule]:bg-neutral-950/85! [&_.nav-capsule]:backdrop-blur-xl!
  [&_.nav-capsule]:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.2)]!
  [&_.nav-link]:text-sm! [&_.nav-link]:font-medium! [&_.nav-link]:text-neutral-400!
  [&_.nav-link:hover]:text-white! [&_.nav-link:after]:bg-none! [&_.nav-link:after]:bg-emerald-300/70!
  [&_.brand-mark]:bg-none! [&_.brand-mark]:bg-emerald-300! [&_.brand-mark]:text-neutral-950! [&_.brand-mark]:shadow-none!
  [&_.button]:rounded-xl! [&_.button]:font-medium! [&_.button]:transition-all! [&_.button]:duration-300!
  [&_.button:hover]:translate-y-[-2px]! [&_.button:active]:translate-y-0!
  [&_.button-primary]:bg-none! [&_.button-primary]:bg-emerald-300! [&_.button-primary]:text-neutral-950!
  [&_.button-primary]:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_28px_rgba(52,211,153,0.2)]!
  [&_.button-primary:hover]:bg-emerald-200! [&_.button-primary_svg]:text-neutral-950!
  [&_.button-contact]:bg-none! [&_.button-contact]:bg-emerald-300! [&_.button-contact]:text-neutral-950!
  [&_.button-contact]:shadow-none! [&_.button-contact_svg]:text-neutral-950!
  [&_.button-small]:bg-emerald-300! [&_.button-small]:text-neutral-950! [&_.button-small_svg]:text-neutral-950!
  [&_.button-secondary]:border-white/15! [&_.button-secondary]:bg-white/5!
  [&_.button-secondary:hover]:border-emerald-300/40! [&_.button-secondary:hover]:bg-white/10!
  [&_.icon-button]:rounded-xl! [&_.icon-button:hover]:border-neutral-500!
  [&_.text-link]:font-medium! [&_.text-link:hover]:text-emerald-200!
  [&_.hero-name]:text-[clamp(3.25rem,6.5vw,6.5rem)]! [&_.hero-name]:leading-[1.03]! [&_.hero-name]:tracking-[-0.045em]!
  [&_.hero-surname]:font-medium! [&_.hero-surname]:tracking-[-0.045em]!
  [&_.hero-position]:font-medium! [&_.hero-position]:leading-[1.5]! [&_.hero-position]:tracking-[-0.02em]!
  [&_.hero-position_em]:bg-none! [&_.hero-position_em]:text-emerald-300! [&_.hero-position_em]:not-italic!
  [&_.hero-copy>p]:text-base! md:[&_.hero-copy>p]:text-lg! [&_.hero-copy>p]:leading-[1.8]!
  [&_.hero-grid:before]:grayscale [&_.hero-grid:before]:opacity-30
  [&_.hero-glow]:bg-[radial-gradient(ellipse_at_75%_30%,rgba(16,185,129,0.17),transparent_55%),radial-gradient(ellipse_at_15%_5%,rgba(255,255,255,0.04),transparent_40%)]!
  [&_.orb]:grayscale [&_.orb]:opacity-20! [&_.interactive-background]:grayscale [&_.interactive-background]:opacity-50
  [&_.dashboard-halo]:bg-emerald-400/10! [&_.status-pill]:rounded-lg! [&_.status-pill]:border-white/15!
  [&_.status-pill]:bg-white/5! [&_.status-pill]:text-neutral-300! [&_.status-pill]:tracking-[0.06em]!
  [&_.status-dot]:bg-emerald-300! [&_.status-dot]:shadow-[0_0_12px_rgba(52,211,153,0.5)]!
  [&_.hero-metrics:before]:bg-none! [&_.hero-metrics:before]:bg-emerald-400/60!
  [&_.portrait-shell]:rounded-3xl! [&_.portrait-shell]:border-emerald-300/20!
  [&_.portrait-shell]:bg-[radial-gradient(ellipse_at_80%_0%,rgba(16,185,129,0.16),transparent_60%),linear-gradient(145deg,#202020,#0c0c0c)]!
  [&_.portrait-shell]:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.3)]!
  [&_.portrait-grid]:grayscale [&_.portrait-ring]:grayscale [&_.portrait-ring]:opacity-50
  [&_.portrait-signal]:grayscale [&_.portrait-kicker]:text-neutral-400!
  [&_.portrait-tools_span]:bg-neutral-900! [&_.portrait-tools_span]:text-neutral-400! [&_.portrait-tools_span]:border-neutral-700!
  [&_.float-card]:rounded-xl! [&_.float-card]:border-white/15! [&_.float-card]:bg-neutral-900/90!
  [&_.about-panel]:rounded-3xl! [&_.about-panel]:border-white/10!
  [&_.about-panel]:bg-[radial-gradient(ellipse_at_100%_0%,rgba(16,185,129,0.08),transparent_55%),linear-gradient(145deg,#202020,#121212_60%)]!
  [&_.about-panel]:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]!
  [&_.about-panel]:py-12! md:[&_.about-panel]:py-16!
  [&_.about-panel:after]:border-white/10!
  [&_.value-card]:rounded-2xl! [&_.value-card]:border-white/10!
  [&_.value-card]:bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]!
  [&_.value-card]:p-6! [&_.value-card]:shadow-none! [&_.value-card]:transition-colors! [&_.value-card]:duration-300!
  [&_.value-card:hover]:border-emerald-300/30! [&_.value-card:after]:border-white/10!
  [&_.value-card_p]:text-base! [&_.value-card_p]:leading-7!
  [&_.small-icon]:rounded-xl! [&_.small-icon]:bg-emerald-300/10! [&_.small-icon_svg]:text-emerald-300! [&_.small-icon]:text-neutral-300!
  [&_.experience-card]:rounded-2xl! [&_.experience-card]:border-white/10! [&_.experience-card]:shadow-none!
  [&_.experience-company]:text-neutral-300! [&_.experience-note-action]:text-emerald-300!
  [&_.experience-marker]:grayscale [&_.experience-list:before]:grayscale
  [&_.services-section]:rounded-3xl! [&_.services-section]:bg-neutral-950!
  [&_.service-card]:rounded-2xl! [&_.service-card]:border-white/10!
  [&_.service-card]:bg-[linear-gradient(145deg,#1d1d1d,#111111_70%)]!
  [&_.service-card]:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]!
  [&_.service-card:hover]:border-emerald-300/40! [&_.service-card:hover]:shadow-[inset_0_1px_0_rgba(52,211,153,0.12),0_12px_36px_rgba(16,185,129,0.06)]! [&_.service-card_h3]:text-[1.375rem]! [&_.service-card_h3]:leading-[1.35]!
  [&_.service-icon]:rounded-xl! [&_.service-icon]:bg-emerald-300/10! [&_.service-icon_svg]:text-emerald-300!
  [&_.project-card]:rounded-2xl! [&_.project-card]:border-white/10! [&_.project-card]:shadow-none!
  [&_.project-card:hover]:border-emerald-300/35! [&_.project-visual]:bg-neutral-900!
  [&_.project-image-shade]:grayscale [&_.project-status]:border-white/20! [&_.project-status]:bg-neutral-900/85! [&_.project-status]:text-neutral-200!
  [&_.project-category-tabs]:rounded-2xl! [&_.project-category-tab]:rounded-xl!
  [&_.project-category-tab.is-active]:border-emerald-300/40! [&_.project-category-tab.is-active]:bg-neutral-800!
  [&_.project-category-intro]:border-emerald-400/60!
  [&_.impact-estimate]:border-emerald-300/25! [&_.impact-estimate]:bg-neutral-800/50!
  [&_.impact-estimate-heading_span]:text-neutral-400! [&_.modal-backdrop]:bg-black/75!
  [&_.tool-card]:rounded-2xl! [&_.tool-card]:border-white/10! [&_.tool-card]:shadow-none!
  [&_.tool-mark]:text-neutral-300! [&_.tool-mark-brand]:bg-neutral-200! 
  [&_.certifications-section]:rounded-3xl! [&_.certifications-section]:border-white/10!
  [&_.certifications-section:before]:grayscale [&_.certifications-section:before]:opacity-40
  [&_.certifications-heading_h2]:text-[clamp(2.25rem,4.2vw,3.75rem)]! [&_.certifications-heading_h2]:leading-[1.12]!
  [&_.certifications-heading_h2_span]:bg-none! [&_.certifications-heading_h2_span]:text-emerald-300!
  [&_.certifications-heading_p]:text-neutral-400! [&_.credential-label]:text-neutral-400!
  [&_.credential-mark]:border-white/15! [&_.credential-mark]:bg-emerald-300/10! [&_.credential-mark]:text-emerald-300!
  [&_.certificate-filters_button]:border-white/15! [&_.certificate-filters_button]:bg-neutral-900! [&_.certificate-filters_button]:text-neutral-300!
  [&_.certificate-filters_button[aria-pressed=true]]:bg-emerald-300! [&_.certificate-filters_button[aria-pressed=true]]:text-neutral-950!
  [&_.certificate-filters_button:hover]:border-emerald-300/40!
  [&_.certificate-provider-heading_p]:text-neutral-400! [&_.certificate-view-label]:text-neutral-200!
  [&_.certificate-preview-card:hover]:border-emerald-300/40! [&_.certificate-preview-copy_small]:text-neutral-400!
  [&_.education-seal]:border-white/15! [&_.education-seal]:bg-white/5! [&_.education-credential:after]:border-white/10!
  [&_.education-credential_p]:text-neutral-400!
  [&_.contact-shell]:rounded-3xl! [&_.contact-shell]:border-white/15!
  [&_.contact-shell]:bg-[radial-gradient(ellipse_at_0%_0%,rgba(16,185,129,0.13),transparent_60%),linear-gradient(145deg,#202020,#111111_65%)]!
  [&_.contact-glow]:bg-emerald-400/10! [&_.contact-form]:bg-black/15! [&_.contact-form]:border-white/10!
  [&_.field]:bg-neutral-950/60! [&_.field]:border-white/15! [&_.field:focus]:border-emerald-300! [&_.field:focus]:shadow-[0_0_0_3px_rgba(52,211,153,0.1)]!
  [&_.field-label]:text-neutral-300! [&_.field::placeholder]:text-neutral-500!
  motion-reduce:[&_*]:transition-none!
`;
