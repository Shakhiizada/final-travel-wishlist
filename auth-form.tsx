"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthFormProps {
  mode: "login" | "register"
  onSubmit: (email: string, password: string) => void
  onToggleMode: () => void
}

export function AuthForm({ mode, onSubmit, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Вход" : "Регистрация"}</CardTitle>
        <CardDescription>
          {mode === "login" ? "Войдите в свой аккаунт для доступа к списку мест" : "Создайте аккаунт для начала работы"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>

          <div className="text-center">
            <Button type="button" variant="link" onClick={onToggleMode} className="text-sm">
              {mode === "login" ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войдите"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
