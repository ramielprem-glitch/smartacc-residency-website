import { motion } from 'framer-motion'
import { FiPrinter, FiUser, FiHome, FiCreditCard, FiCalendar, FiCheckCircle } from 'react-icons/fi'
import { Button, Card } from '../../components/ui'
import { availableRooms } from '../../mock/data'

const num = (v) => Number.parseFloat(v) || 0
const inr = (v) => `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-ink dark:text-slate-100">{value || '—'}</p>
    </div>
  )
}

export default function ReviewStep({ form, rooms, onBack, onComplete, onPrint }) {
  const lineTotals = rooms.map((r) => {
    const subtotal = num(r.rent) * num(r.days)
    const discount = (subtotal * num(r.discountPercent)) / 100
    const taxable = subtotal - discount
    const gst = (taxable * (num(r.cgst) + num(r.sgst) + num(r.igst))) / 100
    return { subtotal, discount, gst, total: taxable + gst }
  })
  const subtotal = lineTotals.reduce((s, l) => s + l.subtotal, 0)
  const discount = lineTotals.reduce((s, l) => s + l.discount, 0)
  const gst = lineTotals.reduce((s, l) => s + l.gst, 0)
  const grandTotal = subtotal - discount + gst

  const roomColumns = [
    {
      key: 'room',
      label: 'Room',
      render: (r) => {
        const rm = availableRooms.find((x) => x.id === r.roomId)
        return rm?.number || '—'
      },
    },
    { key: 'roomType', label: 'Room Type' },
    { key: 'days', label: 'Days', align: 'center' },
    { key: 'persons', label: 'Persons', align: 'center' },
    { key: 'rent', label: 'Rent', align: 'right', render: (r) => inr(num(r.rent)) },
    {
      key: 'total',
      label: 'Total',
      align: 'right',
      render: (r) => {
        const i = rooms.findIndex((x) => x.id === r.id)
        return <span className="font-medium text-ink dark:text-slate-100">{inr(lineTotals[i]?.total ?? 0)}</span>
      },
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Guest Information */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
              <FiUser size={18} />
            </span>
            <h3 className="font-heading text-base font-semibold text-ink dark:text-slate-100">Guest Information</h3>
          </div>
          <div className="space-y-4">
            <Field label="Guest Name" value={form.guestName} />
            <Field label="Phone" value={form.phone} />
            <Field label="Address" value={form.address} />
            <Field label="Purpose of Stay" value={form.purpose} />
            <Field label="ID Proof" value={`${form.idProofType} · ${form.idProofNumber}`} />
          </div>
        </Card>

        {/* Assigned Rooms */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
              <FiHome size={18} />
            </span>
            <h3 className="font-heading text-base font-semibold text-ink dark:text-slate-100">Assigned Rooms</h3>
          </div>
          {rooms.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">No rooms assigned.</p>
          ) : (
            <div className="space-y-2">
              {rooms.map((r, i) => {
                const rm = availableRooms.find((x) => x.id === r.roomId)
                return (
                  <div key={r.id} className="flex items-center justify-between rounded-xl bg-canvas/60 px-3 py-2 dark:bg-slate-700/40">
                    <div>
                      <p className="text-sm font-medium text-ink dark:text-slate-100">Room {rm?.number || '—'}</p>
                      <p className="text-xs text-slate-400">{r.roomType} · {r.days} day(s) · {r.persons} guest(s)</p>
                    </div>
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{inr(lineTotals[i]?.total ?? 0)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Billing Summary */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
              <FiCreditCard size={18} />
            </span>
            <h3 className="font-heading text-base font-semibold text-ink dark:text-slate-100">Billing Summary</h3>
          </div>
          <div className="space-y-3 text-sm">
            <Row label="Subtotal" value={inr(subtotal)} />
            <Row label="Discount" value={`- ${inr(discount)}`} tone="danger" />
            <Row label="GST" value={inr(gst)} />
            <div className="my-2 border-t border-line dark:border-slate-700" />
            <Row label="Grand Total" value={inr(grandTotal)} bold />
            <Row label="Advance Paid" value={inr(num(form.advance))} />
            <Row label="Balance Due" value={inr(Math.max(0, grandTotal - num(form.advance)))} tone="warning" />
          </div>
        </Card>
      </div>

      {/* Bottom summary bar */}
      <Card className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
              <FiCreditCard size={18} />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Payment Method</p>
              <p className="text-sm font-medium text-ink dark:text-slate-100">{form.paymentMethod || '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
              <FiCalendar size={18} />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Check-In Date</p>
              <p className="text-sm font-medium text-ink dark:text-slate-100">{form.checkInDate || '—'} {form.checkInTime}</p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end">
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Grand Total</p>
              <p className="font-heading text-xl font-semibold text-primary-800 dark:text-primary-200">{inr(grandTotal)}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onBack}>← Back</Button>
        <Button variant="secondary" onClick={onPrint}>
          <FiPrinter size={16} /> Print Preview
        </Button>
        <Button variant="success" onClick={onComplete}>
          <FiCheckCircle size={16} /> Complete Check-In
        </Button>
      </div>
    </motion.div>
  )
}

function Row({ label, value, tone, bold }) {
  const toneClass =
    tone === 'danger'
      ? 'text-danger'
      : tone === 'warning'
      ? 'text-warning'
      : 'text-ink dark:text-slate-200'
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? 'font-heading text-base font-semibold text-ink dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}>
        {label}
      </span>
      <span className={`${bold ? 'font-heading text-lg font-semibold text-primary-800 dark:text-primary-200' : `font-medium ${toneClass}`}`}>
        {value}
      </span>
    </div>
  )
}
