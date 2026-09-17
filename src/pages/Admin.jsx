import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, LayoutDashboard, Users, GraduationCap, Building2, FileCheck2, AlertTriangle, Search, Plus, Trash2, Pencil, Eye, Download, BarChart3, Fingerprint, Clock3, Award, ArrowRight, Sparkles, X, UploadCloud, MapPin, Mail, Globe, Landmark, Check, Loader2 } from 'lucide-react'
import { UNIVERSITES as UNIVS, DIPLOMES, EMPLOYEUR_VERIFS, STATS_UNIV } from '../data/mock'

function AddUniversityModal({ open, onClose, onAdd }){
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ sigle:'', nom:'', ville:'Kinshasa', type:'Publique', email:'', phone:'', site:'', desc:'' })
  const [errors, setErrors] = useState({})
  const villes = ['Kinshasa','Lubumbashi','Bukavu','Kisangani','Goma','Matadi','Mbandaka','Kananga']
  const validate = ()=>{
    const e={}
    if(!form.sigle.trim() || form.sigle.trim().length<2 || form.sigle.trim().length>8) e.sigle='Sigle 2-8 lettres requis'
    if(!form.nom.trim() || form.nom.trim().length<5) e.nom='Nom complet requis (min 5)'
    if(!form.ville) e.ville='Ville requise'
    if(form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email='Email invalide'
    setErrors(e)
    return Object.keys(e).length===0
  }
  const submit = (ev)=>{
    ev.preventDefault()
    if(!validate()) return
    setLoading(true)
    setTimeout(()=>{
      onAdd({ id:form.sigle.toLowerCase().replace(/\s+/g,'-'), sigle:form.sigle.toUpperCase().trim(), nom:form.nom.trim(), ville:form.ville, type:form.type, email:form.email })
      setLoading(false)
      setForm({ sigle:'', nom:'', ville:'Kinshasa', type:'Publique', email:'', phone:'', site:'', desc:'' })
      setErrors({})
      onClose()
    }, 900)
  }
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="absolute inset-0 bg-[#0F1230]/60 backdrop-blur-sm"/>
      <motion.div initial={{opacity:0, y:18, scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:0.98}} transition={{duration:0.32, ease:[0.16,1,0.3,1]}} className="relative w-full max-w-[640px] max-h-[90vh] overflow-hidden rounded-[24px] bg-white border border-[#E9DDCB] shadow-2xl flex flex-col">
        {/* header image */}
        <div className="relative h-28 shrink-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80" alt="" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B]/90 via-[#1B1D3B]/60 to-transparent"/>
          <div className="absolute inset-0 p-6 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white text-[#1B1D3B] flex items-center justify-center shadow"><GraduationCap size={18}/></div>
              <div><div className="serif font-bold text-white leading-none">Ajouter une université</div><div className="text-xs text-white/70">Partenaire VeriCampus • Vérifié après validation</div></div>
            </div>
            <button onClick={onClose} className="h-9 w-9 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition"><X size={16}/></button>
          </div>
        </div>
        <form onSubmit={submit} className="overflow-y-auto scrollbar-none p-6 space-y-4">
          <div className="grid sm:grid-cols-[140px_1fr] gap-4">
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Sigle *</label>
              <div className="mt-1.5 relative">
                <Landmark size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A96A6]"/>
                <input value={form.sigle} onChange={e=>setForm({...form, sigle:e.target.value})} placeholder="ex: UCB" maxLength={8} className={`w-full rounded-xl border bg-[#FFFBF5] pl-9 pr-3 py-3 text-sm font-bold uppercase placeholder:normal-case focus:bg-white outline-none ${errors.sigle ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-[#E9DDCB] focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20'}`}/>
              </div>
              {errors.sigle && <div className="text-xs text-red-600 mt-1">{errors.sigle}</div>}
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Type</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2 p-1 rounded-full bg-[#F2EDE6] border border-[#E9DDCB]">
                {['Publique','Privée'].map(t=>(
                  <button key={t} type="button" onClick={()=>setForm({...form, type:t})} className={`rounded-full px-3 py-2 text-xs font-bold transition ${form.type===t ? 'bg-[#1B1D3B] text-white shadow' : 'text-[#6B6575] hover:bg-white'}`}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Nom complet *</label>
            <input value={form.nom} onChange={e=>setForm({...form, nom:e.target.value})} placeholder="ex: Université Catholique de Bukavu" className={`mt-1.5 w-full rounded-xl border bg-[#FFFBF5] px-4 py-3 text-sm font-medium focus:bg-white outline-none ${errors.nom ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-[#E9DDCB] focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20'}`}/>
            {errors.nom && <div className="text-xs text-red-600 mt-1">{errors.nom}</div>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Ville *</label>
              <div className="mt-1.5 relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A96A6]"/>
                <select value={form.ville} onChange={e=>setForm({...form, ville:e.target.value})} className="w-full rounded-xl border border-[#E9DDCB] bg-[#FFFBF5] pl-9 pr-8 py-3 text-sm font-medium focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 outline-none">
                  {villes.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Email scolarité</label>
              <div className="mt-1.5 relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A96A6]"/>
                <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="scolarite@ucb.ac.cd" className={`w-full rounded-xl border bg-[#FFFBF5] pl-9 pr-3 py-3 text-sm focus:bg-white outline-none ${errors.email ? 'border-red-300' : 'border-[#E9DDCB] focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20'}`}/>
              </div>
              {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Téléphone</label>
              <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="+243 81 000 0000" className="mt-1.5 w-full rounded-xl border border-[#E9DDCB] bg-[#FFFBF5] px-4 py-3 text-sm focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 outline-none"/>
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Site web</label>
              <div className="mt-1.5 relative">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A96A6]"/>
                <input value={form.site} onChange={e=>setForm({...form, site:e.target.value})} placeholder="https://ucb.ac.cd" className="w-full rounded-xl border border-[#E9DDCB] bg-[#FFFBF5] pl-9 pr-3 py-3 text-sm focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 outline-none"/>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest uppercase text-[#6B6575]">Description (optionnel)</label>
            <textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} rows={2} placeholder="Facultés, accréditations, commentaire interne..." className="mt-1.5 w-full rounded-xl border border-[#E9DDCB] bg-[#FFFBF5] px-4 py-3 text-sm focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 outline-none resize-none"/>
          </div>
          <div className="rounded-xl border-2 border-dashed border-[#E9DDCB] bg-[#FFFBF5] p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white border border-[#E9DDCB] flex items-center justify-center text-[#6B6575]"><UploadCloud size={16}/></div>
            <div className="flex-1"><div className="text-xs font-bold">Logo / sceau (optionnel)</div><div className="text-xs text-[#6B6575]">PNG/JPG • simulation front-only</div></div>
            <button type="button" onClick={()=>showToast && showToast('Upload simulé — démo')} className="rounded-full bg-white border border-[#E9DDCB] px-3 py-2 text-xs font-bold hover:bg-[#F2EDE6]">Choisir</button>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-full bg-white border border-[#E9DDCB] py-3 text-sm font-bold hover:bg-[#F2EDE6]">Annuler</button>
            <button type="submit" disabled={loading} className="flex-[1.4] inline-flex items-center justify-center gap-2 rounded-full bg-[#1B1D3B] text-white py-3 text-sm font-bold hover:bg-[#23265a] disabled:opacity-60 shadow">
              {loading ? <><Loader2 size={16} className="animate-spin"/> Création…</> : <><Check size={16} className="text-[#C9A86A]"/> Créer l’université</>}
            </button>
          </div>
          <div className="text-center text-[11px] text-[#9A96A6]">Démo locale • Aucune donnée envoyée • Vérification manuelle requise</div>
        </form>
      </motion.div>
    </div>
  )
}

const TABS = [
  { id:'overview', label:'Vue d’ensemble', icon: LayoutDashboard },
  { id:'universites', label:'Universités', icon: GraduationCap },
  { id:'diplomes', label:'Diplômes', icon: FileCheck2 },
  { id:'employeurs', label:'Employeurs', icon: Building2 },
  { id:'logs', label:'Journaux', icon: BarChart3 },
]

function useScrollReveal(){
  return {
    initial:{opacity:0, y:16},
    whileInView:{opacity:1, y:0},
    viewport:{once:true, margin:"-40px"},
    transition:{duration:0.55, ease:[0.16,1,0.3,1]}
  }
}

export default function Admin({ showToast }){
  const [tab, setTab] = useState('overview')
  const [showAddModal, setShowAddModal] = useState(false)
  const [unis, setUnis] = useState(UNIVS)
  const [dips, setDips] = useState([...DIPLOMES,
    { matricule:'UNIKIN-2023-90210', nom:'KAVIRA Luboya Eric', universite:'Université de Kinshasa', sigle:'UNIKIN', type:'Licence en Droit', annee:'2023', statut:'validé', hash:'0x7a11…e2b4c890'},
  ])
  const reveal = useScrollReveal()

  const handleAddUni = (data)=>{
    setUnis([...unis, data])
    showToast(`Université ${data.sigle} créée — ${data.nom} — démo`)
  }
  const delUni = (id)=>{ setUnis(unis.filter(u=>u.id!==id)); showToast('Université retirée — démo') }

  return (
    <div className="space-y-6">
      {/* Header admin avec scroll animation */}
      <motion.div {...reveal} className="rounded-[24px] overflow-hidden border border-[#E9DDCB] relative">
        <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B]/92 via-[#1B1D3B]/75 to-[#1B1D3B]/30"/>
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-3 py-1 text-xs font-bold shadow"><ShieldCheck size={12}/> VeriCampus • Admin</div>
            <h1 className="serif text-2xl md:text-3xl font-bold mt-2 drop-shadow">Interface Admin</h1>
            <p className="text-sm text-white/75 mt-1">Gestion souveraine du registre • Accès restreint • Audit complet</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur">12 483 diplômes</span>
              <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur">5 universités</span>
              <span className="bg-emerald-500 text-white rounded-full px-3 py-1 font-bold">● Système sain</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={()=>showToast('Export global généré — démo')} className="inline-flex items-center gap-2 rounded-full bg-white text-[#1B1D3B] px-5 py-3 text-sm font-bold shadow hover:scale-[1.02] transition"><Download size={16}/> Export registre</button>
            <button onClick={()=>showToast('Rapport envoyé')} className="inline-flex items-center gap-2 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-5 py-3 text-sm font-bold shadow">Rapport <ArrowRight size={14}/></button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition ${tab===t.id ? 'bg-[#1B1D3B] text-white border-[#1B1D3B] shadow' : 'bg-white text-[#1B1D3B] border-[#E9DDCB] hover:bg-[#F2EDE6]'}`}>
            <t.icon size={14}/> {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.28}}>
          {tab==='overview' && (
            <div className="space-y-6">
              {/* Stats animés au scroll */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {k:'Diplômes', v:STATS_UNIV.total.toLocaleString('fr-FR'), icon:FileCheck2, c:'bg-[#1B1D3B] text-[#C9A86A]'},
                  {k:'Validés', v:STATS_UNIV.valides.toLocaleString('fr-FR'), icon:Award, c:'bg-[#1B4A3A] text-white'},
                  {k:'En attente', v:STATS_UNIV.attente, icon:Clock3, c:'bg-[#C9A86A] text-[#1B1D3B]'},
                  {k:'Anomalies', v:STATS_UNIV.anomalies, icon:AlertTriangle, c:'bg-[#7A1C1C] text-white'},
                ].map((s,i)=>(
                  <motion.div key={s.k} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="rounded-[20px] bg-white border border-[#E9DDCB] p-5 hover-lift">
                    <div className="flex justify-between items-start"><span className="text-xs tracking-widest uppercase font-bold text-[#6B6575]">{s.k}</span><span className={`h-9 w-9 rounded-xl flex items-center justify-center shadow ${s.c}`}><s.icon size={16}/></span></div>
                    <div className="serif text-2xl font-bold mt-2">{s.v}</div>
                    <div className="h-1.5 bg-[#F2EDE6] rounded-full mt-3 overflow-hidden shimmer-bar"><div className="h-full bg-[#C9A86A]" style={{width: `${70+i*6}%`}}/></div>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div {...reveal} className="rounded-[24px] bg-white border border-[#E9DDCB] p-6 hover-lift">
                  <h3 className="font-bold flex items-center gap-2"><BarChart3 size={16} className="text-[#C9A86A]"/> Activité récente</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      {a:'UNIKIN a ancré 42 diplômes', t:'il y a 12 min', c:'bg-emerald-50 border-emerald-200'},
                      {a:'Vérification anomalie UOB-2021-55018', t:'il y a 34 min', c:'bg-red-50 border-red-200'},
                      {a:'Nouvel employeur : Rawbank', t:'il y a 2h', c:'bg-[#F2EDE6] border-[#E9DDCB]'},
                      {a:'Export CSV employeur 312 lignes', t:'hier', c:'bg-white border-[#E9DDCB]'},
                    ].map((e,i)=>(
                      <motion.div key={i} initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.06}} className={`rounded-xl border p-3 text-sm flex justify-between ${e.c}`}>
                        <span>{e.a}</span><span className="text-xs text-[#6B6575]">{e.t}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...reveal} className="rounded-[24px] bg-[#1B1D3B] text-white p-6 relative overflow-hidden hover-lift">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10"/>
                  <div className="relative">
                    <h3 className="font-bold flex items-center gap-2"><Fingerprint size={16} className="text-[#C9A86A]"/> Santé blockchain</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur"><div className="text-white/60 text-xs uppercase tracking-widest">Dernier bloc</div><div className="font-mono font-bold text-lg">#14 882 431</div><div className="text-xs text-emerald-300">● Confirmé il y a 14s</div></div>
                      <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur"><div className="text-white/60 text-xs uppercase tracking-widest">Temps ancrage</div><div className="font-bold text-lg">1.8s</div><div className="text-xs text-[#C9A86A]">moyenne 7 jours</div></div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span className="flex-1 h-2 bg-white/15 rounded-full overflow-hidden"><span className="block h-full w-[92%] bg-[#C9A86A] rounded-full"/></span>
                      <span className="text-xs font-bold">92% disponible</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div {...reveal} className="rounded-[24px] bg-white border border-[#E9DDCB] overflow-hidden">
                <div className="p-5 border-b border-[#E9DDCB] flex justify-between items-center"><h3 className="font-bold">Universités partenaires</h3><span className="text-xs bg-[#F2EDE6] border border-[#E9DDCB] rounded-full px-3 py-1"><Users size={12} className="inline mr-1"/>{unis.length} actives</span></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                  {unis.map((u,i)=>(
                    <motion.div key={u.id} initial={{opacity:0, scale:0.96}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{delay:i*0.05}} className="rounded-2xl border border-[#E9DDCB] bg-[#FFFBF5] p-4 flex items-center gap-3 hover-lift">
                      <div className="h-10 w-10 rounded-xl bg-[#1B1D3B] text-[#C9A86A] flex items-center justify-center font-black text-xs">{u.sigle}</div>
                      <div className="flex-1 min-w-0"><div className="font-bold text-sm truncate">{u.nom}</div><div className="text-xs text-[#6B6575]">{u.ville} • Vérifié <span className="text-emerald-600">●</span></div></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {tab==='universites' && (
            <div className="rounded-[24px] bg-white border border-[#E9DDCB] overflow-hidden hover-lift">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E9DDCB]">
                <div>
                  <h3 className="font-bold">Gestion universités</h3>
                  <p className="text-xs text-[#6B6575]">Module ajouter université • {unis.length} partenaires • Démo front-only</p>
                </div>
                <button onClick={()=>setShowAddModal(true)} className="inline-flex items-center gap-2 rounded-full bg-[#1B1D3B] text-white px-5 py-2.5 text-sm font-bold hover:bg-[#23265a] hover:scale-[1.02] active:scale-[0.98] transition shadow"><Plus size={16}/> Ajouter université</button>
              </div>
              <div className="overflow-x-auto scrollbar-none">
                <table className="w-full text-sm min-w-[640px]">
                  <thead className="bg-[#FFFBF5] text-xs tracking-widest uppercase text-[#6B6575]"><tr><th className="text-left px-5 py-3">Sigle</th><th className="text-left px-5 py-3">Nom</th><th className="text-left px-5 py-3">Ville</th><th className="text-right px-5 py-3">Actions</th></tr></thead>
                  <tbody className="divide-y divide-[#F2EDE6]">
                    {unis.map(u=>(
                      <tr key={u.id} className="hover:bg-[#FFFBF5] transition">
                        <td className="px-5 py-4"><span className="bg-[#1B1D3B] text-[#C9A86A] px-2.5 py-1 rounded-full text-xs font-black">{u.sigle}</span></td>
                        <td className="px-5 py-4 font-medium">{u.nom}</td>
                        <td className="px-5 py-4 text-[#6B6575]">{u.ville}</td>
                        <td className="px-5 py-4 flex justify-end gap-2">
                          <button onClick={()=>showToast('Édition — démo')} className="h-8 w-8 rounded-xl bg-white border border-[#E9DDCB] flex items-center justify-center hover:bg-[#F2EDE6]"><Pencil size={14}/></button>
                          <button onClick={()=>delUni(u.id)} className="h-8 w-8 rounded-xl bg-[#7A1C1C] text-white flex items-center justify-center hover:bg-[#611616]"><Trash2 size={14}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab==='diplomes' && (
            <div className="rounded-[24px] bg-white border border-[#E9DDCB] overflow-hidden hover-lift">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E9DDCB]">
                <h3 className="font-bold">Registre global • {dips.length} diplômes</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-[#F2EDE6] border border-[#E9DDCB] px-3 py-1.5 text-xs"><Search size={12}/> Filtrer</span>
                  <button onClick={()=>showToast('Palmarès importé — démo')} className="rounded-full bg-[#C9A86A] text-[#1B1D3B] px-4 py-2 text-xs font-bold">Importer</button>
                </div>
              </div>
              <div className="hidden md:block overflow-x-auto scrollbar-none">
                <table className="w-full text-sm min-w-[760px]">
                  <thead className="bg-[#FFFBF5] text-xs tracking-widest uppercase text-[#6B6575]"><tr><th className="text-left px-5 py-3">Matricule</th><th className="text-left px-5 py-3">Diplômé</th><th className="text-left px-5 py-3">Université</th><th className="text-left px-5 py-3">Statut</th><th className="text-right px-5 py-3"></th></tr></thead>
                  <tbody className="divide-y divide-[#F2EDE6]">
                    {dips.map((d,i)=>(
                      <motion.tr key={d.matricule} initial={{opacity:0, y:6}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.02}} className="hover:bg-[#FFFBF5]">
                        <td className="px-5 py-3 mono text-xs font-bold">{d.matricule}</td>
                        <td className="px-5 py-3"><div className="font-semibold text-sm">{d.nom}</div><div className="text-xs text-[#6B6575]">{d.type}</div></td>
                        <td className="px-5 py-3"><span className="rounded-full bg-[#1B1D3B] text-white px-2 py-1 text-xs font-bold">{d.sigle}</span></td>
                        <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${d.statut==='validé' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : d.statut==='en_attente' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-red-50 border-red-200 text-red-700'}`}>{d.statut}</span></td>
                        <td className="px-5 py-3 text-right flex justify-end gap-1"><button onClick={()=>showToast('Aperçu — démo')} className="h-8 w-8 rounded-xl bg-white border border-[#E9DDCB] flex items-center justify-center"><Eye size={14}/></button><button onClick={()=>{setDips(dips.filter(x=>x.matricule!==d.matricule)); showToast('Diplôme supprimé — démo')}} className="h-8 w-8 rounded-xl bg-white border border-[#E9DDCB] hover:bg-red-50 flex items-center justify-center"><Trash2 size={14} className="text-[#7A1C1C]"/></button></td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden divide-y divide-[#F2EDE6]">
                {dips.map(d=>(
                  <div key={d.matricule} className="p-4 flex flex-col gap-1">
                    <div className="flex justify-between"><span className="mono text-xs font-bold bg-[#FFFBF5] border border-[#E9DDCB] rounded-full px-2 py-1">{d.matricule}</span><span className="text-xs font-bold">{d.sigle}</span></div>
                    <div className="font-bold">{d.nom}</div><div className="text-xs text-[#6B6575]">{d.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='employeurs' && (
            <div className="rounded-[24px] bg-white border border-[#E9DDCB] overflow-hidden hover-lift">
              <div className="p-5 border-b border-[#E9DDCB] flex justify-between items-center"><h3 className="font-bold">Employeurs • {EMPLOYEUR_VERIFS.length} comptes</h3><button onClick={()=>showToast('Invitation envoyée — démo')} className="rounded-full bg-[#1B1D3B] text-white px-4 py-2 text-xs font-bold">Inviter</button></div>
              <div className="divide-y divide-[#F2EDE6]">
                {EMPLOYEUR_VERIFS.map((e,i)=>(
                  <motion.div key={e.id} initial={{opacity:0, x:-6}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="p-4 flex items-center justify-between hover:bg-[#FFFBF5]">
                    <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-xl bg-[#1B1D3B] text-[#C9A86A] flex items-center justify-center font-bold text-xs">{e.universite.slice(0,2)}</div><div><div className="font-bold text-sm">{e.candidat}</div><div className="text-xs text-[#6B6575]">{e.diplome} • {e.date}</div></div></div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${e.statut==='validé' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : e.statut==='en_attente' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-red-50 border-red-200 text-red-700'}`}>{e.statut}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {tab==='logs' && (
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div {...reveal} className="rounded-[24px] bg-white border border-[#E9DDCB] p-6">
                <h3 className="font-bold">Journaux d’audit</h3>
                <div className="mt-4 space-y-2">
                  {[
                    "12:04 — Vérification UNIKIN-2023-88471 validée (IP 41.23.12.8)",
                    "11:42 — Tentative anomalie UOB-2021-55018 bloquée",
                    "10:18 — Admin a ajouté UNIV-UCB",
                    "09:05 — Export CSV 1 243 lignes par admin",
                  ].map((l,i)=>(
                    <motion.div key={i} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:i*0.07}} className="rounded-xl bg-[#F2EDE6] border border-[#E9DDCB] p-3 text-xs mono flex gap-2"><Clock3 size={12} className="shrink-0 mt-0.5"/>{l}</motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...reveal} className="rounded-[24px] bg-[#1B1D3B] text-white p-6 relative overflow-hidden">
                <h3 className="font-bold flex items-center gap-2"><Sparkles size={14} className="text-[#C9A86A]"/> Alertes</h3>
                <div className="mt-4 rounded-2xl bg-amber-400 text-[#1B1D3B] p-4 flex gap-3">
                  <AlertTriangle size={18} className="shrink-0"/>
                  <div className="text-sm"><div className="font-bold">Pic d’anomalies détecté</div><div className="text-xs">3 tentatives UOB en 10 min — vérification manuelle recommandée.</div></div>
                </div>
                <div className="mt-4 rounded-2xl bg-white/10 border border-white/15 p-4 backdrop-blur text-sm">
                  <div className="font-bold">Intégrité</div>
                  <div className="text-xs text-white/70">Aucune altération de bloc depuis 18 jours • Hash racine vérifié</div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && <AddUniversityModal open={showAddModal} onClose={()=>setShowAddModal(false)} onAdd={handleAddUni} />}
      </AnimatePresence>
    </div>
  )
}
