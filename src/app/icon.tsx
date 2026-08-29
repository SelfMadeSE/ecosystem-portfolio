import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#e8490f', color: '#f2f0e9', fontSize: 24, fontWeight: 800, letterSpacing: '-0.08em' }}>RB</div>,
    size,
  )
}
