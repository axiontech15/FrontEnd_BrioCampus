import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout } from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Verification from './pages/Verification.jsx'
import Connexion from './pages/Connexion.jsx'
import Employeur from './pages/Employeur.jsx'
import Universite from './pages/Universite.jsx'
import Badge from './pages/Badge.jsx'
import Admin from './pages/Admin.jsx'

function AnimatedRoutes({ showToast }){
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity:0, y:8 }}
        animate={{ opacity:1, y:0 }}
        exit={{ opacity:0, y:-8 }}
        transition={{ duration:0.28, ease:[0.16,1,0.3,1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home showToast={showToast}/>} />
          <Route path="/verification" element={<Verification showToast={showToast}/>} />
          <Route path="/connexion" element={<Connexion showToast={showToast}/>} />
          <Route path="/employeur" element={<Employeur showToast={showToast}/>} />
          <Route path="/universite" element={<Universite showToast={showToast}/>} />
          <Route path="/badge" element={<Badge showToast={showToast}/>} />
          <Route path="/admin" element={<Admin showToast={showToast}/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App(){
  const [toast, setToast] = useState(null)
  const showToast = (msg)=>{ setToast(msg); setTimeout(()=>setToast(null),2800) }
  return (
    <BrowserRouter>
      <Layout toast={toast}>
        <AnimatedRoutes showToast={showToast} />
      </Layout>
    </BrowserRouter>
  )
}
