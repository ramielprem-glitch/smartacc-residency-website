import { motion } from 'framer-motion'
import { FiCheck, FiUserPlus, FiHome, FiClipboard } from 'react-icons/fi'
import { cn } from '../../utils/cn'

const steps = [
  { label: 'Guest Information', icon: FiUserPlus },
  { label: 'Room Allocation', icon: FiHome },
  { label: 'Review & Confirm', icon: FiClipboard },
]

export default function Stepper({ current, onStepClick }) {
  return (
    <div className="flex w-full items-center">
      {steps.map((step, i) => {
        const active = i === current
        const done = i < current
        return (
          <div key={step.label} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              onClick={() => onStepClick && i < current && onStepClick(i)}
              disabled={i > current}
              className={cn(
                'flex items-center gap-3 rounded-xl transition-colors',
                i < current && 'cursor-pointer hover:opacity-80',
                i > current && 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  done && 'border-success bg-success text-white',
                  active && 'border-primary-800 bg-primary-800 text-white',
                  !done && !active && 'border-line bg-white text-slate-400 dark:bg-slate-800 dark:border-slate-600',
                )}
              >
                {done ? <FiCheck size={18} /> : <step.icon size={18} />}
              </span>
              <div className="hidden text-left sm:block">
                <p className={cn(
                  'text-xs font-medium',
                  active ? 'text-primary-800 dark:text-primary-200' : done ? 'text-ink dark:text-slate-200' : 'text-slate-400',
                )}>
                  Step {i + 1}
                </p>
                <p className={cn(
                  'text-sm font-medium',
                  active ? 'text-ink dark:text-slate-100' : done ? 'text-ink dark:text-slate-200' : 'text-slate-400',
                )}>
                  {step.label}
                </p>
              </div>
            </button>
            {i < steps.length - 1 && (
              <div className="mx-3 h-0.5 flex-1 rounded-full bg-line dark:bg-slate-700">
                <motion.div
                  className="h-full rounded-full bg-primary-800"
                  initial={{ width: '0%' }}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
