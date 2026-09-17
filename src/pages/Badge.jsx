import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, BadgeCheck, Check, Download, Link2, ExternalLink, Fingerprint, Lock } from 'lucide-react'
import { Reveal } from '../components/Reveal.jsx'

const IMG_DIPLOMA_TEX = "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
const IMG_CAMPUS = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"

function QrSvg({size=150}){
  const cells = Array.from({length:625}, (_,i)=>{
    const x=i%25, y=Math.floor(i/25)
    if((x<7&&y<7)||(x>17&&y<7)||(x<7&&y>17)) return null
    return ((x*13+y*37+11)%7)<3 ? 1:0
  })
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" className="rounded-2xl bg-white p-2 border border-[#E9DDCB] shadow-sm block">
      <rect width="25" height="25" fill="white" rx="1"/>
      {[[0,0],[18,0],[0,18]].map(([ox,oy],k)=>(
        <g key={k}><rect x={ox} y={oy} width={7} height={7} fill="#1B1D3B" rx={0.5}/><rect x={ox+1} y={oy+1} width={5} height={5} fill="white"/><rect x={ox+2} y={oy+2} width={3} height={3} fill="#1B1D3B"/></g>
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

export default function Badge({ showToast }){
  return (
    <div className="space-y-6">
      <Reveal>
        <div className="rounded-[24px] overflow-hidden border border-[#E9DDCB] relative h-[160px] shadow-sm hover-lift">
          <motion.img initial={{scale:1.08}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1.2}} src={IMG_DIPLOMA_TEX} alt="Texture diplôme VeriCampus" className="absolute inset-0 w-full h-full object-cover block"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B]/90 via-[#1B1D3B]/70 to-[#1B1D3B]/30"/>
          <div className="relative h-full flex items-center px-6 md:px-8 text-white">
            <div><div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[#C9A86A] bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur">VeriCampus • Badge officiel</div><h1 className="serif text-2xl md:text-3xl font-bold mt-2 drop-shadow">Badge QR vérifié</h1><p className="text-sm text-white/80">Preuve partageable • Scellée blockchain • Opposable</p></div>
            <motion.img initial={{opacity:0, scale:0.9}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=200&q=80" alt="Diplômé" className="hidden md:block ml-auto h-24 w-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl block"/>
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <Reveal className="flex-1 w-full">
          <div className="rounded-[28px] bg-white border border-[#E9DDCB] p-4 md:p-6 shadow-sm hover-lift">
            <div className="flex items-center justify-between"><h2 className="serif font-bold flex items-center gap-2"><Award size={18} className="text-[#7A1C1C]"/> Badge vérifié — prévisualisation officielle</h2><span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#E6F2EC] border border-[#B7DDC9] text-[#1B4A3A] px-3 py-1 text-xs font-bold shadow-sm"><BadgeCheck size={12}/> Sceau numérique</span></div>

            {/* Badge Officiel — forme FIXE, ne change pas au responsive : largeur 640px figée, scroll horizontal sur mobile */}
            <div className="mt-6 -mx-4 md:mx-auto px-4 md:px-0 overflow-x-auto scrollbar-none pb-2">
              <div className="mx-auto w-[640px] min-w-[640px] max-w-none">
                <div className="rounded-[24px] overflow-hidden border border-[#E9DDCB] shadow-xl bg-white w-[640px]">
                  <div className="bg-[#1B1D3B] text-white p-5 flex items-center justify-between relative overflow-hidden h-[76px]">
                    <img src={IMG_CAMPUS} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 block"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D3B] to-[#1B1D3B]/80"/>
                    <div className="flex items-center gap-3 relative">
                      <div className="h-10 w-10 rounded-xl bg-white text-[#1B1D3B] flex items-center justify-center shadow"><ShieldCheck size={18}/></div>
                      <div><div className="serif font-bold text-sm leading-none">VeriCampus <span className="font-sans font-normal text-white/70">— Badge Officiel</span></div><div className="text-[11px] tracking-widest uppercase text-white/60 mt-0.5">RDC • Blockchain</div></div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-3 py-1 text-xs font-bold shadow relative"><Check size={12}/> Vérifié</span>
                  </div>

                  <div className="p-6 grid grid-cols-[1fr_160px] gap-6 h-[268px]">
                    <div className="flex flex-col">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A86A] text-[#1B1D3B] px-3 py-1 text-xs font-bold shadow-sm w-fit whitespace-nowrap">Licence en Informatique — Génie Logiciel</div>
                      <div className="serif mt-3 text-2xl font-bold leading-none">MUKENDI Tshimanga Grâce</div>
                      <div className="text-sm text-[#6B6575] mt-1">Université de Kinshasa (UNIKIN) • 2023 • Distinction</div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-xl bg-[#FFFBF5] border border-[#E9DDCB] p-3 shadow-sm h-[56px] flex flex-col justify-center"><div className="text-[#6B6575] text-[11px]">Matricule</div><div className="mono font-bold text-[12px]">UNIKIN-2023-88471</div></div>
                        <div className="rounded-xl bg-[#FFFBF5] border border-[#E9DDCB] p-3 shadow-sm h-[56px] flex flex-col justify-center"><div className="text-[#6B6575] text-[11px]">Émis le</div><div className="font-semibold text-[12px]">15 Juillet 2023</div></div>
                      </div>
                      <div className="mt-3 rounded-xl bg-[#1B1D3B] text-white p-3 flex items-center gap-3 shadow h-[52px]"><Fingerprint size={16} className="text-[#C9A86A] shrink-0"/><div className="flex-1 min-w-0"><div className="text-[11px] tracking-widest uppercase text-white/60 leading-none">Hash blockchain</div><div className="mono text-xs truncate mt-1">0x8f3a9d12e44c91e4b2d7a6f00bc123e89…</div></div><span className="text-[11px] bg-white/15 rounded-full px-2.5 py-1 whitespace-nowrap">Bloc #14 882 431</span></div>
                      <div className="mt-auto pt-3 flex items-center gap-2 text-xs text-[#6B6575]"><Lock size={12}/> vericampus.cd/verify/UNIKIN-2023-88471</div>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-[160px]">
                      <QrSvg size={150}/>
                      <div className="text-[11px] tracking-widest uppercase font-bold text-[#6B6575] whitespace-nowrap">QR • Scannez pour vérifier</div>
                      <div className="relative h-20 w-20 shrink-0 animate-sealPop"><div className="absolute inset-0 rounded-full border-[3px] border-[#C9A86A] bg-[#FFFBF5] flex items-center justify-center shadow"><div className="text-center"><div className="text-[9px] tracking-[0.18em] font-black">SCEAU</div><ShieldCheck size={22} className="mx-auto text-[#7A1C1C]"/><div className="text-[8px] font-bold">VÉRIFIÉ</div></div></div><div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-[#1B4A3A] text-white flex items-center justify-center border-2 border-white shadow animate-float"><Check size={12}/></div></div>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gradient-to-r from-[#1B1D3B] via-[#C9A86A] to-[#7A1C1C]"/>
                </div>
              </div>
            </div>
            <div className="md:hidden text-center text-xs text-[#6B6575] mt-2 flex items-center justify-center gap-1.5"><span className="h-1 w-12 rounded-full bg-[#E9DDCB]"/> Faites glisser pour voir le badge complet <span className="h-1 w-12 rounded-full bg-[#E9DDCB]"/></div>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <button onClick={()=>showToast('Badge téléchargé (PNG simulé)')} className="inline-flex items-center gap-2 rounded-full bg-[#1B1D3B] text-white px-6 py-3 text-sm font-bold shadow hover:bg-[#23265a]"><Download size={16}/> Télécharger le badge</button>
              <button onClick={()=>{navigator.clipboard.writeText('https://vericampus.cd/verify/UNIKIN-2023-88471'); showToast('Lien copié')}} className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E9DDCB] px-5 py-3 text-sm font-medium hover:bg-[#F2EDE6]"><Link2 size={16}/> Copier le lien</button>
              <button onClick={()=>showToast('Partagé (simulé)')} className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E9DDCB] px-5 py-3 text-sm font-medium hover:bg-[#F2EDE6]"><ExternalLink size={16}/> Partager</button>
            </div>
          </div>
        </Reveal>

        <Reveal className="w-full lg:w-[360px] space-y-4">
          <div className="rounded-[24px] overflow-hidden border border-[#E9DDCB] shadow-sm hover-lift">
            <motion.img whileInView={{scale:1}} initial={{scale:1.06}} viewport={{once:true}} transition={{duration:1}} src={IMG_CAMPUS} alt="Campus" className="h-28 w-full object-cover block"/>
            <div className="bg-[#1B1D3B] text-white p-6"><h3 className="font-bold flex items-center gap-2"><Lock size={16} className="text-[#C9A86A]"/> Infalsifiable ?</h3><ul className="mt-4 grid gap-3 text-sm text-white/80"><li className="flex gap-2"><Check size={16} className="text-[#C9A86A] mt-0.5"/> SHA-256 ancré — toute modification invalide le hash.</li><li className="flex gap-2"><Check size={16} className="text-[#C9A86A] mt-0.5"/> QR signé — interroge la chaîne, pas une image.</li><li className="flex gap-2"><Check size={16} className="text-[#C9A86A] mt-0.5"/> Opposable : horodatage université + VeriCampus.</li></ul></div>
          </div>
          <div className="rounded-[24px] bg-white border border-[#E9DDCB] p-6 shadow-sm hover-lift"><h3 className="font-bold text-sm">Vérification croisée</h3><div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span className="text-[#6B6575]">Registre UNIKIN</span><span className="font-semibold text-[#1B4A3A] flex items-center gap-1"><Check size={12}/> Trouvé</span></div><div className="flex justify-between"><span className="text-[#6B6575]">Blockchain</span><span className="font-semibold text-[#1B4A3A] flex items-center gap-1"><Check size={12}/> Confirmé</span></div><div className="flex justify-between"><span className="text-[#6B6575]">Signature</span><span className="font-semibold text-[#1B4A3A] flex items-center gap-1"><Check size={12}/> Valide</span></div></div><Link to="/verification" className="mt-4 block w-full text-center rounded-full border border-[#E9DDCB] bg-[#FFFBF5] py-2.5 text-sm font-semibold hover:bg-white hover:scale-[1.02] transition">Vérifier un autre diplôme</Link></div>
        </Reveal>
      </div>
    </div>
  )
}
