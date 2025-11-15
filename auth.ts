export interface User {
  email: string
  password: string
}

export function register(email: string, password: string): { success: boolean; message: string } {
  if (!email || !password) {
    return { success: false, message: "Email и пароль обязательны" }
  }

  if (!email.includes("@")) {
    return { success: false, message: "Введите корректный email" }
  }

  if (password.length < 6) {
    return { success: false, message: "Пароль должен быть не менее 6 символов" }
  }

  const users = getUsers()

  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Пользователь с таким email уже существует" }
  }

  users.push({ email, password })
  localStorage.setItem("users", JSON.stringify(users))

  return { success: true, message: "Регистрация успешна!" }
}

export function login(email: string, password: string): { success: boolean; message: string } {
  if (!email || !password) {
    return { success: false, message: "Email и пароль обязательны" }
  }

  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { success: false, message: "Неверный email или пароль" }
  }

  localStorage.setItem("currentUser", email)
  return { success: true, message: "Вход выполнен успешно!" }
}

export function logout(): void {
  localStorage.removeItem("currentUser")
}

export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("currentUser")
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("users")
  return users ? JSON.parse(users) : []
}
