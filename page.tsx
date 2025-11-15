"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { login, register, isAuthenticated } from "@/lib/auth"
import { Notification } from "@/components/notification"
import { Plane } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = (email: string, password: string) => {
    const result = mode === "login" ? login(email, password) : register(email, password)

    setNotification({ message: result.message, type: result.success ? "success" : "error" })

    if (result.success && mode === "login") {
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } else if (result.success && mode === "register") {
      setTimeout(() => {
        setMode("login")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Plane className="h-10 w-10 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Travel Wishlist</h1>
            <p className="text-muted-foreground mt-2">Сохраняйте места мечты и отмечайте посещенные</p>
          </div>
        </div>

        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          onToggleMode={() => setMode(mode === "login" ? "register" : "login")}
        />
      </div>
    </div>
  )
}
