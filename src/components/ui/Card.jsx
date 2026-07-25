import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={hover ? { y: -2 } : undefined}
      className={cn(
        'rounded-2xl bg-white border border-line shadow-card dark:bg-slate-800 dark:border-slate-700',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
