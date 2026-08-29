'use client'

import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

const videoSource = '/media/field/video/meta-field-pov-100-111-slowcut.mp4'
const poster = '/media/field/video/meta-field-pov-1045-1130-poster.jpg'

export function FieldRecord() {
  const video = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

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
    <div className="media-label"><span>Field / first-person cut</span><span>Source excerpt / slowed edit</span></div>
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
      <source src={videoSource} type="video/mp4" />
      Your browser does not support video playback. A still from the same recording remains visible.
    </video>
    <button className="video-control" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause field cut' : 'Play field cut'}>
      {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}<span>{isPlaying ? 'Pause field cut' : hasPlayed ? 'Play again' : 'Play field cut'}</span>
    </button>
    <figcaption id="field-record-note">A user-controlled 13.6-second edit from a source recording, moving from the work surface to the rig and back to the tool.</figcaption>
  </figure>
}
