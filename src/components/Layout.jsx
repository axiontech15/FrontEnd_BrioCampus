import { NavLink, Link, useLocation } from 'react-router-dom'
import { ShieldCheck, Search, Building2, LayoutDashboard, QrCode, LogIn, Menu, X, Shield } from 'lucide-react'
import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { VeriCampusLogo } from './VeriCampusLogo.jsx'

function ScrollProgress(){
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A86A] via-[#E7D1A0] to-[#7A1C1C] origin-left z-[60]" style={{ scaleX }} />
}

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const nav = [
    { to: '/verification', label: 'Vérification', icon: Search },
    { to: '/employeur', label: 'Employeur', icon: Building2 },
    { to: '/universite', label: 'Université', icon: LayoutDashboard },
    { to: '/badge', label: 'Badge', icon: QrCode },
    { to: '/admin', label: 'Admin', icon: Shield },
  ]
  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF5]/95 backdrop-blur border-b border-[#E9DDCB] animate-slideDown">
      <div className="h-[3px] bg-gradient-to-r from-[#C9A86A] via-[#E7D1A0] to-[#7A1C1C] relative overflow-hidden shimmer-bar"/>
      <div className="hidden lg:block border-b border-[#E9DDCB]/60 bg-[#1B1D3B] text-[#E9DDCB] text-[11px] tracking-wide">
        <div className="mx-auto max-w-[1240px] px-6 py-2 flex justify-between">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#C9A86A] animate-pulse"/> VeriCampus • Registre national • Sceau blockchain</span>
          <span>Support : contact@vericampus.cd • Kinshasa • Lubumbashi • Bukavu</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 md:px-6">
        <div className="flex items-center justify-between py-3.5 gap-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <VeriCampusLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n,i)=>(
              <NavLink key={n.to} to={n.to} className={({isActive})=> `inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition hover:scale-[1.02] active:scale-[0.98] ${isActive ? 'bg-[#1B1D3B] text-white border-[#1B1D3B] shadow' : 'bg-white text-[#1B1D3B] border-[#E9DDCB] hover:bg-[#F2EDE6]'}`} style={{animation:`slideUp 0.5s both`, animationDelay:`${i*70}ms`}}>
                <n.icon size={14} className="transition-transform group-hover:rotate-6"/> {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/connexion" className={`hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border ${location.pathname==='/connexion' ? 'bg-[#C9A86A] text-[#1B1D3B] border-[#C9A86A]' : 'bg-white border-[#E9DDCB] text-[#1B1D3B] hover:bg-[#F2EDE6]'}`}>
              <LogIn size={16}/> Connexion
            </Link>
            <Link to="/verification" className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#7A1C1C] text-white px-5 py-2.5 text-sm font-bold hover:bg-[#611616] shadow">Vérifier</Link>
            <button onClick={()=>setOpen(v=>!v)} className="md:hidden h-10 w-10 rounded-xl bg-white border border-[#E9DDCB] flex items-center justify-center">{open ? <X size={18}/> : <Menu size={18}/>}</button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 grid gap-2 animate-slideDown">
            {nav.map((n,i)=>(
              <NavLink key={n.to} onClick={()=>setOpen(false)} to={n.to} className={({isActive})=> `flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium border transition ${isActive ? 'bg-[#1B1D3B] text-white' : 'bg-white border-[#E9DDCB]'}`} style={{animation:`slideUp 0.4s both`, animationDelay:`${i*60}ms`}}>
                <n.icon size={16}/> {n.label}
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/connexion" onClick={()=>setOpen(false)} className="rounded-full bg-white border border-[#E9DDCB] py-3 text-center text-sm font-semibold">Connexion</Link>
              <Link to="/verification" onClick={()=>setOpen(false)} className="rounded-full bg-[#7A1C1C] text-white py-3 text-center text-sm font-bold">Vérifier</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export function Footer(){
  return (
    <footer className="border-t border-[#E9DDCB] bg-white mt-10">
      <div className="mx-auto max-w-[1240px] px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#6B6575]">
        <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#1B4A3A]"/> VeriCampus © 2026 — Registre académique souverain • Données simulées (démo sans backend)</span>
        <span className="flex gap-4"><a className="hover:underline" href="#">Mentions légales</a><a className="hover:underline" href="#">Confidentialité</a><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#1B6B4A]"/> Opérationnel</span></span>
      </div>
    </footer>
  )
}

export function Layout({ children, toast }){
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Header/>
      <main className="flex-1 mx-auto w-full max-w-[1240px] px-4 md:px-6 py-6 md:py-8">{children}</main>
      <Footer/>
      {toast && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#14131F] text-white px-5 py-3 rounded-full text-sm font-medium shadow-xl z-50">{toast}</motion.div>}
    </div>
  )
}
