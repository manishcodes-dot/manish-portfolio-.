import { Project, SkillItem, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Manish Rana',
  handle: 'manish.io',
  role: 'Senior Web & Full-Stack Engineer',
  tagline: 'Building robust distributed systems, high-performance web applications, and thoughtful developer experiences.',
  bio: `Senior Web Developer with 6+ years specializing in modern TypeScript ecosystems, React architecture, distributed node services, and resilient user experiences. Focused on sub-100ms Core Web Vitals, accessible design systems, and deterministic state synchronization at scale.`,
  email: 'manishrana98449@gmail.com',
  location: 'Bangalore, India (Open to Worldwide Remote)',
  availability: 'Available for high-impact contracts & senior engineering roles',
  status: 'actively-building',
  github: 'https://github.com/manishcodes-dot',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com',
  npm: 'https://www.npmjs.com',
  cliCommand: 'npx manish.io',
  stats: [
    { label: 'Years Experience', value: '6+' },
    { label: 'Production Apps', value: '32+' },
    { label: 'Open Source Stars', value: '1.4k+' },
    { label: 'Average Lighthouse', value: '99/100' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'kinesis-sync',
    title: 'Kinesis Edge Sync Engine',
    tagline: 'Real-time peer-to-peer and edge state synchronizer with optimistic conflict resolution.',
    category: 'fullstack',
    featured: true,
    year: '2025',
    description: 'A distributed WebSocket and WebRTC synchronization framework engineered for collaborative canvas and rich document editing with zero single-point-of-failure.',
    problem: 'Collaborative applications suffer from high latency and divergence when multi-region users edit shared graphs concurrently under spotty connectivity.',
    solution: 'Constructed an event-driven sync engine implementing Hybrid Logical Clocks (HLC) and state-based CRDTs with Redis Pub/Sub edge workers and local IndexedDB fallback.',
    architecture: [
      'Client local mutation queue with instant optimistic UI rollback protection',
      'Binary WebSocket multiplexing using Protocol Buffers to minimize payload size by 68%',
      'Multi-region Redis Pub/Sub cluster ensuring <15ms regional sync relay',
      'Stateless Node.js/TypeScript workers running on containerized edge nodes'
    ],
    metrics: [
      'Sub-12ms average edge latency across APAC and EU nodes',
      'Processed 45,000 concurrent mutations/sec in synthetic stress tests',
      'Zero data loss during simulated split-brain network partitions'
    ],
    technologies: ['TypeScript', 'Node.js', 'WebSockets', 'Redis', 'React 19', 'IndexedDB', 'Docker'],
    githubUrl: 'https://github.com/manishrana/kinesis-sync',
    liveUrl: 'https://kinesis-sync.demo.io',
    codeSnippet: `// Edge mutation dispatcher with optimistic reconciliation
export class SyncChannel<T extends { id: string; rev: number }> {
  private localRevision = 0;
  private queue = new PriorityQueue<Mutation<T>>();

  async dispatch(mutation: Mutation<T>): Promise<SyncResult> {
    const clock = this.hlc.now();
    const payload = this.encodeEnvelope({ ...mutation, clock });
    
    // Apply optimistic local prediction
    this.storage.applyOptimistic(mutation);
    
    // Send binary framed packet over WebSocket
    return this.transport.sendWithAck(payload, { timeoutMs: 300 });
  }
}`,
    asciiFlow: `[ Client UI ] <---> [ Optimistic Cache (IndexedDB) ]
       |
  (Binary WS)
       v
[ Edge Gateway ] <---> [ Redis PubSub Bus ] <---> [ Storage Engine ]`
  },
  {
    id: 'hyperscale-ui',
    title: 'HyperScale UI Kit',
    tagline: 'Headless, zero-runtime accessible design system primitives with fluid layout mechanics.',
    category: 'frontend',
    featured: true,
    year: '2025',
    description: 'A highly optimized headless component architecture built for data-dense engineering dashboards, compliance tooling, and developer portals.',
    problem: 'Standard component libraries introduce massive CSS runtime overhead and break keyboard accessibility within complex nested menus and data grids.',
    solution: 'Engineered a modular design system using Tailwind v4 token variables, strict WAI-ARIA APG patterns, and composable compound hook abstractions.',
    architecture: [
      'Tree-shakeable ESM module structure with automated bundle size regression gates',
      'Zero external style injection — compiles directly to atomic CSS utility tokens',
      'Automated accessibility test runner enforcing WCAG 2.2 AAA standards',
      'Virtual scrolling primitives capable of rendering 100k+ rows at 60 FPS'
    ],
    metrics: [
      '18,000+ weekly npm downloads across community tools',
      'Bundle footprint under 3.4KB gzipped for core primitives',
      '100% keyboard navigable with integrated focus trap management'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vitest', 'Motion'],
    githubUrl: 'https://github.com/manishrana/hyperscale-ui',
    liveUrl: 'https://hyperscale-ui.preview.io',
    codeSnippet: `// Composable focus-managed dialog primitive
export function useDialogPrimitive(config: DialogOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEscapeKey(() => config.onClose?.());
  useFocusTrap(containerRef, { active: config.isOpen });

  return {
    portalProps: { 'aria-modal': true, role: 'dialog' },
    ref: containerRef
  };
}`,
    asciiFlow: `[ Component API ] ---> [ Hook Primitives (Focus/Aria) ] ---> [ Atomic DOM Node ]
                                   |
                             [ Token Engine ]`
  },
  {
    id: 'tracelens-apm',
    title: 'TraceLens APM & Telemetry',
    tagline: 'Client-side performance observer and network waterfall profiler for web vitals.',
    category: 'devtools',
    featured: true,
    year: '2024',
    description: 'An unobtrusive real-time web telemetry probe that captures Interaction to Next Paint (INP), Long Animation Frames (LoAF), and memory pressure.',
    problem: 'Production micro-frontends lack granular client-side visibility into sudden frame drops, unoptimized third-party scripts, and memory leaks.',
    solution: 'Created an embeddable diagnostic overlay that intercepts browser PerformanceObserver APIs and feeds back telemetry without blocking the main event loop.',
    architecture: [
      'Off-thread analytics processing leveraging dedicated Web Workers',
      'Sampling buffer with adaptive throttle during high device GPU strain',
      'Canvas 2D render loop drawing live memory sparklines & frame duration timeline',
      'OpenTelemetry format export hook for seamless Datadog and Grafana ingestion'
    ],
    metrics: [
      '< 2.1KB minified script overhead with 0ms startup blocking',
      'Detected 34 memory leaks in staging deployments before customer release',
      'Adopted by 12+ engineering teams for continuous Core Web Vitals profiling'
    ],
    technologies: ['TypeScript', 'Canvas API', 'Web Workers', 'PerformanceObserver', 'Vite'],
    githubUrl: 'https://github.com/manishrana/tracelens-apm',
    liveUrl: 'https://tracelens.dev.io',
    codeSnippet: `// Long Animation Frame (LoAF) observer hook
export function initTelemetryProbe(onReport: (metric: Metric) => void) {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        // Main thread blocking task detected
        onReport({
          type: 'BLOCKING_TASK',
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      }
    }
  });

  observer.observe({ type: 'long-animation-frame', buffered: true });
}`,
    asciiFlow: `[ Browser DOM Events ] ---> [ PerformanceObserver ] ---> [ Web Worker Buffer ]
                                                                   |
                                                         [ Canvas HUD / OTel Exporter ]`
  },
  {
    id: 'omnistore-commerce',
    title: 'OmniStore Headless Platform',
    tagline: 'Sub-second commerce storefront with distributed cart reconciliation and edge caching.',
    category: 'fullstack',
    featured: false,
    year: '2024',
    description: 'High-speed headless commerce web app engineered for multi-currency international transactions with resilient offline-first shopping bags.',
    problem: 'Traditional commerce monoliths suffer 3-5 second Time to Interactive (TTI), causing severe cart abandonment during promotional traffic bursts.',
    solution: 'Architected an edge-rendered storefront with incremental static regeneration, optimistic stock reserve locking, and Stripe Elements integration.',
    architecture: [
      'Edge middleware dynamically geolocating shoppers and localizing currencies',
      'PostgreSQL with Redis distributed locks to eliminate inventory double-sales',
      'Automated webhook dispatcher handling Stripe idempotent reconciliation',
      'Statically cached product catalogs with stale-while-revalidate invalidation'
    ],
    metrics: [
      '100/100 Google Lighthouse performance score on mobile 4G',
      '4.2x increase in checkout funnel velocity compared to legacy system',
      'Handled Black Friday spikes of 120,000 visits/hour without degradation'
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/manishrana/omnistore-platform',
    liveUrl: 'https://omnistore-demo.io',
    codeSnippet: `// Idempotent webhook processor with distributed inventory lock
export async function handleStripeCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const lockKey = \`lock:order:\${session.id}\`;

  const acquired = await redis.set(lockKey, 'locked', 'NX', 'EX', 60);
  if (!acquired) return { status: 'duplicate_ignored' };

  await db.transaction(async (tx) => {
    await tx.orders.updateStatus(session.metadata.orderId, 'PAID');
    await tx.inventory.decrementReservedItems(session.metadata.orderId);
  });
}`,
    asciiFlow: `[ Shopper Edge ] ---> [ Next.js ISR Cache ] ---> [ Checkout API ] ---> [ Stripe / PG Lock ]`
  },
  {
    id: 'bytegraph-ast',
    title: 'ByteGraph Visual AST Analyzer',
    tagline: 'WebAssembly-accelerated TypeScript AST visualizer with interactive force-directed graph.',
    category: 'frontend',
    featured: false,
    year: '2024',
    description: 'Interactive browser sandbox parsing complex TypeScript codebases to visualize module dependencies, cyclic imports, and bundle weight hot-spots.',
    problem: 'Large enterprise monorepos develop invisible circular dependencies and bundle bloat that are hard to diagnose through flat text linters.',
    solution: 'Developed an interactive GPU/Canvas graph rendering engine compiling AST analysis into an interactive spatial map with zoom-to-cluster exploration.',
    architecture: [
      'Custom WebAssembly compiler worker parsing AST in native machine threads',
      'Force-directed physics simulation running at smooth 60 FPS via Canvas 2D',
      'Color-coded bundle hierarchy highlighting critical circular dependency paths'
    ],
    metrics: [
      'Visualizes 10,000+ module nodes in under 200ms',
      'Adopted by 500+ developers for refactoring legacy codebases',
      'Zero main-thread UI jank during continuous force-layout calculations'
    ],
    technologies: ['WebAssembly', 'Canvas API', 'TypeScript', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/manishrana/bytegraph-ast',
    liveUrl: 'https://bytegraph.dev.io',
    codeSnippet: `// Force simulation step executed in Canvas 2D loop
export function renderDependencyGraph(ctx: CanvasRenderingContext2D, graph: GraphState) {
  ctx.clearRect(0, 0, graph.width, graph.height);
  
  // Render high-contrast connection vectors
  for (const edge of graph.edges) {
    ctx.strokeStyle = edge.isCyclic ? '#ef4444' : 'rgba(113, 113, 122, 0.4)';
    ctx.lineWidth = edge.isCyclic ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(edge.source.x, edge.source.y);
    ctx.lineTo(edge.target.x, edge.target.y);
    ctx.stroke();
  }
}`,
    asciiFlow: `[ Raw TypeScript Code ] ---> [ Wasm AST Parser ] ---> [ Force Vector Physics ] ---> [ Canvas Canvas 2D ]`
  },
  {
    id: 'envguard-cli',
    title: 'EnvGuard Secret & Drift CLI',
    tagline: 'Zero-knowledge encrypted developer secret orchestrator with automated drift detection.',
    category: 'devtools',
    featured: false,
    year: '2023',
    description: 'A developer tool and CLI utility preventing secret leaks by encrypting environment variables locally with hardware keys and checking for drift across team staging clusters.',
    problem: 'Teams inadvertently leak unencrypted `.env` secrets in git commits and suffer staging crashes from outdated local environment configurations.',
    solution: 'Built a lightweight Node.js/Rust CLI executing pre-commit AST entropy scans and AES-256-GCM envelope encryption without storing plain text in the cloud.',
    architecture: [
      'Client-side AES-256-GCM authenticated encryption using Argon2id key derivation',
      'Git hook integration detecting high-entropy string leaks in real time',
      'Fast drift detection comparing schema hashes between local `.env` and remote'
    ],
    metrics: [
      'Over 25,000 secrets verified safely across team repos',
      'Reduced environment-related deployment failures to zero in test orgs',
      'Sub-50ms CLI execution latency'
    ],
    technologies: ['Node.js', 'TypeScript', 'CLI / Chalk', 'Cryptography', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/manishrana/envguard-cli',
    liveUrl: 'https://envguard.cli.io',
    codeSnippet: `// Pre-commit entropy leak detection scanner
export function calculateShannonEntropy(str: string): number {
  const frequencies = new Map<string, number>();
  for (const char of str) {
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }
  
  return Array.from(frequencies.values()).reduce((sum, count) => {
    const p = count / str.length;
    return sum - p * Math.log2(p);
  }, 0);
}`,
    asciiFlow: `[ Git Staged Files ] ---> [ Entropy Heuristics ] ---> [ AES-256 Encryption ] ---> [ Protected Push ]`
  }
];

export const SKILLS: SkillItem[] = [
  // Languages
  { name: 'TypeScript', category: 'languages', level: 'Expert', years: 6, highlight: 'Strict type modeling, generic inference, AST compilation, TS 5.x decorators' },
  { name: 'JavaScript (ES2024)', category: 'languages', level: 'Expert', years: 6, highlight: 'Event loop mechanics, async pipelines, Web Workers, memory management' },
  { name: 'Node.js', category: 'languages', level: 'Expert', years: 6, highlight: 'Streams, event emitters, HTTP/2, worker threads, clustering, CLI tooling' },
  { name: 'SQL / PostgreSQL', category: 'languages', level: 'Advanced', years: 5, highlight: 'Complex joins, indexing strategies, CTEs, partition tables, EXPLAIN ANALYZE' },
  { name: 'HTML5 / CSS3', category: 'languages', level: 'Expert', years: 6, highlight: 'Semantic layout, WAI-ARIA APG compliance, CSS Grid, custom properties' },
  { name: 'Go / Python', category: 'languages', level: 'Proficient', years: 3, highlight: 'Microservice utilities, automated scripts, concurrency primitives' },

  // Frontend
  { name: 'React 19 & Next.js', category: 'frontend', level: 'Expert', years: 6, highlight: 'Server Components, concurrent rendering, custom hooks, Suspense architecture' },
  { name: 'Tailwind CSS v4', category: 'frontend', level: 'Expert', years: 5, highlight: 'Utility architecture, design tokens, responsive breakpoints, dark mode' },
  { name: 'State Architecture', category: 'frontend', level: 'Expert', years: 6, highlight: 'Zustand, Redux Toolkit, optimistic caches, TanStack Query, CRDTs' },
  { name: 'Browser Performance', category: 'frontend', level: 'Expert', years: 5, highlight: 'Core Web Vitals (LCP, INP, CLS), memory profiling, bundle optimization' },
  { name: 'WebSockets & WebRTC', category: 'frontend', level: 'Advanced', years: 4, highlight: 'Real-time peer sync, heartbeat management, binary packet serialization' },
  { name: 'Canvas 2D / WebGL', category: 'frontend', level: 'Advanced', years: 3, highlight: '60 FPS custom rendering loops, chart visualizations, particle systems' },

  // Backend
  { name: 'Express / REST APIs', category: 'backend', level: 'Expert', years: 6, highlight: 'Middleware pipelines, rate-limiting, OpenAPI specifications, JWT/OAuth2' },
  { name: 'Microservices & RPC', category: 'backend', level: 'Advanced', years: 4, highlight: 'Event-driven decoupling, message queues, idempotency keys' },
  { name: 'Redis / In-Memory', category: 'backend', level: 'Advanced', years: 5, highlight: 'Distributed caching, Pub/Sub, sorted sets, sliding window rate-limiting' },
  { name: 'Security & Auth', category: 'backend', level: 'Advanced', years: 5, highlight: 'CSRF, CORS, CSP headers, Argon2 hashing, RBAC authorization matrices' },

  // Database
  { name: 'PostgreSQL', category: 'database', level: 'Advanced', years: 5, highlight: 'Query tuning, connection pooling (PgBouncer), migrations, ACID guarantees' },
  { name: 'Redis', category: 'database', level: 'Advanced', years: 5, highlight: 'Cache invalidation, session persistence, distributed lock patterns' },
  { name: 'Prisma & Drizzle ORM', category: 'database', level: 'Advanced', years: 4, highlight: 'Type-safe database queries, declarative schema migrations' },
  { name: 'MongoDB / Document Stores', category: 'database', level: 'Proficient', years: 4, highlight: 'Aggregation pipelines, indexing, sharded collection management' },

  // DevOps & Tooling
  { name: 'Docker & Containers', category: 'devops', level: 'Advanced', years: 5, highlight: 'Multi-stage lean builds, volume caching, container orchestration' },
  { name: 'CI/CD & GitHub Actions', category: 'devops', level: 'Advanced', years: 5, highlight: 'Automated test runners, security audit scans, preview deployments' },
  { name: 'Vite & esbuild', category: 'devops', level: 'Expert', years: 4, highlight: 'Modern bundler configuration, rollup plugins, code splitting' },
  { name: 'Linux / Bash Scripting', category: 'devops', level: 'Advanced', years: 6, highlight: 'System administration, systemd service management, network diagnostic tools' },
  { name: 'Cloudflare / Edge Workers', category: 'devops', level: 'Advanced', years: 3, highlight: 'Edge routing, serverless compute, geo-distributed KV stores' }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2023 — Present',
    role: 'Senior Full-Stack Engineer',
    company: 'Veloce Systems',
    location: 'Remote',
    type: 'Full-time',
    summary: 'Lead architect for developer tooling and client-facing web platforms serving 250k+ active developers.',
    accomplishments: [
      'Spearheaded the migration of legacy client apps to React 19 and modern Vite tooling, cutting initial page load times by 48% and achieving a 99/100 Core Web Vitals score.',
      'Designed a distributed WebSocket state synchronization engine handling 120k peak simultaneous client connections with zero service outages.',
      'Mentored 8 mid-level engineers in deterministic state management, performance profiling, and test-driven architecture.'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'Redis', 'PostgreSQL', 'Docker', 'Tailwind CSS']
  },
  {
    period: '2021 — 2023',
    role: 'Lead Frontend Developer',
    company: 'Aether Cloud',
    location: 'Bangalore, India',
    type: 'Full-time',
    summary: 'Directed the front-end architecture and unified design system for enterprise infrastructure management dashboards.',
    accomplishments: [
      'Built a zero-dependency design system library utilized by 5 distinct product teams, eliminating 300KB of duplicate vendor CSS.',
      'Engineered an interactive real-time network topology visualizer using Canvas 2D rendering 20,000+ nodes at a steady 60 FPS.',
      'Decreased production error telemetry rates by 62% by introducing strict TypeScript typing gates and automated E2E test suites.'
    ],
    technologies: ['React', 'TypeScript', 'Canvas API', 'Next.js', 'Tailwind CSS', 'WebSockets']
  },
  {
    period: '2019 — 2021',
    role: 'Web Developer & Systems Engineer',
    company: 'QuantMatrix Solutions',
    location: 'Hybrid',
    type: 'Full-time',
    summary: 'Developed customer-facing portals, high-throughput REST APIs, and automated data ingestion pipelines.',
    accomplishments: [
      'Engineered resilient payment integration pipelines with automated idempotent retry logic, handling $4M+ in monthly transaction volume.',
      'Implemented full database caching layers using Redis, decreasing primary DB CPU load from 85% to 22% during peak sales periods.',
      'Set up automated GitHub Actions CI/CD pipelines reducing deployment cycle durations from 45 minutes to under 4 minutes.'
    ],
    technologies: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS']
  },
  {
    period: '2018 — 2019',
    role: 'Software Developer (Frontend & Open Source)',
    company: 'Nexus Labs',
    location: 'Bangalore, India',
    type: 'Contract',
    summary: 'Built responsive single-page web applications, interactive landing experiences, and contributed to open-source developer utilities.',
    accomplishments: [
      'Shipped 14 high-converting responsive web applications and client dashboards with accessibility-first standards.',
      'Contributed bug fixes and documentation improvements to popular React and Node.js open-source libraries.'
    ],
    technologies: ['JavaScript', 'React', 'HTML5/CSS3', 'REST APIs', 'Git']
  }
];
