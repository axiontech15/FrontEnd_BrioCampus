import { useState, useEffect } from 'react'
import {
  Shield,
  ShieldCheck,
  Search,
  GraduationCap,
  Building2,
  LayoutDashboard,
  BadgeCheck,
  QrCode,
  Lock,
  FileCheck2,
  AlertTriangle,
  Clock3,
  Download,
  Sparkles,
  ArrowRight,
  Check,
  ChevronRight,
  Fingerprint,
  Globe,
  Users,
  Award,
  Link2,
  Copy,
  ExternalLink,
  Loader2,
  UploadCloud,
  Landmark,
  Briefcase,
} from 'lucide-react'

// ── MOCK DATA ───────────────────────────────────────────────────────────────
const UNIVERSITES = [
  { id: 'unikin', nom: 'Université de Kinshasa', sigle: 'UNIKIN', ville: 'Kinshasa' },
  { id: 'upc', nom: 'Université Protestante au Congo', sigle: 'UPC', ville: 'Kinshasa' },
  { id: 'unilu', nom: 'Université de Lubumbashi', sigle: 'UNILU', ville: 'Lubumbashi' },
  { id: 'uob', nom: 'Université Officielle de Bukavu', sigle: 'UOB', ville: 'Bukavu' },
  { id: 'unikis', nom: 'Université de Kisangani', sigle: 'UNIKIS', ville: 'Kisangani' },
]

const DIPLOMES = [
  {
    matricule: 'UNIKIN-2023-88471',
    nom: 'MUKENDI Tshimanga Grâce',
    universiteId: 'unikin',
    universite: 'Université de Kinshasa',
    sigle: 'UNIKIN',
    type: 'Licence en Informatique',
    filiere: 'Génie Logiciel',
    annee: '2023',
    statut: 'validé',
    mention: 'Distinction',
    hash: '0x8f3a…c91e4b2d',
    hashFull: '0x8f3a9d12e44c91e4b2d7a6f00bc123e89a5f6d71',
    dateEmission: '15 Juillet 2023',
    blockHeight: '14 882 431',
  },
  {
    matricule: 'UPC-2022-41290',
    nom: 'KABASELE Mwamba Daniel',
    universiteId: 'upc',
    universite: 'Université Protestante au Congo',
    sigle: 'UPC',
    type: 'Master en Droit Économique',
    filiere: 'Droit des Affaires',
    annee: '2022',
    statut: 'validé',
    mention: 'Grande Distinction',
    hash: '0x1b7e…9a03f8c1',
    hashFull: '0x1b7ef0449a03f8c1882d5e9a0c7b3d4e5f6a7b8c',
    dateEmission: '28 Septembre 2022',
    blockHeight: '14 102 903',
  },
  {
    matricule: 'UNILU-2023-11903',
    nom: 'ILUNGA Kalonji Sarah',
    universiteId: 'unilu',
    universite: 'Université de Lubumbashi',
    sigle: 'UNILU',
    type: 'Licence en Médecine',
    filiere: 'Médecine Générale',
    annee: '2023',
    statut: 'en_attente',
    mention: '—',
    hash: '0x4d22…f1a0b77e',
    hashFull: '0x4d22a9c3f1a0b77e88cc112233445566778899',
    dateEmission: '—',
    blockHeight: '—',
  },
  {
    matricule: 'UOB-2021-55018',
    nom: 'BAHATI Ngoy Patrick',
    universiteId: 'uob',
    universite: 'Université Officielle de Bukavu',
    sigle: 'UOB',
    type: 'Licence en Économie',
    filiere: 'Gestion Financière',
    annee: '2021',
    statut: 'anomalie',
    mention: '—',
    hash: '0x9c01…3e7d2a99',
    hashFull: '0x9c012b3e7d2a99887766554433221100ffeedd',
    dateEmission: '—',
    blockHeight: '—',
  },
]

const EMPLOYEUR_VERIFICATIONS = [
  { id: 1, candidat: 'MUKENDI T. Grâce', universite: 'UNIKIN', diplome: 'Licence Informatique', date: '28 Août 2026', statut: 'validé' },
  { id: 2, candidat: 'KABASELE M. Daniel', universite: 'UPC', diplome: 'Master Droit Éco.', date: '27 Août 2026', statut: 'validé' },
  { id: 3, candidat: 'ILUNGA K. Sarah', universite: 'UNILU', diplome: 'Licence Médecine', date: '26 Août 2026', statut: 'en_attente' },
  { id: 4, candidat: 'BAHATI N. Patrick', universite: 'UOB', diplome: 'Licence Économie', date: '24 Août 2026', statut: 'anomalie' },
  { id: 5, candidat: 'LUKUSA Jean-Marc', universite: 'UNIKIS', diplome: 'Licence Agronomie', date: '22 Août 2026', statut: 'validé' },
]

const STATS_UNIV = {
  total: 12483,
  valides: 11842,
  attente: 412,
  anomalies: 229,
}

// ── Helpers ───────────────────────────────────────────────────────────────
const statusConfig = {
  validé: { label: 'Validé', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: BadgeCheck },
  en_attente: { label: 'En attente', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock3 },
  anomalie: { label: 'Anomalie détectée', dot: 'bg-red-500', badge: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
}

// Fake QR SVG grid (25x25)
function QrSvg({ size = 140 }) {
  const pattern = [
    1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,0,0,1,0,1,
    1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,1,0,1,1,0,
  ]
  // generate deterministic squares
  const cells = Array.from({ length: 25*25 }, (_, i) => {
    if (i < pattern.length) return pattern[i]
    // pseudo random but stable
    const x = i % 25, y = Math.floor(i/25)
    if ((x<7 && y<7) || (x>17 && y<7) || (x<7 && y>17)) return null // corners handled separately
    const v = ( (x*13 + y*37 + 11) % 7) < 3 ? 1:0
    return v
  })
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" className="rounded-xl bg-white p-2 shadow-sm border border-slate-200">
      <rect width="25" height="25" fill="white" rx="1" />
      {/* corner finders */}
      {[ [0,0], [18,0], [0,18] ].map(([ox,oy],k)=>(
        <g key={k}>
          <rect x={ox} y={oy} width={7} height={7} fill="#0f2a44" rx={0.5}/>
          <rect x={ox+1} y={oy+1} width={5} height={5} fill="white"/>
          <rect x={ox+2} y={oy+2} width={3} height={3} fill="#0f2a44"/>
        </g>
      ))}
      {cells.map((v,i)=>{
        if (v===null) return null
        const x=i%25, y=Math.floor(i/25)
        if ((x<8 && y<8) || (x>16 && y<8) || (x<8 && y>16)) return null
        return v ? <rect key={i} x={x} y={y} width={1} height={1} fill="#0f2a44" /> : null
      })}
      {/* center dot branding */}
      <rect x={11} y={11} width={3} height={3} fill="#10b981" rx={0.5}/>
    </svg>
  )
}

export default function VerifDiplome() {
  const [activeTab, setActiveTab] = useState('accueil') // accueil | employeur | universite | badge
  const [form, setForm] = useState({ matricule: '', universite: '', annee: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null) // null | diplome+statut | {statut:'not_found'}
  const [importLoading, setImportLoading] = useState(false)
  const [importDone, setImportDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)

  // pré-remplir un exemple pour la démo
  useEffect(()=>{
    // optional: setForm({matricule:'UNIKIN-2023-88471', universite:'unikin', annee:'2023'})
  },[])

  const showToast = (msg)=>{ setToast(msg); setTimeout(()=>setToast(null),2800) }

  const handleVerify = (e) => {
    e?.preventDefault()
    if (!form.matricule.trim() || !form.universite || !form.annee) {
      showToast('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    setResult(null)
    // simuler /api/verifyDiploma
    setTimeout(()=>{
      const found = DIPLOMES.find(d =>
        d.matricule.toLowerCase() === form.matricule.trim().toLowerCase() ||
        d.matricule.toLowerCase().includes(form.matricule.trim().toLowerCase())
      )
      // si trouvé mais université/année ne matchent pas => anomalie simulée
      let data = null
      if (found) {
        const mismatch = (form.universite && found.universiteId !== form.universite) || (form.annee && found.annee !== form.annee)
        data = mismatch ? { ...found, statut: 'anomalie', mismatch: true } : found
      } else {
        // si saisie inconnue -> anomalie
        data = { statut: 'anomalie', notFound: true, matricule: form.matricule }
      }
      setResult(data)
      setLoading(false)
      // scroll vers résultat
      setTimeout(()=>document.getElementById('verif-result')?.scrollIntoView({behavior:'smooth', block:'center'}), 100)
    }, 1600)
  }

  const useExample = (d)=>{
    setForm({ matricule: d.matricule, universite: d.universiteId, annee: d.annee })
    setActiveTab('accueil')
    setTimeout(()=>document.getElementById('verif-form')?.scrollIntoView({behavior:'smooth'}),50)
  }

  const handleImport = ()=>{
    setImportLoading(true)
    setImportDone(false)
    setTimeout(()=>{ setImportLoading(false); setImportDone(true); showToast('Palmarès importé — 312 diplômes ajoutés'); }, 1800)
  }

  const resultCard = ()=>{
    if (!result) return null
    const cfg = statusConfig[result.statut]
    const Icon = cfg.icon
    const isValide = result.statut === 'validé'
    const isAttente = result.statut === 'en_attente'
    const isAnom = result.statut === 'anomalie'

    return (
      <div id="verif-result" className="mt-6">
        {isValide && (
          <div className="rounded-[20px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow"><BadgeCheck size={22}/></div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border bg-emerald-600 text-white px-3 py-1 text-xs font-semibold"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"/> Validé • Blockchain confirmée</span>
                  <span className="text-xs text-slate-500">Bloc #{result.blockHeight}</span>
                </div>
                <h3 className="mt-3 text-[17px] font-bold text-slate-900">{result.nom}</h3>
                <p className="text-sm text-slate-600">{result.type} — <span className="font-medium">{result.filiere}</span> • {result.universite} • {result.annee} • Mention {result.mention}</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="text-slate-500">Matricule</div><div className="font-mono font-semibold text-slate-900">{result.matricule}</div></div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="text-slate-500">Hash tronqué</div><div className="font-mono font-semibold text-slate-900 flex items-center gap-2">{result.hash} <button onClick={()=>{navigator.clipboard.writeText(result.hashFull); setCopied(true); setTimeout(()=>setCopied(false),1500)}} className="p-1 rounded hover:bg-slate-100"><Copy size={12}/></button>{copied && <span className="text-emerald-600">copié</span>}</div></div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="text-slate-500">Date d'émission</div><div className="font-semibold text-slate-900">{result.dateEmission}</div></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={()=>setActiveTab('badge')} className="inline-flex items-center gap-2 rounded-full bg-[#0f2a44] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#14365a] transition"><QrCode size={16}/> Voir le badge vérifié <ArrowRight size={14}/></button>
                  <button onClick={()=>showToast('Lien de partage copié')} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"><Link2 size={16}/> Partager</button>
                </div>
              </div>
              <div className="hidden md:block"><QrSvg size={118} /></div>
            </div>
          </div>
        )}
        {isAttente && (
          <div className="rounded-[20px] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 md:p-7">
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-full bg-amber-500 text-white flex items-center justify-center"><Clock3 size={22}/></div>
              <div>
                <h3 className="font-bold text-slate-900">Diplôme en attente de certification</h3>
                <p className="text-sm text-slate-600 mt-1">Le diplôme de <span className="font-semibold">{result.nom}</span> ({result.matricule}) a bien été trouvé mais n'a pas encore été ancré sur la blockchain par l'université.</p>
                <p className="text-xs text-slate-500 mt-3">Réf. interne : {result.hash} • Vérifiez auprès de la scolarité.</p>
              </div>
            </div>
          </div>
        )}
        {isAnom && (
          <div className="rounded-[20px] border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 md:p-7">
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-full bg-red-600 text-white flex items-center justify-center"><AlertTriangle size={22}/></div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">Anomalie — aucune correspondance</h3>
                {result.notFound ? (
                  <p className="text-sm text-slate-600 mt-1">Aucun diplôme ne correspond au matricule <span className="font-mono font-semibold">{result.matricule}</span> avec les critères saisis. Vérifiez l'orthographe ou contactez l'université émettrice.</p>
                ) : result.mismatch ? (
                  <p className="text-sm text-slate-600 mt-1">Le matricule existe mais l'université ou l'année ne correspondent pas aux registres. Possibles incohérences — contrôle manuel recommandé.</p>
                ) : (
                  <p className="text-sm text-slate-600 mt-1">Le document présente une incohérence de hash ou a été révoqué.</p>
                )}
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-red-700 bg-white border border-red-200 rounded-full px-3 py-1.5"><Fingerprint size={14}/> Empreinte non retrouvée sur la chaîne</div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const NavItem = ({ id, icon:Icon, label, desc }) => (
    <button onClick={()=>setActiveTab(id)} className={`relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left transition w-full md:w-auto ${activeTab===id ? 'bg-[#0f2a44] text-white shadow' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
      <span className={`h-8 w-8 rounded-xl flex items-center justify-center ${activeTab===id ? 'bg-white/15' : 'bg-slate-900/[0.06]'}`}><Icon size={16}/></span>
      <span className="leading-tight">
        <span className="block text-[13px] font-semibold">{label}</span>
        <span className={`block text-[11px] ${activeTab===id ? 'text-white/70' : 'text-slate-500'}`}>{desc}</span>
      </span>
    </button>
  )

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-900 selection:bg-emerald-100">
      {/* Top trust bar */}
      <div className="hidden md:block bg-[#0b1e33] text-white/80 text-[12px]">
        <div className="mx-auto max-w-[1220px] px-6 py-2 flex items-center justify-between">
          <span className="flex items-center gap-2"><Lock size={12} className="text-emerald-400"/> Plateforme sécurisée • Chiffrement AES-256 • Ancrage blockchain</span>
          <span className="flex items-center gap-4"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"/> Chaîne synchronisée</span><span className="hidden lg:inline">Support : contact@verifdiplome.cd</span></span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-[1220px] px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0f2a44] flex items-center justify-center text-white shadow-sm">
              <ShieldCheck size={20} className="text-emerald-300"/>
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight text-[19px] flex items-baseline gap-1"><span className="text-[#0f2a44]">Verif</span><span className="text-emerald-600">Diplôme</span><span className="ml-1 inline-flex items-center rounded-full bg-amber-400 text-[#0f2a44] px-1.5 py-0.5 text-[9px] font-bold tracking-widest">RDC</span></div>
              <div className="text-[11px] tracking-[0.14em] font-semibold text-slate-500 uppercase">Blockchain • QR Code • Confiance</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5"><Landmark size={14} className="text-slate-700"/> 5 universités partenaires</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5"><FileCheck2 size={14} className="text-emerald-600"/> 12 483 diplômes ancrés</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={()=>showToast('Connexion bientôt disponible')} className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">Se connecter</button>
            <button onClick={()=>setActiveTab('accueil')} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm">Vérifier un diplôme <ArrowRight size={14}/></button>
          </div>
        </div>
        {/* nav tabs */}
        <div className="mx-auto max-w-[1220px] px-4 md:px-6 pb-3">
          <nav className="flex gap-2 overflow-x-auto scrollbar-none flex-nowrap md:flex-wrap">
            <NavItem id="accueil" icon={Search} label="Vérification publique" desc="Accueil • Gratuit" />
            <NavItem id="employeur" icon={Briefcase} label="Portail Employeur" desc="Recrutement" />
            <NavItem id="universite" icon={LayoutDashboard} label="Dashboard Université" desc="UNIKIN • Admin" />
            <NavItem id="badge" icon={QrCode} label="Badge & QR" desc="Export officiel" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1220px] px-4 md:px-6 py-6 md:py-8">
        {/* ACCUEIL */}
        {activeTab==='accueil' && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
              <div className="rounded-[28px] bg-[#0f2a44] text-white p-7 md:p-10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent pointer-events-none"/>
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"/>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs backdrop-blur"><Shield size={14} className="text-emerald-300"/> Certifié par la blockchain • Infalsifiable <span className="hidden sm:inline">• Reconnu par les banques & entreprises</span></div>
                  <h1 className="mt-5 text-[32px] md:text-[42px] font-black leading-[0.95] tracking-tight">Vérifiez un diplôme<br/><span className="text-emerald-300">en quelques secondes.</span></h1>
                  <p className="mt-4 text-white/70 text-[15px] leading-relaxed max-w-[58ch]">Finies les semaines d'attente et les faux diplômes. VerifDiplôme croise instantanément le matricule, l'université et la blockchain pour délivrer une preuve vérifiable par QR code.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-4 py-2.5 text-sm font-semibold"><BadgeCheck size={16} className="text-emerald-600"/> Taux de fraude détectée : 18,4%</div>
                    <div className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 px-4 py-2.5 text-sm"><Clock3 size={16}/> Réponse moyenne &lt; 2s</div>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-4 max-w-[520px]">
                    {[
                      {k:'Vérifications', v:'47 291'},
                      {k:'Entreprises', v:'312'},
                      {k:'Satisfaction', v:'4.9/5'},
                    ].map(s=>(
                      <div key={s.k} className="rounded-2xl bg-white/10 border border-white/10 p-3 text-center backdrop-blur">
                        <div className="text-lg font-black">{s.v}</div>
                        <div className="text-[11px] tracking-widest uppercase text-white/60">{s.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right trust cards */}
              <div className="grid gap-4">
                <div className="rounded-[24px] bg-white border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200"><Award size={18}/></div>
                    <div><div className="text-sm font-bold">Preuve opposable</div><div className="text-xs text-slate-500">Hash + horodatage immuable</div></div>
                    <span className="ml-auto text-[11px] font-semibold tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">LIVE</span>
                  </div>
                  <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4 font-mono text-xs leading-relaxed">
                    <div className="flex items-center gap-2 text-slate-500"><Fingerprint size={12}/> Empreinte blockchain</div>
                    <div className="mt-1 text-slate-900 break-all">0x8f3a 9d12 e44c 91e4 b2d7 a6f0 0bc1 23e8 …</div>
                    <div className="mt-2 flex items-center gap-2 text-emerald-700 font-semibold"><Check size={12}/> Confirmé au bloc #14 882 431</div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <span className="rounded-full bg-slate-900 text-white px-2 py-1.5 font-medium">SHA-256</span>
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1.5">IPFS</span>
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1.5">QR v3</span>
                  </div>
                </div>
                <div className="rounded-[24px] bg-gradient-to-br from-amber-400 to-yellow-300 p-6 text-[#0f2a44] relative overflow-hidden">
                  <Sparkles className="absolute -right-6 -top-6 opacity-20" size={96}/>
                  <div className="relative">
                    <div className="text-xs font-bold tracking-widest uppercase opacity-70">Partenaires institutionnels</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {UNIVERSITES.slice(0,4).map(u=>(
                        <span key={u.id} className="rounded-full bg-[#0f2a44] text-white px-3 py-1.5 text-xs font-semibold">{u.sigle}</span>
                      ))}
                      <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold">+1</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium"><Globe size={16}/> Reconnu par la Banque Centrale & Juri-Afrik <ChevronRight size={14}/></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form + examples */}
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
              <div id="verif-form" className="rounded-[24px] bg-white border border-slate-200 shadow-sm p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold flex items-center gap-2"><span className="h-8 w-8 rounded-xl bg-[#0f2a44] text-white flex items-center justify-center"><Search size={14}/></span> Vérification publique</h2>
                    <p className="text-sm text-slate-500 mt-1">Saisissez les informations exactes figurant sur le diplôme. Aucune donnée n'est conservée.</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs"><Lock size={12}/> RGPD • Aucun tracking</span>
                </div>

                <form onSubmit={handleVerify} className="mt-6 grid gap-4">
                  <div>
                    <label className="text-xs font-semibold tracking-widest uppercase text-slate-600">Matricule étudiant *</label>
                    <div className="mt-1.5 relative">
                      <Fingerprint size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input value={form.matricule} onChange={e=>setForm({...form, matricule:e.target.value})} placeholder="ex. UNIKIN-2023-88471" className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3.5 text-sm font-medium placeholder:text-slate-400 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition"/>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold tracking-widest uppercase text-slate-600">Université *</label>
                      <div className="mt-1.5 relative">
                        <Landmark size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <select value={form.universite} onChange={e=>setForm({...form, universite:e.target.value})} className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-8 py-3.5 text-sm font-medium focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none">
                          <option value="">Sélectionner</option>
                          {UNIVERSITES.map(u=> <option key={u.id} value={u.id}>{u.sigle} — {u.nom}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold tracking-widest uppercase text-slate-600">Année d'obtention *</label>
                      <select value={form.annee} onChange={e=>setForm({...form, annee:e.target.value})} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none">
                        <option value="">Année</option>
                        {[2023,2022,2021,2020,2019].map(a=> <option key={a} value={String(a)}>{a}</option>)}
                      </select>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f2a44] px-6 py-4 text-sm font-bold text-white hover:bg-[#14365a] disabled:opacity-60 transition shadow">
                    {loading ? <><Loader2 size={18} className="animate-spin"/> Vérification en cours… blockchain</> : <> <ShieldCheck size={18} className="text-emerald-300"/> Vérifier l'authenticité <ArrowRight size={16}/></>}
                  </button>
                  <div className="flex items-center gap-2 text-xs text-slate-500"><Lock size={12}/> Appel simulé <span className="font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">/api/verifyDiploma</span> • ~1,6s</div>
                </form>

                {/* loading skeleton */}
                {loading && (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-700"><Loader2 size={16} className="animate-spin text-emerald-600"/> Interrogation des registres • Contrôle du hash • Vérification du sceau…</div>
                    <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden"><div className="h-full w-1/2 bg-emerald-500 animate-[shimmer_1.2s_ease_infinite]" style={{animation:'shimmer 1.2s ease infinite'}}/></div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[1,2,3].map(i=> <div key={i} className="h-16 rounded-xl bg-white border border-slate-200 animate-pulse"/>)}
                    </div>
                  </div>
                )}

                {/* result */}
                {!loading && resultCard()}
              </div>

              {/* examples + how it works */}
              <div className="space-y-4">
                <div className="rounded-[24px] bg-white border border-slate-200 p-6">
                  <h3 className="text-sm font-bold flex items-center gap-2"><Sparkles size={16} className="text-amber-500"/> Essayer avec un exemple (cliquez)</h3>
                  <p className="text-xs text-slate-500 mt-1">4 cas réels pour tester les 3 états.</p>
                  <div className="mt-4 grid gap-2.5">
                    {DIPLOMES.map(d=>{
                      const cfg=statusConfig[d.statut]
                      return (
                        <button key={d.matricule} onClick={()=>useExample(d)} className="text-left rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 p-3.5 flex items-center gap-3 transition group">
                          <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot} shrink-0`}/>
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold truncate">{d.matricule}</span>
                            <span className="block text-xs text-slate-500 truncate">{d.nom} • {d.sigle} {d.annee}</span>
                          </span>
                          <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>{cfg.label}</span>
                          <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-700"/>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500">Astuce : modifiez l'année ou l'université pour provoquer une <span className="font-semibold">Anomalie</span>.</div>
                </div>

                <div className="rounded-[24px] bg-white border border-slate-200 p-6">
                  <h3 className="text-sm font-bold">Comment ça marche ?</h3>
                  <ol className="mt-4 grid gap-3">
                    {[
                      {n:1, t:'Saisie du matricule', d:'L\'université a ancré l\'empreinte du diplôme (SHA-256) sur la chaîne.'},
                      {n:2, t:'Vérification instantanée', d:'Le hash est comparé aux blocs confirmés + registre UNIKIN.'},
                      {n:3, t:'Preuve QR', d:'Un badge vérifié, horodaté et partageable est généré.'},
                    ].map(s=>(
                      <li key={s.n} className="flex gap-3">
                        <span className="h-7 w-7 rounded-xl bg-[#0f2a44] text-white flex items-center justify-center text-xs font-bold shrink-0">{s.n}</span>
                        <span><span className="block text-sm font-semibold">{s.t}</span><span className="block text-xs text-slate-500">{s.d}</span></span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PORTAIL EMPLOYEUR */}
        {activeTab==='employeur' && (
          <div className="space-y-6">
            <div className="rounded-[24px] bg-white border border-slate-200 p-6 md:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#0f2a44] text-white flex items-center justify-center"><Briefcase size={22}/></div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap"><h2 className="text-lg font-black">Portail Employeur</h2><span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-[#0f2a44] px-2.5 py-1 text-xs font-bold"><Sparkles size={12}/> Abonnement Premium</span><span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600"/> API active</span></div>
                  <p className="text-sm text-slate-500">Société Générale RDC • Vérifications illimitées • Support prioritaire • Export PDF & API RH</p>
                  <div className="mt-2 flex gap-2 text-xs"><span className="rounded-full bg-slate-900 text-white px-3 py-1">50 vérifs ce mois</span><span className="rounded-full border border-slate-200 px-3 py-1">Économisé : ~112h vs méthode manuelle</span></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setActiveTab('accueil')} className="inline-flex items-center gap-2 rounded-full bg-[#0f2a44] text-white px-5 py-3 text-sm font-semibold hover:bg-[#14365a]"><Search size={16}/> Nouvelle vérification</button>
                <button onClick={()=>showToast('Facture téléchargée')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:bg-slate-50"><Download size={16}/> Facture</button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {label:'Taux de validés', value:'78%', sub:'+4,2% ce mois', icon:BadgeCheck, color:'text-emerald-600 bg-emerald-50 border-emerald-200'},
                {label:'Temps moyen', value:'1,8s', sub:'vs 11 jours avant', icon:Clock3, color:'text-[#0f2a44] bg-slate-50 border-slate-200'},
                {label:'Fraudes évitées', value:'9', sub:'3 embauches bloquées', icon:Shield, color:'text-amber-700 bg-amber-50 border-amber-200'},
              ].map(c=>(
                <div key={c.label} className="rounded-[20px] bg-white border border-slate-200 p-5 flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${c.color}`}><c.icon size={18}/></div>
                  <div><div className="text-xs tracking-widest uppercase font-semibold text-slate-500">{c.label}</div><div className="text-xl font-black">{c.value} <span className="text-xs font-normal text-slate-500">{c.sub}</span></div></div>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] bg-white border border-slate-200 overflow-hidden">
              <div className="p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200">
                <h3 className="font-bold">Vérifications récentes</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Filtrer :</span>
                  <span className="rounded-full bg-[#0f2a44] text-white px-3 py-1 text-xs font-semibold">Tous</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs">Validés</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs">Anomalies</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-[11px] tracking-widest uppercase text-slate-500">
                    <tr><th className="text-left px-5 py-3 font-semibold">Candidat</th><th className="text-left px-5 py-3 font-semibold">Université</th><th className="text-left px-5 py-3 font-semibold">Diplôme</th><th className="text-left px-5 py-3 font-semibold">Date</th><th className="text-left px-5 py-3 font-semibold">Statut</th><th className="px-5 py-3"/></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {EMPLOYEUR_VERIFICATIONS.map(r=>{
                      const cfg=statusConfig[r.statut]
                      return (
                        <tr key={r.id} className="hover:bg-slate-50/60">
                          <td className="px-5 py-4 font-semibold">{r.candidat}</td>
                          <td className="px-5 py-4"><span className="rounded-full bg-slate-900 text-white px-2.5 py-1 text-xs font-bold">{r.universite}</span></td>
                          <td className="px-5 py-4 text-slate-600">{r.diplome}</td>
                          <td className="px-5 py-4 text-slate-500 text-xs">{r.date}</td>
                          <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${cfg.badge}`}><span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}/>{cfg.label}</span></td>
                          <td className="px-5 py-4 text-right"><button onClick={()=>{ const d=DIPLOMES.find(x=>x.sigle===r.universite); if(d) useExample(d); else setActiveTab('accueil') }} className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2a44] hover:underline">Détails <ExternalLink size={12}/></button></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>5 sur 50 vérifications • Page 1/10</span>
                <button onClick={()=>showToast('Export CSV généré')} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5 font-medium hover:bg-slate-50"><Download size={12}/> Exporter CSV</button>
              </div>
            </div>

            {/* upsell */}
            <div className="rounded-[24px] bg-[#0f2a44] text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"><Users size={18}/></div><div><div className="font-bold">Invitez votre équipe RH</div><div className="text-sm text-white/70">3 sièges inclus • SSO & journaux d'audit disponibles</div></div></div>
              <button onClick={()=>showToast('Invitation envoyée')} className="rounded-full bg-white text-[#0f2a44] px-5 py-2.5 text-sm font-bold hover:bg-slate-100">Inviter un collaborateur</button>
            </div>
          </div>
        )}

        {/* DASHBOARD UNIVERSITE */}
        {activeTab==='universite' && (
          <div className="space-y-6">
            <div className="rounded-[24px] bg-[#0f2a44] text-white p-6 md:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden relative">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl"/>
              <div className="relative flex gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white text-[#0f2a44] flex items-center justify-center font-black">UNIKIN</div>
                <div>
                  <div className="flex items-center gap-2"><h2 className="text-lg font-black">Dashboard Université — UNIKIN</h2><span className="rounded-full bg-emerald-500 text-white px-2.5 py-1 text-xs font-bold">Partenaire vérifié</span></div>
                  <p className="text-sm text-white/70">Avenue de l'Université, Kinshasa • Contact : scolarite@unikin.ac.cd • Dernière synchro il y a 12 min</p>
                  <div className="mt-2 flex items-center gap-2 text-xs"><span className="rounded-full bg-white/10 border border-white/15 px-3 py-1">Exercice 2023-2024</span><span className="rounded-full bg-white text-[#0f2a44] px-3 py-1 font-bold">12 483 diplômes ancrés</span></div>
                </div>
              </div>
              <div className="relative flex gap-2">
                <button onClick={handleImport} disabled={importLoading} className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white px-5 py-3 text-sm font-bold">
                  {importLoading ? <Loader2 size={16} className="animate-spin"/> : <UploadCloud size={16}/>} {importLoading ? 'Import en cours…' : 'Importer un palmarès'}
                </button>
                <button onClick={()=>showToast('Clé API régénérée')} className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-3 text-sm font-semibold hover:bg-white/15"><Fingerprint size={16}/> Clé API</button>
              </div>
            </div>
            {importDone && <div className="rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm flex items-center gap-2"><Check size={16}/> Import terminé — 312 lignes validées • 0 erreur • Ancrage automatique en file d'attente.</div>}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {label:'Enregistrés', value: STATS_UNIV.total.toLocaleString('fr-FR'), sub:'Tous diplômes', icon:GraduationCap, accent:'text-[#0f2a44] bg-white'},
                {label:'Validés', value: STATS_UNIV.valides.toLocaleString('fr-FR'), sub:'Ancrage confirmé', icon:BadgeCheck, accent:'text-emerald-700 bg-emerald-50 border-emerald-200'},
                {label:'En attente', value: STATS_UNIV.attente, sub:'À ancrer', icon:Clock3, accent:'text-amber-700 bg-amber-50 border-amber-200'},
                {label:'Anomalies', value: STATS_UNIV.anomalies, sub:'À corriger', icon:AlertTriangle, accent:'text-red-700 bg-red-50 border-red-200'},
              ].map(s=>(
                <div key={s.label} className="rounded-[20px] bg-white border border-slate-200 p-5">
                  <div className="flex items-center justify-between"><span className="text-xs tracking-widest uppercase font-semibold text-slate-500">{s.label}</span><span className={`h-8 w-8 rounded-xl border flex items-center justify-center ${s.accent}`}><s.icon size={14}/></span></div>
                  <div className="mt-2 text-2xl font-black">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.sub}</div>
                  <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full ${s.label==='Validés' ? 'bg-emerald-500 w-[95%]' : s.label==='En attente' ? 'bg-amber-500 w-[30%]' : s.label==='Anomalies' ? 'bg-red-500 w-[18%]' : 'bg-[#0f2a44] w-full'}`}/></div>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] bg-white border border-slate-200 overflow-hidden">
              <div className="p-5 flex items-center justify-between gap-3 border-b border-slate-200">
                <h3 className="font-bold">Registre des diplômes — UNIKIN</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="hidden md:inline text-slate-500">Recherche instantanée</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5"><Search size={12}/> Filtrer</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-[11px] tracking-widest uppercase text-slate-500">
                    <tr><th className="text-left px-5 py-3">Matricule</th><th className="text-left px-5 py-3">Étudiant</th><th className="text-left px-5 py-3">Filière</th><th className="text-left px-5 py-3">Année</th><th className="text-left px-5 py-3">Statut</th><th className="text-left px-5 py-3">Hash</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DIPLOMES.filter(d=>d.universiteId==='unikin' || true).map(d=>{
                      const cfg=statusConfig[d.statut]
                      return (
                        <tr key={d.matricule} className="hover:bg-slate-50/60">
                          <td className="px-5 py-4 font-mono text-xs font-semibold">{d.matricule}</td>
                          <td className="px-5 py-4"><div className="font-semibold">{d.nom}</div><div className="text-xs text-slate-500">{d.type}</div></td>
                          <td className="px-5 py-4 text-slate-600 text-xs">{d.filiere}</td>
                          <td className="px-5 py-4">{d.annee}</td>
                          <td className="px-5 py-4"><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${cfg.badge}`}><span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}/>{cfg.label}</span></td>
                          <td className="px-5 py-4 font-mono text-xs text-slate-600">{d.hash}</td>
                        </tr>
                      )
                    })}
                    {/* extra fake rows */}
                    {[
                      {matricule:'UNIKIN-2023-90210', nom:'KAVIRA Luboya Eric', type:'Licence en Droit', filiere:'Droit Privé', annee:'2023', statut:'validé', hash:'0x7a11…e2b4c890'},
                      {matricule:'UNIKIN-2022-77102', nom:'NDOMBI Amina Fatou', type:'Master en Économie', filiere:'Économie Monétaire', annee:'2022', statut:'en_attente', hash:'0x3c88…a0f1d223'},
                    ].map(r=>{
                      const cfg=statusConfig[r.statut]
                      return (
                        <tr key={r.matricule} className="hover:bg-slate-50/60">
                          <td className="px-5 py-4 font-mono text-xs font-semibold">{r.matricule}</td>
                          <td className="px-5 py-4"><div className="font-semibold">{r.nom}</div><div className="text-xs text-slate-500">{r.type}</div></td>
                          <td className="px-5 py-4 text-slate-600 text-xs">{r.filiere}</td>
                          <td className="px-5 py-4">{r.annee}</td>
                          <td className="px-5 py-4"><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${cfg.badge}`}><span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}/>{cfg.label}</span></td>
                          <td className="px-5 py-4 font-mono text-xs text-slate-600">{r.hash}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">Affichage 6 sur 2 814 enregistrements UNIKIN • <span className="font-semibold">Mise à jour en temps réel</span></div>
                <div className="flex gap-2">
                  <button onClick={handleImport} className="rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-semibold hover:bg-slate-50">Importer palmarès (.xlsx)</button>
                  <button onClick={()=>showToast('Export généré')} className="rounded-full bg-[#0f2a44] text-white px-4 py-2 text-xs font-bold">Exporter registre</button>
                </div>
              </div>
            </div>

            {/* zone import simulée */}
            <div className="rounded-[24px] border-2 border-dashed border-slate-300 bg-white p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center"><UploadCloud size={22}/></div>
              <div className="flex-1">
                <div className="font-bold">Importer un palmarès (simulation)</div>
                <div className="text-sm text-slate-500">Glissez un fichier Excel ou CSV — aucun upload réel, l'import est simulé côté client avec une barre de progression fictive.</div>
                {importLoading && <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-emerald-500 animate-pulse" style={{width:'62%'}}/></div>}
              </div>
              <button onClick={handleImport} disabled={importLoading} className="rounded-full bg-[#0f2a44] text-white px-6 py-3 text-sm font-bold disabled:opacity-50">
                {importLoading ? 'Traitement…' : 'Choisir un fichier'}
              </button>
            </div>
          </div>
        )}

        {/* BADGE / RESULTAT QR */}
        {activeTab==='badge' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* badge */}
              <div className="flex-1 w-full">
                <div className="rounded-[28px] bg-white border border-slate-200 p-4 md:p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="font-black flex items-center gap-2"><Award size={18} className="text-emerald-600"/> Badge vérifié — prévisualisation officielle</h2>
                    <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 text-xs font-bold"><BadgeCheck size={12}/> Sceau numérique</span>
                  </div>

                  {/* card */}
                  <div className="mt-5 mx-auto max-w-[640px]">
                    <div className="rounded-[24px] overflow-hidden border border-slate-200 shadow-lg bg-white">
                      {/* header band */}
                      <div className="bg-[#0f2a44] text-white p-5 flex items-center justify-between relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"/>
                        <div className="flex items-center gap-3 relative">
                          <div className="h-10 w-10 rounded-xl bg-white text-[#0f2a44] flex items-center justify-center"><ShieldCheck size={18}/></div>
                          <div className="leading-tight">
                            <div className="font-black text-sm tracking-tight">VerifDiplôme <span className="font-normal text-white/70">— Badge Officiel</span></div>
                            <div className="text-[11px] tracking-widest uppercase text-white/60">République Démocratique du Congo • Blockchain</div>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500 text-white px-3 py-1 text-xs font-bold"><Check size={12}/> Vérifié</div>
                      </div>

                      {/* body */}
                      <div className="p-6 grid md:grid-cols-[1fr_160px] gap-6">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-[#0f2a44] px-3 py-1 text-xs font-bold"><GraduationCap size={12}/> Licence en Informatique — Génie Logiciel</div>
                          <div className="mt-3 text-2xl font-black leading-tight">MUKENDI Tshimanga Grâce</div>
                          <div className="text-sm text-slate-600">Université de Kinshasa (UNIKIN) • 2023 • Mention Distinction</div>

                          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="text-slate-500">Matricule</div><div className="font-mono font-bold">UNIKIN-2023-88471</div></div>
                            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="text-slate-500">Émis le</div><div className="font-semibold">15 Juillet 2023</div></div>
                          </div>

                          <div className="mt-4 rounded-xl bg-[#0f2a44] text-white p-3 flex items-center gap-3">
                            <Fingerprint size={16} className="text-emerald-300"/>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] tracking-widest uppercase text-white/60">Hash blockchain (tronqué)</div>
                              <div className="font-mono text-xs truncate">0x8f3a9d12e44c91e4b2d7a6f00bc123e89…</div>
                            </div>
                            <span className="hidden sm:inline text-[11px] bg-white/15 rounded-full px-2.5 py-1">Bloc #14 882 431</span>
                          </div>

                          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Lock size={12}/> Vérifiable sur verifdiplome.cd/verify/UNIKIN-2023-88471</div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                          <QrSvg size={150}/>
                          <div className="text-[11px] tracking-widest uppercase font-bold text-slate-500">QR Code • Scannez pour vérifier</div>
                          {/* seal */}
                          <div className="relative h-20 w-20">
                            <div className="absolute inset-0 rounded-full border-[3px] border-amber-400 flex items-center justify-center bg-amber-50">
                              <div className="text-center leading-none">
                                <div className="text-[9px] tracking-[0.18em] font-black text-[#0f2a44]">SCEAU</div>
                                <ShieldCheck size={22} className="mx-auto text-emerald-600"/>
                                <div className="text-[8px] font-bold text-[#0f2a44]">VÉRIFIÉ</div>
                              </div>
                            </div>
                            <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white"><Check size={12}/></div>
                          </div>
                          <div className="text-[10px] text-slate-400 text-center">ID: VD-UNIKIN-88471 • Valide le 01/09/2026</div>
                        </div>
                      </div>

                      <div className="h-1.5 bg-gradient-to-r from-[#0f2a44] via-emerald-500 to-amber-400"/>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 justify-center">
                    <button onClick={()=>showToast('Badge téléchargé (PNG simulé)')} className="inline-flex items-center gap-2 rounded-full bg-[#0f2a44] text-white px-6 py-3 text-sm font-bold hover:bg-[#14365a]"><Download size={16}/> Télécharger le badge (PNG/PDF)</button>
                    <button onClick={()=>{navigator.clipboard.writeText('https://verifdiplome.cd/verify/UNIKIN-2023-88471'); showToast('Lien copié')}} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium hover:bg-slate-50"><Link2 size={16}/> Copier le lien</button>
                    <button onClick={()=>showToast('Partagé sur LinkedIn (simulé)')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium hover:bg-slate-50"><ExternalLink size={16}/> Partager</button>
                  </div>
                </div>
              </div>

              {/* side info */}
              <div className="w-full lg:w-[360px] space-y-4">
                <div className="rounded-[24px] bg-[#0f2a44] text-white p-6">
                  <h3 className="font-bold flex items-center gap-2"><Lock size={16} className="text-emerald-300"/> Pourquoi ce badge est infalsifiable ?</h3>
                  <ul className="mt-4 grid gap-3 text-sm text-white/80">
                    <li className="flex gap-2"><Check size={16} className="text-emerald-400 mt-0.5"/> Empreinte SHA-256 ancrée au bloc #14 882 431 — toute modification invalide le hash.</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-400 mt-0.5"/> QR signé : le scan interroge directement la chaîne, pas une image.</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-400 mt-0.5"/> Sceau horodaté par l'université + VerifDiplôme, opposable en justice.</li>
                  </ul>
                </div>
                <div className="rounded-[24px] bg-white border border-slate-200 p-6">
                  <h3 className="font-bold text-sm">Vérification croisée</h3>
                  <div className="mt-3 space-y-2.5 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Registre UNIKIN</span><span className="font-semibold text-emerald-700 flex items-center gap-1"><Check size={12}/> Trouvé</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Blockchain (L2)</span><span className="font-semibold text-emerald-700 flex items-center gap-1"><Check size={12}/> Confirmé</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Signature scolarité</span><span className="font-semibold text-emerald-700 flex items-center gap-1"><Check size={12}/> Valide</span></div>
                  </div>
                  <button onClick={()=>setActiveTab('accueil')} className="mt-4 w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold hover:bg-white">Vérifier un autre diplôme</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="mx-auto max-w-[1220px] px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-600"/> VerifDiplôme © 2026 • Confiance & souveraineté académique • Données simulées — démo sans backend</span>
          <span className="flex items-center gap-3"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500"/> Système opérationnel</span> • Mentions légales • Confidentialité</span>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-xl flex items-center gap-2">
          <Check size={16} className="text-emerald-400"/> {toast}
        </div>
      )}

      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
    </div>
  )
}
