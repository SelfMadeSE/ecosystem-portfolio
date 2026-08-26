'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const architectureDiagram = `
CREATOR LOOP (Describe → Build → Play → Change → Ship)

┌─────────────────────────────────────────────────────┐
│              GAME STUDIO CONTROL PLANE               │
│         (Session Management, Versioning, State)      │
└──────────────────────────┬──────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼
┌──────────────────────────────┐  ┌──────────────────────────────┐
│  FRONTIER CODING AGENT       │  │  AUTONOMOUS PLAYTESTER       │
│  (LLM + Code Tools)          │  │  (Headless Godot Verify)     │
└──────────────────┬───────────┘  └─────────────┬────────────────┘
                   │                            │
        ┌──────────┴────────────┬───────────────┘
        ▼                       ▼
┌─────────────────────────────────────────────────────┐
│     PERSISTENT GAME WORKSPACE (Godot Project)       │
│   (scripts/*.gd, scenes/*.tscn, assets/, .studio/)  │
└─────────────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   WebAssembly   Desktop Binary   Steam Package
   (Browser)     (Win/Mac/Linux)   (Full Source)
`

export default function GameStudioProject() {
  return (
    <div className="min-h-screen bg-void text-static">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-warm/5 rounded-full blur-3xl" />
        </div>

        <motion.div className="text-center max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-warm/30 bg-warm/5 text-warm font-mono text-sm mb-6">
            MVP • 351+ Tests • Frontier AI Agents
          </span>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Game Studio
          </h1>
          
          <p className="text-xl text-muted max-w-3xl mx-auto mb-12">
            Lovable for game development. Nontechnical creators describe games. Frontier AI agents build them in Godot. Play immediately. Revise conversationally. Ship as WebAssembly, desktop, or Steam.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="https://github.com/SelfMadeSE/Game-Studio"
              target="_blank"
              className="px-8 py-4 bg-warm text-void font-semibold rounded-lg hover:shadow-glow-signal transition-all hover:scale-105"
            >
              Open on GitHub →
            </Link>
            <Link
              href="#architecture"
              className="px-8 py-4 border border-warm/30 text-warm font-semibold rounded-lg hover:bg-warm/10 transition-all"
            >
              View Architecture
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Vision */}
      <section className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-8">The Vision</h2>
          <div className="space-y-6 text-lg text-muted leading-relaxed">
            <p>
              Game Studio IS NOT a template system or a visual scripting tool. It's a control plane for frontier AI coding agents.
            </p>
            <p>
              The product thesis: <span className="text-warm font-semibold">Frontier AI coding agents are increasingly capable software developers. When provided with a professional workstation (file system, engine tools, diagnostics), nontechnical creators can direct those agents as a full-scale game development studio.</span>
            </p>
            <p>
              Describe your game idea in natural language. Attach reference materials (concept art, gameplay video, PDFs). The AI agent:
            </p>
            <ul className="space-y-2 text-muted">
              <li>✓ Writes GDScript code</li>
              <li>✓ Builds Godot scene hierarchies (.tscn)</li>
              <li>✓ Configures physics, lighting, audio</li>
              <li>✓ Generates 3D assets via multimodal models</li>
              <li>✓ Tests the build headless (boots, plays, captures)</li>
              <li>✓ Automatically repairs bugs (closed-loop)</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* The Loop */}
      <section className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">The Canonical Loop</h2>
          
          <div className="space-y-8">
            {[
              {
                num: 1,
                title: 'DESCRIBE',
                desc: 'Creator inputs natural language + reference materials (concept art, videos, PDFs, existing projects).',
                color: 'from-warm to-yellow-400',
              },
              {
                num: 2,
                title: 'BUILD',
                desc: 'Frontier agent provisions isolated workspace. Writes code, constructs scenes, generates assets, configures physics.',
                color: 'from-orange-400 to-warm',
              },
              {
                num: 3,
                title: 'PLAY',
                desc: 'Playable build compiles to WebAssembly. Runs instantly in browser. Creator plays with keyboard/mouse/gamepad.',
                color: 'from-purple-400 to-pink-400',
              },
              {
                num: 4,
                title: 'CHANGE',
                desc: 'Creator requests modifications in natural language within same conversation. "Make the player 20% faster." "Add neon signs."',
                color: 'from-cyan-400 to-blue-400',
              },
              {
                num: 5,
                title: 'SHIP',
                desc: 'Export as WebAssembly (browser), native desktop binaries (Win/Mac/Linux), Steam package, or full Godot source.',
                color: 'from-emerald-400 to-teal-400',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-lg bg-depth/50 border border-signal/10 hover:border-signal/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${step.color} text-void font-bold mb-4`}>
                  {step.num}. {step.title}
                </div>
                <p className="text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">System Architecture</h2>
          
          <div className="bg-depth/50 border border-signal/20 rounded-lg p-8 overflow-x-auto mb-12">
            <pre className="text-xs md:text-sm font-mono text-signal whitespace-pre">
{architectureDiagram}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-warm font-bold mb-4">Project Workspace</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>✓ Persistent .studio/ directory</li>
                <li>✓ Complete Godot project structure</li>
                <li>✓ Version history & rollback</li>
                <li>✓ Immutable commit log</li>
                <li>✓ Design dossier (requirements, refs)</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-warm font-bold mb-4">Agent Capabilities</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>✓ Read/write file system</li>
                <li>✓ Inspect scene hierarchies</li>
                <li>✓ Write & modify GDScript</li>
                <li>✓ Headless boot verification</li>
                <li>✓ Runtime screenshot/video capture</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-warm font-bold mb-4">Multimodal Ingestion</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>✓ Concept art (PNG, JPG, WebP)</li>
                <li>✓ Video (MP4, MOV, WebM)</li>
                <li>✓ Documents (PDF, DOCX, Markdown)</li>
                <li>✓ 3D Assets (GLTF, FBX, OBJ)</li>
                <li>✓ Reference game architectures</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-warm font-bold mb-4">Export & Shipping</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>✓ WebAssembly (instant browser)</li>
                <li>✓ Native binaries (Win/Mac/Linux)</li>
                <li>✓ Godot project source</li>
                <li>✓ Steam packaging ready</li>
                <li>✓ Full version control</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Evidence */}
      <section className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Production Quality</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-lg bg-warm/10 border border-warm/30">
              <div className="text-3xl font-bold text-warm mb-2">351+</div>
              <p className="text-muted text-sm">Unit & integration tests. Full test suite passing.</p>
            </div>

            <div className="p-6 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
              <div className="text-3xl font-bold text-cyan-400 mb-2">7</div>
              <p className="text-muted text-sm">Comprehensive canonical documents. PRODUCT_SPEC, TECHNICAL_STRATEGY, ROADMAP.</p>
            </div>

            <div className="p-6 rounded-lg bg-emerald-400/10 border border-emerald-400/30">
              <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
              <p className="text-muted text-sm">Headless verification. No false positives. Truthful state machine.</p>
            </div>
          </div>

          <div className="bg-depth/50 border border-signal/20 rounded-lg p-6 text-muted">
            <p className="mb-4">
              Game Studio is built with radical honesty. No false claims of finished polish. No fabricated tests. Evidence records represent actual recorded engine runs, not synthetic mocks.
            </p>
            <p>
              Anti-drift rules ensure the product stays true to the founding thesis: a nontechnical creator directing AI agents as a full game development studio.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Tech Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">Frontend & Control Plane</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• JavaScript / Node.js (dependency-free)</li>
                <li>• Session management & versioning</li>
                <li>• WebSocket communication</li>
                <li>• Vite (build tooling)</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">Engine & Runtime</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Godot 4.3+ (game engine)</li>
                <li>• GDScript (language)</li>
                <li>• WebAssembly (browser export)</li>
                <li>• Headless verification</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">AI & Agents</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Frontier LLM routing</li>
                <li>• Code generation & analysis</li>
                <li>• Multimodal asset generation</li>
                <li>• Autonomous repair loops</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">Testing & Quality</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• 351+ unit & integration tests</li>
                <li>• Test fixtures (Night Station game)</li>
                <li>• Benchmark contracts</li>
                <li>• Full CI/CD pipeline</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Explore the Code</h2>
          <Link
            href="https://github.com/SelfMadeSE/Game-Studio"
            target="_blank"
            className="inline-flex items-center px-8 py-4 bg-warm text-void font-semibold rounded-lg hover:shadow-glow-signal transition-all hover:scale-105"
          >
            Open on GitHub →
          </Link>
        </div>
      </section>
    </div>
  )
}