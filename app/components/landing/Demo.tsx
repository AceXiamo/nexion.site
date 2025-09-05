import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: 1,
    title: "连接钱包",
    description: "使用OKX钱包或其他Web3钱包进行身份验证",
    gradient: "from-[#BCFF2F] to-green-400",
    delay: 0
  },
  {
    number: 2,
    title: "添加配置",
    description: "输入服务器信息，自动加密并存储到区块链",
    gradient: "from-blue-500 to-purple-500",
    delay: 0.2
  },
  {
    number: 3,
    title: "一键连接",
    description: "选择配置，自动解密并建立安全SSH连接",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.4
  }
];

const servers = [
  {
    name: "生产服务器",
    host: "ubuntu@prod.example.com",
    status: "online",
    color: "bg-green-400"
  },
  {
    name: "测试环境",
    host: "ubuntu@test.example.com",
    status: "offline",
    color: "bg-gray-400"
  },
  {
    name: "数据库服务器",
    host: "root@db.example.com",
    status: "warning",
    color: "bg-yellow-400"
  }
];

export function Demo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const serversRef = useRef<HTMLDivElement[]>([]);
  const sweepRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const [allowMotion, setAllowMotion] = useState(true);

  // reset collectors
  stepsRef.current = [];
  serversRef.current = [];
  orbsRef.current = [];

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setAllowMotion(!mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // initial
      gsap.set(stepsRef.current, { opacity: 0, y: allowMotion ? 30 : 0 });
      gsap.set(serversRef.current, { opacity: 0, x: allowMotion ? -20 : 0 });

      // enter
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(stepsRef.current, {
            opacity: 1,
            y: 0,
            duration: allowMotion ? 0.7 : 0.01,
            ease: "power3.out",
            stagger: 0.12,
          });
          gsap.to(serversRef.current, {
            opacity: 1,
            x: 0,
            duration: allowMotion ? 0.7 : 0.01,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.2,
          });
        },
      });

      // background orbs float
      if (allowMotion) {
        orbsRef.current.forEach((el, i) => {
          gsap.to(el, {
            y: `+=${16 + i * 8}`,
            x: `+=${i % 2 === 0 ? 10 : -12}`,
            scale: 1.03,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // sweep light
      if (sweepRef.current && allowMotion) {
        const w = sectionRef.current!.clientWidth;
        gsap.fromTo(
          sweepRef.current,
          { x: -w },
          { x: w, duration: 6, repeat: -1, ease: "none" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [allowMotion]);

  return (
    <section ref={sectionRef} id="demo" className="py-20 relative overflow-hidden">
      {/* Background orbs + sweep */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          ref={(el) => el && orbsRef.current.push(el)}
          className="absolute -top-10 left-8 w-56 h-56 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(188,255,47,0.22), transparent 60%)" }}
        />
        <div
          ref={(el) => el && orbsRef.current.push(el)}
          className="absolute top-24 -right-10 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,210,107,0.16), transparent 60%)" }}
        />
        <div
          ref={(el) => el && orbsRef.current.push(el)}
          className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 60%)" }}
        />
        <div
          ref={sweepRef}
          className="absolute -inset-y-10 -left-1/3 w-1/3 rotate-6"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(188,255,47,0.06) 50%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            看看
            <span className="text-[#BCFF2F] mx-2">Nexion</span>
            的强大功能
          </h2>
          <p className="text-xl text-gray-400">
            简单三步，连接你的服务器
          </p>
        </motion.div>
        
        {/* Feature Demo Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => el && (stepsRef.current[index] = el)}
              className={`text-center ${allowMotion ? 'opacity-0 translate-y-8' : ''}`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(188,255,47,0.15)]`}>
                <span className="text-2xl font-bold text-black">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Mock Interface Screenshot */}
        <motion.div
          className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="terminal-window max-w-4xl mx-auto">
            <div className="terminal-header">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-yellow"></span>
              <span className="terminal-dot dot-green"></span>
              <span className="text-gray-400 text-sm ml-4">Nexion - SSH Manager</span>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Server List */}
                <div>
                  <h4 className="text-[#BCFF2F] font-semibold mb-4 flex items-center">
                    <Icon icon="mdi:server" className="mr-2" />
                    我的服务器
                  </h4>
              <div className="space-y-3">
                {servers.map((server, index) => (
                  <div
                    key={index}
                    ref={(el) => el && (serversRef.current[index] = el)}
                    className={`${
                      index === 0 
                        ? "bg-[#BCFF2F]/10 border-[#BCFF2F]/20" 
                        : "bg-gray-800/50 border-gray-700"
                    } border rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-opacity-80 ${allowMotion ? 'opacity-0 -translate-x-5' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">{server.name}</div>
                        <div className="text-gray-400 text-sm">{server.host}</div>
                      </div>
                      <motion.div
                        className={`w-2 h-2 ${server.color} rounded-full`}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
                </div>
                
                {/* Connection Status */}
                <div>
                  <h4 className="text-blue-400 font-semibold mb-4 flex items-center">
                    <Icon icon="mdi:connection" className="mr-2" />
                    连接状态
                  </h4>
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-sm">
                      <div className="text-gray-400">钱包地址</div>
                      <div className="text-white font-mono">0x5573...9433</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400">网络</div>
                      <div className="text-[#BCFF2F]">X Layer Testnet</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400">Gas 余额</div>
                      <div className="text-white">0.025 OKB</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400">配置数量</div>
                      <div className="text-white">3 个服务器</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
