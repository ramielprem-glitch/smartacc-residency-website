import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiCalendar, FiClock, FiRefreshCw, FiRotateCcw, FiSearch, FiUsers,
  FiHome, FiKey, FiTool, FiWind, FiChevronRight,
} from 'react-icons/fi'
import PageTransition from '../components/layout/PageTransition'
import { Button, Card, PageHeader, SearchBox, Select, Badge, EmptyState } from '../components/ui'
import BookingPanel from '../components/rooms/BookingPanel'
import { rooms, bookings, statusMeta } from '../mock/data'

const RANGE_DAYS = 14
const REF_DATE = new Date('2026-07-25T00:00:00')

const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
const fmtDay = (d) => d.toLocaleDateString('en-US', { weekday: 'short' })
const iso = (d) => d.toISOString().slice(0, 10)

const days = Array.from({ length: RANGE_DAYS }, (_, i) => {
  const d = new Date(REF_DATE)
  d.setDate(d.getDate() + i)
  return d
})

const roomTypes = ['Deluxe', 'Standard', 'Suite', 'Family', 'Executive']
const floors = [1, 2, 3, 4]
const statusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'occupied', label: 'Occupied' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'cleaning', label: 'Cleaning' },
]

const rangePresets = {
  today: 1,
  week: 7,
  month: 14, // capped to our 14-day mock window
}

// Determine a room's current status (today) from its bookings.
function roomStatusToday(roomIdx) {
  const today = iso(REF_DATE)
  const bk = bookings.find((b) => b.roomIdx === roomIdx && b.start <= today && b.end >= today)
  return bk?.status ?? 'available'
}

export default function RoomAvailability() {
  const navigate = useNavigate()
  const [range, setRange] = useState('week')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [floorFilter, setFloorFilter] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [activeBooking, setActiveBooking] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  const visibleDays = useMemo(() => {
    const count = rangePresets[range] ?? RANGE_DAYS
    return days.slice(0, count)
  }, [range])

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      if (search && !r.number.includes(search) && !r.type.toLowerCase().includes(search.toLowerCase())) return false
      if (typeFilter && r.type !== typeFilter) return false
      if (floorFilter && r.floor !== Number(floorFilter)) return false
      if (statusFilter && roomStatusToday(rooms.indexOf(r)) !== statusFilter) return false
      return true
    })
  }, [search, typeFilter, statusFilter, floorFilter])

  const stats = useMemo(() => {
    const counts = { available: 0, occupied: 0, reserved: 0, maintenance: 0, cleaning: 0 }
    rooms.forEach((_, i) => { counts[roomStatusToday(i)]++ })
    return counts
  }, [])

  const resetFilters = () => {
    setSearch(''); setTypeFilter(''); setStatusFilter(''); setFloorFilter('')
    setDateStart(''); setDateEnd(''); setRange('week')
  }

  const openPanel = (booking, room) => {
    setActiveBooking({ booking, room })
    setPanelOpen(true)
  }

  const bookingSpan = (bk) => {
    const startIdx = days.findIndex((d) => iso(d) === bk.start)
    const endIdx = days.findIndex((d) => iso(d) === bk.end)
    return { startIdx, endIdx }
  }

  const summaryCards = [
    { id: 'available', label: 'Available Rooms', value: stats.available, icon: FiKey, accent: 'text-success bg-green-50 dark:bg-green-900/40 dark:text-green-300' },
    { id: 'occupied', label: 'Occupied Rooms', value: stats.occupied, icon: FiHome, accent: 'text-danger bg-red-50 dark:bg-red-900/40 dark:text-red-300' },
    { id: 'reserved', label: 'Reserved', value: stats.reserved, icon: FiClock, accent: 'text-warning bg-amber-50 dark:bg-amber-900/40 dark:text-amber-300' },
    { id: 'maintenance', label: 'Maintenance', value: stats.maintenance, icon: FiTool, accent: 'text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-300' },
    { id: 'cleaning', label: 'Cleaning', value: stats.cleaning, icon: FiWind, accent: 'text-primary-700 bg-primary-50 dark:bg-primary-900/40 dark:text-primary-200' },
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Room Availability"
          subtitle="Monitor room occupancy and booking schedule."
          actions={
            <div className="flex items-center gap-2">
              {['today', 'week', 'month'].map((r) => (
                <Button
                  key={r}
                  variant={range === r ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setRange(r)}
                >
                  {r === 'today' ? 'Today' : r === 'week' ? 'This Week' : 'This Month'}
                </Button>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setRange('week')}>
                <FiRefreshCw size={15} /> Refresh
              </Button>
            </div>
          }
        />

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {summaryCards.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-pop dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                  <p className="mt-2 font-heading text-3xl font-semibold text-ink dark:text-slate-100">{s.value}</p>
                </div>
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.accent}`}>
                  <s.icon size={20} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter bar */}
        <Card className="p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Search Room</label>
              <SearchBox value={search} onChange={setSearch} placeholder="Room number or type…" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Room Type</label>
              <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full">
                <option value="">All Types</option>
                {roomTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Status</label>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full">
                <option value="">All Statuses</option>
                {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Floor</label>
              <Select value={floorFilter} onChange={(e) => setFloorFilter(e.target.value)} className="w-full">
                <option value="">All Floors</option>
                {floors.map((f) => <option key={f} value={f}>Floor {f}</option>)}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Date Range</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-white px-2 text-xs text-ink transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                />
                <span className="text-slate-400">–</span>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-white px-2 text-xs text-ink transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <FiRotateCcw size={15} /> Reset Filters
            </Button>
          </div>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4">
          {Object.entries(statusMeta).map(([key, meta]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${meta.dot}`} />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{meta.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline (desktop) */}
        <Card className="hidden overflow-hidden md:block">
          <div className="flex">
            {/* Sticky room column */}
            <div className="w-64 shrink-0 border-r border-line dark:border-slate-700">
              <div className="flex h-12 items-center border-b border-line bg-canvas/60 px-4 dark:border-slate-700 dark:bg-slate-700/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Room</span>
              </div>
              {filteredRooms.map((r) => (
                <div key={r.id} className="flex h-14 items-center border-b border-line px-4 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-slate-100">{r.number}</p>
                    <p className="text-xs text-slate-400">{r.type} · Floor {r.floor} · {r.capacity}p</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scrollable timeline */}
            <div className="flex-1 overflow-x-auto">
              {/* Date headers */}
              <div className="flex h-12 border-b border-line dark:border-slate-700" style={{ minWidth: `${visibleDays.length * 88}px` }}>
                {visibleDays.map((d) => (
                  <div key={iso(d)} className="flex w-22 shrink-0 flex-col items-center justify-center border-r border-line/60 px-2 dark:border-slate-700/60" style={{ width: 88 }}>
                    <span className="text-xs font-semibold text-ink dark:text-slate-100">{fmt(d)}</span>
                    <span className="text-[10px] uppercase text-slate-400">{fmtDay(d)}</span>
                  </div>
                ))}
              </div>
              {/* Room rows */}
              {filteredRooms.map((r) => {
                const roomIdx = rooms.indexOf(r)
                const roomBookings = bookings.filter((b) => b.roomIdx === roomIdx)
                return (
                  <div key={r.id} className="relative flex h-14 border-b border-line dark:border-slate-700" style={{ minWidth: `${visibleDays.length * 88}px` }}>
                    {visibleDays.map((d, i) => (
                      <div key={iso(d)} className="shrink-0 border-r border-line/40 dark:border-slate-700/40" style={{ width: 88 }}>
                        <div className="h-full w-full" />
                      </div>
                    ))}
                    {roomBookings.map((bk) => {
                      const { startIdx, endIdx } = bookingSpan(bk)
                      if (startIdx < 0 || endIdx < 0) return null
                      const visStart = Math.max(startIdx, 0)
                      const visEnd = Math.min(endIdx, visibleDays.length - 1)
                      if (visStart > visibleDays.length - 1 || visEnd < 0) return null
                      const left = visStart * 88
                      const width = (visEnd - visStart + 1) * 88 - 4
                      const meta = statusMeta[bk.status]
                      return (
                        <motion.button
                          key={bk.id}
                          initial={{ opacity: 0, scaleX: 0.6 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          whileHover={{ y: -1, scale: 1.02 }}
                          onClick={() => openPanel(bk, r)}
                          className={`absolute top-2 flex h-10 items-center gap-1.5 rounded-lg ${meta.bar} px-2 text-xs font-medium text-white shadow-soft`}
                          style={{ left: `${left + 2}px`, width: `${width}px`, originX: 0 }}
                        >
                          <span className="truncate">{bk.guest.name}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
          {filteredRooms.length === 0 && (
            <div className="py-10">
              <EmptyState title="No rooms match your filters" description="Try adjusting or resetting the filters above." actionLabel="Reset Filters" onAction={resetFilters} />
            </div>
          )}
        </Card>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {filteredRooms.length === 0 ? (
            <EmptyState title="No rooms match your filters" description="Try adjusting or resetting the filters above." actionLabel="Reset Filters" onAction={resetFilters} />
          ) : (
            filteredRooms.map((r, i) => {
              const roomIdx = rooms.indexOf(r)
              const roomBookings = bookings.filter((b) => b.roomIdx === roomIdx)
              const status = roomStatusToday(roomIdx)
              const meta = statusMeta[status]
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-heading text-base font-semibold text-ink dark:text-slate-100">Room {r.number}</p>
                        <p className="text-xs text-slate-400">{r.type} · Floor {r.floor} · {r.capacity} guests</p>
                      </div>
                      <Badge tone={status === 'occupied' ? 'danger' : status === 'reserved' ? 'warning' : status === 'cleaning' ? 'primary' : 'neutral'}>
                        <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </Badge>
                    </div>
                    {roomBookings.length > 0 ? (
                      <div className="mt-3 space-y-2">
                        {roomBookings.map((bk) => {
                          const bmeta = statusMeta[bk.status]
                          return (
                            <button
                              key={bk.id}
                              onClick={() => openPanel(bk, r)}
                              className="flex w-full items-center justify-between rounded-xl bg-canvas/70 px-3 py-2 text-left transition-colors hover:bg-canvas dark:bg-slate-700/40 dark:hover:bg-slate-700/70"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-ink dark:text-slate-100">{bk.guest.name}</p>
                                <p className="text-xs text-slate-400">{bk.start} → {bk.end}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`inline-block h-2 w-2 rounded-full ${bmeta.dot}`} />
                                <FiChevronRight size={16} className="text-slate-400" />
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 rounded-xl bg-canvas/70 px-3 py-2 text-center text-xs text-slate-400 dark:bg-slate-700/40">
                        No bookings in the current window
                      </p>
                    )}
                  </Card>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Slide-over panel */}
        <BookingPanel
          booking={activeBooking?.booking}
          room={activeBooking?.room}
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          onViewDetails={() => { setPanelOpen(false); navigate('/guests') }}
          onEdit={() => setPanelOpen(false)}
          onCheckOut={() => { setPanelOpen(false); navigate('/check-out') }}
        />
      </div>
    </PageTransition>
  )
}
