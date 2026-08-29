'use client'

import { ArrowUpRight, CircleDollarSign, Clock3, Mail, Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

const projectTypes = [
  'Product website / launch',
  'SaaS / platform',
  'Marketplace / CRM',
  'AI workflow / automation',
  'Native app / creative tool',
  'Regulated workflow prototype',
]

const budgetBands = ['$3k–$8k', '$8k–$20k', '$20k–$50k', '$50k+']

const contactEmail = 'owner@outboundautonomy.com'

export function ProjectInquiry() {
  const [mode, setMode] = useState<'role' | 'project'>('role')
  const [projectType, setProjectType] = useState('')
  const [budget, setBudget] = useState('')
  const [status, setStatus] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const timing = formData.get('timing')?.toString() ?? ''
    const brief = formData.get('brief')?.toString().trim() ?? ''
    const subject = mode === 'role' ? `Role conversation — ${name}` : `Project inquiry: ${projectType || 'New project'} — ${name}`
    const body = [
      'Hi Rylee,',
      '',
      mode === 'role' ? 'I would like to discuss working together.' : 'I would like to discuss a project.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      mode === 'project' ? `Project type: ${projectType}` : '',
      mode === 'project' ? `Typical build range selected: ${budget}` : '',
      `Timing: ${timing}`,
      '',
      mode === 'role' ? 'Role context:' : 'Project brief:',
      brief,
      '',
      'Thanks,',
      name,
    ].join('\n')

    setStatus(`Opening your email app with the ${mode === 'role' ? 'role context' : 'project details'} filled in.`)
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="project-inquiry" aria-labelledby="project-inquiry-title">
      <div className="project-inquiry__intro">
        <p className="eyebrow"><span aria-hidden="true" />Start a project</p>
        <h2 id="project-inquiry-title">
          <span aria-hidden="true" className="kinetic-line">
            {"Let's build something real.".split(' ').map((word, wordIndex) => <span key={word} className="kinetic-word">{word.split('').map((char, index) => <span key={`${word}-${index}`} className="kinetic-letter" style={{ animationDelay: `${(wordIndex * 7 + index) * 0.09}s` }}>{char}</span>)}{wordIndex < 3 ? ' ' : ''}</span>)}
          </span>
          <span className="sr-only">Let&apos;s build something real.</span>
        </h2>
        <p>
          Bring the product, workflow, or business problem as it exists. I&apos;ll help you decide whether you
          need direction, design, implementation, automation — or all of it.
        </p>
        <a className="text-link" href={`mailto:${contactEmail}`}>
          <Mail aria-hidden="true" size={15} />
          Email {contactEmail}
          <ArrowUpRight aria-hidden="true" size={14} />
        </a>
      </div>

      <div className="project-inquiry__panel">
      <div className="project-inquiry__modes" role="tablist" aria-label="Inquiry type"><button aria-selected={mode === 'role'} className={mode === 'role' ? 'is-active' : ''} onClick={() => setMode('role')} role="tab" type="button">Discuss a role</button><button aria-selected={mode === 'project'} className={mode === 'project' ? 'is-active' : ''} onClick={() => setMode('project')} role="tab" type="button">Discuss a project</button></div>
      <form className="project-inquiry__form" onSubmit={handleSubmit}>
        {mode === 'project' && <>
        <fieldset className="project-inquiry__fieldset">
          <legend>What are you looking to build?</legend>
          <p className="project-inquiry__hint">Choose the closest starting point. We can refine it together.</p>
          <div className="project-inquiry__options" role="radiogroup" aria-label="Project type">
            {projectTypes.map((type) => (
              <label className="project-inquiry__option" key={type}>
                <input
                  checked={projectType === type}
                  name="project-type"
                  onChange={() => setProjectType(type)}
                  required
                  type="radio"
                  value={type}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="project-inquiry__fieldset project-inquiry__fieldset--budget">
          <legend><CircleDollarSign aria-hidden="true" size={17} /> Typical build range</legend>
          <p className="project-inquiry__hint">These are typical build ranges; final scope, sequencing, and investment vary with the work.</p>
          <div className="project-inquiry__options project-inquiry__options--compact" role="radiogroup" aria-label="Typical build range">
            {budgetBands.map((band) => (
              <label className="project-inquiry__option" key={band}>
                <input
                  checked={budget === band}
                  name="budget"
                  onChange={() => setBudget(band)}
                  required
                  type="radio"
                  value={band}
                />
                <span>{band}</span>
              </label>
            ))}
          </div>
        </fieldset></>}

        <div className="project-inquiry__fields">
          <label className="project-inquiry__field" htmlFor="project-inquiry-name">
            <span>Your name</span>
            <input autoComplete="name" id="project-inquiry-name" name="name" required type="text" />
          </label>
          <label className="project-inquiry__field" htmlFor="project-inquiry-email">
            <span>Email</span>
            <input autoComplete="email" id="project-inquiry-email" name="email" required type="email" />
          </label>
          <label className="project-inquiry__field" htmlFor="project-inquiry-timing">
            <span><Clock3 aria-hidden="true" size={15} /> Ideal timing</span>
            <select defaultValue="" id="project-inquiry-timing" name="timing" required>
              <option disabled value="">Choose a timeframe</option>
              <option value="Exploring / not scheduled">Exploring / not scheduled</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="1–3 months">1–3 months</option>
              <option value="3–6 months">3–6 months</option>
              <option value="6+ months">6+ months</option>
            </select>
          </label>
          <label className="project-inquiry__field project-inquiry__field--brief" htmlFor="project-inquiry-brief">
            <span>{mode === 'role' ? 'Role context' : 'Short brief'}</span>
            <textarea
              id="project-inquiry-brief"
              name="brief"
              placeholder={mode === 'role' ? 'What kind of role, team, or collaboration are you exploring?' : 'What needs to change, who is it for, and what would a useful first outcome look like?'}
              required
              rows={5}
            />
          </label>
        </div>

        <div className="project-inquiry__submit">
          <button className="button button--acid" type="submit">
            <Send aria-hidden="true" size={16} />
            {mode === 'role' ? 'Draft role email' : 'Draft project email'}
          </button>
          <p>Opens a pre-drafted email in your mail app — you stay in control of the send. This site stores nothing.</p>
        </div>
        <p aria-live="polite" className="project-inquiry__status" role="status">{status}</p>
      </form>
      </div>
    </section>
  )
}
