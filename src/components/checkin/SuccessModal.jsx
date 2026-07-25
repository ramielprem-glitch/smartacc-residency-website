import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

export default function SuccessModal({ open, onClose, invoiceNumber, onViewGuest, onGoDashboard }) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center px-2 py-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-white"
          >
            <FiCheck size={36} strokeWidth={3} />
          </motion.div>
        </motion.div>
        <h3 className="mt-5 font-heading text-xl font-semibold text-ink dark:text-slate-100">
          Guest Successfully Checked In
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Invoice <span className="font-medium text-primary-700 dark:text-primary-300">{invoiceNumber}</span>
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
          <FiCheck size={12} /> Room Assigned Successfully
        </div>
        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="secondary" onClick={onViewGuest}>View Guest</Button>
          <Button onClick={onGoDashboard}>Back to Dashboard</Button>
        </div>
      </div>
    </Modal>
  )
}
