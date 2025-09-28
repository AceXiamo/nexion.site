import { Icon } from '@iconify/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { OptimizedParticles } from '../effects/OptimizedParticles'
import { TypingGlow } from '../effects/SpectacularText'
import LightRays from '../ui/LightRays'
import { OKXButtons } from '../ui/OKXButton'
import { useInView, motion, AnimatePresence } from 'framer-motion'
// 移除终端打字动画，改为静态渲染，避免重复内容
import { useLanguage } from '../../i18n/useLanguage'

// 终端演示卡片（玻璃拟态）
function TerminalDemo({ active }: { active: boolean }) {
  const cmd1Ref = useRef<HTMLSpanElement>(null)
  const out1Ref = useRef<HTMLSpanElement>(null)
  const cmd2Ref = useRef<HTMLSpanElement>(null)
  const out2Ref = useRef<HTMLSpanElement>(null)
  const cmd3Ref = useRef<HTMLSpanElement>(null)
  const out3Ref = useRef<HTMLSpanElement>(null)
  const out4Ref = useRef<HTMLSpanElement>(null)

  // 文本常量（不做 i18n）
  const L1 = '$ nexion wallet connect'
  const L2 = '✔️ Connected: 0x5573...9433 (OKX Wallet)'
  const L3 = '$ nexion config list'
  const L4 = '• prod-admin  • staging  • db-primary'
  const L5 = '$ nexion connect prod-admin'
  const L6 = '🔐 decrypting on-chain config...'
  const L7 = '✅ SSH connected: ubuntu@prod.example.com'

  const startedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    const clearTimers = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []
    }

    const setText = (el: HTMLSpanElement | null, text: string) => {
      if (!el) return
      el.textContent = text
    }

    const typeLine = (el: HTMLSpanElement | null, text: string, cps = 28): Promise<void> => {
      return new Promise((resolve) => {
        if (!el) return resolve()
        el.textContent = ''
        let i = 0
        const step = () => {
          if (!el) return resolve()
          i += 1
          el.textContent = text.slice(0, i)
          if (i >= text.length) return resolve()
          rafRef.current = requestAnimationFrame(step)
        }
        // 用 setTimeout 启动一次，避免首帧长任务阻塞
        const id = window.setTimeout(() => {
          rafRef.current = requestAnimationFrame(step)
        }, 30)
        timeoutsRef.current.push(id)
      })
    }

    const run = async () => {
      if (!active) {
        // 非激活：仅展示前两行，其他清空
        setText(cmd1Ref.current, L1)
        setText(out1Ref.current, L2)
        setText(cmd2Ref.current, '')
        setText(out2Ref.current, '')
        setText(cmd3Ref.current, '')
        setText(out3Ref.current, '')
        setText(out4Ref.current, '')
        return
      }
      if (startedRef.current) return
      startedRef.current = true

      // 顺序打字（固定 DOM，不使用 map 渲染）
      await typeLine(cmd1Ref.current, L1)
      await typeLine(out1Ref.current, L2)
      await typeLine(cmd2Ref.current, L3)
      await typeLine(out2Ref.current, L4)
      await typeLine(cmd3Ref.current, L5)
      await typeLine(out3Ref.current, L6)
      await typeLine(out4Ref.current, L7)
    }

    run()

    return () => {
      clearTimers()
    }
  }, [active])

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl text-left">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        <span className="ml-3 text-xs text-gray-400">Nexion • SSH Manager</span>
      </div>
      <div className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-gray-200 min-h-[148px]">
        {/* 固定 DOM 结构：每一行是一个 div，不使用 map */}
        <div className="text-gray-400"><span ref={cmd1Ref} /></div>
        <div><span ref={out1Ref} /></div>
        <div className="text-gray-400"><span ref={cmd2Ref} /></div>
        <div><span ref={out2Ref} /></div>
        <div className="text-gray-400"><span ref={cmd3Ref} /></div>
        <div><span ref={out3Ref} /></div>
        <div><span ref={out4Ref} /></div>
      </div>
    </div>
  )
}

export function Hero() {
  const { t, currentLanguage } = useLanguage()
  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(heroRef, { once: true, amount: 0.3 })
  const [allowMotion, setAllowMotion] = useState<boolean>(true)
  const [keywordIndex, setKeywordIndex] = useState(0)
  const [typingKey, setTypingKey] = useState(0) // Force TypingGlow re-mount
  const keywords = t('hero.keywords', { returnObjects: true }) as string[]

  // 尊重系统减少动效设置，避免加载时副作用与性能抖动
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setAllowMotion(!mq.matches)
    set()
    mq.addEventListener?.('change', set)
    return () => mq.removeEventListener?.('change', set)
  }, [])

  // 进入视口后再启动 GSAP，并用 gsap.context 管理作用域，避免重复与内存泄漏
  useLayoutEffect(() => {
    if (!sectionInView) return

    let cancelled = false

    const start = () => {
      if (cancelled) return
      const ctx = gsap.context(() => {
        gsap.set([titleContainerRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current], { opacity: 0, y: allowMotion ? 50 : 0 })

        const tl = gsap.timeline({ delay: 0.2 })

        tl.to(titleContainerRef.current, {
          opacity: 1,
          y: 0,
          duration: allowMotion ? 0.9 : 0.01,
          ease: 'power2.out',
        })
          .to(
            subtitleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: allowMotion ? 0.7 : 0.01,
              ease: 'power2.out',
            },
            '-=0.2'
          )
          .to(
            descriptionRef.current,
            {
              opacity: 1,
              y: 0,
              duration: allowMotion ? 0.7 : 0.01,
              ease: 'power2.out',
            },
            '-=0.15'
          )
          .to(
            buttonsRef.current,
            {
              opacity: 1,
              y: 0,
              duration: allowMotion ? 0.9 : 0.01,
              ease: 'power2.out',
            },
            '-=0.15'
          )
      }, heroRef)

      return () => ctx.revert()
    }

    // 等待字体准备就绪，避免首次绘制抖动
    if (typeof document !== 'undefined' && (document as any).fonts?.ready) {
      ;(document as any).fonts.ready.then(() => {
        if (!cancelled) start()
      })
    } else {
      start()
    }

    return () => {
      cancelled = true
    }
  }, [sectionInView, allowMotion])

  // 轮播关键词
  useLayoutEffect(() => {
    if (!sectionInView || !allowMotion) return
    const t = setInterval(() => {
      setKeywordIndex((i) => (i + 1) % keywords.length)
    }, 2200)
    return () => clearInterval(t)
  }, [sectionInView, allowMotion, keywords.length])

  // Reset TypingGlow animation when language changes
  useEffect(() => {
    setTypingKey(prev => prev + 1)
  }, [currentLanguage])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* LightRays 背景效果 */}
      <div className="absolute inset-0 z-99 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* 减少粒子数量以配合光线效果 */}
      <OptimizedParticles count={allowMotion ? 8 : 4} color="rgba(188, 255, 47, 0.15)" speed={0.3} size={0.5} />

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* 顶部主区域 */}
          <div ref={titleContainerRef} className={`pt-28 md:pt-36 grid md:grid-cols-12 gap-8 items-center ${allowMotion ? 'opacity-0 translate-y-8' : ''}`}>
            {/* 左：标题与卖点 */}
            <div className="md:col-span-7 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[11px] tracking-wide bg-green-500/10 border border-green-500/30 text-green-400">
                  <Icon icon="mdi:license" className="inline mr-1" />
                  {t('hero.badges.mitLicense')}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] tracking-wide bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Icon icon="mdi:github" className="inline mr-1" />
                  {t('hero.badges.openSource')}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] tracking-wide bg-[#BCFF2F]/10 border border-[#BCFF2F]/30 text-[#BCFF2F]">
                  <Icon icon="mdi:layers-triple" className="inline mr-1" />
                  {t('hero.badges.builtOnXLayer')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-[#BCFF2F] via-[#00D26B] to-[#3B82F6] bg-clip-text text-transparent">{t('hero.title')}</span>
              </h1>

              <div className="mt-5 md:mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="text-gray-400 text-base">{t('hero.tagline1')}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-gray-400 text-base">{t('hero.tagline2')}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-gray-400 text-base">{t('hero.tagline3')}</span>
              </div>

              <div ref={subtitleRef} className={`mt-6 ${allowMotion ? 'opacity-0 translate-y-8' : ''}`}>
                <div className="text-sm text-gray-400">{t('hero.coreCapabilities')}</div>
                <div className="h-9 relative overflow-hidden text-lg md:text-xl font-semibold">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={keywordIndex}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: allowMotion ? 0.45 : 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-[#BCFF2F] to-[#00D26B] bg-clip-text text-transparent"
                    >
                      {keywords[keywordIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div ref={descriptionRef} className={`mt-6 md:mt-8 max-w-2xl mx-auto md:mx-0 ${allowMotion ? 'opacity-0 translate-y-8' : ''}`}>
                <div className="min-h-[48px] sm:min-h-[48px] md:min-h-[56px]">
                  {allowMotion ? (
                    <TypingGlow
                      key={`typing-${typingKey}-${currentLanguage}`}
                      text={t('hero.description')}
                      className="block text-base md:text-lg text-[#CCCCCC]"
                      speed={26}
                      delay={600}
                    />
                  ) : (
                    <p className="text-base md:text-lg text-[#CCCCCC]">{t('hero.description')}</p>
                  )}
                </div>
              </div>

              <div ref={buttonsRef} className={`mt-8 md:mt-10 flex flex-col sm:flex-row items-center md:items-start gap-4 ${allowMotion ? 'opacity-0 translate-y-8' : ''}`}>
                <OKXButtons.StarOnGitHub className="w-full sm:w-auto" />
                <OKXButtons.GitHub className="w-full sm:w-auto" />
                <OKXButtons.Fork className="w-full sm:w-auto" />
              </div>

              <div className="mt-6 flex flex-col items-center gap-4 text-gray-500 md:flex-row md:justify-start">
                <span className="inline-flex items-center gap-2 text-sm">
                  <Icon icon="mdi:lock-open" className="text-[#BCFF2F]" /> {t('hero.features.openSource')}
                </span>
                <span className="inline-flex items-center gap-2 text-sm">
                  <Icon icon="mdi:server" className="text-[#BCFF2F]" /> {t('hero.features.selfHosted')}
                </span>
                <span className="inline-flex items-center gap-2 text-sm">
                  <Icon icon="mdi:ethereum" className="text-[#BCFF2F]" /> {t('hero.features.web3Driven')}
                </span>
              </div>
            </div>

            {/* 右：终端演示 */}
            <div className="md:col-span-5">
              <motion.div initial={{ opacity: 0, y: allowMotion ? 40 : 0 }} animate={sectionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: allowMotion ? 0.8 : 0 }}>
                <TerminalDemo active={sectionInView} />
              </motion.div>
            </div>
          </div>

          {/* 生态徽章 */}
          <div className="mt-12 md:mt-16 flex flex-col items-center justify-center gap-y-3 text-gray-400 md:flex-row md:flex-wrap md:gap-x-6">
            <div className="flex items-center gap-x-6">
              <span className="text-sm inline-flex items-center gap-2">
                <Icon icon="mdi:github" className="text-[#BCFF2F]" /> {t('hero.badges.openSource')}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600 hidden md:block" />
              <span className="text-sm inline-flex items-center gap-2">
                <Icon icon="mdi:license" className="text-[#BCFF2F]" /> {t('hero.ecosystem.license')}
              </span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-600 hidden md:block" />
            <span className="text-sm inline-flex items-center gap-2">
              <Icon icon="mdi:layers-triple" className="text-[#BCFF2F]" /> {t('hero.badges.builtOnXLayer')}
            </span>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-40">
        <Icon icon="mdi:chevron-down" className="text-3xl text-[#BCFF2F] animate-bounce" />
      </div>
    </section>
  )
}
