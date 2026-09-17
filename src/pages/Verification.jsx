import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Fingerprint, Landmark, ShieldCheck, Loader2, BadgeCheck, Clock3, AlertTriangle, Copy, QrCode, ArrowRight, Link2, Sparkles, ChevronRight } from 'lucide-react'
import { DIPLOMES, UNIVERSITES, statusConfig } from '../data/mock'

const IMG_VERIFY = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80"
const IMG_DIPLOMA_CLOSE = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"

function QrSvg({ size=140 }){
  const cells = Array.from({length:625}, (_,i)=>{
    const x=i%25, y=Math.floor(i/25)
    if((x<7&&y<7)||(x>17&&y<7)||(x<7&&y>17)) return null
    return ((x*13+y*37+11)%7)<3 ? 1:0
  })
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" className="rounded-2xl bg-white p-2 border border-[#E9DDCB] shadow-sm block shrink-0">
      <rect width="25" height="25" fill="white" rx="1"/>
      {[[0,0],[18,0],[0,18]].map(([ox,oy],k)=>(
        <g key={k}>
          <rect x={ox} y={oy} width={7} height={7} fill="#1B1D3B" rx={0.5}/>
          <rect x={ox+1} y={oy+1} width={5} height={5} fill="white"/>
          <rect x={ox+2} y={oy+2} width={3} height={3} fill="#1B1D3B"/>
        </g>
      ))}
      {cells.map((v,i)=>{
        if(v===null) return null
        const x=i%25, y=Math.floor(i/25)
        if((x<8&&y<8)||(x>16&&y<8)||(x<8&&y>16)) return null
        return v ? <rect key={i} x={x} y={y} width={1} height={1} fill="#1B1D3B"/>:null
      })}
      <rect x={11} y={11} width={3} height={3} fill="#7A1C1C" rx={0.5}/>
    </svg>
  )
}

export default function Verification({ showToast }){
  const [form, setForm] = useState({ matricule:'', universite:'', annee:'' })
  const [loading, setLoading] = useState(false)
  const [result, setResult]=useState(null)
  const [copied, setCopied]=useState(false)

  const handleVerify = (e)=>{
    e?.preventDefault()
    if(!form.matricule.trim()||!form.universite||!form.annee){ showToast('Veuillez remplir tous les champs.'); return }
    setLoading(true); setResult(null)
    setTimeout(()=>{
      const found = DIPLOMES.find(d=> d.matricule.toLowerCase()===form.matricule.trim().toLowerCase() || d.matricule.toLowerCase().includes(form.matricule.trim().toLowerCase()))
      let data=null
      if(found){
        const mismatch = (form.universite && found.universiteId!==form.universite) || (form.annee && found.annee!==form.annee)
        data = mismatch ? {...found, statut:'anomalie', mismatch:true} : found
      } else data={statut:'anomalie', notFound:true, matricule:form.matricule}
      setResult(data); setLoading(false)
      setTimeout(()=>document.getElementById('verif-result')?.scrollIntoView({behavior:'smooth', block:'start'}),80)
    },1500)
  }

  const useExample=(d)=> {
    setForm({matricule:d.matricule, universite:d.universiteId, annee:d.annee})
    window.scrollTo({top:0, behavior:'smooth'})
    setTimeout(()=>document.getElementById('verif-form')?.scrollIntoView({behavior:'smooth', block:'start'}),100)
  }

  const ResultCard=()=>{
    if(!result) return null
    const isValide=result.statut==='validé', isAttente=result.statut==='en_attente'
    const wrap = (el) => <motion.div initial={{opacity:0, y:10, scale:0.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.45, ease:[0.16,1,0.3,1]}}>{el}</motion.div>
    if(isValide) return wrap(
      <div id="verif-result" className="rounded-[20px] md:rounded-[24px] border border-[#B7DDC9] bg-[#F4FAF6] p-4 sm:p-6 md:p-7 shadow-sm animate-scaleIn">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="hidden sm:flex h-11 w-11 rounded-full bg-[#1B4A3A] text-white items-center justify-center shadow shrink-0 animate-float"><BadgeCheck size={22}/></div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1B4A3A] text-white px-3 py-1.5 text-xs font-bold shadow"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"/> Validé • Blockchain confirmée</span>
              <span className="text-xs text-[#6B6575] whitespace-nowrap">Bloc #{result.blockHeight}</span>
            </div>
            <h3 className="serif mt-3 text-base sm:text-[19px] font-bold text-[#1B1D3B] leading-tight">{result.nom}</h3>
            <p className="text-xs sm:text-sm text-[#3A3850] mt-1 leading-relaxed">{result.type} — {result.filiere} • {result.universite} • {result.annee} • {result.mention}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
              <div className="rounded-xl bg-white border border-[#E9DDCB] p-3 shadow-sm hover-lift"><div className="text-[#6B6575] text-xs">Matricule</div><div className="mono font-semibold text-sm mt-0.5 break-all">{result.matricule}</div></div>
              <div className="rounded-xl bg-white border border-[#E9DDCB] p-3 shadow-sm hover-lift"><div className="text-[#6B6575] text-xs">Hash tronqué</div><div className="mono font-semibold flex items-center gap-1.5 text-sm mt-0.5">{result.hash} <button onClick={()=>{navigator.clipboard.writeText(result.hashFull); setCopied(true); setTimeout(()=>setCopied(false),1200)}} className="p-1.5 hover:bg-[#F2EDE6] rounded shrink-0 transition hover:scale-110"><Copy size={12}/></button>{copied && <span className="text-[#1B4A3A] text-xs animate-fadeIn">copié</span>}</div></div>
              <div className="rounded-xl bg-white border border-[#E9DDCB] p-3 shadow-sm hover-lift"><div className="text-[#6B6575] text-xs">Émis le</div><div className="font-semibold text-sm mt-0.5">{result.dateEmission}</div></div>
            </div>
            <div className="mt-4 flex flex-col xs:flex-row flex-wrap gap-2">
              <Link to="/badge" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B1D3B] text-white px-5 py-3 text-sm font-bold hover:bg-[#23265a] shadow w-full xs:w-auto hover:scale-[1.02] active:scale-[0.98] transition"><QrCode size={16}/> Voir le badge <ArrowRight size={14}/></Link>
              <button onClick={()=>showToast('Lien copié')} className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#E9DDCB] px-4 py-3 text-sm font-medium hover:bg-[#F2EDE6] w-full xs:w-auto transition hover:scale-[1.02]"><Link2 size={16}/> Partager</button>
            </div>
          </div>
          <div className="hidden sm:block shrink-0 animate-float"><QrSvg size={108}/></div>
          <div className="sm:hidden flex justify-center pt-2 animate-float"><QrSvg size={140}/></div>
        </div>
      </div>
    )
    if(isAttente) return wrap(
      <div id="verif-result" className="rounded-[20px] md:rounded-[24px] border border-[#E9DDCB] bg-[#FFFBF5] p-4 sm:p-6 shadow-sm animate-slideUp">
        <div className="flex gap-3 sm:gap-4"><div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#C9A86A] text-white flex items-center justify-center shadow shrink-0 animate-pulse"><Clock3 size={20}/></div><div className="min-w-0"><h3 className="font-bold text-sm sm:text-base">En attente de certification</h3><p className="text-xs sm:text-sm text-[#3A3850] mt-1 leading-relaxed">Le diplôme de <b>{result.nom}</b> existe mais n'a pas encore été ancré par l'université.</p></div></div>
      </div>
    )
    return wrap(
      <div id="verif-result" className="rounded-[20px] md:rounded-[24px] border border-[#E8B4B4] bg-[#FFF5F5] p-4 sm:p-6 shadow-sm animate-slideUp">
        <div className="flex gap-3 sm:gap-4"><div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#7A1C1C] text-white flex items-center justify-center shadow shrink-0"><AlertTriangle size={20}/></div><div className="flex-1 min-w-0"><h3 className="font-bold text-sm sm:text-base">Anomalie — aucune correspondance</h3>{result.notFound ? <p className="text-xs sm:text-sm mt-1 leading-relaxed">Aucun diplôme pour <span className="mono font-semibold break-all">{result.matricule}</span>.</p> : result.mismatch ? <p className="text-xs sm:text-sm mt-1 leading-relaxed">Matricule existant mais université/année ne correspondent pas.</p> : <p className="text-xs sm:text-sm mt-1">Hash invalide ou révoqué.</p>}<div className="mt-3 inline-flex items-center gap-2 text-xs font-medium bg-white border border-[#E8B4B4] text-[#7A1C1C] rounded-full px-3 py-1.5 shadow-sm"><Fingerprint size={14}/> Empreinte non retrouvée</div></div></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Bannière - responsive */}
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="rounded-[20px] md:rounded-[24px] overflow-hidden border border-[#E9DDCB] relative shadow-sm">
        <img src={IMG_VERIFY} alt="Vérification VeriCampus" className="absolute inset-0 w-full h-full object-cover block"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B]/90 via-[#1B1D3B]/70 to-[#1B1D3B]/20 sm:to-[#1B1D3B]/15"/>
        <div className="relative p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-white">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/70 flex-wrap"><Link to="/" className="hover:text-white">Accueil</Link><ChevronRight size={12} className="text-[#C9A86A] shrink-0"/><span className="text-white font-semibold">Vérification diplôme</span><span className="hidden sm:inline-flex ml-2 items-center gap-1 rounded-full bg-white/15 border border-white/20 px-2.5 py-1 text-[11px] backdrop-blur">Gratuit • Sans compte</span></div>
            <h1 className="serif mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold drop-shadow leading-tight">Vérifiez un diplôme <span className="text-[#C9A86A]">en 2 secondes</span></h1>
            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">Preuve QR infalsifiable VeriCampus • AES-256 • RGPD</p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-white/95 backdrop-blur rounded-2xl p-3 shadow-lg shrink-0 animate-float">
            <img src={IMG_DIPLOMA_CLOSE} alt="Diplôme exemple" className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover border border-[#E9DDCB] shadow block"/>
            <div className="text-xs leading-tight pr-2 text-[#1B1D3B] whitespace-nowrap"><div className="font-bold">Besoin d'aide ?</div><div className="text-[#6B6575]">contact@vericampus.cd</div></div>
          </div>
        </div>
      </motion.div>

      {/* Layout principal - 1 col mobile, 2 cols desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 md:gap-6 items-start">
        {/* Formulaire */}
        <motion.div id="verif-form" initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.08}} className="rounded-[20px] md:rounded-[24px] bg-white border border-[#E9DDCB] shadow-sm p-4 sm:p-6 md:p-7 hover-lift">
          <div className="flex items-start gap-3">
            <span className="hidden sm:flex h-8 w-8 rounded-xl bg-[#1B1D3B] text-[#C9A86A] items-center justify-center shadow shrink-0"><Search size={14}/></span>
            <div className="min-w-0">
              <h2 className="serif text-lg sm:text-[22px] font-bold text-[#1B1D3B] leading-tight">Vérification publique</h2>
              <p className="text-xs sm:text-sm text-[#6B6575] mt-1 leading-relaxed">Saisie exacte du diplôme. Simulation <span className="mono bg-[#F2EDE6] border border-[#E9DDCB] rounded px-1.5 py-0.5 text-xs break-all">/api/verifyDiploma</span></p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="mt-4 sm:mt-6 grid gap-3 sm:gap-4">
            <div>
              <label className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#6B6575]">Matricule étudiant *</label>
              <div className="mt-1.5 relative">
                <Fingerprint size={16} className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-[#9A96A6] pointer-events-none"/>
                <input value={form.matricule} onChange={e=>setForm({...form, matricule:e.target.value})} placeholder="ex. UNIKIN-2023-88471" className="w-full rounded-xl sm:rounded-2xl border border-[#E9DDCB] bg-[#FFFBF5] pl-9 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm font-medium placeholder:text-[#9A96A6] focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 outline-none"/>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#6B6575]">Université *</label>
                <div className="mt-1.5 relative">
                  <Landmark size={16} className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-[#9A96A6] pointer-events-none"/>
                  <select value={form.universite} onChange={e=>setForm({...form, universite:e.target.value})} className="w-full rounded-xl sm:rounded-2xl border border-[#E9DDCB] bg-[#FFFBF5] pl-9 sm:pl-10 pr-8 py-3 sm:py-3.5 text-sm font-medium focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 outline-none">
                    <option value="">Sélectionner</option>
                    {UNIVERSITES.map(u=> <option key={u.id} value={u.id}>{u.sigle} — {u.nom}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#6B6575]">Année *</label>
                <select value={form.annee} onChange={e=>setForm({...form, annee:e.target.value})} className="w-full rounded-xl sm:rounded-2xl border border-[#E9DDCB] bg-[#FFFBF5] px-3 sm:px-4 py-3 sm:py-3.5 text-sm font-medium focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 outline-none">
                  <option value="">Année</option>
                  {[2023,2022,2021,2020,2019].map(a=> <option key={a} value={String(a)}>{a}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#1B1D3B] px-5 sm:px-6 py-3.5 sm:py-4 text-sm font-bold text-white hover:bg-[#23265a] disabled:opacity-60 shadow-lg w-full">
              {loading ? <><Loader2 size={18} className="animate-spin shrink-0"/> <span className="truncate">Vérification blockchain…</span></> : <> <ShieldCheck size={18} className="text-[#C9A86A] shrink-0"/> <span>Vérifier l'authenticité</span> <ArrowRight size={16} className="shrink-0 hidden xs:inline"/></>}
            </button>
            <div className="text-[11px] sm:text-xs text-[#6B6575] text-center sm:text-left">Réponse &lt; 2s • AES-256 • RGPD • Aucune donnée conservée</div>
          </form>

          <AnimatePresence>
          {loading && <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="mt-5 sm:mt-6 rounded-xl sm:rounded-2xl border border-[#E9DDCB] bg-[#F2EDE6] p-3 sm:p-4 overflow-hidden"><div className="flex items-center gap-2 text-xs sm:text-sm font-medium"><Loader2 size={16} className="animate-spin text-[#1B1D3B] shrink-0"/> <span>Contrôle du hash • Vérification du sceau…</span></div><div className="mt-3 h-2 rounded-full bg-white overflow-hidden shimmer-bar"><div className="h-full w-1/2 bg-[#C9A86A] rounded-full"/></div><img src={IMG_DIPLOMA_CLOSE} alt="" className="mt-3 h-16 sm:h-20 w-full object-cover rounded-xl border border-[#E9DDCB] opacity-60 block"/></motion.div>}
          </AnimatePresence>
          <AnimatePresence>
          {!loading && result && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-5 sm:mt-6">{ResultCard()}</motion.div>}
          </AnimatePresence>
        </motion.div>

        {/* Sidebar */}
        <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.16}} className="space-y-4">
          {/* Exemples - horizontal scroll sur mobile, vertical desktop */}
          <div className="rounded-[20px] md:rounded-[24px] overflow-hidden bg-white border border-[#E9DDCB] shadow-sm hover-lift">
            <div className="relative overflow-hidden">
              <img src={IMG_DIPLOMA_CLOSE} alt="Diplôme VeriCampus" className="h-28 sm:h-32 md:h-36 w-full object-cover block hover:scale-[1.03] transition duration-700"/>
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold shadow">4 exemples • 3 états</div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-sm font-bold flex items-center gap-2"><Sparkles size={16} className="text-[#C9A86A] shrink-0"/> Exemples <span className="hidden sm:inline">(cliquez)</span></h3>
              <p className="text-xs text-[#6B6575] mt-1 hidden sm:block">4 cas pour tester les 3 états VeriCampus.</p>
              <p className="text-xs text-[#6B6575] mt-1 sm:hidden whitespace-nowrap overflow-hidden text-ellipsis">Tapez pour remplir — 4 cas</p>
              {/* Mobile: scroll horizontal */}
              <div className="mt-4 flex sm:grid gap-2.5 overflow-x-auto sm:overflow-visible scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0 snap-x snap-mandatory">
                {DIPLOMES.map((d,i)=>{
                  const cfg=statusConfig[d.statut]
                  return (
                    <motion.button key={d.matricule} initial={{opacity:0, x:10}} animate={{opacity:1,x:0}} transition={{delay:i*0.07}} whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>useExample(d)} className="text-left rounded-2xl border border-[#E9DDCB] bg-[#FFFBF5] hover:bg-white hover:shadow-sm p-3 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition shrink-0 sm:shrink w-[280px] sm:w-auto snap-start">
                      <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot} shrink-0`}/>
                      <span className="flex-1 min-w-0"><span className="block text-xs sm:text-sm font-semibold truncate">{d.matricule}</span><span className="block text-[11px] sm:text-xs text-[#6B6575] truncate">{d.nom} • {d.sigle} {d.annee}</span></span>
                      <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full border ${cfg.badge} shrink-0 whitespace-nowrap`}>{cfg.label}</span>
                    </motion.button>
                  )
                })}
              </div>
              <p className="mt-3 text-[11px] text-[#6B6575] hidden sm:block">Astuce : changez l'année pour provoquer une <b>Anomalie</b>.</p>
            </div>
          </div>

          <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2}} className="rounded-[20px] md:rounded-[24px] bg-[#1B1D3B] text-white p-5 sm:p-6 relative overflow-hidden shadow-sm hover-lift">
            <img src={IMG_VERIFY} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 block"/>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B1D3B] to-[#1B1D3B]/80"/>
            <div className="relative">
              <h3 className="serif font-bold text-base sm:text-lg">Comment ça marche ?</h3>
              <ol className="mt-3 sm:mt-4 grid gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/80">
                <li className="flex gap-3 items-start"><span className="h-7 w-7 rounded-xl bg-[#C9A86A] text-[#1B1D3B] flex items-center justify-center text-xs font-extrabold shadow shrink-0">1</span><span className="leading-relaxed"><b className="text-white">Saisie</b> — l'université a ancré l'empreinte SHA-256.</span></li>
                <li className="flex gap-3 items-start"><span className="h-7 w-7 rounded-xl bg-[#C9A86A] text-[#1B1D3B] flex items-center justify-center text-xs font-extrabold shadow shrink-0">2</span><span className="leading-relaxed"><b className="text-white">Vérif</b> — comparaison blockchain + registre VeriCampus.</span></li>
                <li className="flex gap-3 items-start"><span className="h-7 w-7 rounded-xl bg-[#C9A86A] text-[#1B1D3B] flex items-center justify-center text-xs font-extrabold shadow shrink-0">3</span><span className="leading-relaxed"><b className="text-white">Preuve</b> — badge QR horodaté partageable en 1 clic.</span></li>
              </ol>
              <Link to="/badge" className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C9A86A] hover:text-white group">Voir un badge exemple <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition"/></Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
