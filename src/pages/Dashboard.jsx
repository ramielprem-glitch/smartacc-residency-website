import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  FiArrowRight,
  FiCalendar,
  FiPlus,
  FiUserMinus,
  FiUserPlus,
} from 'react-icons/fi'
import PageTransition from '../components/layout/PageTransition'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  PageHeader,
  SectionTitle,
  StatCard,
  Table,
} from '../components/ui'
import {
  occupancyData,
  recentCheckIns,
  recentCheckOuts,
  revenueData,
  stats,
} from '../mock/data'

const quickActions = [
  { label: 'New Check-In', icon: FiUserPlus, tone: 'primary' },
  { label: 'New Check-Out', icon: FiUserMinus, tone: 'secondary' },
  { label: 'Add Reservation', icon: FiCalendar, tone: 'secondary' },
  { label: 'Create Invoice', icon: FiPlus, tone: 'secondary' },
]

const checkInColumns = [
  { key: 'id', label: 'Guest ID' },
  { key: 'guest', label: 'Guest' },
  { key: 'room', label: 'Room' },
  {
    key: 'type',
    label: 'Type',
    render: (r) => <Badge tone={r.type === 'Suite' ? 'primary' : 'neutral'}>{r.type}</Badge>,
  },
  { key: 'time', label: 'Time', align: 'right' },
]

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          subtitle="Smart Residency Management Made Simple"
          actions={
            <>
              <Button variant="secondary" size="md">Export</Button>
              <Button size="md">
                <FiPlus size={16} /> New Reservation
              </Button>
            </>
          }
        />

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <SectionTitle
              title="Occupancy"
              action={<Badge tone="success">+8% this week</Badge>}
            />
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyData}>
                  <defs>
                    <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1E3A8A" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#1E3A8A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 10px 30px -10px rgb(16 24 40 / 0.18)',
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#1E3A8A"
                    strokeWidth={2.5}
                    fill="url(#occGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <SectionTitle
              title="Revenue"
              action={<Badge tone="primary">7-day</Badge>}
            />
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(30,58,138,0.04)' }}
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 10px 30px -10px rgb(16 24 40 / 0.18)',
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="revenue" fill="#1E3A8A" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent activity + quick actions */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <SectionTitle
              title="Recent Check-Ins"
              action={
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                  View all <FiArrowRight size={12} />
                </span>
              }
            />
            <div className="mt-4">
              <Table columns={checkInColumns} rows={recentCheckIns} />
            </div>
          </Card>

          <Card className="p-5">
            <SectionTitle title="Quick Actions" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quickActions.map((a) => (
                <motion.button
                  key={a.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-start gap-2 rounded-xl border border-line bg-canvas/50 p-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50/40 dark:border-slate-700 dark:bg-slate-700/30 dark:hover:bg-slate-700/60"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-800 text-white">
                    <a.icon size={16} />
                  </span>
                  <span className="text-sm font-medium text-ink dark:text-slate-100">
                    {a.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent check-outs */}
        <Card className="p-5">
          <SectionTitle
            title="Recent Check-Outs"
            action={
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                View all <FiArrowRight size={12} />
              </span>
            }
          />
          <div className="mt-4">
            <Table columns={checkInColumns} rows={recentCheckOuts} />
          </div>
        </Card>

        <EmptyState
          title="More analytics coming soon"
          description="Advanced reporting, forecasting and guest insights will be added in a later phase."
        />
      </div>
    </PageTransition>
  )
}
