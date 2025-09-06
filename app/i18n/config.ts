import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
const resources = {
  zh: {
    translation: {
      // Navigation
      nav: {
        home: '首页',
        download: '下载',
        docs: '文档',
        github: 'GitHub'
      },
      // Meta tags
      meta: {
        title: 'Nexion - The Next-Gen Web3 SSH Manager',
        description: '用你的加密钱包替代传统SSH密钥，将配置安全存储在区块链上。体验去中心化时代的服务器管理革命。基于OKB的透明定价，节省高达95%成本。',
        keywords: 'SSH, Web3, 区块链, 加密钱包, 服务器管理, OKX, X Layer, SSH定价, 按需付费, OKB支付'
      },
      // Hero section
      hero: {
        version: 'v1.0',
        builtOn: 'Built on X Layer • OKX Wallet',
        title: '用钱包，一键管理所有 SSH',
        tagline1: '钱包即身份',
        tagline2: '配置上链',
        tagline3: '端到端加密',
        coreCapabilities: '核心能力：',
        keywords: ['统一身份认证', '链上加密存储', '审计可追溯', '团队权限管理'],
        description: '统一身份认证 · 链上加密存储 · 审计可追溯 · 团队权限管理',
        features: {
          encryption: '端到端加密',
          compatible: 'EVM兼容',
          lowCost: 'Gas ~$0.01'
        },
        ecosystem: {
          license: 'Apache 2.0'
        }
      },
      // Terminal demo (固定内容，不需要翻译)
      terminal: {
        title: 'Nexion • SSH Manager'
      },
      // Docs page
      docs: {
        navigation: '文档导航',
        toc: '目录',
        notFound: '未找到文档',
        backToDocs: '返回文档',
        lastUpdated: '最后更新',
        reportIssue: '报告问题',
        editPage: '编辑此页',
        mobile: {
          selectDoc: '选择文档'
        }
      },
      // Features section
      features: {
        title: '强大功能',
        subtitle: '为现代开发者设计',
        items: [
          {
            title: 'Web3 身份认证',
            description: '告别复杂的SSH密钥管理，使用你熟悉的加密钱包进行身份验证。一个钱包，连接所有服务器。',
            highlight: '支持 OKX、MetaMask、Trust Wallet'
          },
          {
            title: '区块链存储',
            description: 'SSH配置通过ECIES加密存储在X Layer区块链上，确保数据永不丢失，完全由你控制。',
            highlight: '年费用仅 $1.20，超低Gas成本'
          },
          {
            title: '军事级加密',
            description: '采用ECIES + ChaCha20Poly1305加密算法，确保你的SSH配置和连接信息绝对安全。',
            highlight: '抗量子计算，面向未来'
          },
          {
            title: '跨平台体验',
            description: '基于Electron构建，完美支持Windows、macOS、Linux。现代化界面，原生应用体验。',
            highlight: '一次配置，处处可用'
          },
          {
            title: '多设备同步',
            description: '配置存储在区块链上，无论在哪台设备上，只要连接钱包就能访问你的所有SSH配置。',
            highlight: '随时随地，无缝切换'
          },
          {
            title: '团队协作',
            description: '通过智能合约管理团队权限，安全共享配置，追踪每次操作。',
            highlight: '权限精细化，审计可追溯'
          }
        ]
      },
      // Comparison section
      comparison: {
        title: '传统 SSH vs Nexion',
        subtitle: '告别传统 SSH 管理痛点',
        traditional: {
          title: '传统方式',
          items: [
            {
              title: '身份与凭据',
              description: '多套密钥、难以共享与吊销，易出错。'
            },
            {
              title: '配置与同步',
              description: '手工备份/同步，跨设备易失控。'
            },
            {
              title: '安全与审计',
              description: '明文/半明文存储，缺审计与追责。'
            },
            {
              title: '协作与权限',
              description: '权限粒度粗，团队管理复杂。'
            },
            {
              title: '总拥有成本',
              description: '人力维护高，合规与事故成本不可控。'
            }
          ]
        },
        nexion: {
          title: 'Nexion 方式',
          items: [
            {
              title: '钱包统一认证',
              description: 'Web3 钱包即身份，一键授权/吊销。'
            },
            {
              title: '链上加密存储',
              description: 'ECIES 加密，配置上链，随处可取。'
            },
            {
              title: '可追溯审计',
              description: '链上事件可查，操作留痕可验证。'
            },
            {
              title: '合约化权限',
              description: '合约管理团队权限，最小授权原则。'
            },
            {
              title: '低成本高收益',
              description: 'X Layer 低 Gas，自动化降低运维成本。'
            }
          ]
        }
      },
      // Pricing section
      pricing: {
        title: '透明定价策略',
        subtitle: '只对链上价值交互收费；终端与 FTP 完全免费',
        fees: [
          {
            title: '用户注册（一次性）',
            description: '激活链上身份',
            price: '0.1 OKB'
          },
          {
            title: '新增配置',
            description: '每个 SSH 配置上链存储',
            price: '0.02 OKB'
          },
          {
            title: '更新配置',
            description: '修改已有的 SSH 配置',
            price: '0.005 OKB'
          }
        ],
        note: '基于 OKB 智能定价，Gas 费用约为 $0.01 USD 等值',
        advantages: {
          title: '我们的优势',
          items: [
            '无订阅、无月费：按需付费，用多少付多少',
            '只对链上价值交互收费：注册 / 新增 / 编辑配置',
            '连接与传输完全免费：终端与 FTP / SFTP 不收费',
            '不同于订阅制，避免长期固定成本'
          ]
        },
        comparison: {
          title: '成本对比',
          traditional: '传统 SSH 管理',
          nexion: 'Nexion 方案',
          savings: '节省高达'
        }
      },
      // Download section
      download: {
        title: '下载 Nexion',
        subtitle: '目前提供 macOS 下载，Windows / Linux 即将推出（从 GitHub Releases 获取）',
        platforms: {
          windows: {
            name: 'Windows',
            description: '即将推出'
          },
          mac: {
            name: 'macOS',
            description: '适用于 macOS 11+'
          },
          linux: {
            name: 'Linux',
            description: '即将推出'
          }
        },
        github: '从 GitHub 下载',
        recommended: '推荐',
        tip: '提示：首次使用需安装 OKX Wallet 或其他 WalletConnect 兼容钱包'
      },
      // Footer section
      footer: {
        description: '下一代Web3 SSH管理器，用你的加密钱包管理所有SSH连接',
        product: '产品',
        technology: '技术',
        community: '社区',
        links: {
          features: '功能特性',
          pricing: '定价策略',
          download: '下载体验',
          docs: '使用文档',
          xlayer: 'X Layer',
          okxWallet: 'OKX Wallet',
          openSource: '开源代码',
          contracts: '智能合约'
        },
        copyright: '© 2024 Nexion. All rights reserved.',
        poweredBy: 'Built with ❤️ on X Layer'
      },
      // VideoShowcase section
      videoShowcase: {
        title: '产品演示',
        subtitle: '点击播放，滚动页面可感受光影随动效果。',
        description: '1 分钟，快速理解 Nexion',
        playButton: '播放'
      },
      // Buttons
      buttons: {
        download: '立即下载',
        github: '查看源码',
        demo: '观看演示'
      },
      // Common
      common: {
        loading: '加载中...',
        error: '发生错误'
      }
    }
  },
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        download: 'Download',
        docs: 'Docs',
        github: 'GitHub'
      },
      // Meta tags
      meta: {
        title: 'Nexion - Next-Gen Web3 SSH Manager',
        description: 'Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Experience the server management revolution in the decentralized era. Transparent OKB-based pricing, save up to 95% costs.',
        keywords: 'SSH, Web3, Blockchain, Crypto Wallet, Server Management, OKX, X Layer, SSH Pricing, Pay-as-you-go, OKB Payment'
      },
      // Hero section
      hero: {
        version: 'v1.0',
        builtOn: 'Built on X Layer • OKX Wallet',
        title: 'Manage All SSH with Your Wallet',
        tagline1: 'Wallet as Identity',
        tagline2: 'Config on Chain',
        tagline3: 'End-to-End Encrypted',
        coreCapabilities: 'Core Capabilities:',
        keywords: ['Unified Authentication', 'On-Chain Encrypted Storage', 'Audit Traceability', 'Team Permission Management'],
        description: 'Unified Authentication · On-Chain Encrypted Storage · Audit Traceability · Team Permission Management',
        features: {
          encryption: 'End-to-End Encrypted',
          compatible: 'EVM Compatible',
          lowCost: 'Gas ~$0.01'
        },
        ecosystem: {
          license: 'Apache 2.0'
        }
      },
      // Terminal demo (固定内容，不需要翻译)
      terminal: {
        title: 'Nexion • SSH Manager'
      },
      // Docs page
      docs: {
        navigation: 'Documentation',
        toc: 'Table of Contents',
        notFound: 'Documentation not found',
        backToDocs: 'Back to Docs',
        lastUpdated: 'Last updated',
        reportIssue: 'Report Issue',
        editPage: 'Edit this page',
        mobile: {
          selectDoc: 'Select Document'
        }
      },
      // Features section
      features: {
        title: 'Powerful Features',
        subtitle: 'Built for Modern Developers',
        items: [
          {
            title: 'Web3 Authentication',
            description: 'Say goodbye to complex SSH key management. Use your familiar crypto wallet for authentication. One wallet, connect to all servers.',
            highlight: 'Supports OKX, MetaMask, Trust Wallet'
          },
          {
            title: 'Blockchain Storage',
            description: 'SSH configurations are encrypted with ECIES and stored on X Layer blockchain, ensuring data never lost and fully controlled by you.',
            highlight: 'Only $1.20 per year, ultra-low Gas cost'
          },
          {
            title: 'Military-Grade Encryption',
            description: 'Uses ECIES + ChaCha20Poly1305 encryption algorithms to ensure your SSH configurations and connection information are absolutely secure.',
            highlight: 'Quantum-resistant, future-proof'
          },
          {
            title: 'Cross-Platform Experience',
            description: 'Built with Electron, perfect support for Windows, macOS, Linux. Modern interface, native app experience.',
            highlight: 'Configure once, use everywhere'
          },
          {
            title: 'Multi-Device Sync',
            description: 'Configurations stored on blockchain, no matter which device you are on, just connect your wallet to access all your SSH configs.',
            highlight: 'Anytime, anywhere, seamless switching'
          },
          {
            title: 'Team Collaboration',
            description: 'Manage team permissions through smart contracts, securely share configurations, track every operation.',
            highlight: 'Fine-grained permissions, auditable traces'
          }
        ]
      },
      // Comparison section
      comparison: {
        title: 'Traditional SSH vs Nexion',
        subtitle: 'Say goodbye to traditional SSH management pain points',
        traditional: {
          title: 'Traditional Way',
          items: [
            {
              title: 'Identity & Credentials',
              description: 'Multiple key sets, hard to share and revoke, error-prone.'
            },
            {
              title: 'Configuration & Sync',
              description: 'Manual backup/sync, cross-device chaos.'
            },
            {
              title: 'Security & Audit',
              description: 'Plain/semi-plain text storage, lack of audit and accountability.'
            },
            {
              title: 'Collaboration & Permissions',
              description: 'Coarse permission granularity, complex team management.'
            },
            {
              title: 'Total Cost of Ownership',
              description: 'High maintenance labor, unpredictable compliance and incident costs.'
            }
          ]
        },
        nexion: {
          title: 'Nexion Way',
          items: [
            {
              title: 'Unified Wallet Auth',
              description: 'Web3 wallet as identity, one-click authorization/revocation.'
            },
            {
              title: 'On-Chain Encrypted Storage',
              description: 'ECIES encryption, configs on-chain, accessible everywhere.'
            },
            {
              title: 'Traceable Audit',
              description: 'On-chain events queryable, operation traces verifiable.'
            },
            {
              title: 'Contract-based Permissions',
              description: 'Smart contracts manage team permissions, principle of least privilege.'
            },
            {
              title: 'Low Cost High Return',
              description: 'X Layer low gas, automation reduces operational costs.'
            }
          ]
        }
      },
      // Pricing section
      pricing: {
        title: 'Transparent Pricing',
        subtitle: 'Only charge for on-chain value interactions; Terminal & FTP completely free',
        fees: [
          {
            title: 'User Registration (One-time)',
            description: 'Activate on-chain identity',
            price: '0.1 OKB'
          },
          {
            title: 'Add Configuration',
            description: 'Each SSH config stored on-chain',
            price: '0.02 OKB'
          },
          {
            title: 'Update Configuration',
            description: 'Modify existing SSH configuration',
            price: '0.005 OKB'
          }
        ],
        note: 'OKB-based smart pricing, Gas fees approximately $0.01 USD equivalent',
        advantages: {
          title: 'Our Advantages',
          items: [
            'No subscription, no monthly fees: pay-as-you-go, pay for what you use',
            'Only charge for on-chain value interactions: registration / add / edit configs',
            'Connection and transfer completely free: Terminal and FTP / SFTP no charge',
            'Unlike subscription model, avoid long-term fixed costs'
          ]
        },
        comparison: {
          title: 'Cost Comparison',
          traditional: 'Traditional SSH Management',
          nexion: 'Nexion Solution',
          savings: 'Save up to'
        }
      },
      // Download section
      download: {
        title: 'Download Nexion',
        subtitle: 'Currently provides macOS download, Windows / Linux coming soon (get from GitHub Releases)',
        platforms: {
          windows: {
            name: 'Windows',
            description: 'Coming Soon'
          },
          mac: {
            name: 'macOS',
            description: 'For macOS 11+'
          },
          linux: {
            name: 'Linux',
            description: 'Coming Soon'
          }
        },
        github: 'Download from GitHub',
        recommended: 'Recommended',
        tip: 'Tip: First-time users need to install OKX Wallet or other WalletConnect compatible wallets'
      },
      // Footer section
      footer: {
        description: 'Next-generation Web3 SSH manager, manage all SSH connections with your crypto wallet',
        product: 'Product',
        technology: 'Technology',
        community: 'Community',
        links: {
          features: 'Features',
          pricing: 'Pricing',
          download: 'Download',
          docs: 'Documentation',
          xlayer: 'X Layer',
          okxWallet: 'OKX Wallet',
          openSource: 'Open Source',
          contracts: 'Smart Contracts'
        },
        copyright: '© 2024 Nexion. All rights reserved.',
        poweredBy: 'Built with ❤️ on X Layer'
      },
      // VideoShowcase section
      videoShowcase: {
        title: 'Product Demo',
        subtitle: 'Click to play, scroll the page to feel the light and shadow effects.',
        description: '1 minute, quickly understand Nexion',
        playButton: 'Play'
      },
      // Buttons
      buttons: {
        download: 'Download Now',
        github: 'View Source',
        demo: 'Watch Demo'
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'An error occurred'
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false // React already escapes by default
    }
  })

export default i18n
