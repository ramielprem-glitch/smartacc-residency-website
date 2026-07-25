import { useRef, useState } from 'react'
import { FiUploadCloud, FiX } from 'react-icons/fi'
import { cn } from '../../utils/cn'

// UI-only upload area. Stores a local object URL preview without persisting.
export default function UploadArea({ label, hint, preview, onFile }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (file) => {
    if (file) onFile({ name: file.name, url: URL.createObjectURL(file) })
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-line dark:border-slate-700">
          <img src={preview.url} alt={label} className="h-32 w-full object-cover" />
          <button
            type="button"
            onClick={() => onFile(null)}
            className="absolute right-2 top-2 rounded-lg bg-slate-900/60 p-1 text-white transition-colors hover:bg-slate-900/80"
            aria-label="Remove"
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFile(e.dataTransfer.files?.[0])
          }}
          className={cn(
            'flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors',
            dragOver
              ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20'
              : 'border-line bg-canvas/50 hover:border-primary-300 hover:bg-primary-50/30 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-primary-700',
          )}
        >
          <FiUploadCloud size={22} className="text-slate-400" />
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {hint ?? 'Click or drag to upload'}
          </span>
        </button>
      )}
    </div>
  )
}
