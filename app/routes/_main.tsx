import type { Route } from './+types/_main'
import { Navbar } from '../components/landing/Navbar'
import { Outlet } from 'react-router'
import '../styles/landing.css'
import { memo } from 'react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Nexion - Next-Gen Web3 SSH Manager' },
    { name: 'description', content: 'Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Experience the server management revolution in the decentralized era. Transparent OKB-based pricing, save up to 95% costs.' },
    { name: 'keywords', content: 'SSH, Web3, Blockchain, Crypto Wallet, Server Management, OKX, X Layer, SSH Pricing, Pay-as-you-go, OKB Payment' },
    { property: 'og:title', content: 'Nexion - Next-Gen Web3 SSH Manager' },
    { property: 'og:description', content: 'Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Transparent OKB-based pricing, save up to 95% costs.' },
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
