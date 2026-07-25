import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiBell,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
} from 'react-icons/fi'
import { pageTitleMap } from '../../config/navigation'
import { useTheme } from '../../context/ThemeContext'
import { notifications as mockNotifications } from '../../mock/data'
import Badge from '../ui/Badge'

export default function TopNavbar({ onOpenMobileMenu }) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [notifOpen, setNotifOpen] = useState(false)
  const [query, setQuery] = useState('')

  const title = pageTitleMap[location.pathname] ?? 'StaySync'
  const unread = mockNotifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/80 px-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 sm:px-6">
      {/* Mobile menu */}
      <button
        onClick={onOpenMobileMenu}
        className="rounded-lg p-2 text-slate-500 hover:bg-canvas hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
        aria-label="Open menu"
      >
        <FiMenu size={20} />
      </button>

      {/* Page title */}
      <div className="min-w-0">
        <h1 className="truncate font-heading text-lg font-semibold text-ink dark:text-slate-100">
          {title}
        </h1>
      </div>

      {/* Search (center, grows) */}
      <div className="relative ml-auto hidden max-w-md flex-1 md:block">
        <FiSearch
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guests, rooms, invoices…"
          className="h-10 w-full rounded-xl border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:bg-slate-800"
        />
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-1.5 md:ml-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-canvas hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <FiBell size={20} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-line bg-white shadow-pop dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-center justify-between border-b border-line px-4 py-3 dark:border-slate-700">
                    <p className="font-heading text-sm font-semibold text-ink dark:text-slate-100">
                      Notifications
                    </p>
                    <Badge tone="primary">{unread} new</Badge>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className="flex gap-3 border-b border-line px-4 py-3 last:border-0 hover:bg-canvas/60 dark:border-slate-700 dark:hover:bg-slate-700/40"
                      >
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            n.unread ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-ink dark:text-slate-100">
                            {n.title}
                          </p>
                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {n.detail}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-canvas hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        {/* Avatar */}
        <button className="ml-1 flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition-colors hover:bg-canvas dark:hover:bg-slate-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-sm font-semibold text-white">
            AK
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-ink dark:text-slate-100">
              Alex Kim
            </span>
            <span className="block text-[11px] leading-tight text-slate-400">
              Front Desk
            </span>
          </span>
        </button>
      </div>
    </header>
  )
}
