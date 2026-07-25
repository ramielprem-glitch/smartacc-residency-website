import { cn } from '../../utils/cn'

export function Skeleton({ className }) {
  return <div className={cn('skeleton rounded-xl', className)} />
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-3', i === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>
        <Skeleton className="h-11 w-11 rounded-xl" />
      </div>
      <Skeleton className="mt-4 h-5 w-28" />
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, r) => (
        <Skeleton key={r} className="h-12 w-full" />
      ))}
    </div>
  )
}
