import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { cn } from '../../utils/cn'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  const widths = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'relative w-full rounded-2xl bg-white shadow-pop dark:bg-slate-800',
              widths[size],
            )}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4 dark:border-slate-700">
              <h3 className="font-heading text-lg font-semibold text-ink dark:text-slate-100">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-canvas hover:text-ink dark:hover:bg-slate-700 dark:hover:text-slate-100"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="px-6 py-5">{children}</div>
            {footer && (
              <div className="flex justify-end gap-3 border-t border-line px-6 py-4 dark:border-slate-700">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
