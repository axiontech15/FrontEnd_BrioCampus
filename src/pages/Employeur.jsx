import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, BadgeCheck, Clock3, Shield, Search, Download, Users, ExternalLink, Sparkles } from 'lucide-react'
import { EMPLOYEUR_VERIFS, statusConfig } from '../data/mock'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx'

const IMG_OFFICE = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"

export default function Employeur({ showToast }){
  return (
    <div className="space-y-6">
      <Reveal>
        <div className="rounded-[24px] overflow-hidden border border-[#E9DDCB] relative hover-lift">
          <motion.img initial={{scale:1.06}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1.2}} src={IMG_OFFICE} alt="Bureau RH" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40"/>
          <div className="relative p-6 md:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex gap-4">
            <div className="h-14 w-14 rounded-2xl bg-[#1B1D3B] text-[#C9A86A] flex items-center justify-center shadow"><Briefcase size={22}/></div>
            <div>
              <div className="flex flex-wrap items-center gap-2"><h2 className="serif text-lg font-bold text-[#1B1D3B]">Portail Employeur — VeriCampus</h2><span className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-2.5 py-1 text-xs font-bold"><Sparkles size={12}/> Premium</span><span className="inline-flex items-center gap-1.5 rounded-full border border-[#B7DDC9] bg-[#E6F2EC] text-[#1B4A3A] px-2.5 py-1 text-xs font-bold"><span className="h-1.5 w-1.5 rounded-full bg-[#1B4A3A]"/> API active</span></div>
              <p className="text-sm text-[#3A3850]">Société Générale RDC • Vérifications illimitées • Support prioritaire VeriCampus</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/verification" className="inline-flex items-center gap-2 rounded-full bg-[#7A1C1C] text-white px-5 py-3 text-sm font-bold shadow"><Search size={16}/> Nouvelle vérification</Link>
            <button onClick={()=>showToast('Facture téléchargée (simulé)')} className="hidden md:inline-flex items-center gap-2 rounded-full bg-white border border-[#E9DDCB] px-4 py-3 text-sm font-medium shadow-sm"><Download size={16}/> Facture</button>
          </div>
        </div>
      </div>
      </Reveal>

      <Stagger className="grid md:grid-cols-3 gap-4">
        {[
          {label:'Validés', value:'78%', sub:'+4,2% ce mois', icon:BadgeCheck},
          {label:'Temps moyen', value:'1,8s', sub:'vs 11 jours avant', icon:Clock3},
          {label:'Fraudes évitées', value:'9', sub:'3 embauches bloquées', icon:Shield},
        ].map(c=>(
          <StaggerItem key={c.label}>
            <div className="rounded-[20px] bg-white border border-[#E9DDCB] p-5 flex items-center gap-4 hover-lift">
              <div className="h-10 w-10 rounded-xl bg-[#1B1D3B] text-[#C9A86A] flex items-center justify-center animate-float"><c.icon size={18}/></div>
              <div><div className="text-xs tracking-widest uppercase font-bold text-[#6B6575]">{c.label}</div><div className="serif text-xl font-bold">{c.value} <span className="text-xs font-sans font-normal text-[#6B6575]">{c.sub}</span></div></div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <div className="rounded-[24px] bg-white border border-[#E9DDCB] overflow-hidden shadow-sm hover-lift">
        <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E9DDCB]"><h3 className="font-bold text-sm md:text-base">Vérifications récentes</h3><button onClick={()=>showToast('Export CSV généré')} className="self-start sm:self-auto text-xs rounded-full bg-[#1B1D3B] text-white px-4 py-2 font-semibold hover:bg-[#23265a]">Exporter CSV</button></div>
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto scrollbar-none">
          <table className="w-full text-sm min-w-[680px]">
            <thead className="bg-[#FFFBF5] text-[11px] tracking-widest uppercase text-[#6B6575]"><tr><th className="text-left px-5 py-3">Candidat</th><th className="text-left px-5 py-3">Univ.</th><th className="text-left px-5 py-3">Diplôme</th><th className="text-left px-5 py-3">Date</th><th className="text-left px-5 py-3">Statut</th><th></th></tr></thead>
            <tbody className="divide-y divide-[#F2EDE6]">
              {EMPLOYEUR_VERIFS.map(r=>{
                const cfg=statusConfig[r.statut]
                return (
                  <tr key={r.id} className="hover:bg-[#FFFBF5]">
                    <td className="px-5 py-4 font-semibold whitespace-nowrap">{r.candidat}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-[#1B1D3B] text-white px-2.5 py-1 text-xs font-bold">{r.universite}</span></td>
                    <td className="px-5 py-4 text-[#6B6575]">{r.diplome}</td>
                    <td className="px-5 py-4 text-xs text-[#6B6575] whitespace-nowrap">{r.date}</td>
                    <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cfg.badge}`}><span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}/>{cfg.label}</span></td>
                    <td className="px-5 py-4 text-right"><Link to="/verification" className="text-xs font-semibold text-[#1B1D3B] inline-flex items-center gap-1 hover:underline">Détails <ExternalLink size={12}/></Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-[#F2EDE6]">
          {EMPLOYEUR_VERIFS.map(r=>{
            const cfg=statusConfig[r.statut]
            return (
              <div key={r.id} className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between"><span className="font-bold text-sm">{r.candidat}</span><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${cfg.badge}`}><span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}/>{cfg.label}</span></div>
                <div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-[#1B1D3B] text-white px-2.5 py-1 font-bold">{r.universite}</span><span className="bg-[#F2EDE6] border border-[#E9DDCB] rounded-full px-2.5 py-1">{r.diplome}</span><span className="text-[#6B6575]">{r.date}</span></div>
                <Link to="/verification" className="text-xs font-bold text-[#7A1C1C] inline-flex items-center gap-1">Voir détails <ExternalLink size={12}/></Link>
              </div>
            )
          })}
        </div>
      </div>
      </Reveal>

      <Reveal>
        <div className="rounded-[24px] bg-[#1B1D3B] text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover-lift relative overflow-hidden">
          <motion.div initial={{x:-20, opacity:0}} whileInView={{x:0, opacity:1}} viewport={{once:true}} className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"><Users size={18}/></div><div><div className="font-bold">Équipe RH</div><div className="text-sm text-white/70">3 sièges inclus • SSO & journaux d'audit</div></div></motion.div>
          <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={()=>showToast('Invitation envoyée')} className="rounded-full bg-[#C9A86A] text-[#1B1D3B] px-5 py-2.5 text-sm font-bold">Inviter un collaborateur</motion.button>
        </div>
      </Reveal>
    </div>
  )
}
