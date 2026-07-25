import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(function Input({ className, label, id, error, ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'h-10 w-full rounded-xl border bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2',
          error
            ? 'border-danger focus:border-danger focus:ring-danger/20'
            : 'border-line focus:border-primary-500 focus:ring-primary-500/20',
          'dark:bg-slate-800 dark:text-slate-100',
          error ? 'dark:border-red-500' : 'dark:border-slate-700',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs font-medium text-danger">{error}</p>}
    </div>
  )
})

export default Input
