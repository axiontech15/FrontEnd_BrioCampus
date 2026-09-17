import { motion } from 'framer-motion'

export function Reveal({ children, delay=0, y=14, className="", direction="up" }){
  const variants = {
    up: { y: y, x:0 },
    down: { y: -y, x:0 },
    left: { x: -16, y:0 },
    right: { x: 16, y:0 },
  }
  const from = variants[direction] || variants.up
  return (
    <motion.div
      initial={{ opacity:0, ...from }}
      whileInView={{ opacity:1, x:0, y:0 }}
      viewport={{ once:true, margin:"-60px", amount:0.2 }}
      transition={{ duration:0.6, delay, ease:[0.16,1,0.3,1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, stagger=0.08, className="" }){
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once:true, margin:"-40px" }}
      variants={{ hidden:{}, visible:{ transition:{ staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className="" }){
  return (
    <motion.div
      variants={{ hidden:{ opacity:0, y:12 }, visible:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.16,1,0.3,1] } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
