import { cn } from '../../utils/cn'

const tones = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

export default function Badge({ children, tone = 'neutral', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
