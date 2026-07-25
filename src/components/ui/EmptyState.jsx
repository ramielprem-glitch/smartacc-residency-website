import { FiInbox } from 'react-icons/fi'
import Button from './Button'

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-canvas/50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-800/40">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-300">
        <FiInbox size={22} />
      </span>
      <h3 className="font-heading text-base font-semibold text-ink dark:text-slate-100">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {actionLabel && <Button variant="secondary" size="sm" onClick={onAction}>{actionLabel}</Button>}
    </div>
  )
}
