'use client'

import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const videoSource = '/media/field/video/meta-field-pov-1045-1130-autoplay.mp4'
const mobileSource = '/media/field/video/meta-field-pov-1045-1130-mobile.mp4'
const poster = '/media/field/video/meta-field-pov-1045-1130-poster.jpg'

export function FieldRecord() {
  const video = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const node = video.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || hasPlayed) return
      node.play().then(() => setHasPlayed(true)).catch(() => undefined)
    }, { threshold: 0.62 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasPlayed])

  const togglePlayback = async () => {
    const node = video.current
    if (!node) return
    if (node.paused) {
      try {
        await node.play()
        setHasPlayed(true)
      } catch {
        setIsPlaying(false)
      }
      return
    }
    node.pause()
  }

  return <figure className="field-record">
    <div className="media-label"><span>Field record</span><span>Source 01:44.5—01:53.0</span></div>
    <video
      ref={video}
      className="field-record__video"
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-describedby="field-record-note"
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onEnded={() => setIsPlaying(false)}
    >
      <source src={videoSource} media="(min-width: 701px)" type="video/mp4" />
      <source src={mobileSource} type="video/mp4" />
      Your browser does not support the FIELD record video. The poster image remains available above.
    </video>
    <button className="video-control" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause field record' : 'Play field record'}>
      {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}<span>{isPlaying ? 'Pause field record' : hasPlayed ? 'Play again' : 'Play field record'}</span>
    </button>
    <figcaption id="field-record-note">A muted, non-looping 8.5-second first-person field cut. One in-view playback is attempted unless reduced motion is requested; the original review source and derivative hashes are retained in the canonical provenance package.</figcaption>
  </figure>
}
