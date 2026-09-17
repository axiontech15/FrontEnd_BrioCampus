import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Search, Award, ArrowRight, Fingerprint, Clock3, Globe, Check, Landmark, BadgeCheck, Sparkles, GraduationCap, Users } from 'lucide-react'
import { UNIVERSITES } from '../data/mock'

// Images validées 200 OK
const IMG_GRADUATION = "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80"
const IMG_CAMPUS = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"
const IMG_DIPLOMA = "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
const IMG_TEAM = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
const IMG_LIBRARY = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80"

export default function Home(){
  return (
    <div className="space-y-8">
      {/* Hero - split image visible */}
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6, ease:[0.16,1,0.3,1]}} className="rounded-[32px] bg-[#1B1D3B] text-white p-7 md:p-10 relative overflow-hidden border border-[#2A2D5C] flex flex-col hover-lift">
          <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize:'22px 22px'}}/>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C9A86A]/15 blur-3xl"/>
          {/* subtle diploma watermark - now visible 20% */}
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
            <img src={IMG_DIPLOMA} alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B1D3B] via-[#1B1D3B]/95 to-[#1B1D3B]/80 pointer-events-none"/>
          <div className="relative flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#C9A86A] animate-pulse"/> Édition 2026 • Registre national VeriCampus
            </div>
            <h1 className="serif mt-6 text-[34px] md:text-[46px] font-bold leading-[0.9] tracking-tight">
              Le campus<br/>ne ment jamais.<br/><span className="text-[#C9A86A]">La chaîne le prouve.</span>
            </h1>
            <p className="mt-4 text-white/75 text-[15px] leading-relaxed max-w-[52ch]">
              VeriCampus ancre chaque diplôme du Congo sur la blockchain. Vérification instantanée par QR code, opposable aux banques, entreprises et administrations.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/verification" className="inline-flex items-center gap-2 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-6 py-3.5 text-sm font-extrabold hover:bg-[#D8B985] shadow-lg"><Search size={18}/> Vérifier un diplôme <ArrowRight size={16}/></Link>
              <Link to="/connexion" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-6 py-3.5 text-sm font-semibold backdrop-blur hover:bg-white/15">Se connecter</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm border-t border-white/10 pt-6">
              <span className="flex items-center gap-2"><Fingerprint size={16} className="text-[#C9A86A]"/> SHA-256 + IPFS</span>
              <span className="flex items-center gap-2"><Clock3 size={16} className="text-[#C9A86A]"/> &lt; 2s</span>
              <span className="flex items-center gap-2"><Landmark size={16} className="text-[#C9A86A]"/> 5 universités</span>
            </div>
          </div>
          <div className="relative mt-6 flex items-center gap-3 text-xs text-white/70">
            <img src={IMG_TEAM} alt="étudiants VeriCampus" className="h-8 w-8 rounded-full object-cover border-2 border-white/20 shadow"/>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="" className="h-8 w-8 rounded-full object-cover border-2 border-white/20 -ml-3 shadow"/>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="" className="h-8 w-8 rounded-full object-cover border-2 border-white/20 -ml-3 shadow"/>
            <span>+12k diplômés déjà protégés</span>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.12, ease:[0.16,1,0.3,1]}} className="grid gap-4">
          {/* Image card graduation - now visible */}
          <div className="rounded-[24px] overflow-hidden bg-white border border-[#E9DDCB] shadow-sm relative group hover-lift">
            <img src={IMG_GRADUATION} alt="Remise de diplômes VeriCampus" className="h-[240px] w-full object-cover group-hover:scale-[1.03] transition duration-700 block"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D3B]/85 via-[#1B1D3B]/20 to-transparent"/>
            <div className="absolute bottom-0 p-5 text-white">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#1B1D3B] px-3 py-1 text-xs font-bold shadow"><GraduationCap size={14}/> Promotion 2023 • UNIKIN</div>
              <div className="serif mt-2 text-[18px] font-bold leading-tight drop-shadow">Une fierté qui mérite une preuve infalsifiable</div>
              <div className="text-xs text-white/80 mt-1">Photo : campus UNIKIN, Kinshasa</div>
            </div>
            <div className="absolute top-3 right-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow"><span className="h-2 w-2 rounded-full bg-[#1B4A3A] animate-pulse"/> Live • Vérifications</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[24px] bg-white border border-[#E9DDCB] p-5 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-[#F2EDE6] border border-[#E9DDCB] flex items-center justify-center text-[#7A1C1C]"><Award size={18}/></div>
              <div className="mt-3 serif font-bold leading-tight">Sceau<br/>numérique</div>
              <div className="mono text-[11px] mt-2 bg-[#FFFBF5] border border-[#E9DDCB] rounded-xl p-2.5">
                <div className="text-[#6B6575]">0x8f3a…c91e</div>
                <div className="text-[#1B4A3A] flex items-center gap-1 font-bold"><Check size={10}/> Bloc #14 882 431</div>
              </div>
              <img src={IMG_LIBRARY} alt="bibliothèque" className="mt-3 h-14 w-full object-cover rounded-xl border border-[#E9DDCB] block"/>
            </div>
            <div className="rounded-[24px] bg-[#C9A86A] p-5 text-[#1B1D3B] relative overflow-hidden border border-[#B89A5F] shadow-sm">
              <Sparkles className="absolute -right-4 -top-4 opacity-20" size={70}/>
              <div className="relative">
                <div className="text-xs font-bold tracking-widest uppercase opacity-60">Campus partenaires</div>
                <img src={IMG_CAMPUS} alt="Campus universitaire" className="mt-3 h-[88px] w-full object-cover rounded-xl border-2 border-white/60 shadow-sm block"/>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {UNIVERSITES.slice(0,4).map(u=> <span key={u.id} className="rounded-full bg-[#1B1D3B] text-white px-2.5 py-1 text-[10px] font-bold shadow-sm">{u.sigle}</span>)}
                </div>
                <div className="mt-2 text-[11px] font-medium opacity-70">+ Université de Kisangani</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* stats */}
      <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="rounded-[24px] overflow-hidden border border-[#E9DDCB] bg-white grid md:grid-cols-3 shadow-sm">
        {[
          {k:'Diplômes ancrés', v:'12 483', sub:'Registre national', icon:BadgeCheck},
          {k:'Vérifications', v:'47 291', sub:'Depuis 2024', icon:Users},
          {k:'Fraudes détectées', v:'18,4%', sub:'Évitées à l’embauche', icon:ShieldCheck},
        ].map((s,i)=>(
          <motion.div key={s.k} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="p-6 flex items-center gap-4 border-b md:border-b-0 md:border-r last:border-0 border-[#E9DDCB] bg-gradient-to-b from-white to-[#FFFBF5] hover:bg-[#FFFBF5] transition">
            <div className="h-11 w-11 rounded-xl bg-[#1B1D3B] text-[#C9A86A] flex items-center justify-center shadow animate-float" style={{animationDelay:`${i*200}ms`}}><s.icon size={18}/></div>
            <div><div className="serif text-[22px] font-bold leading-none">{s.v}</div><div className="text-xs tracking-widest uppercase font-bold text-[#6B6575]">{s.k}</div><div className="text-xs text-[#6B6575]">{s.sub}</div></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Image banner - now clearly visible */}
      <motion.div initial={{opacity:0,scale:0.98}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.6}} className="rounded-[24px] overflow-hidden border border-[#E9DDCB] relative h-[220px] md:h-[260px] shadow-sm group hover-lift">
        <img src={IMG_DIPLOMA} alt="Diplôme VeriCampus" className="absolute inset-0 w-full h-full object-cover block group-hover:scale-[1.02] transition duration-700"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B]/90 via-[#1B1D3B]/65 to-transparent"/>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize:'18px 18px'}}/>
        <div className="relative h-full flex items-center p-6 md:p-10">
          <div className="max-w-[560px] text-white">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C9A86A] bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur"><Globe size={14}/> Reconnu par la Banque Centrale</div>
            <h3 className="serif mt-3 text-2xl md:text-3xl font-bold leading-tight drop-shadow">Chaque diplôme devient une preuve qui voyage.</h3>
            <p className="mt-2 text-sm text-white/85">QR vérifiable hors-ligne, hash immuable, partage LinkedIn en 1 clic. VeriCampus.</p>
            <Link to="/verification" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-[#1B1D3B] px-4 py-2 text-xs font-bold">Tester la vérification <ArrowRight size={12}/></Link>
          </div>
          <img src={IMG_TEAM} alt="étudiants diplômés" className="hidden md:block ml-auto h-28 w-28 rounded-2xl object-cover border-4 border-white/20 shadow-xl"/>
        </div>
      </motion.div>

      {/* CTA cards with images - all visible */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {to:"/verification", img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", icon:Search, color:"bg-[#7A1C1C]", title:"Vérification publique", desc:"Gratuit, sans compte. Matricule + université + année.", cta:"Commencer", ctac:"text-[#7A1C1C]"},
          {to:"/employeur", img:"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80", icon:Building2Icon, color:"bg-[#1B1D3B]", title:"Portail Employeur", desc:"Historique, API RH, export CSV — inclus.", cta:"Accéder", ctac:"text-[#1B1D3B]"},
          {to:"/universite", img:IMG_CAMPUS, icon:Landmark, color:"bg-[#1B4A3A]", title:"Dashboard Université", desc:"Import palmarès, ancrage blockchain.", cta:"Gérer", ctac:"text-[#1B4A3A]"},
        ].map((c,i)=>(
          <motion.div key={c.to} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} >
            <Link to={c.to} className="rounded-[24px] overflow-hidden bg-white border border-[#E9DDCB] hover:shadow-xl transition group hover-lift block">
              <div className="relative overflow-hidden">
                <img src={c.img} alt={c.title} className="h-40 w-full object-cover group-hover:scale-[1.08] transition duration-700 block"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"/>
              </div>
              <div className="p-6">
                <div className={`h-10 w-10 rounded-xl ${c.color} text-white flex items-center justify-center -mt-11 border-4 border-white shadow-lg relative transition-transform group-hover:scale-110`}><c.icon size={18}/></div>
                <h3 className="serif mt-3 text-lg font-bold">{c.title}</h3>
                <p className="text-sm text-[#6B6575] mt-1">{c.desc}</p>
                <span className={`mt-3 inline-flex items-center gap-1 text-sm font-bold ${c.ctac} group-hover:gap-2 transition-all`}>{c.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1"/></span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Building2Icon(){ return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="1"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M7 11h2M11 11h2M15 11h2M7 15h2M11 15h2M15 15h2"/></svg> }
