'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const codeSnippet = `// Real Twilio integration — AI receptionist voice flow
export function generateBusinessHoursTwiml(
  businessName: string,
  sessionId: string
): string {
  return \`<?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say>Thank you for calling \${businessName}.</Say>
    <Gather input="dtmf" timeout="10" numDigits="1"
            action="/api/twilio/gather?sessionId=\${sessionId}">
      <Say>Press 1 for appointments.</Say>
      <Say>Press 2 for general inquiry.</Say>
    </Gather>
  </Response>\`;
}

// Autonomous call flow with fallback to voicemail
export function isBusinessHours(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  return day >= 1 && day <= 5 && hour >= 8 && hour < 18;
}`

export default function OutboundAutonomyProject() {
  return (
    <div className="min-h-screen bg-void text-static">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-signal/5 rounded-full blur-3xl" />
        </div>

        <motion.div className="text-center max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full border border-signal/30 bg-signal/5 text-signal font-mono text-sm mb-6">
            Live Production • Revenue Generating • 24/7
          </span>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Outbound Autonomy
          </h1>
          
          <p className="text-xl text-muted max-w-3xl mx-auto mb-12">
            AI Receptionist + Web Design + Automation. Your front door never closes. Businesses that can't afford to miss a call.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="https://outboundautonomy.com"
              target="_blank"
              className="px-8 py-4 bg-signal text-void font-semibold rounded-lg hover:shadow-glow-signal transition-all hover:scale-105"
            >
              Visit Live Site →
            </Link>
            <Link
              href="https://github.com/SelfMadeSE/outboundautonomy"
              target="_blank"
              className="px-8 py-4 border border-signal/30 text-signal font-semibold rounded-lg hover:bg-signal/10 transition-all"
            >
              GitHub Repo
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-8">The Problem</h2>
          <div className="space-y-6 text-lg text-muted leading-relaxed">
            <p>
              Small businesses lose calls. Missed appointments mean missed revenue. A dental office in Colorado was losing 40% of their after-hours calls. Their answering service was $500/month and forgot half the messages anyway.
            </p>
            <p>
              Meanwhile, they needed a new website. Agencies quoted them $15K and 3 months. They got neither.
            </p>
            <p className="text-warm font-semibold">
              Solution: Build it all. Autonomously.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">The Solution</h2>
          
          <div className="space-y-12">
            {/* AI Receptionist */}
            <div className="border-l-4 border-signal pl-8">
              <h3 className="text-2xl font-bold text-signal mb-4">AI Receptionist</h3>
              <p className="text-muted mb-4">Powered by Twilio, running 24/7 with intelligent call routing:</p>
              <ul className="space-y-2 text-muted mb-6">
                <li>✓ Answers every call within 2 seconds</li>
                <li>✓ Books appointments directly to calendar</li>
                <li>✓ Routes emergencies to owner in real-time</li>
                <li>✓ Sends SMS confirmations (Twilio API)</li>
                <li>✓ After-hours voicemail with transcription</li>
              </ul>
              
              <div className="bg-depth/50 border border-signal/20 rounded p-4 mb-4 overflow-x-auto">
                <pre className="text-sm font-mono text-signal whitespace-pre-wrap break-words">
{codeSnippet}
                </pre>
              </div>
            </div>

            {/* Web Design */}
            <div className="border-l-4 border-warm pl-8">
              <h3 className="text-2xl font-bold text-warm mb-4">Web Design</h3>
              <p className="text-muted mb-4">Built in Next.js 14. Full-stack design that converts:</p>
              <ul className="space-y-2 text-muted">
                <li>✓ Custom TailwindCSS component library (signal, warm, void palette)</li>
                <li>✓ Framer Motion animations on scroll</li>
                <li>✓ Stripe payment integration</li>
                <li>✓ Contact form with backend validation (Zod)</li>
                <li>✓ Mobile-optimized responsive design</li>
              </ul>
            </div>

            {/* Automation */}
            <div className="border-l-4 border-cyan-400 pl-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Automation & Marketing</h3>
              <p className="text-muted mb-4">Backend systems that run without human intervention:</p>
              <ul className="space-y-2 text-muted">
                <li>✓ Email campaigns via Resend</li>
                <li>✓ Lead scoring & CRM pipeline</li>
                <li>✓ Automated follow-ups</li>
                <li>✓ A/B testing framework built-in</li>
              </ul>
            </div>
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
          <h2 className="text-4xl font-bold mb-12">Architecture</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">Frontend</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18 + TypeScript</li>
                <li>• TailwindCSS 3.4.1</li>
                <li>• Framer Motion (animations)</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">Backend & Integrations</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Node.js API routes</li>
                <li>• Twilio SDK (voice/SMS)</li>
                <li>• Stripe (payments)</li>
                <li>• SQLite (data)</li>
                <li>• Zod (validation)</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">DevOps</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Vercel (deployment)</li>
                <li>• GitHub (version control)</li>
                <li>• Env-based config</li>
                <li>• CI/CD ready</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-depth/50 border border-signal/20">
              <h4 className="text-signal font-bold mb-4">Third-Party Services</h4>
              <ul className="space-y-2 text-muted text-sm">
                <li>• Twilio (voice/SMS)</li>
                <li>• Stripe (payments)</li>
                <li>• Resend (email)</li>
                <li>• Google Analytics</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Results */}
      <section className="py-20 px-4">
        <motion.div className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Results</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-lg bg-signal/10 border border-signal/30">
              <div className="text-3xl font-bold text-signal mb-2">24/7</div>
              <p className="text-muted text-sm">Never misses a call. Autonomous.</p>
            </div>

            <div className="p-6 rounded-lg bg-warm/10 border border-warm/30">
              <div className="text-3xl font-bold text-warm mb-2">$299/mo</div>
              <p className="text-muted text-sm">AI Receptionist flagship plan. Under $10K/year.</p>
            </div>

            <div className="p-6 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
              <div className="text-3xl font-bold text-cyan-400 mb-2">Days</div>
              <p className="text-muted text-sm">Web design delivery. Not months.</p>
            </div>
          </div>

          <blockquote className="border-l-4 border-signal pl-8 py-4 text-lg text-muted italic">
            "We were missing 40% of our calls after hours. Outbound Autonomy fixed that in a day. Now every call gets answered."
            <br />
            <span className="text-signal font-semibold not-italic">— Dental Practice Owner, Colorado</span>
          </blockquote>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">See It In Action</h2>
          <Link
            href="https://outboundautonomy.com"
            target="_blank"
            className="inline-flex items-center px-8 py-4 bg-signal text-void font-semibold rounded-lg hover:shadow-glow-signal transition-all hover:scale-105"
          >
            Visit outboundautonomy.com →
          </Link>
        </div>
      </section>
    </div>
  )
}