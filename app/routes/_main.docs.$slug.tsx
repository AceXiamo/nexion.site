import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { MDXProvider } from '@mdx-js/react'

// Glob all MDX in /docs as React components
const modules = import.meta.glob('/docs/**/*.mdx', { eager: true })

function toSlug(path: string) {
  const file = path.split('/').pop() || ''
  return file.replace(/\.mdx?$/, '')
}

const entries = Object.entries(modules).map(([path, mod]) => ({
  path,
  slug: toSlug(path),
  // @ts-ignore - MDX default export is a component
  Component: (mod as any).default,
}))

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>()
  const nav = useNavigate()
  const item = useMemo(() => entries.find((e) => e.slug === slug), [slug])
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([])
  const tocRef = useRef<HTMLDivElement>(null)

  useDocEffects(contentRef, setToc, slug)

  const handleTocClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    const scroller = scrollRef.current
    const root = contentRef.current
    if (!scroller || !root) return
    const target = root.querySelector<HTMLElement>(`#${CSS?.escape ? CSS.escape(id) : id}`)
    if (!target) return
    const top = Math.max(0, target.offsetTop - 8)
    scroller.scrollTo({ top, behavior: 'smooth' })
    // update hash without window scroll
    try {
      history.replaceState(null, '', `#${id}`)
    } catch {}
  }

  if (!item) {
    return (
      <section className="h-screen overflow-hidden pt-16">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">未找到文档</h1>
            <button className="text-[#BCFF2F] underline hover:text-[#a3e62a] transition-colors" onClick={() => nav('/docs/getting-started')}>
              返回文档
            </button>
          </div>
        </div>
      </section>
    )
  }

  const Pre = (props: any) => {
    return (
      <div className="my-5 rounded-xl border border-white/10 bg-black/60 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <div className="h-9 px-3 flex items-center gap-2 border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden />
          <span className="ml-2 text-xs text-white/50">Terminal</span>
        </div>
        <pre {...props} className="p-4 overflow-auto text-sm leading-6" />
      </div>
    )
  }

  const components = {
    h1: (props: any) => <h1 {...props} className="scroll-mt-24 text-3xl md:text-4xl font-bold mt-6 mb-4 tracking-tight [&>a]:no-underline [&>a]:text-inherit hover:[&>a]:no-underline" />,
    h2: (props: any) => <h2 {...props} className="scroll-mt-24 text-2xl md:text-3xl font-semibold mt-10 mb-3 tracking-tight [&>a]:no-underline [&>a]:text-inherit hover:[&>a]:no-underline" />,
    h3: (props: any) => <h3 {...props} className="scroll-mt-24 text-xl md:text-2xl font-semibold mt-8 mb-2 [&>a]:no-underline [&>a]:text-inherit hover:[&>a]:no-underline" />,
    p: (props: any) => <p {...props} className="text-gray-300 leading-7 my-4" />,
    a: (props: any) => <a {...props} className="text-white/90 hover:text-white no-underline hover:underline underline-offset-2 decoration-white/30 transition-colors" />,
    ul: (props: any) => <ul {...props} className="list-disc pl-6 my-4 marker:text-white/40" />,
    ol: (props: any) => <ol {...props} className="list-decimal pl-6 my-4" />,
    blockquote: (props: any) => <blockquote {...props} className="my-6 border-l-2 border-white/15 pl-4 text-gray-300" />,
    code: (props: any) => <code {...props} className="px-1.5 py-0.5 rounded text-white" />,
    pre: Pre,
    hr: (props: any) => <hr {...props} className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />,
  } as const

  const { Component } = item

  return (
    <section className="h-screen overflow-hidden pt-24">
      <div className="max-w-7xl mx-auto h-full px-6">
        {/* 移动端导航下拉菜单 */}
        <div className="md:hidden pb-4">
          <select value={slug} onChange={(e) => nav(`/docs/${e.target.value}`)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm capitalize">
            {entries.map((e) => (
              <option key={e.slug} value={e.slug} className="capitalize">
                {e.slug.replace(/-/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* 桌面端布局 */}
        <div className="h-full flex">
          {/* 固定左侧边栏 - 仅桌面端显示 */}
          <aside className="hidden md:flex md:w-64 flex-shrink-0 mr-6">
            <div className="sticky top-24 w-full">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="px-4 pt-4 pb-3 border-b border-white/10">
                  <h2 className="text-xs uppercase tracking-wider text-gray-400">文档导航</h2>
                </div>
                <nav className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent py-2">
                  {entries.map((e) => (
                    <Link
                      key={e.slug}
                      to={`/docs/${e.slug}`}
                      className={`group flex items-center gap-2 px-4 py-2 border-l-2 border-transparent text-sm transition-all ${
                        e.slug === slug ? 'text-white bg-[#BCFF2F]/10 !border-[#BCFF2F]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="capitalize truncate">{e.slug.replace(/-/g, ' ')}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* 可滚动内容区域 */}
          <article className="relative flex-1 bg-gradient-to-br from-black via-black to-black/95 md:rounded-l-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
            <div ref={scrollRef} className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div ref={contentRef} className="max-w-4xl py-8 md:py-12 px-6 md:px-8">
                <div className="prose prose-invert max-w-none">
                  <MDXProvider components={components}>
                    <Component />
                  </MDXProvider>
                </div>

                {/* 文档底部导航 */}
                <div className="mt-16 pt-8 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-gray-400">最后更新: {new Date().toLocaleDateString('zh-CN')}</div>
                    <div className="flex gap-4">
                      <a href="https://github.com/AceXiamo/Nexion/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#BCFF2F] transition-colors">
                        报告问题
                      </a>
                      <a href="https://github.com/AceXiamo/Nexion" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#BCFF2F] transition-colors">
                        编辑此页
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* 右侧目录（TOC） - 桌面端显示 */}
          <aside className="hidden xl:block w-72 pl-6">
            <div className="sticky top-0">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="px-4 pt-4 pb-3 border-b border-white/10">
                  <div className="text-xs uppercase tracking-wider text-gray-400">目录</div>
                </div>
                <nav ref={tocRef} className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent py-2 text-sm">
                  {toc.map((h) => (
                    <a
                      key={h.id}
                      data-id={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => handleTocClick(h.id, e)}
                      className="block truncate px-4 py-1.5 transition-colors text-gray-400 hover:text-white hover:bg-white/5"
                      style={{ paddingLeft: `${(h.level - 1) * 12 + 8}px` }}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

// Effects: build TOC
export function useDocEffects(contentRef: React.RefObject<HTMLDivElement | null>, setToc: (t: Array<{ id: string; text: string; level: number }>) => void, slug?: string) {
  useEffect(() => {
    const root = contentRef.current
    if (!root) return

    // Build TOC from headings
    const nodes = Array.from(root.querySelectorAll('h1, h2, h3')) as HTMLHeadingElement[]
    const items = nodes.map((n) => ({
      id: n.id,
      text: n.textContent || '',
      level: n.tagName === 'H1' ? 1 : n.tagName === 'H2' ? 2 : 3,
    }))
    setToc(items)
  }, [contentRef, setToc, slug])
}
