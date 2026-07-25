import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiChevronDown,
  FiChevronsLeft,
  FiChevronsRight,
  FiGrid,
} from 'react-icons/fi'
import { navConfig } from '../../config/navigation'
import { cn } from '../../utils/cn'

function NavItem({ item, collapsed, onNavigate }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  if (item.children) {
    const hasActiveChild = item.children.some(
      (c) => location.pathname === c.to,
    )
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
            hasActiveChild
              ? 'text-white bg-white/10'
              : 'text-slate-300 hover:bg-white/5 hover:text-white',
            collapsed && 'justify-center',
          )}
          title={collapsed ? item.label : undefined}
        >
          <item.icon size={18} className="shrink-0" />
          {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
          {!collapsed && (
            <FiChevronDown
              size={16}
              className={cn('transition-transform', open && 'rotate-180')}
            />
          )}
        </button>
        <AnimatePresence initial={false}>
          {open && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                {item.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white',
                      )
                    }
                  >
                    <child.icon size={15} className="shrink-0" />
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-white/10 text-white'
            : 'text-slate-300 hover:bg-white/5 hover:text-white',
          collapsed && 'justify-center',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              'absolute left-0 h-6 w-1 rounded-r-full bg-white transition-opacity',
              isActive ? 'opacity-100' : 'opacity-0',
              collapsed && 'opacity-0',
            )}
          />
          <item.icon size={18} className="shrink-0" />
          {!collapsed && <span className="flex-1">{item.label}</span>}
          {isActive && !collapsed && (
            <motion.span
              layoutId="sidebar-active-dot"
              className="h-1.5 w-1.5 rounded-full bg-white"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-white lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        style={{ width: collapsed ? 80 : 256 }}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 px-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <FiGrid size={18} className="text-white" />
          </span>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="leading-tight"
            >
              <p className="font-heading text-sm font-semibold">StaySync</p>
              <p className="text-[11px] text-slate-400">RMS</p>
            </motion.div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3 relative">
          {navConfig.map((item) => (
            <div key={item.label} className="relative">
              <NavItem item={item} collapsed={collapsed} onNavigate={onCloseMobile} />
            </div>
          ))}
        </nav>

        {/* Collapse toggle (desktop) */}
        <div className="hidden border-t border-white/10 p-3 lg:block">
          <button
            onClick={onToggleCollapse}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white',
              collapsed && 'justify-center',
            )}
          >
            {collapsed ? <FiChevronsRight size={18} /> : <FiChevronsLeft size={18} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </>
  )
}
