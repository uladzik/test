import { motion, AnimatePresence } from 'framer-motion'
import { HiCheck, HiExclamationTriangle, HiInformationCircle, HiXCircle, HiXMark } from 'react-icons/hi2'

export interface ToastData {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
}

interface ToastProps {
  toast: ToastData
  onDismiss: (id: string) => void
}

const ICONS = {
  success: <HiCheck className="w-5 h-5 text-green-500" />,
  info: <HiInformationCircle className="w-5 h-5 text-blue-500" />,
  warning: <HiExclamationTriangle className="w-5 h-5 text-amber-500" />,
  error: <HiXCircle className="w-5 h-5 text-red-500" />,
}

const BG = {
  success: 'bg-green-50 border-green-200',
  info: 'bg-blue-50 border-blue-200',
  warning: 'bg-amber-50 border-amber-200',
  error: 'bg-red-50 border-red-200',
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.25 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${BG[toast.type]}`}
    >
      {ICONS[toast.type]}
      <span className="text-sm text-gray-800 flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="text-gray-400 hover:text-gray-600">
        <HiXMark className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[]
  onDismiss: (id: string) => void
}) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  )
}
