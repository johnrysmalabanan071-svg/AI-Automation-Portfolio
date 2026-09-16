'use client';

import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { InteractiveBackground } from './interactive-background';
import { portfolioVisual } from './portfolio-visual';
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Bot,
  CalendarDays,
  Cable,
  Check,
  CheckCircle2,
  ChevronRight,
  Database,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MapPin,
  Network,
  Sparkles,
  Target,
  Workflow,
  Webhook,
  X,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit: string;
};

type Project = {
  number: string;
  title: string;
  category: ProjectCategory;
  image: string;
  imageWidth: number;
  imageHeight: number;
  tags: string[];
  description: string;
  scenario: string;
  architecture: string;
  timeSaved: string;
  impact: string;
  demonstrates: string[];
  highlights: string[];
};

type ProjectCategory = 'n8n' | 'make' | 'zapier';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Tools', href: '#tools' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const experience = [
  {
    company: 'Integreon Managed Solutions',
    location: 'Makati City, Philippines',
    role: 'Senior Graphics Design Specialist',
    period: 'Feb 2026 – Jul 2026',
    progression: 'Graphics Design Specialist · May 2025 – Feb 2026',
    details: [
      'Promoted within nine months to take on project estimation, production briefings, and resource planning for deliverables.',
      'Translated stakeholder instructions into clear production requirements and produced brand-compliant presentations and documents.',
    ],
  },
  {
    company: 'The Camel.Co',
    location: 'Lipa City, Philippines',
    role: 'Solution Analyst',
    period: 'Oct 2024 – Apr 2025',
    details: [
      'Diagnosed website issues, investigated recurring problems, and documented root causes with a structured troubleshooting process.',
      'Coordinated durable fixes with internal teams—experience that now informs how I map, test, and improve automation workflows.',
    ],
  },
];

const services: Service[] = [
  {
    icon: Workflow,
    title: 'GoHighLevel automation',
    description: 'Lead capture, pipeline movement, nurture sequences, calendars, and reputation workflows built as one connected system.',
    benefit: 'A CRM your team can trust',
  },
  {
    icon: Target,
    title: 'AI lead qualification',
    description: 'Use intent, fit, and conversation data to score prospects, enrich records, and route every opportunity intelligently.',
    benefit: 'Faster response to the right leads',
  },
  {
    icon: GitBranch,
    title: 'Sales funnel automation',
    description: 'Connect forms, follow-ups, proposals, onboarding, and reporting so prospects never disappear between steps.',
    benefit: 'More conversions, fewer handoffs',
  },
  {
    icon: Database,
    title: 'CRM workflow architecture',
    description: 'Clean data models, lifecycle stages, triggers, and alerts designed around how your business actually operates.',
    benefit: 'Clear ownership at every stage',
  },
  {
    icon: Bot,
    title: 'Custom AI agents',
    description: 'Purpose-built agents for research, support, operations, and knowledge work with sensible human checkpoints.',
    benefit: 'Scale expertise without chaos',
  },
  {
    icon: Network,
    title: 'API & no-code integrations',
    description: 'Make, Zapier, n8n, webhooks, and custom API logic that keep your tools—and your data—in sync.',
    benefit: 'One reliable operating system',
  },
];

const projects: Project[] = [
  {
    number: '01',
    title: 'AI Appointment Setter',
    category: 'n8n',
    image: '/projects/ai-appointment-setter.png',
    imageWidth: 1453,
    imageHeight: 706,
    tags: ['n8n', 'Vapi', 'Google Calendar', 'Airtable'],
    description: 'A voice-enabled appointment lifecycle that lets an AI receptionist check availability, book, reschedule, and cancel appointments during a call, then log the outcome for follow-up.',
    scenario: 'This project models how a service business could provide after-hours appointment handling without giving an AI unrestricted calendar access or allowing it to confirm unavailable times.',
    architecture: 'Vapi sends structured tool calls to n8n. Separate webhook branches validate arguments, normalize time zones, query Google Calendar, and handle booking, update, and cancellation actions. Airtable records appointment activity, while a post-call flow stores the call summary.',
    timeSaved: '10–20 hours per week',
    impact: 'For a busy service business, handling availability checks, bookings, reschedules, cancellations, and call notes automatically could return 10–20 administrative hours to the team each week.',
    demonstrates: [
      'Multi-intent voice-agent tool calling across the full appointment lifecycle',
      'Real-time calendar availability checks and timezone normalization',
      'Validation and fail-safe responses before confirming calendar changes',
      'Post-call summaries and auditable appointment logging',
    ],
    highlights: ['Voice agent tools', 'Calendar lifecycle', 'Audit trail'],
  },
  {
    number: '02',
    title: 'AI Email Triage & Auto-Draft Assistant',
    category: 'n8n',
    image: '/projects/ai-email-triage.png',
    imageWidth: 1435,
    imageHeight: 672,
    tags: ['n8n', 'Gmail', 'Gemini', 'Slack'],
    description: 'An inbox workflow that classifies incoming email, filters noise and spam, drafts a grounded response from approved business context, and pauses for human approval before anything is sent.',
    scenario: 'This project explores how a busy shared inbox could reduce repetitive sorting and drafting while keeping a human responsible for every outgoing message.',
    architecture: 'A Gmail trigger feeds a noise filter and a Gemini classifier with structured output. Valid messages pull tone and policy context from Google Docs, generate a reply draft, log the draft to Google Sheets, and enter a Slack approval step. Approved drafts are sent through Gmail; declined drafts are logged without sending.',
    timeSaved: '5–10 hours per week',
    impact: 'By sorting messages and preparing grounded drafts before human review, this workflow could save a shared-inbox team roughly 5–10 hours of repetitive triage and writing each week.',
    demonstrates: [
      'Structured AI classification by category, priority, and summary',
      'Grounded reply drafting from controlled business documentation',
      'Human-in-the-loop approval through Slack before email delivery',
      'Separate spam, approved, and rejected paths with an audit trail',
    ],
    highlights: ['Email classification', 'Grounded drafting', 'Human approval'],
  },
  {
    number: '03',
    title: 'AI Job Scraper + Resume Optimizer',
    category: 'n8n',
    image: '/projects/ai-job-scraper.png',
    imageWidth: 1593,
    imageHeight: 423,
    tags: ['n8n', 'Slack', 'Google Drive', 'Gmail'],
    description: 'A Slack-triggered job-search assistant that retrieves matching roles, compares each posting with a source resume, creates a tailored resume copy, and prepares an application email draft for review.',
    scenario: 'This project models a repeatable job-search workflow that reduces research and document preparation while deliberately stopping before any application is submitted.',
    architecture: 'A Slack message is validated and sent to a job-search API. n8n loops through the returned roles, retrieves resume content from Google Drive, and uses an AI agent with structured output to assess fit and tailor content. Matching results produce a copied and updated Google document, a Gmail draft, and a Slack summary.',
    timeSaved: '6–12 hours per search week',
    impact: 'Automating role discovery, fit comparison, resume tailoring, and draft preparation could reduce an active job seeker’s weekly research and application-preparation workload by approximately 6–12 hours.',
    demonstrates: [
      'Natural-language intake with query validation and failure handling',
      'API-driven job discovery and item-by-item processing',
      'AI matching between job requirements and source resume content',
      'Document duplication, controlled updates, and draft-only outreach',
    ],
    highlights: ['Job-search API', 'Resume matching', 'Draft-only output'],
  },
  {
    number: '04',
    title: 'HubSpot AI Lead-to-Client Lifecycle Orchestrator',
    category: 'n8n',
    image: '/projects/hubspot-lifecycle-orchestrator.png',
    imageWidth: 1601,
    imageHeight: 374,
    tags: ['n8n', 'HubSpot', 'AI Qualification', 'Google Sheets'],
    description: 'An end-to-end CRM orchestration concept that models how a new lead can be validated, enriched, qualified, associated with a company, converted into a deal, and kept synchronized across follow-up and reporting workflows.',
    scenario: 'This project explores the operational complexity between lead capture and client conversion, where fragmented updates, duplicates, and missing ownership can make a CRM unreliable.',
    architecture: 'Modular n8n branches handle trigger filtering, contact and company synchronization, enrichment, AI-assisted qualification, deal creation, record association, duplicate protection, review tasks, and notification or reporting updates. HubSpot remains the lifecycle system of record while supporting tools receive controlled updates.',
    timeSaved: '10–20 hours per week',
    impact: 'For a growing sales operation, automating record updates, qualification, associations, deal creation, and reporting handoffs could eliminate 10–20 hours of recurring CRM administration each week.',
    demonstrates: [
      'Large multi-stage workflow architecture separated into maintainable modules',
      'Contact, company, and deal synchronization across CRM lifecycle stages',
      'AI-assisted qualification with explicit review and fallback paths',
      'Duplicate handling, record association, notifications, and reporting sync',
    ],
    highlights: ['CRM lifecycle', 'AI qualification', 'Record synchronization'],
  },
  {
    number: '05',
    title: 'FB Page AI Agent',
    category: 'n8n',
    image: '/projects/fb-page-ai-agent.png',
    imageWidth: 1522,
    imageHeight: 585,
    tags: ['n8n', 'Facebook Webhooks', 'Gemini', 'Google Docs'],
    description: 'A webhook-driven Facebook Page assistant that validates the platform handshake, filters incoming messages, grounds responses in a knowledge document, preserves conversation context, and sends replies through the messaging API.',
    scenario: 'This project models a first-response assistant for a Facebook Page that needs consistent answers from approved information while maintaining separate context for each conversation.',
    architecture: 'The n8n webhook separates GET verification from POST message events. Valid messages pass through a filter, retrieve reference content from Google Docs, and enter a Gemini-powered AI agent with simple memory. An HTTP request node returns the generated reply through the Facebook messaging endpoint.',
    timeSaved: '5–12 hours per week',
    impact: 'Answering common Facebook Page questions instantly from approved knowledge could save 5–12 hours of repetitive first-response work per week while reserving unusual conversations for a person.',
    demonstrates: [
      'Webhook verification and event routing for Facebook Page messaging',
      'Knowledge-grounded responses instead of unbounded generation',
      'Per-conversation memory design and message filtering',
      'API-based reply delivery with a clear extension point for tools',
    ],
    highlights: ['Webhook routing', 'Knowledge grounding', 'Conversation memory'],
  },
  {
    number: '06',
    title: 'Auto Sort Gmail Attachments on Drive',
    category: 'make',
    image: '/projects/make-gmail-attachments-drive.jpg',
    imageWidth: 1652,
    imageHeight: 504,
    tags: ['Make.com', 'Gmail', 'Gemini', 'Google Drive'],
    description: 'A Make.com scenario that watches Gmail, extracts incoming attachments, analyzes each file with AI, generates a consistent filename, stores it in Google Drive, logs the result, and sends a completion notification.',
    scenario: 'This project models a shared inbox where invoices, forms, and other attachments need to be organized consistently without someone manually downloading, renaming, filing, and tracking every document.',
    architecture: 'A Gmail watch module detects new messages and lists their attachments. AI modules upload and analyze each file, then return a standardized filename. The scenario uploads the renamed attachment to Google Drive, adds an audit row in Google Sheets, and sends an email notification when processing is complete.',
    timeSaved: '3–6 hours per week',
    impact: 'For an attachment-heavy inbox, automatic analysis, renaming, filing, logging, and notification could remove 3–6 hours of manual document handling every week.',
    demonstrates: [
      'Email-triggered attachment extraction and file-by-file processing',
      'AI-assisted document analysis and consistent filename generation',
      'Automated Google Drive filing with a searchable activity log',
      'End-of-process notification for visibility and exception follow-up',
    ],
    highlights: ['Attachment intake', 'AI file naming', 'Drive organization'],
  },
  {
    number: '07',
    title: 'Automated Export Account Transactions from Xero | Upload CSV to Asana',
    category: 'make',
    image: '/projects/make-xero-asana-export.jpg',
    imageWidth: 1788,
    imageHeight: 740,
    tags: ['Make.com', 'Xero', 'Asana', 'Google Sheets'],
    description: 'A finance-operations scenario that uses an Asana task as the control point, retrieves account transactions from Xero, assembles the records into a CSV, uploads the export back to Asana, and clears the temporary staging data.',
    scenario: 'This project models a repeatable transaction-export request where finance or operations teams need a traceable deliverable attached to the task that requested it, rather than a manual export passed around through email.',
    architecture: 'Make watches for a completed Asana task and calls the Xero API. A router separates row staging from file creation: one branch iterates through transactions and writes them to Google Sheets, while the second waits for staging to finish, retrieves the range, aggregates the rows into CSV text, uploads the file to Asana, and clears the temporary sheet range.',
    timeSaved: '2–5 hours per reporting cycle',
    impact: 'Each automated export cycle could save a finance or operations team 2–5 hours previously spent retrieving data, assembling a CSV, attaching the result, and cleaning up temporary records.',
    demonstrates: [
      'Cross-platform orchestration between task management and accounting systems',
      'Direct API retrieval, routing, iteration, and temporary data staging',
      'CSV construction through range retrieval and text aggregation',
      'Attachment delivery back to Asana followed by staging cleanup',
    ],
    highlights: ['Xero API export', 'CSV assembly', 'Asana delivery'],
  },
  {
    number: '08',
    title: 'The Lead Magnet (Sales & Marketing)',
    category: 'make',
    image: '/projects/make-lead-magnet.jpg',
    imageWidth: 1663,
    imageHeight: 672,
    tags: ['Make.com', 'Google Forms', 'OpenAI', 'Slack'],
    description: 'A lightweight lead-intake scenario that evaluates form submissions with OpenAI, routes higher-quality opportunities to immediate email and Slack alerts, and records lower-priority leads in Google Sheets for later follow-up.',
    scenario: 'This project models a lead-magnet funnel where every form submission needs a timely response, but the sales team should be interrupted only when the submitted information indicates stronger intent or fit.',
    architecture: 'Make watches new Google Forms responses through the linked Google Sheet and sends the submission to an OpenAI prompt for qualification. A router separates high- and low-quality leads: the priority path sends a Gmail notification and Slack message, while the lower-priority path appends the lead to Google Sheets.',
    timeSaved: '4–8 hours per week',
    impact: 'Automatically assessing, routing, alerting, and recording incoming leads could save a sales or marketing team 4–8 hours of manual review and follow-up coordination each week.',
    demonstrates: [
      'Form-triggered lead intake with AI-assisted qualification',
      'Conditional routing based on structured lead quality criteria',
      'Real-time multichannel alerts for higher-priority opportunities',
      'Low-priority lead logging for nurture or later review',
    ],
    highlights: ['AI lead scoring', 'Priority routing', 'Sales alerts'],
  },
  {
    number: '09',
    title: 'Asana CRM Lead Engagement Workflow',
    category: 'zapier',
    image: '/projects/zapier-asana-crm.png',
    imageWidth: 1304,
    imageHeight: 726,
    tags: ['Zapier', 'Asana', 'Gmail', 'Google Drive', 'AI by Zapier'],
    description: 'An Asana-driven CRM engagement workflow that reacts to pipeline-stage changes and coordinates lead folders, follow-up emails, quote reminders, welcome sequences, and post-sale recommendations across five lifecycle paths.',
    scenario: 'This project models how an agency or service team could use Asana as a lightweight CRM while keeping every lead stage connected to the correct follow-up, file preparation, onboarding action, or retention message.',
    architecture: 'An updated Asana task triggers Zapier Paths for Ready to Start, No Response, Quoted, Approved, and Paid and Closed stages. The branches create Google Drive resources, schedule and filter Gmail follow-ups, find approved files, and use AI by Zapier to compose personalized welcome or recommendation messages.',
    timeSaved: '6–12 hours per week',
    impact: 'Centralizing stage-based follow-up, file preparation, onboarding, and recommendation emails could save a lean client-services team approximately 6–12 hours of repetitive coordination each week.',
    demonstrates: [
      'Five-path lifecycle orchestration from initial engagement through post-sale follow-up',
      'Asana status changes used as the control point for CRM automation',
      'Timed Gmail sequences with find, filter, and follow-up safeguards',
      'AI-assisted personalization for welcome and recommendation messages',
    ],
    highlights: ['Five lifecycle paths', 'Timed follow-up', 'AI personalization'],
  },
  {
    number: '10',
    title: 'Automated Lead Enrichment',
    category: 'zapier',
    image: '/projects/zapier-lead-enrichment.png',
    imageWidth: 578,
    imageHeight: 786,
    tags: ['Zapier', 'Webhooks', 'Apollo', 'Google Sheets', 'Slack', 'Gmail'],
    description: 'A webhook-triggered enrichment workflow that normalizes a company URL, retrieves lead intelligence through Apollo, separates high- and low-priority prospects, and prepares the right sales response for each path.',
    scenario: 'This project models an inbound sales process where incomplete lead records slow down qualification and every prospect should receive a response without forcing the team to research company details manually.',
    architecture: 'A Zapier webhook receives the lead, Formatter extracts the company URL, and a GET request retrieves enrichment data. Paths then separate priority levels: high-priority leads are saved to Google Sheets, announced in Slack, and passed to AI by Zapier for an email draft before Gmail delivery; lower-priority leads trigger an internal sales notification.',
    timeSaved: '4–8 hours per week',
    impact: 'Automating company research, priority routing, record creation, alerts, and first-touch preparation could save a sales team roughly 4–8 hours of manual enrichment and coordination each week.',
    demonstrates: [
      'Webhook intake and data normalization before enrichment',
      'Apollo-based company and lead intelligence retrieval',
      'Priority-based paths with different sales actions and notifications',
      'AI-assisted outreach combined with Sheets and Slack visibility',
    ],
    highlights: ['Apollo enrichment', 'Priority routing', 'AI outreach'],
  },
  {
    number: '11',
    title: 'Smart Lead Scoring & Distribution Workflow',
    category: 'zapier',
    image: '/projects/zapier-lead-scoring.png',
    imageWidth: 911,
    imageHeight: 820,
    tags: ['Zapier', 'Google Forms', 'Formatter', 'Google Sheets', 'Gmail'],
    description: 'A structured intake workflow that cleans Google Forms submissions, calculates a lead score, filters valid responses, and distributes demo, pricing, and general inquiries into the appropriate tracking and follow-up paths.',
    scenario: 'This project models a growing inbound pipeline where raw form submissions need consistent formatting, basic qualification, and inquiry-specific routing before the sales team can respond efficiently.',
    architecture: 'A new Google Forms response enters Formatter steps that split the name, standardize the email, and calculate a lead score. A filter validates the record before Zapier Paths separates Demo Inquiry, Pricing Inquiry, and General Inquiry branches. Each route writes to Google Sheets, with the demo path also sending a Gmail response.',
    timeSaved: '3–6 hours per week',
    impact: 'Automating data cleanup, scoring, validation, routing, logging, and first-response actions could save 3–6 hours of weekly lead administration while improving response consistency.',
    demonstrates: [
      'Form-data normalization before qualification and distribution',
      'Repeatable lead scoring with validation filters',
      'Three inquiry-specific paths for clearer sales ownership',
      'Automated tracking and response actions through Sheets and Gmail',
    ],
    highlights: ['Lead scoring', 'Three inquiry paths', 'Clean CRM data'],
  },
];

const projectCategories: { id: ProjectCategory; label: string; description: string }[] = [
  { id: 'n8n', label: 'n8n', description: 'Advanced AI agents, webhook systems, lifecycle orchestration, and human-in-the-loop workflows.' },
  { id: 'make', label: 'Make.com', description: 'Visual business-process automation for documents, finance operations, and marketing workflows.' },
  { id: 'zapier', label: 'Zapier', description: 'Fast, practical automations for lead engagement, enrichment, scoring, routing, and follow-up.' },
];

// Local brand assets keep the skills section independent of external image services.
const tools: { name: string; image?: string; icon?: LucideIcon }[] = [
  { name: 'GoHighLevel', image: 'gohighlevel.png' },
  { name: 'Make.com', image: 'make.svg' },
  { name: 'Zapier', image: 'zapier.svg' },
  { name: 'n8n', image: 'n8n.svg' },
  { name: 'OpenAI', image: 'openai.svg' },
  { name: 'Claude', image: 'claude.svg' },
  { name: 'Python', image: 'python.svg' },
  { name: 'REST APIs', icon: Cable },
  { name: 'Webhooks', icon: Webhook },
  { name: 'Airtable', image: 'airtable.svg' },
  { name: 'HubSpot', image: 'hubspot.svg' },
  { name: 'Apollo', image: 'apollo.svg' },
  { name: 'Asana', image: 'asana.svg' },
  { name: 'Xero', image: 'xero.svg' },
  { name: 'JavaScript', image: 'javascript.svg' },
  { name: 'SQL', icon: Database },
  { name: 'Google Cloud', image: 'google-cloud.svg' },
];

const certificateCollections = [
  {
    mark: 'TA',
    issuer: 'Tara AI Community',
    count: '4 certificates',
    certificates: [
      { title: 'AI Automation with n8n', issued: 'June 30, 2026', image: '/certificates/tara-n8n.png', pdf: '/certificates/tara-n8n.pdf' },
      { title: 'HighLevel CRM', issued: 'April 19, 2026', image: '/certificates/tara-ghl.png', pdf: '/certificates/tara-ghl.png' },
      { title: 'No Code Automation with Make.com', issued: 'March 16, 2026', image: '/certificates/tara-make.png', pdf: '/certificates/tara-make.png' },
      { title: 'No Code Automation with Zapier', issued: 'February 4, 2026', image: '/certificates/tara-zapier.png', pdf: '/certificates/tara-zapier.png' },
    ],
  },
  {
    mark: 'OA',
    issuer: 'OpenAI Academy',
    count: '3 certificates',
    certificates: [
      { title: 'AI Foundations', issued: 'July 7, 2026', image: '/certificates/openai-ai-foundations.jpg', pdf: '/certificates/openai-ai-foundations.pdf' },
      { title: 'Applied AI Foundations', issued: 'July 7, 2026', image: '/certificates/openai-applied-ai-foundations.jpg', pdf: '/certificates/openai-applied-ai-foundations.pdf' },
      { title: 'Agents and Workflows', issued: 'July 7, 2026', image: '/certificates/openai-agents-workflows.jpg', pdf: '/certificates/openai-agents-workflows.pdf' },
    ],
  },
  {
    mark: 'n8n',
    issuer: 'n8n Academy',
    count: '3 certificates',
    certificates: [
      { title: 'N8N101 · Essentials: Your First Workflows', issued: 'July 7, 2026', image: '/certificates/n8n-101.jpg', pdf: '/certificates/n8n-101.pdf' },
      { title: 'N8N102 · Integrations: APIs & Connected Workflows', issued: 'July 13, 2026', image: '/certificates/n8n-102.jpg', pdf: '/certificates/n8n-102.pdf' },
      { title: 'N8N103 · In Practice: AI, Testing & Best Practices', issued: 'July 16, 2026', image: '/certificates/n8n-103.jpg', pdf: '/certificates/n8n-103.pdf' },
    ],
  },
  {
    mark: 'AI',
    issuer: 'Anthropic',
    count: '1 credential',
    certificates: [
      { title: 'AI Fluency: Framework & Foundations', issued: '2026', image: '/certificates/anthropic-ai-fluency.jpg', pdf: '/certificates/anthropic-ai-fluency.pdf' },
    ],
  },
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {copy && <p className="section-copy mt-5">{copy}</p>}
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="site-nav">
      <nav className="nav-capsule mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 sm:px-5" aria-label="Main navigation">
        <a href="#top" className="group flex items-center gap-3 font-semibold tracking-tight" aria-label="John Rys Clanor, home">
          <span className="brand-mark">JR</span>
          <span className="hidden sm:inline">John Rys Clanor</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" className="glow-button button button-small hidden sm:inline-flex">Let&apos;s talk <ArrowRight size={15} /></a>
          <button type="button" className="icon-button lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <Menu size={19} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Navigate</span>
              <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu"><X size={19} /></button>
            </div>
            <div className="mt-10 flex flex-col">
              {navItems.map((item, index) => (
                <motion.a key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-nav-link" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045 }}>
                  <span className="font-mono text-xs text-[var(--muted)]">0{index + 1}</span>{item.label}<ArrowRight size={20} className="ml-auto" />
                </motion.a>
              ))}
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="button mt-10 w-full">Book a free automation audit <ArrowRight size={17} /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const [toolsPaused, setToolsPaused] = useState(false);
  const enter = (delay: number) => ({
    initial: reduceMotion ? false as const : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative px-3 pb-4 pt-28 sm:px-6 sm:pt-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-neutral-200 bg-[#fdfdfd] px-6 pb-8 pt-6 text-neutral-950 shadow-[0_24px_80px_rgba(0,0,0,0.16)] sm:px-12 sm:pb-10 lg:px-16 lg:pt-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-24 right-0 w-1/3 opacity-60 [background-image:linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_right,black,transparent_75%)]" />
        <motion.div {...enter(0.02)} className="relative flex justify-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            Available for automation projects
          </span>
        </motion.div>

        <motion.div {...enter(0.08)} className="relative mt-7 flex items-center gap-5 sm:mt-2 sm:gap-6">
          <Image src="/john-rys-portrait-2026.png" alt="John Rys Clanor, AI Automation Specialist" width={1254} height={1254} sizes="(max-width: 640px) 80px, 112px" priority className="h-20 w-20 shrink-0 rounded-full border border-neutral-200 object-cover object-[center_30%] sm:h-28 sm:w-28" />
          <div>
            <p className="font-heading text-xl font-medium tracking-[-0.03em] sm:text-2xl">John Rys M. Clanor</p>
            <p className="mt-1 text-base text-neutral-600 sm:text-lg">AI Automation Specialist</p>
          </div>
        </motion.div>

        <div className="relative mt-9 max-w-4xl sm:mt-10">
          <motion.h1 {...enter(0.14)} className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.18] tracking-[-0.045em]">
            Turning Manual Work into Automated Systems.
          </motion.h1>
          <motion.p {...enter(0.2)} className="mt-5 max-w-4xl text-base leading-[1.75] text-neutral-600 sm:text-lg">
            I help businesses eliminate repetitive manual work through AI-powered automation—from voice agents and CRM workflows to lead scoring systems. With a B.S. in Information Technology and experience in requirements analysis, technical troubleshooting, and process improvement, I build production-style systems with n8n, Make.com, Zapier, and AI APIs.
          </motion.p>
          <motion.div {...enter(0.26)} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <a
  href="#contact"
  className="glow-button inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-medium text-white!"
>
  Book a free automation audit <ArrowRight size={17} />
</a>
           <a
  href="#work"
  className="glow-button glow-button-light inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-medium"
>
  View my work <ChevronRight size={17} />
</a>
          </motion.div>
        </div>

        <motion.div {...enter(0.32)} className="relative mt-12 border-t border-neutral-100 pt-6 sm:mt-16">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-base font-medium text-neutral-800">Tools I use</p>
            {!reduceMotion && (
              <button type="button" onClick={() => setToolsPaused(!toolsPaused)} aria-pressed={toolsPaused} aria-label={toolsPaused ? 'Resume scrolling tools' : 'Pause scrolling tools'} className="rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-950 focus-visible:outline-emerald-700!">
                {toolsPaused ? 'Resume' : 'Pause'}
              </button>
            )}
          </div>
          <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]" aria-label="Automation tools and technologies">
            <div className={reduceMotion ? 'flex flex-wrap justify-center gap-6 py-3' : 'flex w-max animate-tools-drift group-hover:[animation-play-state:paused]!'} style={reduceMotion ? undefined : { animationPlayState: toolsPaused ? 'paused' : 'running' }}>
              {(reduceMotion ? [0] : [0, 1]).map((copy) => (
                <div key={copy} aria-hidden={copy === 1 ? true : undefined} className={reduceMotion ? 'contents' : 'flex shrink-0 items-center gap-10 py-3 pr-10 sm:gap-14 sm:pr-14'}>
                  {tools.map(({ name, image, icon: Icon }) => (
                    <div key={name} className="flex shrink-0 items-center gap-3 whitespace-nowrap text-lg font-semibold tracking-tight text-neutral-700">
                      {image ? <img src={`/tool-icons/${image}`} alt="" width={30} height={30} className="h-8 w-8 object-contain grayscale" /> : Icon ? <Icon size={28} className="text-neutral-600!" aria-hidden="true" /> : null}
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad about-section">
      <div className="about-panel mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <SectionHeading eyebrow="About" title="Systems thinking, translated into simple workflows." />
          <p className="section-copy mt-6">
            I help owners, agencies, coaches, and lean teams turn repetitive operations into reliable automation. The goal is never “more tech.” It&apos;s fewer dropped balls, faster execution, and more time for the work only humans can do.
          </p>
          <p className="section-copy mt-5">
            I earned a B.S. in Information Technology from Batangas State University and bring client-facing requirements analysis, technical troubleshooting, production briefing, project estimation, and resource-planning experience to every build. I now apply that foundation to automation systems across n8n, Make.com, Zapier, GoHighLevel, and OpenAI, Claude, or Gemini APIs.
          </p>
          <a href="#contact" className="text-link mt-8">Tell me what&apos;s slowing you down <ArrowRight size={16} /></a>
        </Reveal>
        <Reveal delay={0.12} className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: GraduationCap, title: 'Technical foundation', text: 'B.S. Information Technology training supports structured problem-solving, APIs, data flow, JavaScript, Python, and SQL.' },
            { icon: Target, title: 'Requirements to systems', text: 'Client instructions and operational pain points are translated into clear workflow logic, ownership, and outcomes.' },
            { icon: Layers3, title: 'Production discipline', text: 'Experience with estimation, briefings, resource planning, and stakeholder coordination keeps delivery organized.' },
            { icon: CheckCircle2, title: 'Continuous learning', text: 'Training through OpenAI Academy, n8n Academy, and Anthropic strengthens practical AI workflow design.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="value-card">
              <span className="small-icon"><Icon size={19} /></span>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad section-tint experience-section">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="A practical foundation for reliable automation."
            copy="Before specializing in AI automation, I built experience in production planning, requirements analysis, stakeholder coordination, and technical troubleshooting—the same disciplines that keep workflows clear, testable, and dependable."
          />
          <a
            href="/john-rys-clanor-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="experience-note mt-8"
            aria-label="View John Rys Clanor's résumé in a new tab"
          >
            <span className="experience-note-copy">
              <BriefcaseBusiness size={18} />
              <span>Professional experience verified from my résumé.</span>
            </span>
            <span className="experience-note-action">View résumé <ArrowRight size={15} /></span>
          </a>
        </Reveal>

        <div className="experience-list">
          {experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.role}`} delay={index * 0.08}>
              <article className="experience-card">
                <div className="experience-marker" aria-hidden="true"><span /></div>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="experience-company">{item.company}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
                    {item.progression && <p className="mt-2 text-sm font-medium text-[var(--muted)]">{item.progression}</p>}
                  </div>
                  <div className="experience-meta">
                    <span>{item.period}</span>
                    <span><MapPin size={13} /> {item.location}</span>
                  </div>
                </div>
                <ul className="mt-6 grid gap-3">
                  {item.details.map((detail) => (
                    <li key={detail} className="experience-detail"><CheckCircle2 size={16} /> <span>{detail}</span></li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section-pad services-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Services · 01—06" title="Automation that moves a real metric." copy="Strategy, architecture, implementation, and optimization—focused on the points where better systems create revenue, capacity, or customer trust." />
        </Reveal>
        <div className="service-grid mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, benefit }, index) => (
            <Reveal key={title} delay={(index % 3) * 0.07}>
              <motion.article className="service-card" whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                <div className="flex items-center justify-between">
                  <span className="service-icon"><Icon size={22} /></span>
                  <span className="service-number">0{index + 1} / 06</span>
                </div>
                <h3 className="service-title mt-8 font-semibold tracking-tight">{title}</h3>
                <p className="service-copy mt-4 text-sm leading-6 text-[var(--muted)]">{description}</p>
                <div className="service-benefit mt-7 flex items-center gap-2 border-t border-[var(--border)] pt-5 text-sm font-semibold">
                  <Check size={15} className="text-cyan-500" /> {benefit}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('n8n');
  const visibleProjects = projects.filter((project) => project.category === activeCategory);
  const activeCategoryInfo = projectCategories.find((category) => category.id === activeCategory)!;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section id="work" className="section-pad work-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Automation portfolio" title="Complex workflows, mapped from trigger to outcome." copy="Eleven self-directed automation builds organized across n8n, Make.com, and Zapier. Each case study demonstrates workflow architecture, AI integration, validation, routing, and human checkpoints. The time-savings ranges are illustrative estimates—not client results." />
          <a href="#contact" className="text-link shrink-0">Discuss your project <ArrowRight size={16} /></a>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <div className="project-category-tabs" role="tablist" aria-label="Filter automation projects by platform">
            {projectCategories.map((category) => {
              const count = projects.filter((project) => project.category === category.id).length;
              const active = category.id === activeCategory;
              return (
                <button key={category.id} type="button" role="tab" aria-selected={active} className={`project-category-tab ${active ? 'is-active' : ''}`} onClick={() => setActiveCategory(category.id)}>
                  <span>{category.label}</span><small>{count} projects</small>
                </button>
              );
            })}
          </div>
          <div className="project-category-intro">
            <p className="eyebrow text-[10px]">{activeCategoryInfo.label} automation</p>
            <p>{activeCategoryInfo.description}</p>
          </div>
        </Reveal>
        <div className="mt-14 space-y-5">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.06}>
              <article className={`project-card ${index % 2 === 1 ? 'project-card-reverse' : ''}`}>
                <div className="project-visual">
                  <Image src={project.image} alt={`${project.title} workflow overview`} fill sizes="(max-width: 767px) 100vw, 38vw" className="project-image" />
                  <span className="project-image-shade" />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <span className="font-mono text-xs text-white/80">BUILD / {project.number}</span>
                    <span className="project-status">Estimated impact</span>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => <span key={tag} className="project-tag">{tag}</span>)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
                  <p className="eyebrow text-[10px]">Potential time saved · {project.timeSaved}</p>
                  <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
                  <div className="mt-7 grid grid-cols-3 gap-3 border-y border-[var(--border)] py-5">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="flex flex-col gap-2">
                        <CheckCircle2 size={16} className="text-cyan-500" />
                        <p className="text-[10px] font-semibold leading-4 text-[var(--muted)] sm:text-xs">{highlight}</p>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setSelected(project)} className="text-link mt-7 self-start">View case study <ArrowRight size={16} /></button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelected(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="case-title" className="modal-panel" initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} onMouseDown={(event) => event.stopPropagation()}>
              <button type="button" className="icon-button absolute right-5 top-5" onClick={() => setSelected(null)} aria-label="Close case study"><X size={19} /></button>
              <div className="case-image-frame">
                <Image src={selected.image} alt={`${selected.title} complete workflow`} width={selected.imageWidth} height={selected.imageHeight} sizes="(max-width: 800px) 94vw, 920px" className="case-image" />
              </div>
              <div className="mt-8"><p className="eyebrow">{projectCategories.find((category) => category.id === selected.category)?.label} case study · {selected.number}</p></div>
              <h3 id="case-title" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{selected.title}</h3>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{selected.description}</p>
              <div className="mt-9 grid gap-8 sm:grid-cols-2">
                <div><p className="eyebrow text-[10px]">Scenario modeled</p><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{selected.scenario}</p></div>
                <div><p className="eyebrow text-[10px]">Workflow architecture</p><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{selected.architecture}</p></div>
              </div>
              <div className="mt-9 border-t border-[var(--border)] pt-8">
                <p className="eyebrow text-[10px]">What this project demonstrates</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {selected.demonstrates.map((item) => <div key={item} className="demonstrates-item"><Check size={15} /> <span>{item}</span></div>)}
                </div>
              </div>
              <div className="impact-estimate">
                <div className="impact-estimate-heading"><span>Potential time saved</span><strong>{selected.timeSaved}</strong></div>
                <p>{selected.impact}</p>
                <small>Illustrative estimate based on a recurring workload. Actual savings depend on process volume, complexity, and team adoption.</small>
              </div>
              <a href="#contact" onClick={() => setSelected(null)} className="glow-button button button-primary mt-9">Build a system like this <ArrowRight size={17} /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="section-pad section-tint tools-section overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><SectionHeading eyebrow="Skills & tools" title="Platform-agnostic. Outcome-obsessed." copy="The best stack is the one your team can own. I combine proven platforms with custom logic only where it adds real leverage." align="center" /></Reveal>
        <Reveal delay={0.1} className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map(({ name, image, icon: Icon }) => (
            <motion.div key={name} className="tool-card" whileHover={{ y: -4 }}>
              <span className={`tool-mark${image ? ' tool-mark-brand' : ''}`} aria-hidden="true">
                {image ? <Image src={`/tool-icons/${image}`} alt="" width={28} height={28} className="tool-logo" /> : Icon ? <Icon size={25} strokeWidth={1.8} /> : null}
              </span>
              <span className="text-sm font-semibold">{name}</span>
            </motion.div>
          ))}
        </Reveal>
        <Reveal delay={0.15} className="process-strip mt-14">
          {[
            ['01', 'Audit', 'Find the highest-leverage bottleneck.'],
            ['02', 'Architect', 'Map the data, logic, and handoffs.'],
            ['03', 'Build', 'Implement, test, and document.'],
            ['04', 'Optimize', 'Measure, monitor, and improve.'],
          ].map(([number, title, copy]) => (
            <div key={number} className="process-step">
              <span className="font-mono text-xs text-cyan-500">{number}</span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{copy}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Certifications() {
  const [provider, setProvider] = useState('Tara AI Community');
  const visibleCollections = certificateCollections.filter((collection) => provider === 'All' || collection.issuer === provider);
  return (
    <section id="certifications" className="certifications-section section-pad">
      <div className="certifications-grid" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="certifications-heading mx-auto max-w-3xl text-center">
          <p className="eyebrow">Education & credentials</p>
          <h2 className="mt-5">Training that supports <span>reliable systems.</span></h2>
          <p className="mx-auto mt-6 max-w-2xl">Formal IT education and focused platform training across AI, workflow architecture, connected APIs, and agent design.</p>
        </Reveal>

        <div className="credential-rail mt-16">
          <Reveal className="credential-cluster">
            <span className="credential-node" aria-hidden="true">01</span>
            <div className="credential-cluster-heading">
              <div>
                <p className="credential-label">Courses & platform academies</p>
                <h3>Focused automation training</h3>
              </div>
              <p>11 certificates across four training providers.</p>
            </div>

            <div className="certificate-filters mt-8" role="group" aria-label="Filter certificates by training provider">
              {['All', ...certificateCollections.map((collection) => collection.issuer)].map((name) => (
                <button key={name} type="button" aria-pressed={provider === name} aria-controls="certificate-gallery" onClick={() => setProvider(name)}>
                  {name}<span>{name === 'All' ? 11 : certificateCollections.find((collection) => collection.issuer === name)!.certificates.length}</span>
                </button>
              ))}
            </div>
            <div id="certificate-gallery" className="certificate-gallery">
              {visibleCollections.map((collection) => (
                <section key={collection.issuer} className="certificate-provider" aria-label={collection.issuer}>
                  <div className="certificate-provider-heading">
                    <span className="credential-mark" aria-hidden="true">{collection.mark}</span>
                    <div>
                      <h4>{collection.issuer}</h4>
                      {collection.issuer === 'Tara AI Community' ? (
                        <p>Paid AI automation training with Kuys RJ, conducted by Technical Virtual Assistants PH. Hands-on study of n8n, GoHighLevel, Make.com, and Zapier.</p>
                      ) : <p>{collection.count} · AI and automation learning</p>}
                    </div>
                  </div>
                  <div className="certificate-preview-grid">
                    {collection.certificates.map((certificate) => (
                      <a key={certificate.pdf} href={certificate.pdf} target="_blank" rel="noopener noreferrer" className="certificate-preview-card" aria-label={`View ${certificate.title} certificate (opens in a new tab)`}>
                        <span className="certificate-preview-media">
                          <Image src={certificate.image} alt={`${certificate.title} certificate`} width={840} height={595} />
                        </span>
                        <span className="certificate-preview-copy">
                          <span><strong>{certificate.title}</strong><small>{certificate.issued}</small></span>
                          <ExternalLink size={18} aria-hidden="true" />
                        </span>
                        <span className="certificate-view-label">View certificate <span>{certificate.pdf.endsWith('.pdf') ? 'PDF' : 'Image'}</span></span>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Reveal>

          <Reveal className="credential-cluster credential-cluster-education" delay={0.1}>
            <span className="credential-node" aria-hidden="true">02</span>
            <div className="credential-cluster-heading">
              <div>
                <p className="credential-label">Formal education</p>
                <h3>Technical foundation</h3>
              </div>
              <p>Education behind the systems thinking.</p>
            </div>
            <article className="education-credential mt-8">
              <span className="education-seal"><GraduationCap size={28} /></span>
              <div>
                <p className="credential-label">Batangas State University · 2024</p>
                <h3>B.S. Information Technology</h3>
                <p>Foundation in requirements analysis, software concepts, data flow, technical troubleshooting, and structured problem-solving.</p>
              </div>
              <Award className="education-award" size={34} aria-hidden="true" />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // PLACEHOLDER: Connect this form to your preferred form endpoint, CRM, or GoHighLevel webhook.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="contact-shell">
          <div className="contact-glow" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow text-cyan-300">Start a conversation</p>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-.04em] text-white sm:text-5xl">What would change if the busywork disappeared?</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">Bring me the process that is slow, fragile, or stealing your team&apos;s attention. I&apos;ll help you see what to automate first—and what not to.</p>
              <div className="mt-9 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3"><span className="contact-icon"><CalendarDays size={17} /></span> Free 30-minute automation audit</div>
                <a href="mailto:johnrysclanor22@gmail.com" className="flex items-center gap-3 transition-colors hover:text-cyan-300"><span className="contact-icon"><Mail size={17} /></span> johnrysclanor22@gmail.com</a>
                <div className="flex items-center gap-3"><span className="contact-icon"><MapPin size={17} /></span> Lipa City, Batangas · Available worldwide</div>
                <a href="https://www.linkedin.com/in/john-rys-clanor-1b9828312" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-cyan-300"><span className="contact-icon"><Linkedin size={17} /></span> Connect on LinkedIn</a>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <form className="contact-form" onSubmit={handleSubmit}>
                {submitted ? (
                  <div className="grid min-h-[390px] place-items-center text-center" role="status">
                    <div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300"><CheckCircle2 size={28} /></span><h3 className="mt-6 text-2xl font-semibold text-white">You&apos;re on the radar.</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-300">Thanks for reaching out. This demo form is ready to connect to your inbox or CRM.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-cyan-300">Send another message</button></div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="field-label">Name<input required name="name" autoComplete="name" className="field" placeholder="Your name" /></label>
                      <label className="field-label">Work email<input required type="email" name="email" autoComplete="email" className="field" placeholder="you@company.com" /></label>
                    </div>
                    <label className="field-label mt-5">What would you like to automate?<textarea required name="message" className="field min-h-36 resize-y" placeholder="A quick overview of the workflow, bottleneck, or goal..." /></label>
                    <button type="submit" className="glow-button button button-contact mt-6 w-full">Request my free audit <ArrowRight size={17} /></button>
                    <p className="mt-4 text-center text-xs text-slate-400">No sales script. Just a practical conversation about your systems.</p>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-9">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="flex items-center gap-3 font-semibold"><span className="brand-mark">JR</span>John Rys Clanor</a>
        <p className="text-xs text-[var(--muted)]">AI automation systems for businesses ready to move faster.</p>
        <div className="flex items-center gap-5 text-sm text-[var(--muted)]">
          <a href="https://www.linkedin.com/in/john-rys-clanor-1b9828312" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
          <a href="mailto:johnrysclanor22@gmail.com" className="footer-link">Email</a>
          <a href="#contact" className="footer-link">Book a call</a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-5 text-xs text-[var(--muted)] sm:px-8">© {new Date().getFullYear()} John Rys Clanor. All rights reserved.</div>
    </footer>
  );
}

export function Portfolio() {
  return (
    <main className={`site-shell min-h-screen overflow-clip bg-[var(--bg)] text-[var(--text)] ${portfolioVisual}`}>
      <InteractiveBackground theme="dark" />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Services />
      <Projects />
      <Tools />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
