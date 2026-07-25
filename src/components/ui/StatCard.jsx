import { motion } from 'framer-motion'
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiKey,
  FiLogIn,
  FiLogOut,
} from 'react-icons/fi'
import { cn } from '../../utils/cn'

const iconMap = {
  bed: FiHome,
  doorOpen: FiGrid,
  key: FiKey,
  login: FiLogIn,
  logout: FiLogOut,
  dollar: FiDollarSign,
}

const accentMap = {
  'total-rooms': 'text-primary-700 bg-primary-50 dark:bg-primary-900/40 dark:text-primary-200',
  'available-rooms': 'text-success bg-green-50 dark:bg-green-900/40 dark:text-green-300',
  'occupied-rooms': 'text-warning bg-amber-50 dark:bg-amber-900/40 dark:text-amber-300',
  'check-ins': 'text-primary-700 bg-primary-50 dark:bg-primary-900/40 dark:text-primary-200',
  'check-outs': 'text-danger bg-red-50 dark:bg-red-900/40 dark:text-red-300',
  'revenue': 'text-success bg-green-50 dark:bg-green-900/40 dark:text-green-300',
}

export default function StatCard({ stat, index = 0 }) {
  const Icon = iconMap[stat.icon] ?? FiBed
  const up = stat.trend === 'up'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-pop dark:bg-slate-800 dark:border-slate-700"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-ink dark:text-slate-100">
            {stat.value}
          </p>
        </div>
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            accentMap[stat.id] ?? 'text-primary-700 bg-primary-50',
          )}
        >
          <Icon size={20} />
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5',
            up ? 'bg-green-50 text-success dark:bg-green-900/40 dark:text-green-300'
              : 'bg-red-50 text-danger dark:bg-red-900/40 dark:text-red-300',
          )}
        >
          {up ? <FiArrowUpRight size={12} /> : <FiArrowDownRight size={12} />}
          {stat.delta}
        </span>
        <span className="text-slate-400 dark:text-slate-500">vs yesterday</span>
      </div>
    </motion.div>
  )
}
