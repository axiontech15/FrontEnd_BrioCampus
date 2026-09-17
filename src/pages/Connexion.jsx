import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, Mail, Lock, Eye, EyeOff, ShieldCheck, Building2, GraduationCap, ArrowRight, Sparkles, Check, Shield, Fingerprint, Clock3, AlertCircle, ChevronRight } from 'lucide-react'
import { VeriCampusLogo } from '../components/VeriCampusLogo.jsx'

const IMG_CAMPUS_NIGHT = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
const IMG_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
const IMG_AVATAR2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
const IMG_FORM_HEADER = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"

const ROLES = [
  { id:'employeur', icon: Building2, title:'Portail Employeur', desc:'Vérifications illimitées, API RH', demo:'rh@socogenerale.cd', badge:'RH' },
  { id:'universite', icon: GraduationCap, title:'Dashboard Université', desc:'Gestion palmarès & ancrages', demo:'scolarite@unikin.ac.cd', badge:'SCOL' },
  { id:'etudiant', icon: ShieldCheck, title:'Espace Diplômé', desc:'Partage badge QR vérifié', demo:'etudiant@unikin.ac.cd', badge:'DIP' },
]

export default function Connexion({ showToast }){
  const [role, setRole] = useState('employeur')
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ email:'', password:'' })
  const [touched, setTouched] = useState({ email:false, password:false })
  const [errors, setErrors] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [remember, setRemember] = useState(true)
  const [shake, setShake] = useState(false)

  const validate = (f = form) => {
    const e = { email:'', password:'' }
    if(!f.email) e.email = 'Email requis'
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Email invalide'
    if(!f.password) e.password = 'Mot de passe requis'
    else if(f.password.length < 4) e.password = '4 caractères minimum'
    return e
  }

  const submit = (ev)=>{
    ev.preventDefault()
    const v = validate()
    setTouched({ email:true, password:true })
    setErrors(v)
    if(v.email || v.password){
      setShake(true); setTimeout(()=>setShake(false), 500)
      showToast(v.email || v.password)
      return
    }
    setLoading(true)
    setTimeout(()=>{ setLoading(false); showToast(`Connexion réussie — Bienvenue (${role}) — démo VeriCampus`); }, 1300)
  }

  const fillDemo = (r)=>{
    setRole(r)
    if(r==='employeur') setForm({email:'rh@socogenerale.cd', password:'demo1234'})
    if(r==='universite') setForm({email:'scolarite@unikin.ac.cd', password:'demo1234'})
    if(r==='etudiant') setForm({email:'etudiant@unikin.ac.cd', password:'demo1234'})
    setErrors({email:'',password:''})
    setTouched({email:false,password:false})
    showToast(`Identifiants ${r} pré-remplis — appuyez sur « Se connecter »`)
  }

  const onChange = (field, value)=>{
    const nf = { ...form, [field]: value }
    setForm(nf)
    if(touched[field]){
      const v = validate(nf)
      setErrors(prev => ({ ...prev, [field]: v[field] }))
    }
  }

  const emailValid = form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const pwdValid = form.password.length >= 4

  return (
    <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-7 items-stretch max-w-[1240px] mx-auto">
      {/* ——— Panneau gauche — identité & sélection rôle ——— */}
      <motion.div
        initial={{opacity:0, x:-14}} animate={{opacity:1,x:0}} transition={{duration:0.6, ease:[0.16,1,0.3,1]}}
        className="rounded-[32px] bg-[#1B1D3B] text-white p-7 md:p-9 flex flex-col relative overflow-hidden border border-[#2A2D5C] shadow-[0_16px_40px_rgba(27,29,59,0.22)]"
      >
        {/* bg image + gradients */}
        <img src={IMG_CAMPUS_NIGHT} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.42] pointer-events-none"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F102A] via-[#1B1D3B]/75 to-[#1B1D3B]/35 pointer-events-none"/>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{backgroundImage:'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize:'22px 22px'}}/>
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C9A86A]/20 blur-3xl pointer-events-none"/>
        <div className="absolute -left-16 bottom-24 h-56 w-56 rounded-full bg-[#7A1C1C]/18 blur-3xl pointer-events-none"/>

        <div className="relative flex flex-col flex-1">
          {/* top badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-wide backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"/>
              Système opérationnel
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-3 py-1.5 text-[11px] font-extrabold">
              <Shield size={12}/> AES-256 • SSO
            </span>
          </div>

          <h1 className="serif mt-6 text-[36px] md:text-[44px] font-bold leading-[0.9] tracking-tight">
            Ravie de vous<br/><span className="text-[#C9A86A]">revoir.</span>
          </h1>
          <p className="mt-3.5 text-[14px] leading-relaxed text-white/70 max-w-[46ch]">
            Connectez-vous à VeriCampus — registre national des diplômes.<br className="hidden md:block"/> Employeur, université ou diplômé : un seul accès sécurisé.
          </p>

          {/* role cards */}
          <div className="mt-7 grid gap-3">
            {ROLES.map((c,i)=> {
              const active = role===c.id
              return (
                <motion.button
                  key={c.role ?? c.id}
                  initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.07, duration:0.45}}
                  whileHover={{ y: active ? 0 : -1 }} whileTap={{scale:0.99}}
                  onClick={()=>fillDemo(c.id)}
                  className={`group text-left rounded-2xl border p-[1px] transition-all ${active ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]' : 'bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/15 backdrop-blur'}`}
                >
                  <div className={`rounded-[15px] p-4 flex gap-3.5 items-start ${active ? 'bg-white' : 'bg-transparent'}`}>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition ${active ? 'bg-[#1B1D3B] text-[#C9A86A] border-[#1B1D3B]' : 'bg-white/10 border-white/15 text-white group-hover:bg-white/15'}`}>
                      <c.icon size={18} />
                    </div>
                    <span className="flex-1 min-w-0">
                      <span className={`flex items-center gap-2 text-[13px] font-extrabold tracking-tight ${active ? 'text-[#1B1D3B]' : 'text-white'}`}>
                        {c.title}
                        <span className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded-full border ${active ? 'bg-[#F2EDE6] border-[#E9DDCB] text-[#7A1C1C]' : 'bg-white/10 border-white/10 text-white/70'}`}>{c.badge}</span>
                      </span>
                      <span className={`block text-xs mt-0.5 ${active ? 'text-[#6B6575]' : 'text-white/60'}`}>{c.desc}</span>
                      <span className={`mono mt-2 inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border truncate max-w-full ${active ? 'bg-[#FFFBF5] border-[#E9DDCB] text-[#1B1D3B]' : 'bg-black/20 border-white/10 text-white/80'}`}>
                        <Mail size={11} className="opacity-60 shrink-0"/> {c.demo} <span className="opacity-40">/</span> demo1234
                      </span>
                    </span>
                    <span className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition ${active ? 'bg-[#1B4A3A] border-[#1B4A3A] text-white' : 'border-white/20 text-transparent'}`}>
                      <Check size={12} strokeWidth={3}/>
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* trust */}
          <div className="mt-6 rounded-2xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-bold"><Sparkles size={16} className="text-[#C9A86A]"/> Pourquoi VeriCampus ?</div>
            <ul className="mt-2.5 grid gap-2 text-[12.5px] leading-relaxed text-white/75">
              <li className="flex gap-2"><Check size={14} className="text-emerald-300 mt-0.5 shrink-0"/> Audit trail horodaté & hash SHA-256 ancré sur blockchain</li>
              <li className="flex gap-2"><Check size={14} className="text-emerald-300 mt-0.5 shrink-0"/> Export PDF/CSV, badge LinkedIn & vérification QR hors-ligne</li>
              <li className="flex gap-2"><Check size={14} className="text-emerald-300 mt-0.5 shrink-0"/> SSO, rôles d'équipe & conformité RGPD — hébergé en RDC</li>
            </ul>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/60">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#1B1D3B] px-2.5 py-1 font-bold"><Fingerprint size={12}/> 12 483 diplômes</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 size={12}/> Vérif. &lt; 2s</span>
            </div>
          </div>

          <div className="mt-auto pt-7 flex items-center gap-3 text-xs text-white/70">
            <div className="flex -space-x-2">
              <img src={IMG_AVATAR} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-[#1B1D3B] shadow"/>
              <img src={IMG_AVATAR2} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-[#1B1D3B] shadow"/>
              <img src={IMG_FORM_HEADER} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-[#1B1D3B] shadow"/>
            </div>
            <span className="leading-tight">Besoin d'aide ? <a href="mailto:contact@vericampus.cd" className="underline decoration-white/30 underline-offset-2 hover:text-white hover:decoration-white">contact@vericampus.cd</a><br/><span className="text-white/45">Réponse &lt; 24h • Kinshasa</span></span>
          </div>
        </div>
      </motion.div>

      {/* ——— Panneau droit — formulaire ——— */}
      <motion.div
        initial={{opacity:0, x:14}} animate={{opacity:1,x:0}} transition={{duration:0.6, delay:0.08, ease:[0.16,1,0.3,1]}}
        className={`rounded-[32px] bg-white border border-[#E9DDCB] shadow-[0_16px_40px_rgba(27,29,59,0.08)] flex flex-col overflow-hidden ${shake ? 'animate-shake' : ''}`}
      >
        {/* header image */}
        <div className="relative h-[132px] shrink-0 overflow-hidden">
          <img src={IMG_FORM_HEADER} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B]/92 via-[#1B1D3B]/55 to-transparent"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"/>
          {/* pill */}
          <div className="absolute bottom-4 left-4 md:left-6 right-4 md:right-auto flex">
            <div className="bg-white rounded-2xl px-3.5 py-2.5 flex items-center gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.18)] w-full md:w-auto">
              <VeriCampusLogo size={34} withText={false} />
              <div className="text-left leading-tight">
                <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#1B1D3B]">VeriCampus</div>
                <div className="text-[11px] text-[#6B6575] font-medium">Connexion sécurisée • SSO disponible</div>
              </div>
              <span className="ml-auto md:ml-3 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"/> Live</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="serif text-[22px] md:text-[24px] font-bold text-[#1B1D3B] leading-none">Connexion VeriCampus</h2>
              <p className="text-[13px] text-[#6B6575] mt-1.5">Accédez à votre espace sécurisé — chiffrement de bout en bout.</p>
            </div>
            <Link to="/verification" className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#FFFBF5] border border-[#E9DDCB] px-3 py-1.5 text-xs font-bold text-[#7A1C1C] hover:bg-white transition shrink-0">
              Sans compte <ChevronRight size={14}/>
            </Link>
          </div>

          {/* segmented role switch */}
          <div className="mt-6 rounded-full bg-[#F2EDE6] border border-[#E9DDCB] p-1.5 flex gap-1">
            {ROLES.map(r=> {
              const active = role===r.id
              return (
                <button key={r.id} onClick={()=>setRole(r.id)} className={`relative flex-1 rounded-full px-2 py-2.5 text-xs font-extrabold tracking-wide transition ${active ? 'text-white' : 'text-[#6B6575] hover:text-[#1B1D3B]'}`}>
                  {active && <motion.div layoutId="role-pill" className="absolute inset-0 bg-[#1B1D3B] rounded-full shadow" transition={{ type:'spring', stiffness:400, damping:30 }}/>}
                  <span className="relative flex items-center justify-center gap-1.5"><r.icon size={14} className={active ? 'text-[#C9A86A]' : 'opacity-60'}/>{r.id==='universite' ? 'Université' : r.id==='employeur' ? 'Employeur' : 'Diplômé'}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-center text-[11px] text-[#9A96A6]">Astuce : cliquez une carte à gauche pour pré-remplir — démo instantanée</p>

          <form onSubmit={submit} noValidate className="mt-5 grid gap-4">
            {/* email */}
            <div>
              <label htmlFor="vc-email" className="flex items-center justify-between text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#6B6575]">
                <span>Email professionnel *</span>
                {emailValid && <span className="normal-case tracking-normal text-emerald-600 inline-flex items-center gap-1 font-bold"><Check size={12}/> Valide</span>}
              </label>
              <div className="mt-1.5 relative group">
                <Mail size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition ${errors.email && touched.email ? 'text-red-400' : emailValid ? 'text-emerald-500' : 'text-[#9A96A6] group-focus-within:text-[#C9A86A]'}`}/>
                <input
                  id="vc-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e=>onChange('email', e.target.value)}
                  onBlur={()=>{ setTouched(t=>({...t,email:true})); setErrors(validate()) }}
                  placeholder={role==='universite' ? 'scolarite@unikin.ac.cd' : role==='etudiant' ? 'etudiant@unikin.ac.cd' : 'rh@entreprise.cd'}
                  aria-invalid={!!errors.email && touched.email}
                  aria-describedby={errors.email ? 'vc-email-error' : undefined}
                  className={`w-full rounded-2xl border bg-[#FFFBF5] pl-10 pr-4 py-3.5 text-[14px] placeholder:text-[#9A96A6] outline-none transition
                    ${errors.email && touched.email
                      ? 'border-red-300 bg-red-50/40 focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-100'
                      : 'border-[#E9DDCB] focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 hover:border-[#DCCFC0]'}`}
                />
                <AnimatePresence>
                  {emailValid && (
                    <motion.span initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check size={14} strokeWidth={3}/>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {errors.email && touched.email && (
                  <motion.p id="vc-email-error" initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle size={12}/> {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="vc-pwd" className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#6B6575]">Mot de passe *</label>
                <button type="button" onClick={()=>showToast('Lien de réinitialisation envoyé (simulé) — vérifiez vos emails')} className="text-xs font-bold text-[#7A1C1C] hover:underline underline-offset-2">Mot de passe oublié ?</button>
              </div>
              <div className="mt-1.5 relative group">
                <Lock size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition ${errors.password && touched.password ? 'text-red-400' : pwdValid ? 'text-emerald-500' : 'text-[#9A96A6] group-focus-within:text-[#C9A86A]'}`}/>
                <input
                  id="vc-pwd"
                  type={showPwd?'text':'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={e=>onChange('password', e.target.value)}
                  onBlur={()=>{ setTouched(t=>({...t,password:true})); setErrors(validate()) }}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password && touched.password}
                  aria-describedby={errors.password ? 'vc-pwd-error' : undefined}
                  className={`w-full rounded-2xl border bg-[#FFFBF5] pl-10 pr-11 py-3.5 text-[14px] placeholder:text-[#9A96A6] outline-none transition
                    ${errors.password && touched.password
                      ? 'border-red-300 bg-red-50/40 focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-100'
                      : 'border-[#E9DDCB] focus:bg-white focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/20 hover:border-[#DCCFC0]'}`}
                />
                <button
                  type="button"
                  aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  onClick={()=>setShowPwd(v=>!v)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white border border-[#E9DDCB] flex items-center justify-center text-[#6B6575] hover:border-[#C9A86A] hover:text-[#1B1D3B] transition shadow-sm"
                >
                  {showPwd ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && touched.password ? (
                  <motion.p id="vc-pwd-error" initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-red-600">
                    <AlertCircle size={12}/> {errors.password}
                  </motion.p>
                ) : form.password ? (
                  <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-1.5 text-[11px] text-[#9A96A6]">
                    Astuce démo : <span className="font-mono bg-[#F2EDE6] border border-[#E9DDCB] px-1.5 py-0.5 rounded">demo1234</span>
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>

            <label className="flex items-center justify-between py-0.5 select-none">
              <span className="flex items-center gap-2.5 cursor-pointer group">
                <span className={`h-[22px] w-[38px] rounded-full p-0.5 flex items-center transition border ${remember ? 'bg-[#1B1D3B] border-[#1B1D3B] justify-end' : 'bg-[#E9DDCB] border-[#E9DDCB] justify-start'}`}>
                  <span className="h-[16px] w-[16px] rounded-full bg-white shadow block transition"/>
                </span>
                <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="sr-only"/>
                <span className="text-[13px] font-medium text-[#1B1D3B] group-hover:text-[#1B1D3B]">Rester connecté</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#9A96A6]"><Shield size={12} className="text-emerald-600"/> Session chiffrée</span>
            </label>

            <motion.button
              whileHover={{scale: loading ? 1 : 1.01}} whileTap={{scale: loading ? 1 : 0.98}}
              type="submit" disabled={loading}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1B1D3B] text-white py-[14px] text-[14px] font-extrabold hover:bg-[#23265a] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(27,29,59,0.22)] relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition duration-700 pointer-events-none"/>
              {loading
                ? <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/><span>Connexion…</span></>
                : <><LogIn size={18} className="text-[#C9A86A]"/><span>Se connecter</span><ArrowRight size={16} className="opacity-80"/></>}
            </motion.button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E9DDCB]"/></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs font-semibold text-[#9A96A6]">ou continuez avec</span></div>
            </div>

            <button type="button" onClick={()=>showToast('SSO Entreprise — bientôt disponible (SAML / OIDC)')} className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white border border-[#E9DDCB] py-3.5 text-[13px] font-bold hover:bg-[#F2EDE6] hover:border-[#DCCFC0] transition">
              <span className="h-7 w-7 rounded-full bg-[#1B1D3B] text-white flex items-center justify-center"><Building2 size={14}/></span>
              Continuer avec SSO Entreprise
              <span className="ml-1 rounded-full bg-[#F2EDE6] px-2 py-0.5 text-[10px] font-extrabold tracking-widest uppercase text-[#7A1C1C] border border-[#E9DDCB]">Bientôt</span>
            </button>

            <p className="text-center text-[13px] text-[#6B6575]">
              Pas de compte ? <Link to="/verification" className="font-extrabold text-[#7A1C1C] hover:underline underline-offset-2">Vérifier un diplôme sans créer de compte</Link>
            </p>
          </form>

          <div className="mt-auto pt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-[#9A96A6]">
            <span className="inline-flex items-center gap-1.5"><Lock size={12} className="text-emerald-600"/> Démo 100% locale</span>
            <span className="hidden sm:inline h-3 w-px bg-[#E9DDCB]"/>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-[#1B1D3B]"/> Aucune donnée envoyée</span>
            <span className="hidden sm:inline h-3 w-px bg-[#E9DDCB]"/>
            <span>RGPD • Kinshasa</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
