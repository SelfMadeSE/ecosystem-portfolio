export function PortraitHero() {
  return <figure className="portrait-hero">
    <picture>
      <source media="(max-width: 800px)" srcSet="/media/portrait/rylee-benson-hero-mobile.webp" />
      <img src="/media/portrait/rylee-benson-hero-desktop.webp" width="2040" height="2700" alt="Rylee Benson, founder and full-stack engineer" fetchPriority="high" />
    </picture>
    <figcaption><span>Founder portrait</span><span>Personal archive · 2026</span></figcaption>
  </figure>
}
