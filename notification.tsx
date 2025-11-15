"use client"
import { useEffect } from "react"
import { CheckCircle2, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border",
          type === "success" ? "bg-green-50 border-green-200 text-green-900" : "bg-red-50 border-red-200 text-red-900",
        )}
      >
        {type === "success" ? (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="flex-shrink-0 hover:opacity-70 transition">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
