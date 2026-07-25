import { motion } from 'framer-motion'
import { FiPlus, FiRotateCcw, FiTrash2 } from 'react-icons/fi'
import { Badge, Button, Card, Input, Select, Table } from '../../components/ui'
import { availableRooms } from '../../mock/data'

const num = (v) => Number.parseFloat(v) || 0
const inr = (v) => `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`

export default function RoomAllocationStep({ rooms, setRooms, form, setForm }) {
  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const updateRoom = (id, key, value) => {
    setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: value } : r)))
  }

  const addRoom = () => {
    const room = availableRooms.find((rm) => rm.id === form.roomSel)
    const newRoom = {
      id: `room-${Date.now()}`,
      roomId: form.roomSel || '',
      roomType: room?.type ?? '',
      days: num(form.days) || 1,
      persons: num(form.persons) || 1,
      rent: room?.rent ?? num(form.rent),
      discountPercent: num(form.discountPercent) || 0,
      cgst: num(form.cgst) || 0,
      sgst: num(form.sgst) || 0,
      igst: num(form.igst) || 0,
      remarks: form.roomRemarks || '',
    }
    setRooms((rs) => [...rs, newRoom])
    resetForm()
  }

  const resetForm = () => {
    setForm((f) => ({
      ...f,
      roomSel: '',
      days: 1,
      persons: 1,
      rent: 0,
      discountPercent: 0,
      discountAmount: 0,
      cgst: 9,
      sgst: 9,
      igst: 0,
      roomRemarks: '',
    }))
  }

  const removeRoom = (id) => setRooms((rs) => rs.filter((r) => r.id !== id))

  // Live totals
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
      key: 'discount',
      label: 'Discount',
      align: 'right',
      render: (r) => {
        const i = rooms.findIndex((x) => x.id === r.id)
        return inr(lineTotals[i]?.discount ?? 0)
      },
    },
    {
      key: 'gst',
      label: 'GST',
      align: 'right',
      render: (r) => {
        const i = rooms.findIndex((x) => x.id === r.id)
        return inr(lineTotals[i]?.gst ?? 0)
      },
    },
    {
      key: 'total',
      label: 'Total',
      align: 'right',
      render: (r) => {
        const i = rooms.findIndex((x) => x.id === r.id)
        return <span className="font-medium text-ink dark:text-slate-100">{inr(lineTotals[i]?.total ?? 0)}</span>
      },
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (r) => (
        <button
          onClick={() => removeRoom(r.id)}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-danger dark:hover:bg-red-900/30"
          aria-label="Remove room"
        >
          <FiTrash2 size={16} />
        </button>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      {/* Left: room form + table */}
      <div className="space-y-6 lg:col-span-2">
        <Card className="p-6">
          <h3 className="mb-4 font-heading text-base font-semibold text-ink dark:text-slate-100">Room Details</h3>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            <Select label="Select Room" id="roomSel" value={form.roomSel} onChange={setField('roomSel')} className="col-span-2 sm:col-span-3">
              <option value="">Select room</option>
              {availableRooms.map((rm) => (
                <option key={rm.id} value={rm.id}>
                  {rm.number} · {rm.type} · {inr(rm.rent)}/night
                </option>
              ))}
            </Select>
            <Input label="Days" id="days" type="number" min="1" value={form.days} onChange={setField('days')} />
            <Input label="Persons" id="persons" type="number" min="1" value={form.persons} onChange={setField('persons')} />
            <Input label="Rent per Day" id="rent" type="number" value={form.rent} onChange={setField('rent')} />
            <Input label="Discount %" id="discountPercent" type="number" value={form.discountPercent} onChange={setField('discountPercent')} />
            <Input label="Discount Amount" id="discountAmount" type="number" value={form.discountAmount} onChange={setField('discountAmount')} />
            <Input label="CGST %" id="cgst" type="number" value={form.cgst} onChange={setField('cgst')} />
            <Input label="SGST %" id="sgst" type="number" value={form.sgst} onChange={setField('sgst')} />
            <Input label="IGST %" id="igst" type="number" value={form.igst} onChange={setField('igst')} />
            <div className="col-span-2 sm:col-span-3">
              <label htmlFor="roomRemarks" className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">Remarks</label>
              <textarea
                id="roomRemarks"
                value={form.roomRemarks}
                onChange={setField('roomRemarks')}
                rows={2}
                placeholder="Room-specific notes…"
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <Button variant="secondary" size="sm" onClick={resetForm}>
              <FiRotateCcw size={16} /> Reset
            </Button>
            <Button size="sm" onClick={addRoom}>
              <FiPlus size={16} /> Add Room
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-ink dark:text-slate-100">Added Rooms</h3>
            <Badge tone="primary">{rooms.length} rooms</Badge>
          </div>
          {rooms.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">No rooms added yet. Use “Add Room” above.</p>
          ) : (
            <Table columns={roomColumns} rows={rooms} />
          )}
        </Card>
      </div>

      {/* Right: booking summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6 p-6">
          <h3 className="font-heading text-base font-semibold text-ink dark:text-slate-100">Booking Summary</h3>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="Subtotal" value={inr(subtotal)} />
            <Row label="Discount" value={`- ${inr(discount)}`} tone="danger" />
            <Row label="GST" value={inr(gst)} />
            <div className="my-3 border-t border-line dark:border-slate-700" />
            <div className="flex items-center justify-between">
              <span className="font-heading text-base font-semibold text-ink dark:text-slate-100">Grand Total</span>
              <span className="font-heading text-xl font-semibold text-primary-800 dark:text-primary-200">
                {inr(grandTotal)}
              </span>
            </div>
            <div className="rounded-xl bg-canvas/70 p-3 dark:bg-slate-700/40">
              <Row label="Advance Paid" value={inr(num(form.advance))} />
              <Row label="Balance at Check-Out" value={inr(Math.max(0, grandTotal - num(form.advance)))} tone="warning" />
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

function Row({ label, value, tone }) {
  const toneClass =
    tone === 'danger'
      ? 'text-danger'
      : tone === 'warning'
      ? 'text-warning'
      : 'text-ink dark:text-slate-200'
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className={`font-medium ${toneClass}`}>{value}</span>
    </div>
  )
}
