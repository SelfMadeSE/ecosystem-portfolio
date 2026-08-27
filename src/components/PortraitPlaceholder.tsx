export function PortraitPlaceholder() {
  return <div className="portrait-placeholder" role="img" aria-label="Temporary portrait placeholder; an approved portrait will replace this area">
    <div className="portrait-placeholder__halo" /><div className="portrait-placeholder__body" /><div className="portrait-placeholder__face" />
    <span>Portrait placeholder</span><small>Approved founder portrait pending</small>
  </div>
}
