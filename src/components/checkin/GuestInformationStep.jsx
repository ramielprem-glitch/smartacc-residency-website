import { motion } from 'framer-motion'
import { Card, Input, Select } from '../../components/ui'
import UploadArea from './UploadArea'

export default function GuestInformationStep({ form, setForm, errors }) {
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-6"
    >
      <Card className="p-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-5">
            <Input
              label="Invoice Number"
              id="invoiceNumber"
              value={form.invoiceNumber}
              readOnly
              className="cursor-not-allowed bg-canvas/60 dark:bg-slate-700/40"
            />
            <Input label="Guest Name *" id="guestName" value={form.guestName} onChange={set('guestName')} error={errors.guestName} placeholder="e.g. Amara Okafor" />
            <Input label="Phone Number *" id="phone" type="tel" value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="+91 98765 43210" />
            <div>
              <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">Address</label>
              <textarea
                id="address"
                value={form.address}
                onChange={set('address')}
                rows={2}
                placeholder="Street, City, State, ZIP"
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              />
            </div>
            <Select label="Purpose of Stay" id="purpose" value={form.purpose} onChange={set('purpose')}>
              <option value="">Select purpose</option>
              <option>Business</option>
              <option>Leisure</option>
              <option>Medical</option>
              <option>Family Visit</option>
              <option>Conference</option>
            </Select>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <Input label="Check-In Date *" id="checkInDate" type="date" value={form.checkInDate} onChange={set('checkInDate')} error={errors.checkInDate} />
            <Input label="Check-In Time *" id="checkInTime" type="time" value={form.checkInTime} onChange={set('checkInTime')} error={errors.checkInTime} />
            <Input label="Expected Check-Out Date *" id="checkOutDate" type="date" value={form.checkOutDate} onChange={set('checkOutDate')} error={errors.checkOutDate} />
            <Input label="Expected Check-Out Time *" id="checkOutTime" type="time" value={form.checkOutTime} onChange={set('checkOutTime')} error={errors.checkOutTime} />
            <Select label="Payment Method *" id="paymentMethod" value={form.paymentMethod} onChange={set('paymentMethod')} error={errors.paymentMethod}>
              <option value="">Select method</option>
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* ID Proof */}
      <Card className="p-6">
        <h3 className="mb-4 font-heading text-base font-semibold text-ink dark:text-slate-100">ID Proof Information</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Select label="ID Proof Type *" id="idProofType" value={form.idProofType} onChange={set('idProofType')} error={errors.idProofType}>
            <option value="">Select ID type</option>
            <option>Aadhaar Card</option>
            <option>Passport</option>
            <option>Driving License</option>
            <option>Voter ID</option>
            <option>PAN Card</option>
          </Select>
          <Input label="ID Proof Number *" id="idProofNumber" value={form.idProofNumber} onChange={set('idProofNumber')} error={errors.idProofNumber} placeholder="Enter ID number" />
        </div>
      </Card>

      {/* Uploads */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="p-6">
          <UploadArea
            label="Upload Guest Photo"
            hint="Click or drag a photo"
            preview={form.guestPhoto}
            onFile={(f) => setForm((s) => ({ ...s, guestPhoto: f }))}
          />
        </Card>
        <Card className="p-6">
          <UploadArea
            label="Upload ID Proof"
            hint="Click or drag an image"
            preview={form.idProofImage}
            onFile={(f) => setForm((s) => ({ ...s, idProofImage: f }))}
          />
        </Card>
      </div>

      {/* Remarks */}
      <Card className="p-6">
        <label htmlFor="remarks" className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">Remarks</label>
        <textarea
          id="remarks"
          value={form.remarks}
          onChange={set('remarks')}
          rows={3}
          placeholder="Any special requests or notes…"
          className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
        />
      </Card>
    </motion.div>
  )
}
