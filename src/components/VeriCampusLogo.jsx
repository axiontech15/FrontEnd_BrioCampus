export function VeriCampusLogo({ size = 44, withText = true, className = "" }){
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div style={{width:size, height:size}} className="relative shrink-0">
        <svg viewBox="0 0 44 44" className="w-full h-full drop-shadow-sm" role="img" aria-label="VeriCampus">
          <defs>
            <linearGradient id={`gold-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E7D1A0"/>
              <stop offset="100%" stopColor="#C9A86A"/>
            </linearGradient>
            <linearGradient id={`navy-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#23265A"/>
              <stop offset="100%" stopColor="#1B1D3B"/>
            </linearGradient>
          </defs>
          <rect width="44" height="44" rx="13" fill={`url(#navy-${size})`} />
          <rect width="44" height="44" rx="13" fill="none" stroke="#C9A86A" strokeOpacity="0.35"/>
          <rect x="1.5" y="1.5" width="41" height="41" rx="11.5" fill="none" stroke={`url(#gold-${size})`} strokeOpacity="0.35" strokeWidth="0.9"/>
          <path d="M22 8.5 L31.2 12.8 V20.6 C31.2 26.2 28 31 22 34.2 C16 31 12.8 26.2 12.8 20.6 V12.8 Z" fill="#0F1230" stroke={`url(#gold-${size})`} strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M22 9.8 L30 13.5 V20.6 C30 25.6 27.2 30 22 33 C16.8 30 14 25.6 14 20.6 V13.5 Z" fill="none" stroke="white" strokeOpacity="0.07" strokeWidth="0.8"/>
          <g transform="translate(22,13.5)">
            <path d="M0 -5.2 L-10.2 -1.2 L0 2.8 L10.2 -1.2 Z" fill={`url(#gold-${size})`}/>
            <path d="M0 -5.2 L-10.2 -1.2 L0 2.8 L10.2 -1.2 Z" fill="none" stroke="#8C6A2B" strokeWidth="0.35"/>
            <path d="M9.2 -0.8 L9.2 3.2" stroke="#C9A86A" strokeWidth="0.9" strokeLinecap="round"/>
            <circle cx="9.2" cy="4.2" r="1.35" fill="#C9A86A" stroke="#8C6A2B" strokeWidth="0.4"/>
            <path d="M-7.2 -0.2 L-7.2 1.6 C-7.2 1.6 -3.8 3.2 0 3.2 C3.8 3.2 7.2 1.6 7.2 1.6 L7.2 -0.2" fill="#1B1D3B" stroke="#C9A86A" strokeWidth="0.7"/>
          </g>
          <g transform="translate(22,26.2)">
            <circle r="6.2" fill="#C9A86A" stroke="#8C6A2B" strokeWidth="0.5"/>
            <circle r="5.2" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="0.55"/>
            <path d="M-2.6 0.3 L-0.4 2.4 L2.9 -1.9" fill="none" stroke="#1B1D3B" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      </div>
      {withText && (
        <div className="leading-none">
          <div className="serif font-bold text-[20px] tracking-tight text-[#1B1D3B] leading-none">Veri<span className="text-[#7A1C1C]">Campus</span> <span className="ml-1 align-super text-[9px] font-sans font-bold tracking-[0.18em] bg-[#1B1D3B] text-[#C9A86A] px-1.5 py-0.5 rounded">RDC</span></div>
          <div className="text-[10px] tracking-[0.19em] font-semibold text-[#6B6575] uppercase mt-0.5">Campus • Diplôme • Confiance</div>
        </div>
      )}
    </div>
  )
}

export function VeriCampusMark({ size=32 }){
  return (
    <div style={{width:size, height:size}} className="rounded-xl bg-[#1B1D3B] border border-[#C9A86A]/30 flex items-center justify-center shadow-sm">
      <svg width={size*0.62} height={size*0.62} viewBox="0 0 32 32" fill="none">
        <path d="M16 5 L26 9.5 V18 C26 23 22 28 16 30.5 C10 28 6 23 6 18 V9.5 Z" fill="none" stroke="#C9A86A" strokeWidth="1.6"/>
        <path d="M11.5 16.5 L14.5 19.5 L20.5 13" fill="none" stroke="#C9A86A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 4.5 L6 9 L16 13.5 L26 9 Z" fill="#C9A86A"/>
      </svg>
    </div>
  )
}

// Logo horizontal complet (image) pour header / print
export function VeriCampusLogoFull({ className="" }){
  return <img src="/vericampus-logo-pro.svg" alt="VeriCampus — Vérification de diplômes" className={`h-10 w-auto ${className}`}/>
}
