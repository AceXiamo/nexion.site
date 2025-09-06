import type { Route } from './+types/_main'
import { Navbar } from '../components/landing/Navbar'
import { Outlet } from 'react-router'
import '../styles/landing.css'
import { memo } from 'react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Nexion - 下一代Web3 SSH管理器' },
    { name: 'description', content: '用你的加密钱包替代传统SSH密钥，将配置安全存储在区块链上。体验去中心化时代的服务器管理革命。基于OKB的透明定价，节省高达95%成本。' },
    { name: 'keywords', content: 'SSH, Web3, 区块链, 加密钱包, 服务器管理, OKX, X Layer, SSH定价, 按需付费, OKB支付' },
    { property: 'og:title', content: 'Nexion - 下一代Web3 SSH管理器' },
    { property: 'og:description', content: '用你的加密钱包替代传统SSH密钥，将配置安全存储在区块链上。基于OKB的透明定价，节省高达95%成本。' },
    { property: 'og:type', content: 'website' },
  ]
}

const MainLayout = memo(function MainLayout() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <Outlet />
    </div>
  )
})

export default MainLayout
