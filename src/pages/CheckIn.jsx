import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiSave, FiX } from 'react-icons/fi'
import PageTransition from '../components/layout/PageTransition'
import { Button, Card, PageHeader } from '../components/ui'
import Stepper from '../components/checkin/Stepper'
import GuestInformationStep from '../components/checkin/GuestInformationStep'
import RoomAllocationStep from '../components/checkin/RoomAllocationStep'
import ReviewStep from '../components/checkin/ReviewStep'
import SuccessModal from '../components/checkin/SuccessModal'

const genInvoice = () => `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`

const initialForm = {
  invoiceNumber: genInvoice(),
  guestName: '',
  phone: '',
  address: '',
  purpose: '',
  checkInDate: '',
  checkInTime: '',
  checkOutDate: '',
  checkOutTime: '',
  idProofType: '',
  idProofNumber: '',
  paymentMethod: '',
  advance: '',
  remarks: '',
  guestPhoto: null,
  idProofImage: null,
  // Room allocation fields
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
}

const requiredStep1 = [
  'guestName',
  'phone',
  'checkInDate',
  'checkInTime',
  'checkOutDate',
  'checkOutTime',
  'idProofType',
  'idProofNumber',
  'paymentMethod',
]

export default function CheckIn() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [rooms, setRooms] = useState([])
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const validateStep1 = () => {
    const errs = {}
    requiredStep1.forEach((key) => {
      if (!String(form[key] ?? '').trim()) errs[key] = 'This field is required'
    })
    if (form.phone && !/^[+\d\s()-]{7,}$/.test(form.phone.trim())) {
      errs.phone = 'Enter a valid phone number'
    }
    if (form.checkInDate && form.checkOutDate && form.checkOutDate < form.checkInDate) {
      errs.checkOutDate = 'Check-out must be after check-in'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => {
    if (step === 0 && !validateStep1()) return
    setStep((s) => Math.min(2, s + 1))
  }
  const back = () => setStep((s) => Math.max(0, s - 1))

  const reset = () => {
    setForm({ ...initialForm, invoiceNumber: genInvoice() })
    setRooms([])
    setErrors({})
    setStep(0)
  }

  const saveDraft = () => {
    setToast({ tone: 'success', message: 'Draft saved successfully' })
    setTimeout(() => setToast(null), 2500)
  }

  const complete = () => setSuccess(true)

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Guest Check-In"
          subtitle="Register a new guest in three quick steps"
          actions={
            <Button variant="ghost" onClick={() => navigate('/')}>
              <FiX size={16} /> Cancel
            </Button>
          }
        />

        {/* Progress indicator */}
        <Card className="p-5">
          <Stepper current={step} onStepClick={setStep} />
        </Card>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <GuestInformationStep key="step1" form={form} setForm={setForm} errors={errors} />
          )}
          {step === 1 && (
            <RoomAllocationStep key="step2" rooms={rooms} setRooms={setRooms} form={form} setForm={setForm} />
          )}
          {step === 2 && (
            <ReviewStep
              key="step3"
              form={form}
              rooms={rooms}
              onBack={back}
              onComplete={complete}
              onPrint={() => setPrintOpen(true)}
            />
          )}
        </AnimatePresence>

        {/* Wizard nav (hidden on review step — it has its own) */}
        {step < 2 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            {step === 0 ? (
              <>
                <Button variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
                <Button variant="secondary" onClick={saveDraft}>
                  <FiSave size={16} /> Save Draft
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={back}>
                <FiArrowLeft size={16} /> Back
              </Button>
            )}
            <Button onClick={next}>
              Next <FiArrowRight size={16} />
            </Button>
          </div>
        )}

        {/* Success modal */}
        <SuccessModal
          open={success}
          onClose={reset}
          invoiceNumber={form.invoiceNumber}
          onViewGuest={() => { setSuccess(false); navigate('/guests') }}
          onGoDashboard={() => navigate('/')}
        />

        {/* Print preview placeholder */}
        <AnimatePresence>
          {printOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setPrintOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-pop dark:bg-slate-800"
              >
                <h3 className="font-heading text-lg font-semibold text-ink dark:text-slate-100">Print Preview</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  A printable invoice preview will appear here. This is a UI placeholder for a future release.
                </p>
                <div className="mt-5 flex justify-end gap-3">
                  <Button variant="secondary" size="sm" onClick={() => setPrintOpen(false)}>Close</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-pop dark:bg-slate-700"
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
