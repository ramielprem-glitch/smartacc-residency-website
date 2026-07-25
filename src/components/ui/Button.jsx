import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-primary-800 text-white hover:bg-primary-700 shadow-soft',
  secondary:
    'bg-white text-ink border border-line hover:bg-canvas dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700',
  ghost:
    'bg-transparent text-ink hover:bg-canvas dark:text-slate-200 dark:hover:bg-slate-800',
  danger: 'bg-danger text-white hover:brightness-95 shadow-soft',
  success: 'bg-success text-white hover:brightness-95 shadow-soft',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10 p-0',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
