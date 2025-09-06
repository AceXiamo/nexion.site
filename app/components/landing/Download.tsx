import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

const PLATFORMS = [
  { key: "windows", name: "Windows", desc: "即将推出", icon: "mdi:microsoft-windows", available: false },
  { key: "mac", name: "macOS", desc: "适用于 macOS 11+", icon: "mdi:apple", available: true },
  { key: "linux", name: "Linux", desc: "即将推出", icon: "mdi:linux", available: false },
] as const;

export function Download() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [os, setOs] = useState<"windows" | "mac" | "linux" | undefined>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = navigator.platform.toLowerCase();
    const ua = navigator.userAgent.toLowerCase();
    if (p.includes("mac") || ua.includes("mac os")) setOs("mac");
    else if (p.includes("win")) setOs("windows");
    else setOs("linux");
  }, []);

  const latestUrl = "https://github.com/AceXiamo/Nexion/releases/latest";

  return (
    <section ref={ref} id="download" className="py-20">
      <div className="max-w-4xl md:max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">下载 Nexion</h2>
          <p className="text-base md:text-lg text-gray-400 mb-10">
            目前提供 macOS 下载，Windows / Linux 即将推出（从 GitHub Releases 获取）
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PLATFORMS.map((p) => {
            const isRecommended = p.key === "mac" && os === "mac";
            const disabled = !p.available;
            const commonClasses = `group block text-left p-5 rounded-xl border transition-colors ${
              disabled
                ? "border-white/10 bg-white/[0.02] opacity-60 cursor-not-allowed"
                : "border-white/10 hover:bg-white/[0.03]"
            } ${isRecommended ? "ring-1 ring-[#BCFF2F]" : ""}`;
            const Box: any = disabled ? "div" : "a";
            return (
              <Box
                key={p.key}
                href={disabled ? undefined : latestUrl}
                target={disabled ? undefined : "_blank"}
                rel={disabled ? undefined : "noopener noreferrer"}
                aria-disabled={disabled || undefined}
                className={commonClasses}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center">
                    <Icon icon={p.icon} className={`w-5 h-5 ${disabled ? "text-white/50" : "text-white/80 group-hover:text-[#BCFF2F]"}`} />
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      {p.name}
                      {isRecommended && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#BCFF2F]/15 text-[#BCFF2F]">推荐</span>
                      )}
                      {!p.available && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">即将推出</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{p.desc}</div>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center text-sm ${disabled ? 'text-white/40' : 'text-[#BCFF2F]'}">
                  {disabled ? (
                    <>敬请期待</>
                  ) : (
                    <>
                      前往 Releases 下载
                      <Icon icon="mdi:external-link" className="ml-1" />
                    </>
                  )}
                </div>
              </Box>
            );
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href="https://github.com/AceXiamo/Nexion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors"
          >
            <Icon icon="mdi:github" />
            查看源码
          </a>
          <p className="text-sm text-gray-500 mt-4">
            提示：首次使用需安装 OKX Wallet 或其他 WalletConnect 兼容钱包
          </p>
        </motion.div>
      </div>
    </section>
  );
}
