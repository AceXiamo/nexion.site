import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Props = {
  src?: string
}

export function VideoShowcase({ src = 'https://r2.acexiamo.com/nexion.mp4' }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const playBtnRef = useRef<HTMLButtonElement>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [isMuted, setMuted] = useState(false)
  const [allowMotion, setAllowMotion] = useState(true)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setAllowMotion(!mq.matches)
    set()
    mq.addEventListener?.('change', set)
    return () => mq.removeEventListener?.('change', set)
  }, [])

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Enter animations
      gsap.set(frameRef.current, { opacity: 0, y: allowMotion ? 40 : 0, rotateX: allowMotion ? 6 : 0 })
      gsap.set(playBtnRef.current, { scale: 0.9, opacity: 0 })
      gsap.set(glowRef.current, { opacity: 0.0 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(frameRef.current, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: allowMotion ? 0.9 : 0.01,
            ease: 'power3.out',
          })
          gsap.to(playBtnRef.current, {
            opacity: 1,
            scale: 1,
            duration: allowMotion ? 0.6 : 0.01,
            ease: 'back.out(2)',
            delay: 0.2,
          })
          gsap.to(glowRef.current, { opacity: 1, duration: 1.2, ease: 'sine.out', delay: 0.2 })
        },
      })

      // Parallax glow on scroll
      if (allowMotion) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const p = self.progress // 0..1
            gsap.to(glowRef.current, {
              yPercent: (p - 0.5) * 20,
              xPercent: (0.5 - p) * 10,
              rotate: (p - 0.5) * 8,
              ease: 'linear',
              duration: 0.1,
            })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [allowMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTime = () => {
      if (!progressRef.current || !video.duration) return
      const ratio = video.currentTime / video.duration
      progressRef.current.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`
    }
    const onEnd = () => {
      setPlaying(false)
      // Show play button again
      gsap.to(playBtnRef.current, { opacity: 1, scale: 1, duration: 0.3 })
    }
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('ended', onEnd)
    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('ended', onEnd)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setPlaying(true)
      gsap.to(playBtnRef.current, { opacity: 0, scale: 0.9, duration: 0.3 })
    } else {
      video.pause()
      setPlaying(false)
      gsap.to(playBtnRef.current, { opacity: 1, scale: 1, duration: 0.3 })
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!allowMotion || !frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xp = (x / rect.width) * 100
    const yp = (y / rect.height) * 100
    gsap.to(glowRef.current, { css: { '--mx': `${xp}%`, '--my': `${yp}%` }, duration: 0.1, ease: 'sine.out' })
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-10 left-8 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(188,255,47,0.12), transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 60%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">产品演示</h2>
          <p className="text-gray-400">1 分钟，快速理解 Nexion</p>
        </div>

        <div ref={frameRef} onMouseMove={onMouseMove} className="relative rounded-2xl overflow-hidden border-12 bg-black/40 backdrop-blur-sm" style={{ borderColor: '#ffffff10' }}>
          {/* Dynamic glow layer following mouse and scroll */}
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(600px 300px at var(--mx,50%) var(--my,50%), rgba(188,255,47,0.08), transparent 60%)',
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Video */}
          <div className="relative" style={{ aspectRatio: '2218 / 1440' }}>
            <video ref={videoRef} src={src} className="w-full h-full object-cover" preload="metadata" playsInline controls={false} onClick={togglePlay} />

            {/* Play/Pause overlay */}
            <button
              ref={playBtnRef}
              onClick={togglePlay}
              aria-label={isPlaying ? '暂停' : '播放'}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-16 w-16 rounded-full bg-[#BCFF2F] text-black font-bold flex items-center justify-center shadow-[0_0_40px_rgba(188,255,47,0.5)] hover:scale-105 transition will-change-transform"
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Mute toggle */}
            <button
              onClick={() => {
                const v = videoRef.current
                if (!v) return
                const next = !isMuted
                v.muted = next
                setMuted(next)
              }}
              aria-label={isMuted ? '取消静音' : '静音'}
              className="absolute right-3 bottom-3 h-9 w-9 rounded-md bg-black/60 text-white border border-white/10 backdrop-blur hover:bg-black/70 flex items-center justify-center"
            >
              {isMuted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 9v6h4l5 5V4L9 9H5zM16.5 12a4.5 4.5 0 0 1-.9 2.7l1.1 1.1A6 6 0 0 0 18 12a6 6 0 0 0-1.3-3.8l-1.1 1.1c.6.8.9 1.7.9 2.7z" />
                  <path d="M3 3l18 18-1.5 1.5L1.5 4.5 3 3z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 9v6h4l5 5V4L9 9H5z" />
                  <path d="M16.5 12a4.5 4.5 0 0 1-4.5 4.5v-2a2.5 2.5 0 0 0 0-5v-2a4.5 4.5 0 0 1 4.5 4.5z" />
                </svg>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/10">
            <div ref={progressRef} className="h-full bg-[#BCFF2F]" style={{ width: 0 }} />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 text-center text-sm text-gray-400">点击播放，滚动页面可感受光影随动效果。</div>
      </div>
    </section>
  )
}
