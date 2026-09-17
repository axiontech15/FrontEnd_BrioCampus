import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BadgeCheck, Clock3, AlertTriangle, Search, UploadCloud, Loader2, Check, Fingerprint } from 'lucide-react'
import { DIPLOMES, STATS_UNIV, statusConfig } from '../data/mock'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx'

const IMG_CAMPUS = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"

export default function Universite({ showToast }){
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const handleImport = ()=>{ setLoading(true); setDone(false); setTimeout(()=>{ setLoading(false); setDone(true); showToast('Palmarès importé — 312 diplômes'); },1600)}

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="rounded-[24px] overflow-hidden border border-[#E9DDCB] relative hover-lift">
          <motion.img initial={{scale:1.06}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1.2}} src={IMG_CAMPUS} alt="Campus UNIKIN" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B]/90 via-[#1B1D3B]/70 to-[#1B1D3B]/20"/>
          <div className="relative p-6 md:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-white">
          <div className="flex gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white text-[#1B1D3B] flex items-center justify-center font-black shadow">UNIKIN</div>
            <div><div className="flex items-center gap-2"><h2 className="serif text-lg font-bold">Dashboard Université — UNIKIN</h2><span className="rounded-full bg-[#C9A86A] text-[#1B1D3B] px-2.5 py-1 text-xs font-bold">VeriCampus • vérifié</span></div><p className="text-sm text-white/75">Scolarité • Dernière synchro il y a 12 min • VeriCampus</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleImport} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-5 py-3 text-sm font-bold disabled:opacity-60 shadow">{loading ? <Loader2 size={16} className="animate-spin"/> : <UploadCloud size={16}/>} {loading ? 'Import…' : 'Importer palmarès'}</button>
            <button onClick={()=>showToast('Clé API régénérée')} className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-4 py-3 text-sm"><Fingerprint size={16}/> Clé API</button>
          </div>
        </div>
        </div>
      </Reveal>
      {done && <motion.div initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} className="rounded-2xl bg-[#E6F2EC] border border-[#B7DDC9] text-[#1B4A3A] px-4 py-3 text-sm flex items-center gap-2"><Check size={16}/> Import terminé — 312 lignes validées • Ancrage en file d'attente.</motion.div>}

      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:'Enregistrés', value:STATS_UNIV.total.toLocaleString('fr-FR'), sub:'Tous diplômes', icon:GraduationCap},
          {label:'Validés', value:STATS_UNIV.valides.toLocaleString('fr-FR'), sub:'Ancrage confirmé', icon:BadgeCheck},
          {label:'En attente', value:STATS_UNIV.attente, sub:'À ancrer', icon:Clock3},
          {label:'Anomalies', value:STATS_UNIV.anomalies, sub:'À corriger', icon:AlertTriangle},
        ].map(s=>(
          <StaggerItem key={s.label}>
            <div className="rounded-[20px] bg-white border border-[#E9DDCB] p-5 hover-lift">
              <div className="flex justify-between"><span className="text-xs tracking-widest uppercase font-bold text-[#6B6575]">{s.label}</span><span className="h-8 w-8 rounded-xl bg-[#F2EDE6] border border-[#E9DDCB] flex items-center justify-center animate-float"><s.icon size={14}/></span></div>
              <div className="serif mt-2 text-2xl font-bold">{s.value}</div><div className="text-xs text-[#6B6575]">{s.sub}</div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <div className="rounded-[24px] bg-white border border-[#E9DDCB] overflow-hidden shadow-sm hover-lift">
          <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E9DDCB]"><h3 className="font-bold text-sm md:text-base">Registre UNIKIN</h3><span className="self-start sm:self-auto text-xs rounded-full bg-[#F2EDE6] border border-[#E9DDCB] px-3 py-1.5 flex items-center gap-1 w-fit"><Search size={12}/> Filtrer • 6 sur 2 814</span></div>
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto scrollbar-none">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-[#FFFBF5] text-[11px] tracking-widest uppercase text-[#6B6575]"><tr><th className="text-left px-5 py-3">Matricule</th><th className="text-left px-5 py-3">Étudiant</th><th className="text-left px-5 py-3">Filière</th><th className="text-left px-5 py-3">Année</th><th className="text-left px-5 py-3">Statut</th><th className="text-left px-5 py-3">Hash</th></tr></thead>
            <tbody className="divide-y divide-[#F2EDE6]">
              {[...DIPLOMES,
                {matricule:'UNIKIN-2023-90210', nom:'KAVIRA Luboya Eric', type:'Licence en Droit', filiere:'Droit Privé', annee:'2023', statut:'validé', hash:'0x7a11…e2b4c890'},
                {matricule:'UNIKIN-2022-77102', nom:'NDOMBI Amina Fatou', type:'Master en Économie', filiere:'Économie Monétaire', annee:'2022', statut:'en_attente', hash:'0x3c88…a0f1d223'},
              ].map(r=>{
                const cfg=statusConfig[r.statut]
                return (
                  <tr key={r.matricule} className="hover:bg-[#FFFBF5]"><td className="px-5 py-4 mono text-xs font-semibold whitespace-nowrap">{r.matricule}</td><td className="px-5 py-4"><div className="font-semibold whitespace-nowrap">{r.nom}</div><div className="text-xs text-[#6B6575]">{r.type}</div></td><td className="px-5 py-4 text-xs">{r.filiere}</td><td className="px-5 py-4 whitespace-nowrap">{r.annee}</td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cfg.badge}`}><span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}/>{cfg.label}</span></td><td className="px-5 py-4 mono text-xs">{r.hash}</td></tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-[#F2EDE6]">
          {[...DIPLOMES,
            {matricule:'UNIKIN-2023-90210', nom:'KAVIRA Luboya Eric', type:'Licence en Droit', filiere:'Droit Privé', annee:'2023', statut:'validé', hash:'0x7a11…e2b4c890'},
            {matricule:'UNIKIN-2022-77102', nom:'NDOMBI Amina Fatou', type:'Master en Économie', filiere:'Économie Monétaire', annee:'2022', statut:'en_attente', hash:'0x3c88…a0f1d223'},
          ].map(r=>{
            const cfg=statusConfig[r.statut]
            return (
              <div key={r.matricule} className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2"><span className="mono text-xs font-bold bg-[#FFFBF5] border border-[#E9DDCB] rounded-full px-2.5 py-1">{r.matricule}</span><span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-bold ${cfg.badge}`}><span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}/>{cfg.label}</span></div>
                <div className="font-bold text-sm">{r.nom}</div>
                <div className="text-xs text-[#6B6575]">{r.type} • {r.filiere} • {r.annee}</div>
                <div className="mono text-xs text-[#6B6575] bg-[#F2EDE6] rounded-lg px-2 py-1 w-fit">{r.hash}</div>
              </div>
            )
          })}
        </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-[24px] border-2 border-dashed border-[#E9DDCB] bg-white p-6 flex flex-col md:flex-row items-center gap-6 hover-lift">
          <div className="h-14 w-14 rounded-2xl bg-[#1B1D3B] text-[#C9A86A] flex items-center justify-center animate-float"><UploadCloud size={22}/></div>
          <div className="flex-1"><div className="font-bold">Importer un palmarès (simulation front-only)</div><div className="text-sm text-[#6B6575]">XLSX/CSV — barre fictive, aucun upload réel.</div>{loading && <div className="mt-3 h-2 rounded-full bg-[#F2EDE6] overflow-hidden shimmer-bar"><div className="h-full bg-[#C9A86A] w-[62%]"/></div>}</div>
          <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleImport} disabled={loading} className="rounded-full bg-[#1B1D3B] text-white px-6 py-3 text-sm font-bold shadow">{loading?'Traitement…':'Choisir un fichier'}</motion.button>
        </div>
      </Reveal>
    </div>
  )
}
