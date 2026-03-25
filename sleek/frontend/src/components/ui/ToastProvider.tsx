import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { ToastContainer, ToastData } from './Toast'

type ToastType = ToastData['type']

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const idRef = useRef(0)

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      const id = `toast-${++idRef.current}`
      setToasts((prev) => [...prev, { id, type, message }])
      setTimeout(() => dismiss(id), 4000)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}
