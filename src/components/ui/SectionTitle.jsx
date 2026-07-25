import { cn } from '../../utils/cn'

export default function SectionTitle({ title, action, className }) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <h2 className="font-heading text-base font-semibold text-ink dark:text-slate-100">
        {title}
      </h2>
      {action}
    </div>
  )
}
