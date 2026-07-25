import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiUser, FiFileText, FiPhone, FiLogIn, FiLogOut, FiCreditCard, FiTarget, FiDollarSign, FiTag, FiEye, FiEdit2, FiCheckSquare } from 'react-icons/fi'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { statusMeta } from '../../mock/data'

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-canvas text-slate-500 dark:bg-slate-700 dark:text-slate-300">
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-ink dark:text-slate-100">{value || '—'}</p>
      </div>
    </div>
  )
}

export default function BookingPanel({ booking, room, open, onClose, onViewDetails, onEdit, onCheckOut }) {
  const meta = statusMeta[booking?.status] ?? statusMeta.available
  return (
    <AnimatePresence>
      {open && booking && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-pop dark:bg-slate-800"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4 dark:border-slate-700">
              <div>
                <h3 className="font-heading text-lg font-semibold text-ink dark:text-slate-100">
                  Room {room?.number}
                </h3>
                <p className="text-xs text-slate-400">{room?.type} · Floor {room?.floor} · {room?.capacity} guests</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-canvas hover:text-ink dark:hover:bg-slate-700 dark:hover:text-slate-100"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Booking Status</span>
                <Badge tone={booking.status === 'occupied' ? 'danger' : booking.status === 'reserved' ? 'warning' : booking.status === 'cleaning' ? 'primary' : 'neutral'}>
                  <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                  {meta.label}
                </Badge>
              </div>

              <div className="divide-y divide-line dark:divide-slate-700">
                <Row icon={FiUser} label="Guest Name" value={booking.guest.name} />
                <Row icon={FiFileText} label="Invoice Number" value={booking.guest.invoice} />
                <Row icon={FiPhone} label="Phone" value={booking.guest.phone} />
                <Row icon={FiLogIn} label="Check-In" value={booking.start} />
                <Row icon={FiLogOut} label="Check-Out" value={booking.end} />
                <Row icon={FiCreditCard} label="Payment Status" value={booking.guest.payment} />
                <Row icon={FiTarget} label="Purpose" value={booking.guest.purpose} />
                <Row icon={FiDollarSign} label="Room Charges" value={`₹${booking.charges.toLocaleString('en-IN')}`} />
                <Row icon={FiTag} label="Booking ID" value={booking.id} />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-line px-6 py-4 dark:border-slate-700">
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-2.5">
                  <Button variant="secondary" className="flex-1" onClick={onViewDetails}>
                    <FiEye size={16} /> View Details
                  </Button>
                  <Button variant="secondary" className="flex-1" onClick={onEdit}>
                    <FiEdit2 size={16} /> Edit
                  </Button>
                </div>
                {booking.status === 'occupied' && (
                  <Button variant="success" className="w-full" onClick={onCheckOut}>
                    <FiCheckSquare size={16} /> Check-Out
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
