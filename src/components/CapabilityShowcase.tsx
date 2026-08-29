'use client'

import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  History,
  Landmark,
  LayoutDashboard,
  LockKeyhole,
  PackageCheck,
  PanelTop,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserCheck,
  Users,
  Wrench,
} from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { CapabilityCards } from '@/components/CapabilityCards'

type CapabilityId = 'marketplace' | 'billing' | 'regulated' | 'automation' | 'native' | 'operations'

const demonstrations: Array<{
  id: CapabilityId
  label: string
  title: string
  summary: string
  icon: typeof LayoutDashboard
}> = [
  { id: 'marketplace', label: 'Marketplace + CRM', title: 'Vendor marketplace control room', summary: 'Onboard vendors, qualify leads, and move an order through payout-aware checkout.', icon: BriefcaseBusiness },
  { id: 'billing', label: 'SaaS billing with Stripe', title: 'Subscription operations', summary: 'A deliberate billing surface around Checkout, Billing, and customer self-service.', icon: CreditCard },
  { id: 'regulated', label: 'Regulated workflow architecture', title: 'Controlled case workflow', summary: 'Role-aware decisions, traceable evidence, and a minimum-necessary data boundary.', icon: ShieldCheck },
  { id: 'automation', label: 'AI automation with human approval', title: 'Human-in-the-loop queue', summary: 'Automation drafts the work; people approve the consequential step.', icon: Bot },
  { id: 'native', label: 'Native creative software', title: 'Creative project desk', summary: 'A desktop-native workspace for sessions, recordings, and reversible creative history.', icon: PanelTop },
  { id: 'operations', label: 'Operations dashboard', title: 'Field operations board', summary: 'Work orders, asset condition, and field synchronization in one operational view.', icon: Wrench },
]

function MarketplaceDemo() {
  return <div className="capability-ui capability-ui--marketplace">
    <header className="capability-ui__bar"><div><span className="capability-ui__kicker">Northline Market</span><strong>Vendor &amp; lead desk</strong></div><span className="capability-status capability-status--live"><BadgeCheck size={14} /> Checkout monitored</span></header>
    <div className="capability-ui__columns">
      <section className="capability-card"><div className="capability-card__heading"><Users size={17} /><div><span>Vendor onboarding</span><strong>4 verification steps</strong></div></div><ol className="capability-steps"><li className="is-complete"><span>01</span>Identity &amp; tax profile <BadgeCheck size={15} /></li><li className="is-complete"><span>02</span>Catalog review <BadgeCheck size={15} /></li><li className="is-current"><span>03</span>Payout account review <ArrowRight size={15} /></li><li><span>04</span>Marketplace approved</li></ol></section>
      <section className="capability-card"><div className="capability-card__heading"><Users size={17} /><div><span>Lead pipeline</span><strong>14 active opportunities</strong></div></div><div className="capability-pipeline"><span><b>New</b><small>05</small></span><span><b>Qualified</b><small>04</small></span><span><b>Proposal</b><small>03</small></span><span><b>Won</b><small>02</small></span></div><p className="capability-note">New opportunity · fit confirmed · proposal due Friday</p></section>
    </div>
    <section className="capability-card capability-card--transaction"><div className="capability-card__heading"><CreditCard size={17} /><div><span>Checkout → payout state</span><strong>Order #MK-2084</strong></div><span className="capability-status">Paid</span></div><div className="capability-transaction"><span>Customer payment captured</span><ArrowRight size={15} /><span>Order release queued</span><ArrowRight size={15} /><span>Vendor payout pending delivery</span></div><p className="capability-note">Connect-style seller payout is shown here because this is a multi-vendor marketplace prototype.</p></section>
  </div>
}

function BillingDemo() {
  return <div className="capability-ui capability-ui--billing">
    <header className="capability-ui__bar"><div><span className="capability-ui__kicker">Meterline</span><strong>Billing operations</strong></div><span className="capability-status capability-status--live"><BadgeCheck size={14} /> Webhooks healthy</span></header>
    <div className="capability-ui__columns">
      <section className="capability-card"><div className="capability-card__heading"><CreditCard size={17} /><div><span>Plan change</span><strong>Studio / annual</strong></div></div><div className="capability-price"><strong>$1,188</strong><span>next invoice · Sep 12</span></div><button className="capability-action" type="button">Open Stripe Checkout <ArrowRight size={15} /></button><p className="capability-note">Hosted Checkout creates the subscription and returns to the product account.</p></section>
      <section className="capability-card"><div className="capability-card__heading"><UserCheck size={17} /><div><span>Customer self-service</span><strong>Account controls</strong></div></div><ul className="capability-list"><li><BadgeCheck size={15} /> Update payment method</li><li><BadgeCheck size={15} /> Download invoices</li><li><BadgeCheck size={15} /> Cancel at period end</li></ul><button className="capability-action capability-action--quiet" type="button">Open customer portal <ArrowRight size={15} /></button></section>
    </div>
    <section className="capability-card"><div className="capability-card__heading"><UploadCloud size={17} /><div><span>Webhook event ledger</span><strong>Stripe Billing status</strong></div></div><div className="capability-event-list"><span><i className="capability-dot capability-dot--success" />invoice.paid <small>processed · subscription provisioned</small></span><span><i className="capability-dot capability-dot--success" />customer.subscription.updated <small>processed · plan synchronized</small></span><span><i className="capability-dot" />checkout.session.completed <small>awaiting idempotency confirmation</small></span></div></section>
  </div>
}

function RegulatedDemo() {
  return <div className="capability-ui capability-ui--regulated">
    <header className="capability-ui__bar"><div><span className="capability-ui__kicker">Casework / restricted</span><strong>Decision workflow</strong></div><span className="capability-status"><LockKeyhole size={14} /> Minimum necessary access</span></header>
    <div className="capability-ui__columns">
      <section className="capability-card"><div className="capability-card__heading"><ShieldCheck size={17} /><div><span>Role-based access</span><strong>Case 84-219</strong></div></div><div className="capability-access"><span><b>Case reviewer</b><small>Read case / create recommendation</small><BadgeCheck size={15} /></span><span><b>Approving officer</b><small>Review / authorize disposition</small><BadgeCheck size={15} /></span><span><b>Service desk</b><small>Metadata only</small><LockKeyhole size={15} /></span></div></section>
      <section className="capability-card"><div className="capability-card__heading"><History size={17} /><div><span>Immutable audit log</span><strong>14 events retained</strong></div></div><ol className="capability-audit"><li><time>09:41</time><span>Reviewer opened permitted record set</span></li><li><time>09:52</time><span>Recommendation saved as draft</span></li><li><time>10:08</time><span>Approver requested clarification</span></li></ol></section>
    </div>
    <aside className="capability-disclaimer"><FileCheck2 size={17} /><p><strong>Architecture prototype, not a compliance claim.</strong> Production compliance requires organizational, legal, security, infrastructure, and policy validation.</p></aside>
  </div>
}

function AutomationDemo() {
  return <div className="capability-ui capability-ui--automation">
    <header className="capability-ui__bar"><div><span className="capability-ui__kicker">Review queue</span><strong>AI-assisted operations</strong></div><span className="capability-status"><Sparkles size={14} /> Approval required</span></header>
    <div className="capability-ui__columns">
      <section className="capability-card"><div className="capability-card__heading"><Bot size={17} /><div><span>Automation queue</span><strong>3 items need review</strong></div></div><ul className="capability-queue"><li className="is-selected"><span><b>Q-418</b><small>Vendor brief synthesized from 6 sources</small></span><span>Ready</span></li><li><span><b>Q-417</b><small>Competitor change summary</small></span><span>Draft</span></li><li><span><b>Q-416</b><small>Account handoff packet</small></span><span>Blocked</span></li></ul></section>
      <section className="capability-card"><div className="capability-card__heading"><ClipboardCheck size={17} /><div><span>Human approval</span><strong>Q-418 / evidence review</strong></div></div><p className="capability-summary">The draft flags two unverified statements and links each recommendation to its source artifact.</p><div className="capability-actions"><button className="capability-action capability-action--quiet" type="button">Return with notes</button><button className="capability-action" type="button">Approve release <BadgeCheck size={15} /></button></div></section>
    </div>
    <section className="capability-artifact-trail"><History size={17} /><span><strong>Artifact trail</strong> Prompt → source set → generated draft → reviewer notes → approved version</span></section>
  </div>
}

function NativeDemo() {
  return <div className="capability-ui capability-ui--native">
    <header className="capability-ui__bar"><div><span className="capability-ui__kicker">Muse Studio / desktop</span><strong>Session workspace</strong></div><span className="capability-status"><History size={14} /> Reversible history</span></header>
    <div className="capability-ui__columns">
      <nav className="capability-card capability-file-tree" aria-label="Project files"><div className="capability-card__heading"><PackageCheck size={17} /><div><span>Project</span><strong>Orchard_07</strong></div></div><ul><li className="is-open">▾ Sessions</li><li className="is-current">　Orchard_07.session</li><li>▸ Assets</li><li>▸ Exports</li></ul></nav>
      <section className="capability-card"><div className="capability-card__heading"><PanelTop size={17} /><div><span>Recording</span><strong>Take 12 / 02:18</strong></div><span className="capability-status capability-status--live">Armed</span></div><div className="capability-waveform" aria-label="Audio waveform representation"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="capability-timeline"><span>01:44</span><b>Current edit marker</b><span>02:18</span></div></section>
    </div>
    <section className="capability-card"><div className="capability-card__heading"><History size={17} /><div><span>Revision history</span><strong>Local, inspectable state</strong></div></div><div className="capability-history"><span><b>v18</b>Trimmed ambience layer <small>current</small></span><span><b>v17</b>Recorded take 12</span><span><b>v16</b>Restored mix snapshot</span></div></section>
  </div>
}

function OperationsDemo() {
  return <div className="capability-ui capability-ui--operations">
    <header className="capability-ui__bar"><div><span className="capability-ui__kicker">North sector / 08:42</span><strong>Operations overview</strong></div><span className="capability-status capability-status--live"><UploadCloud size={14} /> Field sync current</span></header>
    <div className="capability-ui__columns">
      <section className="capability-card"><div className="capability-card__heading"><Wrench size={17} /><div><span>Work orders</span><strong>12 active today</strong></div></div><div className="capability-work-orders"><span><b>WO-0918</b><small>Valve inspection · Crew 04</small><em>In progress</em></span><span><b>WO-0921</b><small>Generator service · Crew 02</small><em>Scheduled</em></span><span><b>WO-0924</b><small>Safety follow-up · Crew 06</small><em>Awaiting parts</em></span></div></section>
      <section className="capability-card"><div className="capability-card__heading"><Landmark size={17} /><div><span>Asset state</span><strong>34 monitored assets</strong></div></div><div className="capability-asset-state"><span><i className="capability-dot capability-dot--success" />26 operational</span><span><i className="capability-dot" />6 attention due</span><span><i className="capability-dot capability-dot--alert" />2 offline</span></div><p className="capability-note">Asset F-17 last field update: 08:36 · photo and meter reading attached.</p></section>
    </div>
  </div>
}

function Demonstration({ id }: { id: CapabilityId }) {
  if (id === 'marketplace') return <MarketplaceDemo />
  if (id === 'billing') return <BillingDemo />
  if (id === 'regulated') return <RegulatedDemo />
  if (id === 'automation') return <AutomationDemo />
  if (id === 'native') return <NativeDemo />
  return <OperationsDemo />
}

export function CapabilityShowcase() {
  const [activeId, setActiveId] = useState<CapabilityId>('marketplace')
  const activeIndex = demonstrations.findIndex((demonstration) => demonstration.id === activeId)

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? demonstrations.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : demonstrations.length - 1)) % demonstrations.length
    const next = demonstrations[nextIndex]
    setActiveId(next.id)
    document.getElementById(`capability-tab-${next.id}`)?.focus()
  }

  const active = demonstrations[activeIndex]
  const ActiveIcon = active.icon

  return <section className="capability-showcase" aria-labelledby="capability-showcase-title">
    <header className="capability-showcase__intro"><div><p className="eyebrow"><span />What I build</p><h2 id="capability-showcase-title">Working interfaces,<br /><i>not promises.</i></h2></div><p>Six interactive systems, built for this site, showing the kinds of products I design and engineer: commerce, billing, regulated data, automation, native tools, and operations. Click through them — they respond.</p></header>
    <CapabilityCards />
    <div className="capability-showcase__tabs" role="tablist" aria-label="Capability prototype demonstrations">
      {demonstrations.map((demonstration, index) => {
        const Icon = demonstration.icon
        const selected = demonstration.id === activeId
        return <button key={demonstration.id} id={`capability-tab-${demonstration.id}`} className={`capability-tab${selected ? ' is-active' : ''}`} type="button" role="tab" aria-selected={selected} aria-controls={`capability-panel-${demonstration.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActiveId(demonstration.id)} onKeyDown={(event) => moveFocus(event, index)}><Icon size={16} aria-hidden="true" /><span>{demonstration.label}</span></button>
      })}
    </div>
    <article id={`capability-panel-${active.id}`} className="capability-showcase__panel" role="tabpanel" aria-labelledby={`capability-tab-${active.id}`} tabIndex={0}>
      <header className="capability-showcase__panel-heading"><span className="capability-showcase__icon"><ActiveIcon size={20} aria-hidden="true" /></span><div><p>Interactive study · designed and built for this site</p><h3>{active.title}</h3></div><span className="capability-showcase__count">0{activeIndex + 1} / 06</span></header>
      <p className="capability-showcase__summary">{active.summary}</p>
      <Demonstration id={activeId} />
    </article>
  </section>
}
