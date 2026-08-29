import Link from 'next/link'
import { ArrowLeft, ArrowRight, Building2, Cable, Cpu, Factory, Gauge, Leaf, Network, Snowflake, Zap } from 'lucide-react'
import styles from './page.module.css'

export const metadata = {
  title: 'The Canadian Compute Corporation | Modular AI Infrastructure',
  description: 'A proposed modular Canadian AI infrastructure platform beginning in northwest Alberta with contract-backed 3–5 MW compute deployments.',
}

const principles = [
  {
    icon: Gauge,
    title: 'Build against demand',
    copy: 'New capacity is intended to follow contracted customer demand rather than speculative hyperscale forecasts. The campus can be planned large while each construction decision remains deliberately small.',
  },
  {
    icon: Factory,
    title: 'Standardize the cell',
    copy: 'Each deployment is designed around a repeatable 3–5 MW compute cell with standardized power, cooling, network, commissioning, and operating interfaces.',
  },
  {
    icon: Zap,
    title: 'Use Alberta energy intelligently',
    copy: 'The initial thesis prioritizes behind-the-meter generation and direct relationships with Alberta energy producers where that improves cost, reliability, and deployment speed.',
  },
  {
    icon: Snowflake,
    title: 'Design for the climate',
    copy: 'Direct-to-chip liquid cooling and dry heat rejection are being evaluated to reduce water use and take advantage of northwest Alberta’s long cold season.',
  },
]

const cell = [
  ['01', 'Energy', 'Locally supplied firm generation, designed around redundancy and future expansion.'],
  ['02', 'Cooling', 'Direct-to-chip liquid cooling with closed-loop heat transfer and dry heat rejection where feasible.'],
  ['03', 'Network', 'High-capacity fibre with physically diverse routing appropriate for commercial AI workloads.'],
  ['04', 'Compute', 'A configurable accelerator mix selected around customer workload, price-performance, software compatibility, and lifecycle economics.'],
  ['05', 'Contracts', 'Meaningful capacity contracted before the next deployment receives notice to proceed.'],
]

const stages = [
  ['Phase 0', 'Development', 'Site control, power and gas feasibility, fibre engineering, preliminary design, regulatory work, customer discovery, and financing structure.'],
  ['Cell 01', 'Initial deployment', 'A proposed 3–5 MW first cell in the Grande Prairie region, sized to prove operating economics and establish the deployment template.'],
  ['Cells 02+', 'Contract-backed expansion', 'Additional modules are built as utilization and customer commitments justify them, while shared infrastructure lowers the marginal cost of expansion.'],
  ['Campus', 'Canadian compute platform', 'A larger master-planned site can grow into tens of megawatts without requiring the entire future buildout to be financed upfront.'],
]

const partnerTypes = [
  'Energy producers and generation partners',
  'Data centre engineering and EPC firms',
  'Telecommunications and fibre providers',
  'AI companies seeking Canadian compute capacity',
  'Infrastructure and project-finance investors',
  'Canadian hardware, networking, cooling, and software suppliers',
]

export default function CanadianComputePage() {
  return (
    <main className={styles.page}>
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/" className={styles.back}><ArrowLeft size={15} /> Ecosystem portfolio</Link>
        <span className={styles.wordmark}>THE CANADIAN COMPUTE CORPORATION</span>
        <a className={styles.headerCta} href="mailto:owner@outboundautonomy.com?subject=Canadian%20Compute%20Partnership">Partnerships <ArrowRight size={14} /></a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Canadian sovereign AI infrastructure · in development</p>
          <h1>Plan for scale.<br /><em>Build only what demand justifies.</em></h1>
          <p className={styles.lede}>The Canadian Compute Corporation is developing a modular AI infrastructure model in Alberta: small, repeatable compute cells that combine local energy, high-density compute, liquid cooling, and contract-backed expansion.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#model">Explore the model <ArrowRight size={15} /></a>
            <a className={styles.secondaryButton} href="mailto:owner@outboundautonomy.com?subject=Canadian%20Compute%20Development">Discuss the project</a>
          </div>
        </div>

        <aside className={styles.heroPanel} aria-label="Initial project parameters">
          <div><small>Initial deployment</small><strong>3–5 MW</strong><span>proposed compute cell</span></div>
          <div><small>Region</small><strong>NW Alberta</strong><span>Grande Prairie corridor</span></div>
          <div><small>Expansion rule</small><strong>Demand first</strong><span>capacity follows contracts</span></div>
          <div><small>Cooling thesis</small><strong>Low-water</strong><span>closed-loop liquid + dry heat rejection</span></div>
        </aside>
      </section>

      <section className={styles.statement}>
        <p>Canada needs more domestic compute capacity. Alberta already has the energy, industrial workforce, land, operating culture, and climate required to build it.</p>
        <span>Canadian Compute is being designed to connect those advantages without requiring a speculative hyperscale bet.</span>
      </section>

      <section className={styles.section} id="model">
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>01 / The operating thesis</p>
          <h2>A repeatable infrastructure unit,<br /><em>not one giant prediction.</em></h2>
        </header>
        <div className={styles.principleGrid}>
          {principles.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon size={20} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>02 / The compute cell</p>
          <h2>Standardize the difficult parts.<br /><em>Change the silicon when economics change.</em></h2>
          <p className={styles.sectionLede}>The cell is intended to be the minimum repeatable deployment. Passive campus infrastructure can be planned for future scale while expensive active equipment is installed only when the next phase is justified.</p>
        </header>
        <div className={styles.cellDiagram}>
          {cell.map(([number, title, copy]) => (
            <article key={number}>
              <small>{number}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className={styles.rule}>CONTRACT → FINANCE → BUILD → OPERATE → REINVEST → REPEAT</div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>03 / Why northwest Alberta</p>
          <h2>Physical infrastructure still matters.<br /><em>Alberta already knows physical infrastructure.</em></h2>
        </header>
        <div className={styles.advantageGrid}>
          <article><Zap size={18} /><strong>Firm energy</strong><p>Access to an established natural-gas industry and the possibility of direct producer relationships for behind-the-meter generation.</p></article>
          <article><Snowflake size={18} /><strong>Cold climate</strong><p>A long cold season can improve dry heat rejection economics and reduce dependence on water-intensive evaporative cooling.</p></article>
          <article><Building2 size={18} /><strong>Expandable land</strong><p>Large industrial and rural parcels allow the first cell to remain small while roads, utility corridors, setbacks, and future pads are master-planned.</p></article>
          <article><Cable size={18} /><strong>Fibre corridors</strong><p>Site selection is being driven by access to serious enterprise fibre, with route diversity treated as a core infrastructure requirement.</p></article>
          <article><Factory size={18} /><strong>Industrial capability</strong><p>The region already operates complex energy, automation, mechanical, electrical, and heavy-equipment systems under real field conditions.</p></article>
          <article><Leaf size={18} /><strong>Heat + water discipline</strong><p>The preferred architecture minimizes ongoing cooling-water consumption and preserves the option to recover useful heat as the campus grows.</p></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.timelineSection}`}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>04 / Expansion architecture</p>
          <h2>Master-plan aggressively.<br /><em>Capitalize conservatively.</em></h2>
        </header>
        <div className={styles.timeline}>
          {stages.map(([phase, title, copy]) => (
            <article key={phase}>
              <small>{phase}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div>
            <p className={styles.eyebrow}>05 / Canadian compute</p>
            <h2>Interdependence<br /><em>without dependency.</em></h2>
          </div>
          <div className={styles.bodyCopy}>
            <p>The goal is not to isolate Canada from the United States or global technology markets. Canadian Compute is intended to add a domestic layer of infrastructure that Canadian companies and institutions can control, contract, and locate in Canada.</p>
            <p>The hardware strategy is therefore deliberately supplier-agnostic. Premium NVIDIA capacity, AMD, Canadian technology, and other commercially viable accelerators can be evaluated by workload economics rather than ideology. The infrastructure should outlive any single chip generation.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.currentSection}`}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>06 / Current development</p>
          <h2>Pre-construction.<br /><em>Evidence before commitment.</em></h2>
        </header>
        <div className={styles.statusGrid}>
          <div><span>01</span><strong>Site strategy</strong><p>Evaluating industrial and expandable sites in the Grande Prairie / Wembley / Beaverlodge corridor.</p></div>
          <div><span>02</span><strong>Energy</strong><p>Evaluating local generation assets, producer relationships, gas quality, redundancy, and behind-the-meter architecture.</p></div>
          <div><span>03</span><strong>Connectivity</strong><p>Validating high-capacity fibre availability, construction requirements, and physically diverse route options.</p></div>
          <div><span>04</span><strong>Engineering</strong><p>Building the preliminary power, cooling, data hall, commissioning, and expansion specification for the first cell.</p></div>
          <div><span>05</span><strong>Government</strong><p>Engaging Alberta and federal pathways relevant to AI compute infrastructure, permitting, and project development.</p></div>
          <div><span>06</span><strong>Demand + capital</strong><p>Developing anchor-customer conversations and a phased financing structure tied to contracted capacity.</p></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.partners}`}>
        <div className={styles.partnerIntro}>
          <p className={styles.eyebrow}>07 / Partnerships</p>
          <h2>Build the chain<br /><em>with specialists.</em></h2>
          <p>The project is intentionally assembling experienced partners around each discipline rather than pretending one founding team should internally own every engineering, regulatory, finance, and operating competency.</p>
        </div>
        <div className={styles.partnerList}>
          {partnerTypes.map((partner, index) => <div key={partner}><span>{String(index + 1).padStart(2, '0')}</span>{partner}</div>)}
        </div>
      </section>

      <section className={styles.founderSection}>
        <div>
          <p className={styles.eyebrow}>08 / Founding context</p>
          <h2>AI infrastructure<br /><em>from the field outward.</em></h2>
        </div>
        <div className={styles.founderGrid}>
          <article>
            <Cpu size={20} />
            <h3>AI + industrial automation</h3>
            <p>The technology side combines direct oilfield experience with proprietary automated and machine-learning-enabled equipment, operating procedures, robotics, and focused work across AI systems and emerging compute infrastructure.</p>
          </article>
          <article>
            <Network size={20} />
            <h3>Alberta energy + execution</h3>
            <p>The industry side brings more than two decades across Alberta oil and gas operations and sales, including water transfer, hydraulic fracturing, coil tubing, service rigs, and an established network across the regional energy sector.</p>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>The Canadian Compute Corporation</p>
        <h2>Plan for the maximum.<br /><em>Build the minimum.</em></h2>
        <p>Canadian Compute is currently seeking technical, energy, fibre, customer, and capital partners for its first Alberta deployment.</p>
        <a href="mailto:owner@outboundautonomy.com?subject=Canadian%20Compute%20Partnership">Start a conversation <ArrowRight size={16} /></a>
      </section>

      <footer className={styles.footer}>
        <span>Canadian Compute · project in development</span>
        <Link href="/">Return to portfolio</Link>
      </footer>
    </main>
  )
}
